// User Location / Bio  etc.
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../../models/Profile");
const User = require("../../../models/User");
const { isEmpty, isNotEmpty } = "../../../utils/is-empty.js";

const {
  validateNewProfile,
  validateUpdateProfile
} = require("../../../utils/validation/profile");

// @route   GET: api/${CURRENT_API_VERSION}/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile Works!"
  });
});

// @route   GET: api/${CURRENT_API_VERSION}/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        } else {
          return res.status(200).json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET: api/${CURRENT_API_VERSION}/profile/handle/:handle
// @desc    Get current user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET: api/${CURRENT_API_VERSION}/profile/user/:user_id
// @desc    Get current user profile by userid
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
      }
    })
    .catch(err => {
      errors.noprofile = "There is no profile for this user";
      return res.status(404).json(errors);
    });
});

// @route   GET: api/${CURRENT_API_VERSION}/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles.length === 0) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profiles);
      }
    })
    .catch(err => {
      errors.noprofiles = "There are no profiles";
      return res.status(404).json(errors);
    });
});

// @route   POST: api/${CURRENT_API_VERSION}/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Split skills into array (Comma separated values)

    if (typeof req.body.skills !== "undefined" || req.body.skills.trim !== "") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Perform an update to the profile
        const { errors, isValid } = validateUpdateProfile(profileFields);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        // Don't allow updating the handle once it has been created.
        delete profileFields["handle"];
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      } else {
        // Create a new profile
        // Check if handle exists
        const { errors, isValid } = validateNewProfile(profileFields);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle is already taken";
            return res.status(400).json(errors);
          } else {
            // Save profile
            new Profile(profileFields)
              .save()
              .then(profile => res.status(200).json(profile));
          }
        });
      }
    });
  }
);

// @route   DELETE api/v1/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = await Profile.findOneAndRemove({ user: req.user.id }).catch(
      err => res.status(400).json({ profile: "Error deleting profile" })
    );

    const user = await User.findOneAndRemove({ _id: req.user.id }).catch(err =>
      res.status(400).json({ user: "Error deleting user" })
    );

    res.json({ success: true });
  }
);

module.exports = router;

// Authentication
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { SECRET_KEY } = require("../../../config/keys");

const {
  validateRegistration,
  validateLogin
} = require("../../../utils/validation/user");

// Load User odel
const User = require("../../../models/User");

// @route   GET: api/${CURRENT_API_VERSION}/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Users Works!"
  });
});

// @route   POST: api/${CURRENT_API_VERSION}/users/register
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  // First check the values:
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const password2 = req.body.password2;

  const { errors, isValid } = validateRegistration({
    email,
    name,
    password,
    password2
  });

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // First check to see if the email exists.
  const user = await User.findOne({ email });
  if (user) {
    errors.email = "Email exists already";
    return res.status(400).json(errors);
  } else {
    const opts = {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    };
    const avatar = gravatar.url(email, opts);
    const newUser = new User({
      name,
      email,
      avatar,
      password
    });

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      const user = await newUser.save();
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
});

// @route   POST: api/${CURRENT_API_VERSION}/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", async (req, res) => {
  // First check the values:
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLogin({ email, password });

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find the user by email
  const user = await User.findOne({ email });
  // Check for user
  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  } else {
    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User Matched

      // Create JWT Payload
      const payload = { id: user._id, name: user.name, avatar: user.avatar };

      try {
        // Sign The Token
        const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 }); // Expire in 1 hour.
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`
        });
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }
  }
});

// @route   GET: api/${CURRENT_API_VERSION}/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;

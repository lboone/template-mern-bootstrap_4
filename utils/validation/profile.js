const Validator = require("validator");
const { isEmpty, isNotEmpty } = require("../is-empty");

const validateNewProfile = profileFields => {
  const errors = testValues(profileFields);
  const handle = isNotEmpty(profileFields.handle) ? profileFields.handle : "";

  if (!Validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }
  if (!Validator.matches(handle, /^[a-z0-9_-]{3,16}$/)) {
    errors.handle =
      "Handle must have only lowercase letters no spaces or special characters other than - or _";
  }
  if (isEmpty(handle)) {
    errors.handle = "Handle is required";
  }
  return { errors, isValid: isEmpty(errors) };
};

const validateUpdateProfile = profileFields => {
  const errors = testValues(profileFields);
  const handle = isNotEmpty(profileFields.handle) ? profileFields.handle : "";

  if (isNotEmpty(handle)) {
    if (!Validator.isLength(handle, { min: 2, max: 40 })) {
      errors.handle = "Handle must be between 2 and 40 characters";
    }
    if (!Validator.matches(handle, /^[a-z0-9_-]{3,16}$/)) {
      errors.handle =
        "Handle must have only lowercase letters no spaces or special characters other than - or _";
    }
  }
  return { errors, isValid: isEmpty(errors) };
};

const testValues = profileFields => {
  const website = profileFields.website;
  const youtube = profileFields.social.youtube
    ? profileFields.social.youtube
    : "";
  const facebook = profileFields.social.facebook
    ? profileFields.social.facebook
    : "";
  const linkedin = profileFields.social.linkedin
    ? profileFields.social.linkedin
    : "";
  const twitter = profileFields.social.twitter
    ? profileFields.social.twitter
    : "";
  const instagram = profileFields.social.instagram
    ? profileFields.social.instagram
    : "";

  const errors = {};
  if (isNotEmpty(website) && !Validator.isURL(website)) {
    errors.website = "Website must be a valid url";
  }

  if (isNotEmpty(youtube) && Validator.isURL(youtube) === false) {
    console.log("youtube");
    errors.youtube = "Youtube must be a valid url";
  }

  if (isNotEmpty(facebook) && !Validator.isURL(facebook)) {
    errors.facebook = "Facebook must be a valid url";
  }

  if (isNotEmpty(linkedin) && !Validator.isURL(linkedin)) {
    errors.linkedin = "Linkedin must be a valid url";
  }

  if (isNotEmpty(twitter) && !Validator.isURL(twitter)) {
    errors.twitter = "Twitter must be a valid url";
  }

  if (isNotEmpty(instagram) && !Validator.isURL(instagram)) {
    errors.instagram = "Instagram must be a valid url";
  }
  return errors;
};

module.exports = {
  validateNewProfile,
  validateUpdateProfile
};

const Validator = require("validator");
const { isEmpty } = require("../is-empty");

const validateRegistration = ({
  email = "",
  name = "",
  password = "",
  password2 = ""
}) => {
  const pwStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const errors = {};

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Please provide a valid email";
  }

  if (
    !Validator.matches(password, pwStrength) ||
    !Validator.isLength(password, { min: 8, max: 30 })
  ) {
    errors.password =
      "Password must contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and be between 8 and 30 characters";
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

  if (isEmpty(name)) {
    errors.name = "Name is required";
  }

  if (isEmpty(email)) {
    errors.email = "Email is required";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required";
  }

  if (isEmpty(password2)) {
    errors.password2 = "Confirm Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};

const validateLogin = ({ email = "", password = "" }) => {
  const errors = {};
  if (!Validator.isEmail(email)) {
    errors.email = "Please provide a valid email";
  }
  if (isEmpty(email)) {
    errors.email = "Email is required";
  }
  if (isEmpty(password)) {
    errors.password = "Password is required";
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = {
  validateRegistration,
  validateLogin
};

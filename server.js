const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Set the app
const app = express();

// Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config Keys
const {
  MONGO_URL,
  USERS_PATH,
  PROFILE_PATH,
  USERS_ROUTE,
  PROFILE_ROUTE
} = require("./config/keys");

// Connect to MongoDB
mongoose
  .connect(
    MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoD DB Connected"))
  .catch(e => console.log(e));

// Passport middleware
app.use(passport.initialize());

// Passport Config JWT Strategy

require("./config/passport.js")(passport);

// Use Routes
app.use(USERS_ROUTE, require(USERS_PATH));
app.use(PROFILE_ROUTE, require(PROFILE_PATH));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

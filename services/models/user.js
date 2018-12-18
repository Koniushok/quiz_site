const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TestSchema } = require("./test");
const { StatisticsSchema, Statistics } = require("./statistics");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  surname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  admin: Boolean,
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
  statistics: StatisticsSchema
});

userSchema.methods.GetAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    config.get("jwtKey")
  );
  return token;
};

function validateUser(user) {
  const schema = {
    login: Joi.string()
      .min(5)
      .max(60)
      .required(),
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    surname: Joi.string()
      .min(5)
      .max(30)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateUserUpData(user) {
  const schema = {
    login: Joi.string()
      .min(5)
      .max(60),
    name: Joi.string()
      .min(5)
      .max(30),
    surname: Joi.string()
      .min(5)
      .max(30),
    email: Joi.string().email(),
    password: Joi.string()
      .min(5)
      .max(1024)
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
exports.validateUpData = validateUserUpData;

const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ login: req.body.login });
  if (!user) return res.status(400).send("Invalid login or password.");

  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(400).send("Invalid login or password.");

  const token = user.GetAuthToken();
  res.send({ jwt: token, user: _.omit(user._doc, ["password"]) });
});

function validate(data) {
  const schema = {
    login: Joi.string()
      .min(5)
      .max(60)
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(data, schema);
}

module.exports = router;

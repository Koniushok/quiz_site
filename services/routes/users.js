const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate, validateUpData } = require("../models/user");
const { Statistics } = require("../models/statistics");
const express = require("express");
const router = express.Router();

router.get("/my", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -statistics"
  );
  if (!user) return res.status(400).send("no User");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Such email already exists");

  user = await User.findOne({ login: req.body.login });
  if (user) return res.status(400).send("Such login already exists");

  user = new User(
    _.pick(req.body, ["login", "name", "email", "password", "surname"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send("Successfully registered");
});

router.post("/edit", auth, async (req, res) => {
  const { error } = validateUpData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user && user._id != req.user._id)
    return res.status(400).send("Such email already exists");

  user = await User.findOne({ login: req.body.login });
  if (user && user._id != req.user._id)
    return res.status(400).send("Such login already exists");

  await User.update({ _id: req.user._id }, req.body);
  user = await User.findById(req.user._id).select("-password");

  if (!user) return res.status(400).send("no User");
  res.send(user._doc);
});

module.exports = router;

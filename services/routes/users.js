const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/my", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(400).send("no User");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    $or: [{ login: req.body.login }, { email: req.body.email }]
  });
  if (user) return res.status(400).send("User already registered.");
  user = new User(
    _.pick(req.body, ["login", "name", "email", "password", "surname"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send("Successfully registered");
});

module.exports = router;

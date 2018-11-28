const _ = require("lodash");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("statistics");
  if (!user) return res.status(400).send("no User");
  console.log(user.statistics);
  res.send(user.statistics);
});

router.post("/publicTest", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("statistics");
  if (!user) return res.status(400).send("no User");
  user.statistics.publicTest++;
  user.statistics.publicСorrect += req.body.correct;
  user.statistics.publicQuestions += req.body.questions;
  await user.save();
  res.send(user.statistics);
});

module.exports = router;

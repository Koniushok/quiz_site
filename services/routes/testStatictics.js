const _ = require("lodash");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const users = await User.find({ tests: { $ne: [] } }).select("tests");
  console.log("testsArray", users);

  users.map(async user => {
    let indexTest = -1;
    indexTest = _.findIndex(user.tests, function(t) {
      return t._id == req.body.testId;
    });
    if (indexTest != -1) {
      user.tests[indexTest].statistics.passes++;
      user.tests[indexTest].statistics.questions += req.body.questions;
      user.tests[indexTest].statistics.correctAnswer += req.body.correct;
    }
    await user.save();
  });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("statistics");
  if (!user) return res.status(400).send("no User");

  let { statistics } = user;

  var index = _.findIndex(statistics.publicPassed, function(item) {
    return item == req.body.testId;
  });
  if (index === -1)
    user.statistics.publicPassed = [
      ...user.statistics.publicPassed,
      req.body.testId
    ];
  statistics.publicTest++;
  statistics.publicСorrect += req.body.correct;
  statistics.publicQuestions += req.body.questions;

  user.statistics = statistics;
  await user.save();
  res.send(statistics);
});

module.exports = router;

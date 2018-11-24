const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Test } = require("../models/test");
const { Task } = require("../models/task");
const express = require("express");
const router = express.Router();

router.post("/new", auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  const task = new Task({
    question: "Where?",
    answer1: "Answer1",
    answer2: "Answer2",
    answer3: "Answer3",
    answer4: "Answer4",
    correctAnswer: 1
  });
  user.tests = [new Test({ tasks: [task], name: "My second test" })];

  user.save();
  console.log(user);
  res.send(user);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log(req.body);
  user.tests = [...user.tests, new Test({ tasks: [], name: req.body.name })];

  user.save();
  res.send(user.tests);
});

router.delete("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  tests = [...user.tests];

  var test = tests.filter(function(t) {
    return t._id === req.user._id;
  });

  user.tests.splice(tests.indexOf(test), 1);

  user.save();
  if (!test)
    return res.status(404).send("The test with the given ID was not found.");

  res.send(user.tests);
});

module.exports = router;

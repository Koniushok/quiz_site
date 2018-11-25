const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Test } = require("../models/test");
const { Task } = require("../models/task");
const _ = require("lodash");
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

  user.tests = [...user.tests, new Test({ tasks: [], name: req.body.name })];

  user.save();
  res.send(user.tests);
});

router.post("/edit", auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  tests = [...user.tests];

  var index = -1;
  tests.map((t, i) => {
    if (t._id == req.body.id) {
      index = i;
    }
  });
  if (index === -1) {
    return res.status(404).send("The test with the given ID was not found.");
  }

  user.tests[index].name = req.body.name;
  user.save();
  res.send(user.tests);
});

router.delete("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  tests = [...user.tests];

  var index = -1;
  tests.map((t, i) => {
    if (t._id == req.params.id) {
      index = i;
    }
  });
  if (index === -1)
    return res.status(404).send("The test with the given ID was not found.");
  user.tests.splice(index, 1);

  user.save();

  res.send(user.tests);
});

router.delete("/task/:idTest/:idTask", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  tests = [...user.tests];

  var indexTest = -1;
  tests.map((t, i) => {
    console.log(t._id, "==", req.params.idTest);
    if (t._id == req.params.idTest) {
      indexTest = i;
    }
  });
  console.log("indexTest", indexTest);
  if (indexTest === -1)
    return res.status(404).send("The test with the given ID was not found.");

  var indexTask = -1;
  tests[indexTest].tasks.map((t, i) => {
    console.log(req.params.idTask, "==", t._id);
    if (t._id == req.params.idTask) {
      indexTask = i;
    }
  });
  if (indexTask === -1)
    return res.status(404).send("The task with the given ID was not found.");

  console.log(indexTest, "-", indexTask);
  user.tests[indexTest].tasks.splice(indexTask, 1);

  user.save();

  res.send(user.tests);
});

router.post("/task", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.body.task);

  var index = -1;
  user.tests.map((t, i) => {
    if (t._id == req.body.testId) {
      index = i;
    }
  });

  user.tests[index].tasks = [
    ...user.tests[index].tasks,
    new Task(req.body.task)
  ];

  user.save();
  res.send(user.tests);
});

router.post("/task/edit", auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  tests = [...user.tests];

  var indexTest = _.findIndex(tests, function(t) {
    return t._id == req.body.testId;
  });

  var indexTask = _.findIndex(tests[indexTest].tasks, function(t) {
    return t._id == req.body.task._id;
  });

  user.tests[indexTest].tasks[indexTask] = req.body.task;
  user.save();
  res.send(user.tests);
});
module.exports = router;

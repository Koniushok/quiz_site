const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Test } = require("../models/test");
const { Task } = require("../models/task");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user = await User.findById(req.user._id);

  const test = new Test({ tasks: [], name: req.body.name });
  await test.save();

  user.tests = [...user.tests, test._id];
  await user.save();

  res.send(await getTests(req.user._id)); //user.tests
});

router.get("/", auth, async (req, res) => {
  const tests = await getTests(req.user._id);
  res.send(tests); //user.tests
});

router.put("/edit", auth, async (req, res) => {
  const test = await Test.findById(req.body.id);
  test.name = req.body.name;

  await test.save();
  const tests = await getTests(req.user._id);
  res.send(tests);
});

router.delete("/:id", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  let tests = [...user.tests];

  var index = -1;
  tests.map((t, i) => {
    if (t == req.params.id) {
      index = i;
    }
  });
  if (index === -1)
    return res.status(404).send("The test with the given ID was not found.");
  user.tests.splice(index, 1);

  await user.save();

  await Test.deleteOne({ _id: req.params.id });

  res.send(await getTests(req.user._id));
});

router.delete("/task/:idTest/:idTask", auth, async (req, res) => {
  const test = await Test.findById(req.params.idTest);
  var indexTask = -1;
  test.tasks.map((t, i) => {
    if (t._id == req.params.idTask) {
      indexTask = i;
    }
  });
  if (indexTask === -1)
    return res.status(404).send("The task with the given ID was not found.");

  test.tasks.splice(indexTask, 1);

  await test.save();

  res.send(await getTests(req.user._id));
});

router.post("/task", auth, async (req, res) => {
  const test = await Test.findById(req.body.testId);
  const task = new Task(req.body.task);
  await task.save();

  test.tasks = [...test.tasks, task._id];
  await test.save();

  res.send(await getTests(req.user._id));
});

router.put("/task/edit", auth, async (req, res) => {
  await Task.update(
    { _id: req.body.task._id },
    _.pick(req.body.task, [
      "question",
      "answer1",
      "answer2",
      "answer3",
      "answer4",
      "correctAnswer"
    ])
  );
  res.send(await getTests(req.user._id));
});

const getTests = async userId => {
  const user = await User.findById(userId).populate({
    path: "tests",
    populate: { path: "tasks" }
  });

  return user.tests;
};
module.exports = router;

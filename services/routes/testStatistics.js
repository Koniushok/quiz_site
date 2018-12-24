const _ = require("lodash");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Test } = require("../models/test");
const express = require("express");
const router = express.Router();

router.put("/", auth, async (req, res) => {
  const test = await Test.findById(req.body.testId);
  test.statistics.passes++;
  test.statistics.questions += req.body.questions;
  test.statistics.correctAnswer += req.body.correct;
  test.save();
});

router.get("/", auth, async (req, res) => {
  const test = await Test.findById(req.body.testId);
  res.send(test.statistics);
});

module.exports = router;

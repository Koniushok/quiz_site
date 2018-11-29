const _ = require("lodash");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const testsArray = await User.find({ tests: { $ne: [] } }).select("tests");

  let tests = [];
  testsArray.map(t => {
    t.tests.map(test => {
      if (test.public) tests = [...tests, test];
    });
  });
  res.send(tests);
});

module.exports = router;

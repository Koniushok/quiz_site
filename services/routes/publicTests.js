const _ = require("lodash");
const auth = require("../middleware/auth");
const { Test } = require("../models/test");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tests = await Test.find({ public: true }).populate("tasks");
  res.send(tests);
});

module.exports = router;

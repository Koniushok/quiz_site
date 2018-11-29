const Joi = require("joi");
const mongoose = require("mongoose");

const testStatisticsSchema = new mongoose.Schema({
  passes: {
    type: Number,
    default: 0
  },
  correctAnswer: {
    type: Number,
    default: 0
  },
  questions: {
    type: Number,
    default: 0
  }
});

function validateTest(user) {
  const schema = {};

  return Joi.validate(user, schema);
}

const testStatistics = mongoose.model("TestStatistics", testStatisticsSchema);

exports.TestStatistics = testStatistics;
exports.TestStatisticsSchema = testStatisticsSchema;

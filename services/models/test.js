const Joi = require("joi");
const mongoose = require("mongoose");
const { taskSchema } = require("./task");
const { TestStatisticsSchema, TestStatistics } = require("./testStatistics");

const testSchema = new mongoose.Schema({
  tasks: [taskSchema],
  name: String,
  public: {
    type: Boolean,
    default: true
  },
  statistics: { type: TestStatisticsSchema, default: new TestStatistics({}) }
});

function validateTest(user) {
  const schema = {};

  return Joi.validate(user, schema);
}

const Test = mongoose.model("Test", testSchema);

exports.Test = Test;
exports.TestSchema = testSchema;

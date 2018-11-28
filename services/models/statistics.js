const Joi = require("joi");
const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  publicTest: {
    type: Number,
    default: 0
  },
  publicСorrect: {
    type: Number,
    default: 0
  },
  publicQuestions: {
    type: Number,
    default: 0
  },
  publicPassed: [mongoose.Schema.Types.ObjectId]
});

function validateTest(user) {
  const schema = {};

  return Joi.validate(user, schema);
}

const statistics = mongoose.model("Statistics", statisticsSchema);

exports.Statistics = statistics;
exports.StatisticsSchema = statisticsSchema;

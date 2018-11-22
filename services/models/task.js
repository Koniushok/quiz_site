const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer1: {
    type: String,
    required: true
  },
  answer2: {
    type: String,
    required: true
  },
  answer3: {
    type: String,
    required: true
  },
  answer4: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  }
});

function validateTask(user) {
  const schema = {
    question: Joi.string().required(),
    answer1: Joi.string().required(),
    answer2: Joi.string().required(),
    answer3: Joi.string().required(),
    answer4: Joi.string().required(),
    correctAnswer: Joi.number().required()
  };

  return Joi.validate(user, schema);
}

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;
exports.taskSchema = taskSchema;
exports.validate = validateTask;

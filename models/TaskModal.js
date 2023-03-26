const mongoose = require("mongoose");

const { Schema } = mongoose;

const task_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
  linkid:String
});

const Task_modal = mongoose.model("Task", task_Schema);

module.exports = { Task_modal };

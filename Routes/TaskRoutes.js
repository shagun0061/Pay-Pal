const express = require("express");
const { userAuthMiddleware } = require("../Middleware/AuthMiddleware");
const { Task_modal } = require("../models/TaskModal");

const TaskRoutes = express.Router();

TaskRoutes.get("/task", async(req, res) => {
  let Task = await Task_modal.find();
  res.send(Task);
});

TaskRoutes.post("/taskadd", userAuthMiddleware, async (req, res) => {
  let newTask = await Task_modal(req.body);
  await newTask.save();
  res.send("Task");
});

module.exports = { TaskRoutes };

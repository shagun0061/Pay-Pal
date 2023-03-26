const express = require("express");
const { userAuthMiddleware } = require("../Middleware/AuthMiddleware");
const { Task_modal } = require("../models/TaskModal");

const TaskRoutes = express.Router();

TaskRoutes.get("/task", async (req, res) => {
  let Task = await Task_modal.find();
  res.send(Task);
});

TaskRoutes.post("/taskadd", userAuthMiddleware, async (req, res) => {
  let newTask = await Task_modal(req.body);
  await newTask.save();
  res.send("Task Add Successful");
});

TaskRoutes.delete("/taskdel/:id", userAuthMiddleware, async (req, res) => {
  let id = req.params.id;
  let chekid = req.headers.userid;

  const Task = await Task_modal.find({ _id: id });

  if (chekid == Task[0].linkid) {
    await Task_modal.findByIdAndRemove(id);
    res.send("Task delet done");
  } else {
    res.send("you don not delet this Task");
  }
});

TaskRoutes.patch("/taskupdate/:id", userAuthMiddleware, async (req, res) => {
  let id = req.params.id;
  let chekid = req.headers.userid;

  const Task = await Task_modal.find({ _id: id });

  if (chekid == Task[0].linkid) {
    await Task_modal.findByIdAndUpdate(id, req.body);
    res.send("Task update successful");
  } else {
    res.send("you don not update this Task");
  }
});

module.exports = { TaskRoutes };

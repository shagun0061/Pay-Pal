const express = require("express");
const { userAuthMiddleware } = require("../Middleware/AuthMiddleware");
const { Sprint_modal } = require("../models/SprintModal");
const { Task_modal } = require("../models/TaskModal");

const SprintRoutes = express.Router();

SprintRoutes.post("/sprintadd", userAuthMiddleware, async (req, res) => {
  let payload = req.body.sprintname;
  console.log("Payload", payload);
  const newSprint = new Sprint_modal({
    sprintname: payload,
    linkid: req.body.linkid,
  });
  await newSprint.save();

  res.send("sprint Added");
});

SprintRoutes.delete("/sprintdel/:id", userAuthMiddleware, async (req, res) => {
  let id = req.params.id;
  let chekid = req.headers.userid;

  const sprint = await Sprint_modal.find({ _id: id });

  if (chekid == sprint[0].linkid) {
    await Task_modal.deleteMany({ user: chekid });
    await Sprint_modal.findByIdAndRemove(id);
    res.send("Sprint delet done");
  } else {
    res.send("you don not delet this Sprint");
  }
});

SprintRoutes.get("/sprint", async (req, res) => {
  const sprint = await Sprint_modal.find();

  res.send(sprint);
});
module.exports = { SprintRoutes };

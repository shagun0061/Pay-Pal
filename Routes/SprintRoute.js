const express = require("express");
const { userAuthMiddleware } = require("../Middleware/AuthMiddleware");
const { Sprint_modal } = require("../models/SprintModal");

const SprintRoutes = express.Router();

SprintRoutes.post("/sprintadd", userAuthMiddleware, async (req, res) => {
     let payload = req.body.sprintname 
     console.log("Payload",payload);
  const newSprint = new Sprint_modal({sprintname:payload});
  await newSprint.save();

  res.send("sprint Added");
});

SprintRoutes.get("/sprint", async (req, res) => {
      
  const sprint = await Sprint_modal.find();
  console.log("sprint");
    res.send(sprint);
});
module.exports = { SprintRoutes };

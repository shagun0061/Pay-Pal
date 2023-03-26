const express = require("express");
const { userAuthMiddleware } = require("../Middleware/AuthMiddleware");
const { Sprint_modal } = require("../models/SprintModal");

const SprintRoutes = express.Router();

SprintRoutes.post("/sprintadd", userAuthMiddleware, async (req, res) => {
     let payload = req.body.sprintname 
     console.log("Payload",payload);
  const newSprint = new Sprint_modal({sprintname:payload,linkid:req.body.linkid});
  await newSprint.save();

  res.send("sprint Added");
});



SprintRoutes.delete("/sprintdel", async (req, res) => {
  let id = req.body.id
  let chekid = req.body.linkid
  console.log(id,chekid);
  const sprint = await Sprint_modal.find({_id:id});
  console.log(sprint);
  if(chekid==sprint[0].linkid){
    await Sprint_modal.findByIdAndRemove(req.body.id);
    res.send("Sprint delet done");
  }else{
    res.send("you don not delet this Sprint");
  }
     

});

SprintRoutes.get("/sprint", async (req, res) => {
      
  const sprint = await Sprint_modal.find();
   
    res.send(sprint);
});
module.exports = { SprintRoutes };

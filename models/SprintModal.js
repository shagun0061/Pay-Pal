const mongoose = require("mongoose");

 const {Schema} = mongoose.Schema

const sprint_Schema = new mongoose.Schema({
  sprintname: {
    type: String,
     
  } 
});

const Sprint_modal = mongoose.model("sprint", sprint_Schema);

module.exports = { Sprint_modal };

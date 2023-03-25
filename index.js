const express = require("express");
const { connect } = require("./config/connectdb");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const { TaskRoutes } = require("./Routes/TaskRoutes");
const { Auth_Routes } = require("./Routes/AuthRoutes");
const { SprintRoutes } = require("./Routes/SprintRoute");
require("dotenv").config();

const app = express();

//! Middleware
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser());

app.use("/",Auth_Routes)
app.use("/",TaskRoutes)
app.use("/",SprintRoutes)



app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log(`connect to Data Base 🚩🚩`);
  } catch (error) {
    console.log(error);
  }

  console.log(`server is running on ${process.env.PORT} 🚩🚩`);
});

const express = require("express");
const { User_modal } = require("../models/UserModal");
const bcrypt = require("bcryptjs");
const Auth_Routes = express.Router();
const jwt = require("jsonwebtoken")

Auth_Routes.post("/signup", async (req, res) => {
  let { email, password, username } = req.body;
  let User = await User_modal.findOne({ email });
  if (User) {
    res.send(`User already register with email:${email}`);
    return
  }
  let hashPassword = await bcrypt.hash(password, 5);

  try {
    if (hashPassword) {
      let user = await User_modal.create({
        email,
        password: hashPassword,
        username,
      });

      if (user) {
        res.send("User has been created successfully");
      } else {
        res.send("User is not created");
      }
    } else {
      res.send("Please change the password");
    }
  } catch (err) {
    res.send(err);
  }
});

Auth_Routes.post("/signin", async (req, res) => {
  let { email, password } = req.body;

  let User = await User_modal.findOne({ email });

  try {
    if (User) {
      bcrypt.compare(password, User.password, (err, result) => {
        if (err) {
          res.send(err);
        }

        if (result) {
          let token = jwt.sign({ userid: User._id }, "AccessToken");
          res.send({
            msg: "Login Successfully",
            token,
          });
        } else {
          res.send("Password is wrong");
        }
      });
    } else {
      res .send("Register first");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = { Auth_Routes };

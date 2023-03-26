require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers.auth;

  console.log("token",token,req.body);
   

  jwt.verify(token, "AccessToken", (err, auth) => {
    if (err) {
      res.send("Login first");
     } else {
      req.body.token = auth;
      next();
    }

  })


};
module.exports = { userAuthMiddleware };

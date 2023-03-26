require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers.auth;
  if(token){

  jwt.verify(token, "AccessToken", (err, auth) => {
    console.log(1);
    if (err) {
      res.send("Login first");
    console.log(2);
    
    } else {
      req.body.token = auth;
    console.log(3);

      next();
    }
    console.log(1);

  })
}else{
  res.send("Login first")
}

};
module.exports = { userAuthMiddleware };

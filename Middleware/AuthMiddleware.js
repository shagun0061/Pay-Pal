require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers.auth;
  
    jwt.verify(token,"AccessToken",(err,auth)=>{
     if(err){
          res.send("error")
          return
     }
     console.log(auth);
     req.body.token = auth;
     next();
    });
   
   
};
module.exports = { userAuthMiddleware };
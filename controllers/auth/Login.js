const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const ResponseError = require("../../middlewares/error");
const bcrypt =  require("bcryptjs")
const jwt = require("jsonwebtoken")
async function login (req,res,next){

   const {username,password} = req.body;

   try {
    if(!username || !password){
      return  next(new ResponseError("Please provide username and password",StatusCodes.BAD_REQUEST))
    }
    const user = await  User.findOne({username})
    
    if(!user){
      return  next(new ResponseError("username or password incorrect"))
    }
    const  isMatch = await user.isPasswordMatch(password);
    console.log(isMatch)
    if(!isMatch){
      return  next(new ResponseError("username or password incorrect",StatusCodes.BAD_REQUEST))
    }
      const token = user.SignJwtToken()
      
    const payload = {
      email:user["email"],
      username:user["username"],
      createdAt:user["createdAt"]
    }
   return res.cookie("token",token).json({success:true,message:"ok",payload})
    
   } catch (error) {
    next( new ResponseError(error.message,StatusCodes.BAD_REQUEST))
   }

   
}

module.exports = {login}
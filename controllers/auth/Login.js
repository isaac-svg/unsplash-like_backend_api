const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const ResponseError = require("../../middlewares/error");
const bcrypt =  require("bcryptjs")

async function login (req,res,next){

   const {email,password} = req.body;
   const token =req.cookies.token
   try {
    if(!email || !password){
        next(new ResponseError("Please provide username and password",StatusCodes.BAD_REQUEST))
    }
    const user = await  User.findOne({email})
    if(!user){
        next(new ResponseError("username or password incorrect"))
    }
    const  isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        next(new ResponseError("username or password incorrect",StatusCodes.BAD_REQUEST))
    }

   return res.cookie("token",token).json({success:true,message:"ok"})
    
   } catch (error) {
    next( new ResponseError(error.message,StatusCodes.BAD_REQUEST))
   }

   
}

module.exports = {login}
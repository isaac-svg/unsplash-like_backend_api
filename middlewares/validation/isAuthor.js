const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");
const bcrypt = require("bcryptjs")
 async function isAuthor (req,res,next){

        const {username,password} = req.body;
        const {authorId} = req.params
        if(authorId !== req.user.id){
            return next(new ResponseError("You are not the author of this post",StatusCodes.UNAUTHORIZED))
        }

        const user =  await User.findOne({username:username})
      
        if(!user){
            return next(new Response("Username or password incorrect",StatusCodes.UNAUTHORIZED))
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return next(new ResponseError("Username or password incorrect",StatusCodes.UNAUTHORIZED))
        }
        else{
            next()
        }




}

module.exports =  isAuthor
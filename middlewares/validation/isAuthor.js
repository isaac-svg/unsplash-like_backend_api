const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../error");
const User = require("../../models/User");

 async function isAuthor (req,res,next){

        const {username,password} = req.body;
        const {imageId} = req.params
        if(imageId !== req.user.id){
            return next(new ResponseError("You are not the author of this post",StatusCodes.UNAUTHORIZED))
        }

        const user =  await User.findOne({username})
        if(!user){
            return next(new Response("Username or password incorrect",StatusCodes.UNAUTHORIZED))
        }
        const isMatch = await user.isPasswordMatch(password)
        if(!isMatch){
            return next(new ResponseError("Username or password incorrect",StatusCodes.UNAUTHORIZED))
        }
        else{
            next()
        }




}

module.exports =  isAuthor
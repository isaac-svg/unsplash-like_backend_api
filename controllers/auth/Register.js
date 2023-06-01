const ResponseError = require("../../middlewares/error");
const User = require("../../models/User");

const {StatusCodes} =  require("http-status-codes")


async function register (req,res,next){

    const {username,password:pass,email} = req.body;
    try {
       
        const newUser =  new User({username,pass,email})
      const savedUser =   await newUser.save()
        const token = newUser.SignJwtToken();
        const {password,createdAt,updatedAt,...others} = savedUser
        res.status(StatusCodes.OK).cookie("token",token).json({
           savedUser,token
        })
    } catch (error) {
        next(new ResponseError(error.message,StatusCodes.BAD_REQUEST))
    }

}
module.exports ={register}
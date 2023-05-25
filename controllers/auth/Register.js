const ResponseError = require("../../middlewares/error");
const User = require("../../models/User");

const {StatusCodes} =  require("http-status-codes")


async function register (req,res,next){

    const {username,password,email} = req.body;
    try {
       
        const newUser =  new User({username,password,email})
        await newUser.save()
        const token = newUser.SignJwtToken();
        
        res.status(StatusCodes.OK).cookie("token",token).json({
            newUser,token
        })
    } catch (error) {
        next(new ResponseError(error.message,StatusCodes.BAD_REQUEST))
    }

}
module.exports ={register}
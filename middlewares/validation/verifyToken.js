const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")


function verifyToken (req,res,next){

    const token =  req.cookies?.token
    console.log(token)
    if(!token){
        return res.status(StatusCodes.FORBIDDEN).json({
            success:false,
            message: "Access denied please login or register to have access"
        })
    }
     jwt.verify(token,process.env.JWT_SECRET,{},(err,userData)=>{
        console.log(userData)
        if(err) {
            console.log("jwt error")
            return res.status(StatusCodes.FORBIDDEN).json({
                success:false,
                message: "Access denied please login or register to have access"
            })
        }
        else{   
        next()
        }
    })
   
    
        
    

}
module.exports = verifyToken
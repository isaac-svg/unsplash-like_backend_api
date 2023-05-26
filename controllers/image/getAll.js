const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");



async function getAll (req,res,next){


    try {
        
    } catch (error) {
        return next(new ResponseError(error.message,500))
    }
}
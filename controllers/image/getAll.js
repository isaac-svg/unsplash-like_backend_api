const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");



async function getAll (req,res,next){
    const {pageNumber=0} =  req.body
    const limit = 20 ;
    const skip = limit * pageNumber
    try {
        const images = await Image.find({}).lean().limit(limit).skip(skip).sort({createdAt:-1}).select("-authorId");

        res.status(StatusCodes.OK).json({images});


    } catch (error) {
        return next(new ResponseError(error.message,500))
    }
}
module.exports =  getAll
const { StatusCodes } = require("http-status-codes")
const ResponseError = require("../../middlewares/error")
const Image = require("../../models/Picture")



async function deleteImage(req,res,next){

    const {id} = req.body

    try {
      await Image.findByIdAndDelete(id) 
        res.status(StatusCodes.OK).json({success:true,message:"Image deletion success"})
    } catch (error) {
        return next(new ResponseError(error.message,StatusCodes.BAD_REQUEST))
    }

}

module.exports = deleteImage


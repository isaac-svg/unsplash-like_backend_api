const { StatusCodes } = require("http-status-codes")
const ResponseError = require("../../middlewares/error")
const Image = require("../../models/Picture");
const uploadImage = require("../../utils/uploadToCloud");



async function createPost(req,res,next){
        const { image,category} = req.body;
        console.log(req.body, "upload req.body  \n")
        if(!image) {
            return next(new ResponseError("Please upload an image",StatusCodes.NO_CONTENT));
        }
        if (!category){
            return next(new ResponseError("Please specify image category ", StatusCodes.NO_CONTENT));
        }

    try {
        console.log(typeof image)
            const url = await  uploadImage(image);
      const newImage =  await Image.create({
            authorId:req.user.id,
            url:url,
            category
      })
      res.json(newImage._doc)
        
    } catch (error) {
        return next(new ResponseError(error.message,StatusCodes.BAD_REQUEST))
    }


}

module.exports =  createPost
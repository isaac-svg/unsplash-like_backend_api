const { StatusCodes } = require("http-status-codes")
const ResponseError = require("../../middlewares/error")
const Image = require("../../models/Picture");
const uploadImage = require("../../utils/uploadToCloud");



async function createPost(req,res,next){
        const { image,category} = req.body;
        
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
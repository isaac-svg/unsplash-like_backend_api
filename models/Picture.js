const mongoose =  require("mongoose")




const ImageSchema =new  mongoose.Schema({
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ,url:{
        type:String,
        required:true
    },
    category:{
        enum:["engineering","software","agriculture","medicine","mathematics","social","science","general"],
        type:String
    }
},{timestamps:true})



const Image = mongoose.model("Image",ImageSchema)


module.exports = Image
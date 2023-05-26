const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture")(mongoose,mongoosePaginate);
const getPagination = require("../../models/utils/getPagination");



async function getAll (req,res,next){
    const {page,size,category} =  req.query
    
    try {

        const {limit ,offset} =  getPagination(page,size)

       const condition =  category?{category:{$regex: new RegExp(category),$options:"i"}}:{}

      Image.paginate(condition,{limit,offset}).then(data=>{
      return  res.status(StatusCodes.OK).json({
            totalItems: data.totalDocs,
            tutorials: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
        })
      }).then(err=>{
        res.status(500).json({success:false,message:err.message});
      })

        


    } catch (error) {
        return next(new ResponseError(error.message,500))
    }
}
module.exports =  getAll
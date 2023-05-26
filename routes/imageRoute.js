const createPost = require("../controllers/image/Create")
const deleteImage = require("../controllers/image/Delete")
const verifyToken = require("../middlewares/validation/verifyToken")

const router =  require("express").Router()




router.route("/create").post(verifyToken,createPost)
router.route("/delete").post(verifyToken,deleteImage)





module.exports = router
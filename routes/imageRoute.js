const createPost = require("../controllers/image/Create")
const deleteImage = require("../controllers/image/Delete")
const isAuthor = require("../middlewares/validation/isAuthor")
const verifyToken = require("../middlewares/validation/verifyToken")

const router =  require("express").Router()




router.route("/create").post(verifyToken,createPost)
router.route("/delete/:authorId").delete([verifyToken,isAuthor],deleteImage)





module.exports = router
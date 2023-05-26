const createPost = require("../controllers/image/Create")
const deleteImage = require("../controllers/image/Delete")
const update = require("../controllers/image/Update")
const isAuthor = require("../middlewares/validation/isAuthor")
const verifyToken = require("../middlewares/validation/verifyToken")

const router =  require("express").Router()




router.route("/create").post(verifyToken,createPost)
router.route("/delete/:authorId").delete([verifyToken,isAuthor],deleteImage)
router.route("/update/:authorId").patch([verifyToken,isAuthor],update)




module.exports = router
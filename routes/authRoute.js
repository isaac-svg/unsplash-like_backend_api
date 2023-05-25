const { login } = require("../controllers/auth/Login")
const { register } = require("../controllers/auth/Register")
const verifyToken = require("../middlewares/validation/verifyToken")

const router =  require("express").Router()






router.route("/register").post(register)
router.route("/login").post(verifyToken,login)



module.exports = router
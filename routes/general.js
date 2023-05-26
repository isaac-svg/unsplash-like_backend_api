
const router =  require("express").Router()
const getAll = require("../controllers/image/getAll")




router.route("/all").get(getAll)





module.exports = router
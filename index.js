require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser =  require("body-parser")
const cookieParser =  require("cookie-parser")
const connectDB = require("./db/connect")



// middlewares
app.use(cors({
    credentials:true,
}));
app.use(express.json({limit:"50mb"}))
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:false}))
app.use(cookieParser());

// route middlewares
app.use("/auth",require("./routes/authRoute"))
app.use("/myunsplash",require("./routes/imageRoute"))
app.use("/",require("./routes/general"))


// server connection 
const PORT =  process.env.PORT ||9000
async function start(){
try {
    await connectDB()
    app.listen(PORT,()=>{console.log(`Server is listening on port ${PORT}`)})
} catch (error) {
    console.log(error.message)
}
}
start()
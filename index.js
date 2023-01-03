const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const cors = require('cors');
app.use(cors({origin : "*"}));

require('./connection/mongo')

const fileUpload = require("express-fileupload")
app.use(fileUpload({useTempFiles : true}))


const {verifyAccessToken} = require("./helper/jwt_helper")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/category")
const shopTypeRoutes = require("./routes/shopType")
const productRoutes = require("./routes/product")
const imageRoutes = require("./routes/images");
// const { use } = require("./routes/product");

app.use("/api/user", userRoutes)
app.use('/api/category', verifyAccessToken, categoryRoutes )
app.use("/api/shopType",verifyAccessToken, shopTypeRoutes)
app.use("/api/product", productRoutes )
app.use("/api/image", imageRoutes)

// const {COUNTRIES_DATA }= require("./data/countriesData.Js");
// // console.log("Big DATA..", COUNTRIES_DATA.length)

// app.get("/countries", (req,res)=>{
//     try{
//         console.log("yes.....")
//         res.status(200).send(COUNTRIES_DATA)
//     }catch(err){
//         console.log("err.....")
//     }
// })

const port = 8000
app.listen(port, ()=>{ console.log("Listening to port 8000")})

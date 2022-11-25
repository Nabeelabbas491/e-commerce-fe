const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const http = require("http").Server(app)

require('./connection/mongo')

// const cors = require('cors');
// app.use(cors({ origin: '*' }));

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//     res.header('Access-Control-Allow-Headers', 'Content-Type')
//     next()
//   })

// const userRoutes = require("./routes/userRoutes")
// app.use("/api/user", userRoutes)

app.post("/nabeel", (req, res)=>{
    console.log("req body main", req.body)
})

const port = 8000
http.listen(port, ()=>{ console.log("Listening to port 8000")})


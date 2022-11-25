const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.CONNECTION_STRING_LOCAL).then(()=>{ console.log("Connection to mongo DB established") }, (err)=>{ console.log('error',err)})
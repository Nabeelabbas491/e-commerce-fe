const nodemailer = require('nodemailer')
require("dotenv")
// require("")
const fs = require('fs');


exports.sendEmai = async () => {
//step-1 , create a transporter that establishes a connection from host

let transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

//step 2


let mailOptions = {
    from: process.env.EMAIL,
    to: 'nabeelabbas0220@gmail.com', // you can send to multiple emails after comma
    cc: '',
    bcc: '',
    subject: 'testing agin',
    text: 'it works yes',
    html: '<h1>Hi</h1>',
    attachments: [
                {   // utf-8 string as an attachment
                    filename: 'text1.txt',
                    content: 'hello world!'
                },
            ]
}

// step-3
return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("error mail...", err)
            reject(err)
        } else {
            console.log("data mail...", data)
            resolve(data)
        }
    })
    
})

}
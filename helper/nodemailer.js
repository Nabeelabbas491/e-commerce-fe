const nodemailer = require('nodemailer')
require("dotenv")
const hbs = require("nodemailer-express-handlebars")
const path = require('path')

exports.sendEmai = async (mailOptions) => {

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD      
    },
})

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions))

return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

}
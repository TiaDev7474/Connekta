const nodemailer = require('nodemailer')
const { generateOtp } = require('./speakeasy');
const CustomError = require('../utils/CustomError');
require('dotenv').config()


const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.GENERATED_PASSWORD
    }
});

module.exports = {
     sendOtpToUser:async (to,otp) => {
        console.log('here inside otp') 
         const mailOptions = {
             from:'nomenjanaharyriry@gmail.com',
             to:to,
             subject:'Email  vefication code',
             text:`Your verfication code is ${otp}`

         }
        transporter.sendMail(mailOptions,function(err, info){
            if(err){
                throw new CustomError('Nodemailer error ', 500)
            }else{
                console.log("Email sent : " + info.response)
            }
         })
     }
};
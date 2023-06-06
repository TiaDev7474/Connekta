const mongoose = require('mongoose')

const OtpSchema = mongoose.Schema({
       createdAt:{ 
           type:Date,
           expires:180,
           default: new Date(Date.now() + 60 * 4 * 1000)

       },
        passcode:{
             type:Number,
             required:true
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
})

OtpSchema.index({createdAt:1},{ expireAfterSeconds:2400})


module.exports = mongoose.model('Otp',OtpSchema)
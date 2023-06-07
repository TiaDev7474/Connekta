const mongoose = require('mongoose')

const OtpSchema = mongoose.Schema({
       createdAt:{ 
           type:Date,
           expires:2000,
           default: Date.now()

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

OtpSchema.index({createdAt:1},{ expireAfterSeconds:180}) 


module.exports = mongoose.model('Otp',OtpSchema)
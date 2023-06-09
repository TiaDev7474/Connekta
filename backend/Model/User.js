const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

require('dotenv').config();

const UserSchema = mongoose.Schema({
    username:{ type:String },
    email: { type:String ,},
    password:{
          type:String
    },
    federated_credentials:{
         provider:{
             type:String
         },
         profileID:{
             type:String
         }
    },
    account_verify:{
        type: Boolean,
        default:false,
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    profilURL:{
       type: String
    },
},
{
    timestamps: true ,
    // toObject:true,
    // toJSON:true
}
)
UserSchema.virtual('conversation', {
    ref:'Conversation',
    localField:'_id',
    foreignField:'members'
})

//get all user's FriendRequest
UserSchema.virtual('friendRequest',{
     ref:'Request',
     localField:'_id',
     foreignField:'author'
}),


//todo: implement lockout features
UserSchema.virtual('isLocked').get(function(){
    //check for lockuntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now())
})
// hash the password before saving it on db
UserSchema.pre('save',async function(next){
    let user = this;
    // only hash password if it has modified or new
    if(!(user.isModified('password')) || !(user.isNew) ) {
       
        return next();
    }
    //generate a salt
    try{
        const salt = await bcrypt.genSalt(10)
     
        //hash the bpassword 
        const hashedPassword = await bcrypt.hash(user.password,salt)
       
        user.password = hashedPassword;
        next()
        // return this.save(next)
    }
    catch(err){
       
         next(err)
    }
});

UserSchema.methods.comparePassword =  function(candidatePassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err , isMatch)=>{
            if(err) return reject(err)
            resolve(isMatch)
       })
    })   
}
module.exports = mongoose.model("User", UserSchema);
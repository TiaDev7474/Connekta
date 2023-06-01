const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

require('dotenv').config();

const UserSchema = mongoose.Schema({
      username:{ 
          type:String
      },
      email: {
          type:String ,
          required: true,
          index:{ unique: true}
      },
      password:{
          type:String
      },
      loginAttempt:{
           type:Number ,
           required:true,
           default: 0
      },
      lockUntil:{
           type:Number
      },
      profilUrl:{
         type: String
      },

}
)



UserSchema.virtual('isLocked').get(function(){
    //check for lockuntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

//hash the password before saving it on db
UserSchema.pre('save',async function(next){
    let user = this;
    console.log(!user.isNew)
    console.log(!user.isModified('password'))
    // only hash password if it has modified or new
    if(!user.isModified('password') || !user.isNew ) {
        
        return next();
    }
    //generate a salt
    try{
        
        const salt = await bcrypt.genSalt(10)
        console.log(salt)
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

UserSchema.methods.comparePaassword =  function(cadidatePassword , cb){
    
    bcrypt.compare(cadidatePassword, this.password, (err , cb)=>{
         if(err) return cb(err)
         cb(null,isMatch)
    })
    
}


module.exports = mongoose.model("User", UserSchema)
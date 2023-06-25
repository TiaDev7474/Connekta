const User = require("../Model/User")
const { findUserById } = require("../utils/auth")

module.exports = {
     fetchUser: async (req , res ) => {
           try{
             
             const user = await User.findById(req.userId)
             
             if(!user) return res.status(403).json({message:'Unauthorized to perform this request'})
             const {password,loginAttempt ,...data} = user._doc;
             return res.status(200).json({...data , message:'Request successfully made' }) 
          
           }catch(err){
                return res.status(500).json({error:err , message:'Error occured from server'})
           }
     }
}
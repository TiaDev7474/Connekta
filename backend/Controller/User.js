const User = require("../Model/User")
const { findUserById } = require("../utils/auth")

module.exports = {
     fetchUser: (req , res ) => {
           try{
             const user = User.findById(req.userId)
             console.log(user , id)
             if(!user) return res.status(403).json({message:'Unauthorized to perform this request'})
             if(user._id === id){
                 const {password, ...data} = user
                 return res.status(200).json({...data , message:'Request succed' }) 
             }
           }catch(err){
                return res.status(500).json({error:err , message:'Error occured from server'})
           }
           
     }
}
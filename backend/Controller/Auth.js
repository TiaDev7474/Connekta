const jwt = require('json-web-token')
const User = require('../Model/User')
const { findUserByEmail } = require('../utils/auth')

module.exports = {
     loginUser: async (req ,res) =>{
         const {email , password} = req.body
         try{
             await findUserByEmail(email)
                .then(user =>{
                    console.log(user)
                    if(user){
                        User.comparePassword(password, (err , isMatch)=>{
                            if(err) return res.status(500).json({error:err})
                            if(!isMatch) return res.status(401).json({message:"Pair email password not correct"})
                            res.status(200).josn({
                                token:jwt.sign(
                                    {userId: user._id},
                                     process.env.JWT_STRONG_SECRET,
                                     {expireIn:'24h'}
          
                                )
                            }) 
                        })
                   }
                })
                .catch(err => res.status(500).json({error:err}))
           
         }
         catch(err){
            return res.status(500).json({error:err})
         }
         
     },

     register:async (req , res ,next) => {
        const {email, password } = req.body;
            await User.findOne({email:email})
                    .then(user => {
                        if(user){
                            return res.status(401).json({message:'Email already in use'})
            
                        }
                        const newUser = new User({
                            email:email,
                            password:password
                        })
                        newUser.save()
                            .then( () => res.status(201).json({message:"Account created sucessfully"}))
                            .catch( err => res.status(500).json({error:err}))
                
                      })
                    .catch(err =>res.status(401).json({message:'Email already in use'}))
            
          
       
        }
       
}

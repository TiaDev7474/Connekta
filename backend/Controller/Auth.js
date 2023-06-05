const jwt = require('jsonwebtoken');
console.log(jwt)
const User = require('../Model/User')
const { sendOtpToUser } = require('../Services/nodemailer');
const { generateOtp } = require('../Services/speakeasy');

module.exports = {
     loginUser: async (req ,res) =>{
         const {email , password} = req.body
         console.log(req.body)
         try{
             const user =  await   User.findOne({email:email})  
             console.log(user)  
             if (user) {
                const validity = await user.comparePassword(password);
                console.log(validity)  
                if (validity) {
                  const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_STRONG_SECRET,
                    { expiresIn: '24h' }
                  );
                  console.log(token);
                  return res.status(201).json({
                    token: token,
                  });
                }
          
                return res.status(401).json({ message: "Pair identifiant/password not correct" });
              } else {
                return res.status(401).json({ message: "Pair identifiant/password not correct" });
              }
           
         }
         catch(err){
            console.error(err)
            return res.status(500).json({error: 'An unexpected error occurred.'})
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
                            .then( async (user) => {
                                  console.log(user)
                                   const otp =  await generateOtp()
                                   console.log(otp)
                                   await sendOtpToUser(user.email,otp)
                                 
                                  res.status(201).json({message:"Account created sucessfully"})})
                            .catch( err => res.status(500).json({error:err}))
                
                      })
                    .catch(err =>res.status(401).json({message:'Email already in use'}))
            
        }
       
}

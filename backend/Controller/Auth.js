const jwt = require('jsonwebtoken');
console.log(jwt)
const User = require('../Model/User')
const { sendOtpToUser } = require('../Services/nodemailer');
const { generateOtp, verifyOtp } = require('../Services/speakeasy');
const Otp = require('../Model/Otp');

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
                      {
                        userId: user._id,
                        isVerified:user.account_verify,
                      },
                      process.env.JWT_STRONG_SECRET,
                      {
                        expiresIn:'24h'
                      } 
                   )
                  return res.status(201).json({
                    token: token,
                    message:'logged in  succesfully'
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
                    .then( async user => {
                        if(user){
                            return res.status(401).json({message:'Email already in use'})
            
                        }
                       
                        const otp =  await generateOtp()
                        const newUser = new User({
                            email:email,
                            password:password
                        })
                        newUser.save()
                            .then( async (user) => {
                                  sendOtpToUser(user.email,otp)
                                  const newOtp = new Otp({
                                      passcode:otp,
                                      author:user._id
                                  })
                                  await newOtp.save() 
                                  const token = jwt.sign(
                                    {
                                      userId: user._id,
                                      isVerified:user.account_verify,
                                    },
                                    process.env.JWT_STRONG_SECRET,
                                    {
                                      expiresIn:'24h'
                                    } 
                              )
                                  res.status(201).json({ token: token ,message:"Account created sucessfully"})})
                            .catch( err => res.status(500).json({error:err}))
                
                      })
                    .catch(err =>res.status(401).json({message:'Email already in use'}))
            
        },
      verifyOtp:async(req ,res) =>{
              console.log(req.userId)
                 Otp.findOne({author:req.userId})
                        .then( async(otp) => {
                              console.log(otp.passcode)
                              if(otp){
                                  const isvalid = verifyOtp(otp)
                                  console.log(isvalid)
                                  if(isvalid){
                                      User.findOneAndUpdate({_id:req.userId},{account_verify:true},{
                                              returnOriginal:false
                                      })
                                              .then( user => {
                                                 
                                                   res.status(201).json({ message:'Account verified successfully'})
                                              })
                                              .catch((err) =>  res.status(500).json({error:err}))
                                    
                                            
                                  }else{
                                      return res.status(401).json({message:'Otp code incorrect or expired'})
                                  }
                              }
                              else{
                                return res.status(401).json({message:'Otp code expired'})
                            }
                        })
                        .catch(err => res.status(500).json({error:err}))
     
            
           
    },
    resendOtp: async (req, res) => {
             const { email } = req.body
             const otp =  await generateOtp()
             
             Otp.findOne({ author:req.userId})
                .then(oldOtp => {
                    if(!oldOtp ){
                      sendOtpToUser(email,otp)
                      const newOtp = new Otp({
                        passcode:otp,
                        author:req.userId
                    })
                      newOtp.save()
                             .then(() => res.status(200).json({message:'Otp send succesfully'}))
                             .catch(err =>  res.status(500).json({error:err,message:'Unexpected error occured'}))
                    }else{
                        const updates = {
                               passcode:opt,
                               createdAt: new Date(Date.now() + 60 * 4 * 1000)
                        }
                        Otp.findOneAndUpdate({ author:req.userId},updates,{ returnOriginal:false})
                              .then(() => res.status(200).json({message:'Otp updated succesfully'}))
                              .catch(err =>  res.status(500).json({error:err,message:'Unexpected error occured'}))
                    }
                })
                .catch(err => res.status(500).json({error:err}))
    },
    // refreshToken: async (req , res) => {
          
    // }          
}

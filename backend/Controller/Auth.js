const jwt = require('jsonwebtoken');
const User = require('../Model/User')
const { sendOtpToUser } = require('../Services/nodemailer');
const { generateOtp, verifyOtp } = require('../Services/speakeasy');
const Otp = require('../Model/Otp');
const CustomError = require('../utils/CustomError');

module.exports = {
     loginUser: async (req ,res) =>{
         const {email , password} = req.body
         try{
              const user =  await  User.findOne({email:email}) 
              if(!user){
                    const error = new CustomError('User not found',404);
                    next(error)
              }
              const validity = await user.comparePassword(password);
              if(!validity){
                  const error = new CustomError('Pair identifiant/password not correct',401);
                  next(error)
              }
        
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
              res.status(201).json({
                  token: token,
                  userId:user._id,
                  message:'logged in succesfully'
              });
         }
         catch(err){
              res.status(500).json({
                  status:'error',
                  message: err.message, 
              })
         }
         
     },
     register: async (req , res , next) => {
          const { email , password } = req.body;
          try{
              const user = await User.findOne({email:email})
              if(user){
                  return res.status(401).json({message:'Email already in use'})
              }  
              const  newUser = new User({
                    email: email,
                    password:password
              })
              const userDoc = await newUser.save()
              if(!userDoc){
                   const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
                   next(mongodbError)
              }
          
              const otp = await generateOtp()
              
              const newOtp = new Otp({
                      passcode: otp,
                      author:userDoc._id
              })
            
              const otpDoc = await newOtp.save()
              if(!otpDoc){
                  const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
                  next(mongodbError)
              }
              await sendOtpToUser(userDoc.email,otp)
              const token = jwt.sign(
                  {
                    userId: userDoc._id,
                    isVerified:userDoc.account_verify,
                  },
                  process.env.JWT_STRONG_SECRET,
                  {
                    expiresIn:'24h'
                  } 
              )
              const { password , ...data} =   userDoc
              res.status(201).json({ 
                    status:'succes',
                    data:{
                      token: token ,
                      currentUser: data
                    },
                    message:"Account created sucessfully"
              })
        
              
          }catch(err){
              return  res.status(500).json({ 
                 status:'error',
                 message: error.message,
              })
          }
     },

      verifyOtp:async(req ,res) =>{
        try{
            const otp = await Otp.findOne({ author:req.userId })
            if(!otp){
              const error = new CustomError(`Otp with id : ${ req.userId }not found or expired`,404);
              next(error)
            }
            const isValid = verifyOtp(otp)
            if(!isValid){
              const error = new CustomError(`Not valid Otp `,401);
              next(error)
            }
            const user =   User.findOneAndUpdate({_id:req.userId},{account_verify:true},{ new: true})
            if(!user){
              if(!user){
                const error = new CustomError('User not found',404);
                next(error)
              }
            }
            res.status(201).json({ 
               status:'succes',
               message:'Account verified successfully'
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message: err.message
            })
        }
     },
      resendOtp: async (req, res) => {
        try{
             const { email } = req.body;
             const otp =  await generateOtp()
             const isOtpExist =  Otp.findOne({ author:req.userId})
             if(isOtpExist){
                const updates = {
                    passcode:opt,
                    createdAt: new Date(Date.now() + 60 * 4 * 1000)
                  }
                const otpUpdated = Otp.findOneAndUpdate({ author:req.userId},updates,{ returnOriginal:false})
                if(!otpUpdated){
                      const error = new CustomError('Otp to update Not found', 404)
                      next(error)
                 }
                sendOtpToUser(email,otpUpdated.passcode)
                return  res.status(200).json({
                     status:'success',
                     message:'Otp send succesfully'
                 })
             }
             const newOtp = new Otp({
              passcode:otp,
              author:req.userId
             })
              const savedOtp = newOtp.save()
              if(!savedOtp){
                  const mongodbError = new CustomError('Unexpected error occured from mongodb', 500)
                  next(mongodbError)
              }
              sendOtpToUser(email,savedOtp.passcode)
              res.status(200).json({
                  status:'success',
                  message:'Otp send succesfully'
              })

        }catch{
              res.status(500).json({
                status:'error',
                message: err.message
              })
        }
    },
    // refreshToken: async (req , res) => {  // } 
//todo: implement refresh token 
//todo : implement lockout features         
//todo: implement reset password features
}

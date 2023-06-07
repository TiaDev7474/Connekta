require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports= {
     authMiddleware: async (req , res , next) =>{
          const token = req.headers.authorization.split(' ')[1]
          if(!token) return  res.status(403).json({message:'forbidden'})
          const decoded =  await jwt.verify(token,process.env.JWT_STRONG_SECRET)
          // console.log(decoded)
          req.userId = decoded.userId
          next()
     },
     authEmailVerify: async (req , res , next) =>{
          const token = req.headers.authorization.split(' ')[1]
          if(!token) return  res.status(403).json({message:'forbidden'})
          const decoded =  await jwt.verify(token,process.env.JWT_STRONG_SECRET)
          // console.log(decoded) 
          if(!decoded.isVerified) return res.status(401).json({message:'Account not verified'})
          req.userId = decoded.userId
     
          next()
     }
}
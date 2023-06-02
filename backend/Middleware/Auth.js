require('dotenv').config()
module.exports= {
     authMiddleware: async (req , res , next) =>{
          const token = req.headers["Authorization"]?.split(' ')[1]
          console.log(req.headers["Authorization"])
          if(!token) return 
          const decoded =  await jwt.verify(token,process.env.JWT_STRONG_SECRET)
          req.userId = decoded.userId
          next()

     }
}
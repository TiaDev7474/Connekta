const CustomError = require("../../../utils/CustomError")
const jwt = require('jsonwebtoken')
module.exports.authorizeSocket =(socket , next) =>{
    const token = socket.handshake.auth.token
    if(token){
        // const decoded =  await jwt.verify(token,process.env.JWT_STRONG_SECRET)
        // console.log(decoded)
        // if(decoded){
            socket.userId = token
            next()
        // }else{
        //     const error = new CustomError("Not authorized",401)
        //     error.data = { content : "Please retry later"}
        //     next(error)   
        // }
        
    }else{
          const error = new CustomError("Not authorized",401)
          error.data = { content : "Please retry later"}
          next(error)   
        }
}
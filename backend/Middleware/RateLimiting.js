const { redisClient } = require("../config/redis");

module.exports.rateLimiter = async (req , res , next) => {
    const ip = req.connection.remoteAddress;
    const response = await redisClient.multi().incr(ip).expire(ip,60).exec()
  
     if(response[0][1] > 10){
          const waitUntil = await redisClient.ttl(ip)
          console.log(waitUntil)
         return res.status(401).json({
              status:'fail',
              message:`Too many attempt , try to log in after ${waitUntil} `
          })
     }
     next();

    
}
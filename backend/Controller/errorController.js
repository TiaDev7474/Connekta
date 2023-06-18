module.exports = (error , req , res , next ) =>{
       if( error instanceof CustomError){
            res.status(error.statusCode).json({
                status: error.status,
                message:error.message
            })
       }
      
}
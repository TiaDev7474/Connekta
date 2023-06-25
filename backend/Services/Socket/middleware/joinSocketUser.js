
module.exports.joinSocketUser = (socket, next) => {
     const userId = socket.userId
     if(userId){
        socket.join(userId)
        next();
     }else{
        next( new Error('No userid'))
     }  
}


module.exports =  (io) => {
     const onConnection = (socket) => {
        console.log(`${socket.userId} have just joined connekta`)
        socket.on('connection', ()=>{
               
               io.emit('user:joined', `${socket.userId} have just joined connekta`)
        })
     }
     return {
         onConnection,
     }
}
const express = require('express');
const helmet =require('helmet');
const session = require('express-session')
const MongoDbStrore = require('connect-mongodb-session')(session)
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const passport = require('passport');
const { Server } = require('socket.io')
const app = express();
const globalErrorHandler = require('./Controller/errorController')
const { authorizeSocket } = require('./Services/Socket/middleware/authorizeSocket');
const { joinSocketUser } = require('./Services/Socket/middleware/joinSocketUser');
const CustomError = require('./utils/CustomError');
const port = 8000 | process.env.PORT;
const expressServer = app.listen(port,()=>{
      console.log(`server running on port ${port}`)
});

const io = new Server(expressServer,{
      cors: {
            origin: "http://localhost:3000"
      }
})
const  { onConnection } = require('./Services/Socket/controller/onConnection')(io)

require('dotenv').config();

//socket io config


//connexion à mongoDb
connectToDatabase();

//store session
const store = new MongoDbStrore({
      uri:process.env.MONGODB_URL,
      ttl:14 * 24 * 60 *60,
      autoRemove:'native'
})

//middleware
app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store:store
}))
// io.use(authorizeSocket)
// io.use(joinSocketUser)
//establish session
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(express.json());
app.use(helmet());
app.use(cors({
      origin:'http://localhost:3000',
      methods:['GET','POST','PUT','UPDATE']
}));

//errorHandler
app.use(globalErrorHandler)

//Routing logic

app.use('/auth',require('./Routes/Auth'));
app.use('/api/user', require('./Routes/User'));
app.use('/api/messages',require('./Routes/Message'));
app.use('/api/request',require('./Routes/Request'))









io.use(authorizeSocket)
io.use(joinSocketUser)

//socket server
io.on('connection',onConnection )

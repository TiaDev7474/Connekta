const express = require('express');
const helmet =require('helmet')
const cors = require('cors')
const { connectToDatabase } = require('./config/db');
const app = express();

require('dotenv').config();
const port = 8000 | process.env.PORT

//connexion à mongoDb
connectToDatabase();

//middleware
app.use(express.json())
app.use(helmet())
app.use(cors({
      origin:'http://localhost:3000',
      methods:['GET','POST','PUT','UPDATE']
}))

//Routing logic

app.use('/auth',require('./Routes/Auth'))
app.use('/api/user', require('./Routes/User'))

app.listen(port,()=>{
      console.log(`server running on port ${port}`)
})
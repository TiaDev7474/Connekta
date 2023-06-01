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
}))

//Routing logic

app.use('/auth',require('./Routes/Auth'))

app.listen(port,()=>{
      console.log(`server running on port ${port}`)
})
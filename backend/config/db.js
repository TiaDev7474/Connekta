const mongoose = require("mongoose")
module.exports= { 
     connectToDatabase : () => {
    mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
    )
    .then(() => console.log('connexion à MongoDb reussi'))
    .catch(err => console.log(`connexion à MongoDb echoué , ${err}`))
}
}

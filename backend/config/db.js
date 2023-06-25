const mongoose = require("mongoose")
module.exports= { 
    connectToDatabase :async () => {
    try{
       await  mongoose.connect(process.env.MONGODB_URL,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        )
        console.log('connexion à MongoDb reussi')
    }catch(err){
        console.log(`connexion à MongoDb echoué , ${err}`)
    }

}
}

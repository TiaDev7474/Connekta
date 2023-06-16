const { Schema , model } = require('mongoose');

const requestSchema = new Schema({
   destinationID:{
      type: Schema.Types.ObjectId,
      ref:'User'
   },
   author:{
      type: Schema.Types.ObjectId,
      ref:'User'
   },
   status:{
      type: String,
      enum:['pending','approved','rejected']
   }
},
   {
      timestamps:true,
   }
)



module.exports = model('Request',requestSchema);


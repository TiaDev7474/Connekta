const {model , Schema } = require('mongoose');

const friendshipSchema = new Schema({
     user1:{ type: Schema.Types.ObjectId , ref:'User'} ,
     user2:{ type: Schema.Types.ObjectId , ref:'User'} ,
     status:{
          type:String,
          enum:['Accepted','Blocked','Hidden']
     }
})

module.exports = model('Friendship', friendshipSchema)
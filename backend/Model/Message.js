const {model, Schema} = require('mongoose');

const messageSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    destinationModel:{
         type:String,
         enum:[ 'PrivateConversation']
    }, 
    conversationID:{
        type:Schema.Types.ObjectId,
        refPath: 'destinationModel',      
    },
//todo: allow a other file type as content of a message
    content:{
        image:{
            type:String,
        },
        video:{
            type:String,
        },
        text:{
            type:String,
        },
    },
    reactions:[{
        author:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        type:{
            type:String,
            enum:['thumb','love','mdr']
        }
    }],
//todo: allow message to have reactions historique
    readBy:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
},
   { timestamps: true }
)

module.exports = model('Message',messageSchema)
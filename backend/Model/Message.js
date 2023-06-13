const {model, Schema} = require('mongoose');

const messageSchema = new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    receiverID:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    conversationID:{
        type:Schema.Types.ObjectId,
        ref:'Conversation',
        
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
//todo: allow message to have reactions historique
    readBy:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
},
   { timestamps: true }
)

module.exports = model('Message',messageSchema)
const {model, Schema} = require('mongoose');

const PrivateConversationSchema = new Schema({
    members:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        nicknames:{
            type:String
        }     
    }],
},
{ 
    timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
},
)

PrivateConversationSchema.virtuals('messages',{
    ref:"Message",
    localField: '_id',
    foreignField:'conversationID',
}); 

module.exports = model('PrivateConversation', PrivateConversationSchema) 
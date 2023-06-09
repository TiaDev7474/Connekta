const {model, Schema} = require('mongoose');

const PrivateConversationSchema = new Schema({
    members:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        nicknames:{
            type:String
        }     
    }],
    status:{
         type:String,
         enum:['Blocked','Hidden','Muted','Archived','Active'],
         default:'Active'
    }  
},
{ 
    timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
},
)

PrivateConversationSchema.virtual('messages',{
    ref:"Message",
    localField: '_id',
    foreignField:'conversationID',
    justOne:false
}); 




module.exports = model('PrivateConversation', PrivateConversationSchema) 
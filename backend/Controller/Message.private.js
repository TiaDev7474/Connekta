const ConversationPrivate = require("../Model/Conversation.private")

async function fetchALlUserConversation(userId,limit){
     return  await ConversationPrivate
                    .find({ members:{ $in:[userId]}})
                    .populate({
                         path:'members',
                    })
                    .populate({
                       path:'messages',
                       options:{
                           sort:{ createdAt: -1},
                           limit:1
                       },
                       populate:{
                           path:'sender',
                       },
                     })
                    .lean()
                   
}
module.exports = {
      ListAlldiscussion: async (req, res , next ) => {
          const userId = req.userId
          const limit = req.params
          try {
              const conversations = await fetchALlUserConversation(userId, limit);
              res.status(200).json({conversations})
          }catch(err){
               res.status(500).json({message:'Unexpected error occured',info: err})
          }     
      },
      getOne: async (req, res, next ) => {
         const userId = req.userId;
         const { conversationId } = req.params;
      },
      sendFriendRequest:(req, res,next) => {
           const { destiantionId } = req.body;   
      }
}
const { isValidObjectId } = require("mongoose")
const ConversationPrivate = require("../Model/Conversation.private")
const Message = require('../Model/Message')
const CustomError = require("../utils/CustomError")

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
      createOne: async (req, res, next ) => {
         const userId = req.userId;
         const { conversationID } = req.params;
        
         const { text }= req.body
        
         try{
              if(!isValidObjectId(conversationID)){
                    const idError = new CustomError(`Id: ${conversationID}  not valid `,401)
                    return next(idError)
              }
              const conversation = await ConversationPrivate.findById(conversationID)
              if(!conversation){
                    const notFoundError = new CustomError('Conversation not found',404)
                   return  next(notFoundError)
              }
              const isAuthorizedMember = conversation.members.indexOf(userId) !== -1
              if(!isAuthorizedMember){
                const notAuthorizedError = new CustomError(`User not authorized to do such action `,401)
                 return next(notAuthorizedError)
              }
              const newMessage = new Message({
                  sender: userId,
                  content:{
                     text:text
                  },
                  destinationModel:'PrivateConversation',
                  conversationID:conversationID,
              })
              const newMessageSaved = await newMessage.save()
               return res.status(201).json({
                  status:'success',
                  data:{
                      message: newMessageSaved
                  },
                  message:'Message created successfully'
              })
         }catch(err){
             return res.status(500).json({
                  status:'error',
                  message:'Unexpected error occured',
                  errorInfo: err.message
              })
         }
      },
      deleteOne : async (req , res , next) => {
            const { messageID } = req.params;
            try {
                if(!isValidObjectId(messageID)){
                    const idError = new CustomError(`Id: ${conversationID}  not valid `,401)
                    return next(idError)
                }
                const message = await Message.findById(messageID)
                if(!message){
                    const notFoundError = new CustomError('Conversation not found',404)
                    return  next(notFoundError)
                }
                if(message.sender == req.userId){
                     const deletedMessage = await Message.deleteOne({_id:messageID})
                     if(deletedMessage){
                         return res.status(204).json({
                              status:'success',
                              message:'Message deleted successfully'    

                         })
                     }
                      
                }else{
                    const notAuthorizedError = new CustomError(`User not authorized to do such action `,401)
                     return next(notAuthorizedError)
                }
            }catch(err){
                return res.status(500).json({
                    status:'error',
                    message:'Unexpected error occured',
                    errorInfo: err.message
                })
               
            }
      },
      addReaction: async (req, res , next) => {
            const { messageID } = req.params;
            const { reactionType } = req.body;
         
            try{
                if(!isValidObjectId(messageID)){
                    const idError = new CustomError(`Id: ${messageID}  not valid `,401)
                    return next(idError)
                }
                let filter = { _id: messageID}
                let update = {}
                
                const option = {
                     new: true 
                }
               
                const message = await Message.findOne(filter)
                if(!message){
                    const notFoundError = new CustomError('Conversation not found',404)
                    return  next(notFoundError)
                }
               
                const isUserReactedToMessage =  message.reactions.some( reaction=> reaction.author == req.userId)
                console.log(isUserReactedToMessage)
               if(isUserReactedToMessage){
                   filter = {...filter , 'reactions.author':req.userId}
                   update.$set = {'reactions.$.type':reactionType}
               }else{
                    update.$push={
                        reactions:{
                            author:req.userId,
                            type: reactionType
                        }
                   }
               }

                const updatedMessage = await Message.findOneAndUpdate(filter, update, option);
                console.log(updatedMessage)
                if(!updatedMessage){
                    const notFoundError = new CustomError('Message not found',404)
                    return  next(notFoundError)
                }
                return res.status(200).json({
                    status:'success',
                    data:{
                        updatedMessage:updatedMessage
                    },
                    message:'Adding reaction successfullly'   
                })  
            }catch(err){
                return res.status(500).json({
                    status:'error',
                    message:'Unexpected error occured',
                    errorInfo: err.message
                })
            }
      }
}
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
         const { conversationId } = req.params;
         const text = req.body
         try{
              if(!isValidObjectId(conversationId)){
                    const idError = new CustomError(`Id: ${conversationId}  not valid `,401)
                    next(error)
              }
              const conversation = await ConversationPrivate.findById(conversationId)
              if(!conversation){
                    const notFoundError = new CustomError('Conversation not found',404)
                    next(notFoundError)
              }
              const isAuthorizedMember = conversation.members.indexOf(userId) !== -1
              if(!isAuthorizedMember){
                const notAuthorizedError = new CustomError(`User not authorized to do such action `,401)
                next(notAuthorizedError)
              }
              const newMessage = new Message({
                  sender: userId,
                  content:{
                     text:text
                  },
                  destinationModel:'PrivateConversation',
                  conversationID:conversationId,
              })
              const newMessageSaved = await newMessage.save()
              res.status(201).json({
                  status:'success',
                  data:{
                      message: newMessageSaved
                  },
                  message:'Message created successfully'
              })
         }catch(err){
              res.status(500).json({
                  status:'error',
                  message:'Unexpected error occured',
                  errorInfo: err.message
              })
         }
      }
}
const { isValidObjectId } = require("mongoose");
const Request = require("../Model/Request");
const ConversationPrivate = require("../Model/Conversation.private");
const User = require("../Model/User");
const { ObjectId } = require('mongoose').Types;

module.exports = {
      accept: async (req, res , next) =>{
        const { requestId } = req.params;
        if(isValidObjectId(requestId)){
            try{
                const  request = await Request.findById(requestId)
                
                 if(!request) return res.status(404).json({status:404, message:'FriendRequest not found'})
                 if(request.destinationID == req.userId){
                       await Request.findByIdAndUpdate(requestId,{status:'approved'},{ new:true})
                       const newConversation = new ConversationPrivate({
                             members:[
                                request.author,
                                req.userId
                          ]
                      })
                 const result = await newConversation.save()
                 if(!result) return res.status(500).json({status:500, message:'Conversation not created'})  
                 return res.status(201).json({status:201, message:'friendRequest accpeted susscesfully', request:request}) 

                 }else{
                     return res.status(401).json({status:401, message:'Not authorized action'})
                 }
            }catch(err){
                return res.status(500).json({status:500, message:'Unexpected error occured'})  
            }
        }
      },
      reject:async(req, res , next) => {
            const { requestId } = req.params;
            if(isValidObjectId(requestId)){
                  try{
                      const request = await Request.findById(requestId)
                      if(!request) return res.status(404).json({status:404,message:'Request not found'})
                      if(requestId.destinationID === req.userId ){
                             await Request.findByIdAndDelete(requestId)
                             return res.status(201).json({status:201, message:'Request rejected succesfully'}); 
                      }else{
                        return res.status(401).json({status:401,message:'Not authorized action'})
                      }

                  }catch(err){
                      return res.status(500).json({status:500,message:'Unexpected error occured'})
                  }
            }
      },
      sendRequest: async( req, res , next ) => {
           const { destinationID } = req.body;
           if(isValidObjectId(destinationID)){
            try{
                  console.log(req.userId)
                  if(req.userId){
                       const newFriendRequest = new Request({
                             destinationID:destinationID,
                             author:req.userId,
                             status:'pending'
                       })
                       const result = await newFriendRequest.save()
                       if(!result) return res.status(500).json({status:500, message:'Request failed'}) 
                       return res.status(201).json({status:201 , message:'Request send succesFully'})
                  }else{
                      return res.status(401).json({status:403, message:'Unauthorized to send request'})  
                  }
            }catch(err){
                 return res.status(500).json({status:500,message:'Unexpected error occured',info:err})
            } 
           }else{
              return res.status(401).json({status:403, message:'Unauthorized to send request'})  
           }
      },
      getAll: async(req, res, next) => {
            const  userId = req.userId;
            const { limit }= req.query
            if(req.userId){
                   const user = await User
                                              .findOne({_id:userId})
                                              .populate({
                                                  path:'friendRequest'
                                              })
                                              .limit(5)
                  if(!user) res.status(404).json({status:404, message:'User Request not found'})
                  return res.status(200).json(user.friendRequest)        
            }else{
                 return  res.status(401).json({status:403, message:'Unauthorized action '})  
            }
      }
}
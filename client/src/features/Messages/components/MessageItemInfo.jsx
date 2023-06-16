import React from 'react'
import { Link } from 'react-router-dom'
import ViewIndication from './ViewIndication'

const MessageInfo = {
      conversationID:'154874zaugdagydytze',
      lastMessage:{
        sender:{
            id:'154874zaugdagydytze',
            name:'Wella Emeraude'
        },
        view:false,
        content:'Bonjour de Connekta !! chat app for developer',
        timestamp:'14:20 PM'
      }
      


}
const MessageItemInfo = () => {
  return (
    <React.Fragment>
        <Link 
            to={MessageInfo?.conversationID}
            className='w-full flex flex-col items-start flex-1  text-white'
        >
            <h3 className='text-lg font-bold'>{MessageInfo?.lastMessage.sender.name}</h3>
            <p className='w-full flex justify-between'>{MessageInfo?.lastMessage?.content.slice(0,25 )+'...'}
                <span>{MessageInfo?.lastMessage.timestamp}</span>
            </p>
        </Link>
        <ViewIndication view={MessageInfo?.lastMessage?.view}/>     
    </React.Fragment>
  )
}

export default MessageItemInfo
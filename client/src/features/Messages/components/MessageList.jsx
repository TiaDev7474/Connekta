import React from 'react'
import MessageItem from './MessageItem'

const MessageList = ({user}) => {
  return (
    <div className='w-full h-[79vh] overflow-y-auto scrollbar py-2'>
        {
          Array(12).fill(0).map((_,index) => {
             return (
                 <MessageItem user={user} key={index}/>
             )
          })
        }
    </div>
    
  )
}
export default MessageList

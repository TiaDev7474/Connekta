import React from 'react'
import LeftSideMessage from '../components/LeftSideMessage'
import DiscussionContainer from '../components/Discussion/Discussion.container'

export const MessageSection = () => {
  return (
    <div className='w-full flex'>
        <div className='w-[22%] flex  '>
              <LeftSideMessage/>
         </div>
         <div className='flex-1'>
              <DiscussionContainer/>
         </div>
         <div className='w-1/4 '>
            4
         </div>
    </div>
  )
}

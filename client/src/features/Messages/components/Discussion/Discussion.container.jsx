import React from 'react'
import DiscussionHeader from './Discussion.header';
import DiscussionBody from './Discussion.body';
import DiscussionFooter from './Discussion.footer';

const DiscussionContainer = () => {
  return (
    <div className='w-full h-full flex flex-col '>
        <DiscussionHeader/>
        <DiscussionBody/>
        <DiscussionFooter/>
    </div>
  )
}

export default DiscussionContainer;
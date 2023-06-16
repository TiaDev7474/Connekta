import React from 'react'
import SearchContainer from '../../../Component/SearchBar/SearchContainer'
import MessageList from './MessageList'

const LeftSideMessage = () => {
  return (
    <div className='w-full border-r-2 border-r-gray-500'>
        <h2 className='h3 text-white mb-3 px-3'>Messages</h2>
        <SearchContainer/>
        <MessageList/>
    </div>
  )
}

export default LeftSideMessage
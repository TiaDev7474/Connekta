import React from 'react'
import emoji from '../../../../assets/emoji.svg'
const DiscussionInput = () => {
  return (
    <label className=' flex-1 flex bg-[#1E1E1E] rounded-full py-2 px-2 justify-start items-center ' >
            <textarea
                name='message'
                rows={1}
                className='input placeholder:text-gray-100 px-6 text-white'
                placeholder='Type your message here ..'
            />
            <button >
            <img 
                src={emoji} 
                alt='search icon' 
                width={40}
                className='hover:bg-[#f3ecec2e] p-[6px] hover:opacity-80 rounded-full'
            />
            </button>
    </label>
  )
}

export default DiscussionInput;
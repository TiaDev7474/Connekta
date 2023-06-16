import React from 'react'
import attach from '../../../../assets/attach.svg'
import send from '../../../../assets/send.svg'
import DiscussionInput from './Discussion.input'
const DiscussionFooter = () => {
  return (
    <div className='h-[100px] w-full flex items-center bg-[#23163A] '>
         <div className='flex w-full px-8 items-center justify-center'>
             <label className='px-7 hover:bg-[#f3ecec2e] py-5 hover:opacity-80 rounded-full cursor-pointer'>
                <input type='file' className='hidden' />
                <img src={attach} alt='attach icon' width={18}  height={15}/>
             </label>
             <DiscussionInput/>
             <span className='px-5 hover:bg-[#f3ecec2e] py-6 hover:opacity-80 rounded-full cursor-pointer '>
                <img src={send} alt='attach icon'width={25}  height={35} />
             </span>
         </div>
    </div>
  )
}

export default DiscussionFooter;
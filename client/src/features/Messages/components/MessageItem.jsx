import React from 'react'
import Avatar from '../../../Component/Avatar/Avatar'
import { MessageUtils } from '../utils/utils'
import MessageItemInfo from './MessageItemInfo'

const MessageItem = ({user}) => {
    const img =MessageUtils.createPdpFromInitials("Riry Nomenjanahary",50)
  return (

    <div className=' w-full flex  items-center gap-3 py-3 px-4  bg-[#23163A] hover:bg-[#f2f2f236] hover:opacity-80  '>
          <Avatar  
                img={user?.photoProfil ? user.photoProfil : img }
                size={14}  
                to='/auth/register'   
            />
          <MessageItemInfo MessageInfo={user} />  
    </div>
  )
}

export default MessageItem
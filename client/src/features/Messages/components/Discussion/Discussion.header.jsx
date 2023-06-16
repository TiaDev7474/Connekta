import React from 'react'
import Avatar from '../../../../Component/Avatar/Avatar';
import { MessageUtils } from '../../utils/utils';

const user = {
    photoProfil:null,
}
const img = MessageUtils.createPdpFromInitials("Riry Nomenjanahary",50)
const DiscussionHeader = () => {
   
  return (
    <div className='w-full h-[100px] bg-[#23163A] flex items-center  '>
        <div className='w-full flex px-8'>
            <Avatar  
                img={user?.photoProfil ? user.photoProfil : img }
                size={14}  
                to='/auth/register'   
            />
            <div className=' flex flex-col justify-start ml-5'>
                <h3 className='text-xl font-bold text-[#f2f2f2]'>
                    Wella Emeraude 
                </h3>
                <p className='text-[#f2f2f27e]'>
                    Online 1 min ago
                </p>
            </div>

         </div>
    </div>
  )
}

export default DiscussionHeader;
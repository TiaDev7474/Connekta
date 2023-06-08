import React from 'react'
import logo from '../../assets/logo_cnkt.svg'
import notification from '../../assets/notification.svg'
import Avatar from '../../features/Messages/components/Avatar'
import { MessageUtils } from '../../features/Messages/utils/utils'

const Header = (user) => {
  return (
    <div className=' h-[8vh]  flex items-center justify-between'>
         <span className=" ">
              <img src={logo} alt='logo ' width={200} height={100}  />

         </span>
         <div className='flex items-center  gap-8 mr-14'>
             <div className='bg-[#f2f2f22d] px-4 py-3 hover:opacity-70 rounded-full cursor-pointer '>
                 <img 
                    src={notification}  
                    alt='notification icon' 
                />
             </div>
             <Avatar  
                  img={user.photoProfil ?  user.photoProfil : MessageUtils.createPdpFromInitials('Riry nomenjanahary',60)  }
             
             />
         </div>
    </div>
  )
}

export default Header
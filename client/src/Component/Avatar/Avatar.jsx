import React from 'react'
import { Link } from 'react-router-dom'
import { MessageUtils } from '../../features/Messages/utils/utils'


const Avatar = ({size, to, alt}) => {
  const img =  MessageUtils.createPdpFromInitials("Riry Nomenjanahary",50)
  return (
    <div 
        style={{backgroundImage:`url(${img})`}}
        className={`w-14 h-14   border-2  hover:border-[3px] rounded-full cursor-pointer relative bg-cover`} 
    >
          <Link 
              to={to}
              className='w-full h-full   rounded-full  bg-cover '
              
          >
          <div className='h-[16px] w-[16px] absolute bottom-0 right-0'>
              <div className="w-full h-full border-2 border-gray-200 rounded-full bg-green-600 ">
              </div>
           </div>
          </Link>
    </div>
  )
}

export default Avatar
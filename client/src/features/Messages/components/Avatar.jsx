import React from 'react'
import { Link } from 'react-router-dom'

const Avatar = ({img , to, alt}) => {
  return (
    <Link 
         to={to}
         className='w-14 h-14  hover:opacity-70  rounded-full border-[2.5px] border-gray-200   bg-cover' 
         style={{backgroundImage:`url(${img})`}}>
    </Link>
  )
}

export default Avatar
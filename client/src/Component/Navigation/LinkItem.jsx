import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkItem = ({item}) => {
  return (
    <div className='bg-primaryColor p-3  rounded-md hover:opacity-75'>
        <NavLink 
              className={({ isActive , isPending }) => (
                    isActive ? 'text-white': ''
              )}
              to={item.to}  >
              <img src={item.src} alt={item.alt} w={50} height={50}  />
             
        </NavLink>
    
    </div>
  )
}

export default LinkItem
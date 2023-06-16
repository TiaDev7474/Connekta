import React from 'react'
import { links } from '../../constants/link'
import LinkItem from './LinkItem'
export const MainNavigation = () => {
  return (
    <div className=' flex flex-col items-center w-16 px-2 rounded-t-sm bg-white gap-3 h-full pt-8  '>
         {links.map((item, index)  => {
             return (
                  <LinkItem key={index} item={item}/>
             )
         })}
        
    </div>
  )
}

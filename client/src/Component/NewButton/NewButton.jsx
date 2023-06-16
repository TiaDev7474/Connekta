import React from 'react'
import plus from '../../assets/plus.svg'

const NewButton = () => {
  return (
    <div className='hover:bg-[#f2f2f219] p-2 hover:opacity-70 rounded-full cursor-pointer '>
           <img 
                    src={plus}  
                    alt='notification icon' 
                    width={30}
          />
    </div>
  )
}

export default NewButton
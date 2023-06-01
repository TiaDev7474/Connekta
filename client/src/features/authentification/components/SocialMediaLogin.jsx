import React from 'react'
import SocialMediabutton from './SocialMediabutton'

function SocialMediaLogin() {
  return (
    <div className="max-w-[550px] px-4 m-auto">
        <div className='w-full flex justify-between items-center mb-5 '>
            <div className='flex-1 bg-black h-[1px] '></div>
            <span className='mx-2'>Or</span>
            <div className='flex-1 bg-black h-[1px]'></div>
        </div>
        <div className='flex flex-col'>
            <SocialMediabutton brandName="facebook"/>
            <SocialMediabutton brandName="google"/>
        </div>
        {/* <div className='md:pt-5 '></div> */}
       
    </div>
  )
}

export default SocialMediaLogin
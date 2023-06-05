import React, { useState } from 'react'
import  OtpInput from 'react-otp-input'
import message from '../../../assets/message.jpg'
import { useAuthContext } from '../hooks/useAuthContext'
import { InputOtp } from './InputOtp'
function Verification() {
      const { email } = useAuthContext()
  return (
    <div className='w-full h-full flex  justify-center  bg-white'>
         <div className="max-w-[650px] flex flex-col justify-start pt-14 md:pt-32 items-center px-9">

              <span>
                  <img src={message} alt='envelope illustration' width={300} height={300}/>
              </span>
              <div className="w-full flex flex-col items-center justify-center">
                  <h3 className='text-[28px] font-medium text-center'>Complete Email Verification to Proceed</h3>
                  <p className="my-2  text-[#2d2d2d]">
                      We have sent you a  6-digits verfication code to <span className='text-primaryColor'>{email}</span> .
                      Please check your email and enter the code below to complete verfication
                  </p>
                  <div className="flex justify-center items-center my-5">
                      <InputOtp/>
                      
                  </div>
                    <button className='w-full py-2 text-textlight capitalize font-medium text-[18px] bg-primaryColor hover:opacity-80'>
                          Submit verfication code
                    </button>
              </div>
         </div>
    </div>
  )
}

export default Verification
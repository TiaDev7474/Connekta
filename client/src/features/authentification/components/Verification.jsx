import React, { useState } from 'react'
import message from '../../../assets/message.jpg'
import { useAuthContext } from '../hooks/useAuthContext'
import { InputOtp } from './InputOtp'
import { verifyOtp,resendCode } from '../utils/authUtlis'
import { Link, useNavigate } from 'react-router-dom'
function Verification() {
      const { email } = useAuthContext()
      const navigate = useNavigate()
      const [otp, setOtp] = useState(Array(6).fill(0))
      const handleResendCode= async (e) =>{
          e.preventDefault()
          try{
              
               const response = await resendCode(email)
               if(response.status === 200){
                    console.log(response.status)
               }

          }catch(error){
              if(error.response){
                   console.log(error.response)
              }
          }
         
    }
      const handleSubmitCode= async (e) =>{
            e.preventDefault()
            try{
                
                 const response = await verifyOtp(parseInt(otp.join('')),email)
                 if(response.status === 201){
                     navigate('/auth/login')
               }

            }catch(error){
                if(error.response){
                     console.log(error.response)
                }
            }
           
      }
  return (
    <div className='w-full h-full flex  justify-center  bg-white'>
         <div className="max-w-[650px] flex flex-col items-center pt-32 px-9">

              <span>
                  <img src={message} alt='envelope illustration' width={300} height={300}/>
              </span>
              <div className="w-full flex flex-col items-center justify-center">
                  <h3 className='text-[28px] font-medium text-center'>Complete Email Verification to Proceed</h3>
                  <p className="w-full px-2 m-auto text-center my-2  text-[#2d2d2d]">
                      We have sent you a  6-digits verfication code to <span className='text-primaryColor'>{email}</span> .
                      Please check your email and enter the code below to complete verfication
                  </p>
                  <div className="flex justify-center items-center my-5">
                      <InputOtp setOtp={setOtp}/>
                  </div>
                    <button 
                         onClick={handleSubmitCode}
                         className='w-full py-2  text-textlight capitalize font-medium text-[18px] bg-primaryColor hover:opacity-80'
                    >
                          Submit verification code
                    </button>
                    <div className="w-full  flex justify-between  py-2 my-5 text-[20px] ">
                         <span className='text-[18px] '>Didn't get the code?
                              <strong 
                                   onClick={handleResendCode}
                                   className='text-primaryColor font-normal hover:opacity-95 cursor-pointer underline'
                              >
                                   Resend
                              </strong>
                         </span>
                         <span className='ml-2'>
                              <Link to="/auth/register" className='hover:text-primaryColor transition-all duration-150  underline'>Go back </Link>
                         </span>

                    </div>
               </div>
              </div>
         
    </div>
  )
}

export default Verification
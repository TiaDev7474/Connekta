import React, { useState } from 'react'
import { notValidInputClass } from '../utils/userInputValidation'

function InputField({src, formik, fieldName, type ,placeholder}) {
     const [showPassword, setShowPassword] = useState(false)
     const toggleInputType = (e) =>{
           if(type !=='password'){
               return
           }
           setShowPassword((state) => !state)

     }
     const inputType = showPassword ? 'text' : 'password'
     const isPasswordInput= type === 'password';

  return (
    <div className='flex flex-col h-[75px]'>
                    <label htmlFor={fieldName} className={`${ notValidInputClass(formik,fieldName)}  label mb-[2px]` }>
                         <span className='w-[35px]'>
                              <img src={src} alt="password icon"  />
                         </span>
                         <input 
                                   id={fieldName} 
                                   placeholder={placeholder} 
                                   type={type==='password' ? inputType : type} 
                                   className="input focus " 
                                   {...formik.getFieldProps(fieldName)}
                                   name={fieldName}

                          />
                         {
                            isPasswordInput  ? (
                              <span 
                                     onClick={toggleInputType}
                                     className='text-primaryColor cursor-pointer hover:opacity-70'>
                                     {showPassword ? 'hide': 'show'}
                               </span>
                            ) :null
                         }
                        
                    </label>
                    {formik.touched[fieldName] && formik.errors[fieldName] ? (
                              <div className=' text-[#ff9494] text-[14px] '>
                                    <span className="bg-[#ff9494] rounded-full text-white py-[1px]  px-[8px] mr-1">!</span>
                                   {formik.errors[fieldName]}
                              </div>
                    ):null}
    </div>
  )
}

export default InputField
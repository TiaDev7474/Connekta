import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'


export const InputOtp = ({optLength}) => {
  const [otp, setOtp] = useState(Array(6).fill(0))
  const inputsRef = useRef([])
   const focusNext = (index) => {
         if(index < inputsRef.current.length - 1 ){
               inputsRef.current[index + 1].focus()
         }
   }
   const focusPrev = (e,index) => {
    if(index > 0 && e.target.value===''){
      if(e.key=== 'Backspace'){
        setOtp( prevState => {
              const updatedOptValue = [...prevState] 
              updatedOptValue[index] =" "
              
              return updatedOptValue;
             
          })
        inputsRef.current[index - 1].focus()
      }    
} 
   }
  const onChangeOtp= (e, index) => {
     const { value } = e.target
     if(value !== ""){
      setOtp( prevState => {
        const updatedOptValue = [...prevState] 
        updatedOptValue[index] = value
        return updatedOptValue;
       
    })
     focusNext(index)
     }
    }
  const handlleInputPaste = (e,index ) => {
      const otpPasted = e.clipboardData.getData('text/plain');
      if(otpPasted.length === 6){
          for (let i= 0 ; i < inputsRef.current.length ; i++){
             inputsRef.current[i].value = otpPasted[i]
             if(i < inputsRef.current.length - 1){
               focusNext(i)
             }
          }
      }
  }
    
    

  return (
    <form className='flex gap-2 '>
       {
         Array(6).fill("").map((_, index ) => {
             return (
               <input
                className='w-11 py-2 text-center text-lg  focus:outline-primaryColor focus:border-0 transition-all duration-200 '
                type="text"
                inputMode='numeric'
                key={index}
                ref={(el) => inputsRef.current[index] = el} 
                name={`opt${index}`} 
                autoFocus={index}
                onPaste={(e) => handlleInputPaste(e, index)}
                maxLength={1}
                onKeyUp ={(e) => onChangeOtp(e,index)}
                onKeyDown={(e) => focusPrev(e,index)}
                placeholder='0'
                required
                
               />
             )
         })
       }
    
       
    </form>
  )
}

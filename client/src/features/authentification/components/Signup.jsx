import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik} from 'formik';
import * as Yup from 'yup'
import logo from "../../../assets/logo_cnkt.svg"
import  envelope from "../../../assets/envelope.svg"
import  password from "../../../assets/password.svg"
import { signUpUser } from '../utils/authUtlis';
import InputField from './InputField';
import SocialMediaLogin from './SocialMediaLogin';





const Signup = () => {
    const navigate = useNavigate()
    const [isLoading ,setIsLoading] = useState(false)
     const formik = useFormik({
          initialValues:{
               email:'',
               password:'',
               confirmPassword:'',
               isAgree:false
          },
          validationSchema:Yup.object({
               email: Yup.string().email('Invalid email address').required('Required'),
               password:Yup.string()
                       .min(6,'Must be 6 characters or more')
                       .required('Required'),
               confirmPassword:Yup.string()
                       .required('Please confirm your password')
                        .oneOf([Yup.ref('password')],'Your password do not match')


          }),
          onSubmit: async (values )=> {
               setIsLoading(true)
               const { confirmPassword , ...data} = values
               try{
                    const response = await signUpUser(data);
                    if(response.status === 201){
                         navigate('/auth/login')
                    }
               }catch(err){
                    console.log(err)
               }finally{
                    setIsLoading(false)
               }
          }
     })
     
   
    
   
return (
    <div className='bg-white w-full h-full flex justify-center   overflow-y-hidden'>
          <div className='max-w-[600px]  flex-1  m-auto  px-2  md:px-5'>
               <span className='flex justify-center '>
                    <img src={logo} alt="logo of connekta" />
               </span>
               <h2 className='h3 text-center text-textdark '>Create an account</h2>
               <p className=' text-center textbody py-1 px-2 '>Start a great experience wtih people around the world and expend your network</p>
          <form 
                    onSubmit={formik.handleSubmit}
                    className='max-w-[550px] py-5  px-4 m-auto '
               >
                    <InputField 
                         src={envelope} 
                         formik={formik}
                         fieldName='email'
                         type='email'
                         placeholder='Enter your email address'

                    />
                    <InputField 
                         src={password} 
                         formik={formik}
                         fieldName='password'
                         type='password'
                         placeholder='Enter your password'

                    />

                    <InputField 
                         src={password} 
                         formik={formik}
                         fieldName='confirmPassword'
                         type='password'
                         placeholder='Confirm your password'

                    />

               <div className="flex justify-start px-1 mb-5">
                    <label htmlFor="agreewith">
                         <input 
                              id='agreewith'
                                   type="checkbox" 
                                   value={formik.values.isAgree} 
                                   onChange={formik.handleChange}
                                   className='checked:outline-none ' 
                                   name='isAgree'

                              />
                         <span className='ml-2  text-[18px] '>Agree with our  <strong className='text-primaryColor font-normal underline cursor-pointer hover:font-bold'>terms and privacy</strong></span>
                    </label>

               </div>
               <button type="submit"  disabled={isLoading} className='w-full py-1 text-textlight capitalize font-medium text-[22px] bg-primaryColor hover:opacity-80'>
                    Register
               </button>
               </form>
               <SocialMediaLogin/>
               <div className="max-w-[550px] flex justify-start m-auto items-center  px-4 py-2 text-[20px] ">
                    <span className='  text-[18px] '>Already have an account?</span>
                    <span className='ml-2'>
                         <Link to="/auth/login" className='hover:text-primaryColor transition-all duration-150  underline'>Login</Link>
                    </span>
               </div>
         </div>
     </div>
  )
}

export default Signup
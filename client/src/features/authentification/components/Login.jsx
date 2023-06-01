import React from 'react'
import logo from "../../../assets/logo_cnkt.svg"
import  envelope from "../../../assets/envelope.svg"
import  password from "../../../assets/password.svg"
import SocialMediabutton from './SocialMediabutton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { notValidInputClass } from '../utils/userInputValidation'
import InputField from './InputField'
import SocialMediaLogin from './SocialMediaLogin'

const Login = ()=> {
     const formik = useFormik({
           initialValues:{
                email:'',
                password:'',
                toRemember:false,
           },
           validationSchema: Yup.object({
                email:Yup.string().email('Invalid email addresss').required('Required'),
                password:Yup.string().required('Required')
           })
     })
  return (
     <div className=' flex w-full h-full overflow-y-hidden'>
          <aside className='hidden md:block md:flex-1'>
              
          </aside>
          <div className="flex-1 rounded-none md:rounded-[32px] md:py-16  bg-white ">
           <div className='flex-1 max-w-[550px]  m-auto  px-2  md:px-5'>
                <span className='flex justify-center py-2'>
                     <img src={logo} alt="logo of connekta" />
                </span>
                <h2 className='h3 text-center text-textdark '>Hello again !</h2>
                <p className='text-center textbody py-1'>"Welcome to the Developer Chat Community, where coding dreams come to life!" </p>
               <form 
                     onSubmit={formik.handleSubmit}
                     className='max-w-[550px] py-5  px-4 m-auto border border-1'
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
                         <div className="flex justify-between px-1">
                              <label htmlFor="toRemember">
                                   <input 
                                        id='toRemember'
                                        type="checkbox" 
                                        className='checked:outline-none '
                                        {...formik.getFieldProps('toRemember')}
                                   />
                                   <span className='ml-2  text-[18px] '>Remember me</span>
                              </label>

                              <span className='mb-5'>
                                   <a href="#home" className='hover:text-primaryColor transition-all duration-150'>Forgot password?</a>
                              </span>
                          </div>
                    <button type="submit" className='w-full py-1 text-textlight capitalize font-medium text-[22px] bg-primaryColor hover:opacity-80'>
                         Login
                    </button>
               </form>
               <SocialMediaLogin/>
               <div className=" max-w-[550px] flex justify-start m-auto items-center  px-4 py-2 text-[20px] ">
                         <span className='  text-[18px] '>Don't have an account?</span>
                         <span className='ml-2'>
                              <Link to="/auth/register" className='hover:text-primaryColor transition-all duration-150  underline'>Register</Link>
                         </span>

                    </div>
               </div>
          </div>
     </div>
  )
}



export default Login


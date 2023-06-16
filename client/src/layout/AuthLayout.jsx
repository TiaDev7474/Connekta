import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../features/authentification/components/Login'
import Signup from '../features/authentification/components/Signup'
import Verification from '../features/authentification/components/Verification'
import { useQueryClient } from 'react-query'

function AuthLayout() {
   const query = useQueryClient()
   const user = query.getQueriesData(['userProfile'])
   console.log(user)
  return (
    <div className='h-[100vh] w-full overflow-y-hidden flex justify-center items-center'>
        <Routes>
             <Route path='login' element={<Login/>}/>
             <Route path='register' element={<Signup/>}/>
             <Route path='verify' element={<Verification/>}/>
        </Routes>
    </div>
  )
}

export default AuthLayout
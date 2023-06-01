import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../features/authentification/components/Login'
import Signup from '../features/authentification/components/Signup'
import Verification from '../features/authentification/components/Verification'

function AuthLayout() {
  return (
    <React.Fragment>
        <Routes>
             <Route path='login' element={<Login/>}/>
             <Route path='register' element={<Signup/>}/>
             <Route path='verification' element={<Verification/>}/>
        </Routes>
    </React.Fragment>
  )
}

export default AuthLayout
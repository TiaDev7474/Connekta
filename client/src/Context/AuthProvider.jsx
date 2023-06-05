import React, { createContext, useCallback, useEffect, useMemo, } from 'react'
import { useLocalstorage } from '../hooks/useLocalStorage';
import { useUserContext } from '../features/authentification/hooks/useUserContext';
import { useState } from 'react';



const  authContextProps = {
    setEmail:"",
    email:"",
    login:() => null,
    logout:() => null
}
export const Authcontext = createContext(authContextProps)

function AuthProvider({ children }) {

    const [ email , setEmail] = useState("")
    useEffect(() => {
        const storedEmail = localStorage.getItem('Email')
        if(storedEmail){
          setEmail(storedEmail)
        }
    },[])
    useEffect(() => {
         localStorage.setItem('Email',email)
       
    },[email])
    const login = useCallback((token) => {
         localStorage.setItem('Token',token)

     },[])
     const logout = useCallback((response)=> {
        localStorage.removeItem('User')
        
     },[])

     const contextValue = useMemo(() => ({
         login,
         logout,
         setEmail,
         email
     }),[login,logout,email,setEmail])
  return (
    <Authcontext.Provider value={contextValue}>
         {children}
    </Authcontext.Provider>
  )
}

export default AuthProvider
import React, { createContext, useCallback, useMemo, } from 'react'
import {useLocalstorage } from '../hooks/useLocalStorage';
import { useUserContext } from '../features/authentification/hooks/useUserContext';



const  authContextProps = {
    login:() => null,
    logout:() => null
}
export const Authcontext = createContext(authContextProps)

function AuthProvider({children}) {
    const { setItem} = useLocalstorage()

    const {removeUser } = useUserContext()

    
   
    const login = useCallback((response) => {
         setItem('Token ',JSON.stringify(response.token));

     },[setItem])
     const logout = useCallback((response)=> {
         removeUser()
        
     },[removeUser])

     const contextValue = useMemo(() => ({
         login,
         logout
     }),[login,logout])
  return (
    <Authcontext.Provider value={contextValue}>
         {children}
    </Authcontext.Provider>
  )
}

export default AuthProvider
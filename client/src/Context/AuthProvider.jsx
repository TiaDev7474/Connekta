import React, { createContext, useCallback, useMemo, } from 'react'
import { useLocalstorage } from '../hooks/useLocalStorage';
import { useUserContext } from '../features/authentification/hooks/useUserContext';



const  authContextProps = {
    login:() => null,
    logout:() => null
}
export const Authcontext = createContext(authContextProps)

function AuthProvider({ children }) {
    const login = useCallback((token) => {
         localStorage.setItem('Token',token)

     },[])
     const logout = useCallback((response)=> {
        localStorage.removeItem('User')
        
     },[])

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
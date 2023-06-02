import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalstorage } from '../hooks/useLocalStorage';

const initialUser = {
      user:null,
      updateUser: () => null,
      removeUser:() => null

}
export const UserContext =  createContext(initialUser)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
      async function fetchUserFromStore(){
            const storedUser = localStorage.getItem('User');
            console.log(storedUser)
            if(storedUser){
                 setUser(storedUser)
            }
      }
      fetchUserFromStore()
       
    },[])

    const updateUser = useCallback( (user) =>{
          localStorage.setItem('User',JSON.stringify(user))
          setUser(user)
    },[])

    const removeUser = useCallback(() => {
        localStorage.removeItem('User')
        setUser(null)
    },[])


   
    const valueContext = useMemo(() => ({
          user,
          updateUser,
          removeUser
    }),[user, updateUser,removeUser])
  return (
    <UserContext.Provider value={valueContext}>
          {children}
    </UserContext.Provider>
  )
}

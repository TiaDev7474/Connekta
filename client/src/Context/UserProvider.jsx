import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalstorage } from '../hooks/useLocalStorage';


export const UserContext =  createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const { setItem , getItem , removeItem } = useLocalstorage()

    useEffect(() => {
        const storedUser = getItem('user');
        if(storedUser){
             setUser(storedUser)
        }
    },[getItem])

    const updateUser = useCallback( (user) =>{
          setItem('User', JSON.stringify(user))
          setUser(user)
    },[setItem])

    const removeUser = useCallback(() => {
        removeItem('User')
        setUser(null)
    },[removeItem])


   
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

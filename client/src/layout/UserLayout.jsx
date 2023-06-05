import React, { useEffect } from 'react'
import WithAuth from '../features/authentification/components/WithAuth'
import { fetchUser } from '../utils/user'
import { useUserContext } from '../features/authentification/hooks/useUserContext'
import { useNavigate } from 'react-router-dom'


function UserLayout() {
   const { user , updateUser} = useUserContext()
   const navigate = useNavigate()
    useEffect(() => {
        fetchUser()
          .then(response => {
              
                if(response.status === 200){
                  console.log(response.data)
                   updateUser(response.data)
                }  
          }) 
          .catch(err => {
              console.log(err)
          })
    },[updateUser])
   if(user){
      if(!user.account_verify){
          navigate('auth/verify')
      }
   }
  return (
    <>
       {user && (
          <div>
               hello {user.email}
          </div>
       )}

    </>
   
  )
}

export default WithAuth(UserLayout);
import React, { useEffect } from 'react'
import WithAuth from '../features/authentification/components/WithAuth'
import { fetchUser } from '../utils/user'
import { useUserContext } from '../features/authentification/hooks/useUserContext'

function UserLayout() {
   const { user , updateUser} = useUserContext()
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
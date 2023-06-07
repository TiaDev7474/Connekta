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
                console.log(response.status)
                if(response.status === 200){
                   updateUser(response.data)
                }
          }) 
          .catch(err => {
               if(err.response.status === 401){
                  navigate('/auth/verify')
               }
          })
    },[updateUser,navigate])
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
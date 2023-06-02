import React, { useEffect } from 'react'
import WithAuth from '../features/authentification/components/WithAuth'
import { fetchUser } from '../utils/user'

function UserLayout() {
    useEffect(() => {
        fetchUser()
          .then(response => {
              console.log(response)           
          }) 
          .catch(err => {
              console.log(err)
          })
    })
  return (
    <div>UserLayout</div>
  )
}

export default WithAuth(UserLayout);
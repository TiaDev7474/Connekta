import React from 'react'
import WithAuth from '../features/authentification/components/WithAuth'

function UserLayout() {
  return (
    <div>UserLayout</div>
  )
}

export default WithAuth(UserLayout);
import React, { Suspense, useEffect } from 'react'
import WithAuth from '../../features/authentification/components/WithAuth'
import { fetchUser } from '../../utils/user'
import { useUserContext } from '../../features/authentification/hooks/useUserContext'
import {Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { MainNavigation } from '../../Component/Navigation/MainNavigation'
import Header from '../../Component/Header/Header'
import SearchBar from '../../Component/SearchBar/SearchContainer'
import  MessageList  from '../../features/Messages/components/MessageList'
import MainSection from './MainSection'



function UserLayout() {
   const { user , updateUser} = useUserContext()
   const navigate = useNavigate()
   const queryKey = ['userProfile']
   const {isLoading, data, isError ,error } = useQuery(queryKey , () => fetchUser())
   //  useEffect(() => {
   //      fetchUser()
   //        .then(response => {
   //              console.log(response.status)
   //              if(response.status === 200){
   //                 updateUser(response.data)
   //              }
   //        }) 
   //        .catch(err => {
   //             // if(err?.response.status === 401){
   //             //    
   //             // }
   //             console.log(err)
   //        })
   //  },[updateUser,navigate])
  


   if(isError){
        if(error.response?.status === 401){
             navigate('/auth/verify')
        }
   }
   const userdata = {
        photoProfil : null
   }
  return (
      <Suspense fallback={<div>Loading ..</div>}>
         <div className='h-screen overflow-y-hidden w-full '>
             <Header user={userdata}/> 
              <main className='h-[92vh] flex'>
                  <aside className='h-full'>
                       <MainNavigation/>
                  </aside>
                   <Outlet/>
              </main>
         </div>
      </Suspense>
   
  )
}

export default WithAuth(UserLayout);
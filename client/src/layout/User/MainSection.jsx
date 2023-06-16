import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MessageSection } from '../../features/Messages/page/MessageSection'

const MainSection = () => {
  return (
    <div className='flex-1 bg-black'>
        <Routes>
            <Route path='/message' index={true}  element={<MessageSection/>}/>
           
        </Routes>
    </div>
  )
}

export default MainSection
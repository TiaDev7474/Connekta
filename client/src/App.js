import React from 'react';
import './index.css'
import 
    { 
     BrowserRouter, 
     Route, 
     Routes 
    } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import UserLayout from './layout/User/UserLayout';
import { MessageSection } from './features/Messages/page/MessageSection';
function App() {
    
  return (
     <div className='min-w-full max-h-[100vh]  bg-primaryColor '>
         <BrowserRouter>
              <Routes>
                  <Route path='/auth/*' element={<AuthLayout />} />
                  <Route path='/' element={<UserLayout/>}>
                       <Route path='message' index={true} element={<MessageSection/>} />
                       <Route path='group'  element={<div>Hello group</div>}/>
                       <Route path='room'  element={<div>Hello channel</div>}/>
                       <Route path='dashboard'  element={<div>Hello dashboard</div>}/>
                       <Route path='setting'  element={<div>Hello settings</div>}/>
                  </Route>
              </Routes>
         </BrowserRouter>
     </div>
  );
}
export default App;

import React from 'react';
import './index.css'
import 
    { 
     BrowserRouter, 
     Route, 
     Routes 
    } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import UserLayout from './layout/UserLayout';
function App() {
    
  return (
     <div className='min-w-full  bg-primaryColor '>
         <BrowserRouter>
              <Routes>
                  <Route path='/auth/*' element={<AuthLayout />} />
                  <Route path='/*' element={<UserLayout/>}/>
              </Routes>
         </BrowserRouter>
     </div>
  );
}
export default App;

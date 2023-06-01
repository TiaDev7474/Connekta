import React from 'react';
import './index.css'
import 
    { 
     BrowserRouter, 
     Route, 
     Routes 
    } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
function App() {
    
  return (
     <div className='min-w-full md:h-screen bg-primaryColor '>
         <BrowserRouter>
              <Routes>
                  <Route path='/auth/*' element={<AuthLayout />} />
              </Routes>
         </BrowserRouter>
     </div>
  );
}
export default App;

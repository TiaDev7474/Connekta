import React from 'react'
import { Navigate} from 'react-router-dom'


const WithAuth = (WrappedComponent) => {
    const  token =  localStorage.getItem('Token');
    const AuthHOC = (props) => {

        if (!token) {
          // Redirect to login if token is missing
          return  <Navigate replace to='/auth/login'/>
        
        }
      return <WrappedComponent {...props} />;
    };
  
    return AuthHOC;
  };
  
  export default WithAuth;
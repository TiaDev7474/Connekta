import React from 'react'
import { Redirect } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext';

const WithAuth= (Component) =>{
    const { user } = useUserContext();
    return (props) => {
        console.log(user)
        if(user){
            return <Component {...props} />
           
        }
        return <Redirect to='/login' />
       
    }
}

export default WithAuth
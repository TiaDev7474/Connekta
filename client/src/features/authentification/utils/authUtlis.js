import  axios from '../../../config/axios'

export const loginUser = async (userData) => {

    try {
        const response = await axios.post('/auth/login',userData)
        if(response.data.statusText === 200){
            return response.data.user
        }else if ( response.data.statusText === 403 ){
            throw new Error('Forbidden')
        }else if(response.data.statusText === 500 ) {
            throw new Error('Server error ')
        }
    }catch(err){
        throw new Error('Error occured when trying to fetch user')
    }
    

   

    
}

export const signUpUser = async (userData) => {
    try{
        const response =  await axios.post('/auth/register', userData)
        return response

    }catch(error){
         if(error.response.statusText === 500){
             throw new Error('Error from server')
         }
    }
   

}

const validateUserInput =  () => {

}

export const loginWIthGoogle = async() => {
   
}


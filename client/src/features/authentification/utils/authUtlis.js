import  axios from '../../../config/axios'

export const loginUser = async (userData) => {
        const response = await axios.post('/auth/login',userData)
        return response
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


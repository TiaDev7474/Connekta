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

export const verifyOtp = async(otp,email) => {
     return await axios.post('/auth/verify',{otp:otp,email:email})
}
export const resendCode = async(email) => {
    return await axios.post('/auth/resendcode',{email:email})
}

const validateUserInput =  () => {

}

export const loginWIthGoogle = async() => {
   
}


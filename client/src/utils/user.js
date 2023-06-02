import axios from '../config/axios'
export const fetchUser = async () => {
     const  response = await  axios.get('/api/user')
     return  response
}
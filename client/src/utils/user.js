import axios from '../config/axios'
export const fetchUser = async (userid) => {
     const  response = await  axios.get(`/user/${userid}`)
     return  response
}
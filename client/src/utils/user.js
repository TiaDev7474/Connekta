import axios from '../config/axios'
export const fetchUser = async () => {
    
     return   await  axios.get('/api/user')
}
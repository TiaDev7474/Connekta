import axios from 'axios'


const request = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
}) 

console.log(process.env.REACT_APP_BASE_URL)

request.interceptors.request.use(
    config =>{
        const token = localStorage.getItem('Token')

        if(token !== null){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    }
)
export default request
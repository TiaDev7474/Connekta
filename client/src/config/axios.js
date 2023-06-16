import axios from 'axios'


const request = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
}) 



request.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('Token')

        if(token !== null){
            config.headers["Authorization"] = `Bearer ${token}`
            console.log( config.headers["Authorization"])
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
) 
export default request
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
    headers: {
        "x-auth-token": localStorage.getItem("jwt")
    }
})

export default axiosInstance

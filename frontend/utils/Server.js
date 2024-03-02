import axios from "axios";



export const Server = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})
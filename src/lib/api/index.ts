import axios, { AxiosError } from "axios"
import { getToken } from "../cookies"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

api.defaults.withCredentials = false

api.interceptors.request.use(
    (config) => {
        const token = getToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

api.interceptors.response.use(
    (response) => {
        console.log('API response: ', response)
        return response
    },
    (error: AxiosError) => {
        if(error.response){
            console.error('Response Error: ', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            })
        }
        return Promise.reject(error)
    }
)

export default api
export {BASE_URL}
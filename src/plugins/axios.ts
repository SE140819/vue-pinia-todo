import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { CONSTANTS } from '@/constants'

const axiosClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
  
      localStorage.removeItem(CONSTANTS.STORAGE_KEYS.TOKEN)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)


export default axiosClient


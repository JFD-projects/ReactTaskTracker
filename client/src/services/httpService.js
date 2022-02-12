import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService, { clearTokens } from './localStorageService'
import authService from './authService'

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  async (config) => {
    try {
      await authService.checkToken()
      const token = localStorageService.getAccessToken()
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    } catch (e) {
      return Promise.reject(e)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: res.data }
    }
    return res
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.info('Unauthorized')
      clearTokens()
      window.location.href = '/login'
    }
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      console.log('Unexpected error')
      toast.info('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}
export default httpService

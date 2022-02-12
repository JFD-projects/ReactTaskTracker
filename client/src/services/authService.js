import localStorageService, { setTokens } from './localStorageService'
import axios from 'axios'
import configFile from '../config.json'

const httpAuth = axios.create({
  baseURL: configFile.apiEndPoint
})

const refreshToken = async () => {
  const url = 'auth/refreshToken'
  const refreshToken = localStorageService.getRefreshToken()
  try {
    const { data } = await httpAuth.post(url, {
      refreshToken: refreshToken
    })
    setTokens(data)
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

const checkToken = async () => {
  try {
    const expired = localStorageService.getExpireDate()
    if (Date.now() > expired) {
      await refreshToken()
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
const authService = {
  checkToken,
  register: async (payload) => {
    const { data } = await httpAuth.post('auth/signup', payload)
    return data
  },
  login: async (payload) => {
    const { data } = await httpAuth.post('auth/signin', payload)
    return data
  },
  logout: async () => {
    const { data } = await httpAuth.post('auth/logout', {
      refreshToken: localStorageService.getRefreshToken()
    })
    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post('auth/refreshToken', {
      refreshToken: localStorageService.getRefreshToken()
    })
    return data
  }
}
export default authService

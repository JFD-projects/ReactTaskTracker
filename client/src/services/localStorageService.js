const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_ID_KEY = 'jwt-user-id'
const USER_IS_ADMIN = 'jwt-user-is-admin'

export const setTokens = ({
  refreshToken,
  accessToken,
  expiresIn = 3600,
  id: userId,
  isAdmin
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
  localStorage.setItem(USER_ID_KEY, userId)
  localStorage.setItem(USER_IS_ADMIN, isAdmin ? 'true' : 'false')
}

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY)
}

export const getUserIsAdmin = () => {
  return localStorage.getItem(USER_IS_ADMIN) === 'true'
}

export const getExpireDate = () => {
  return localStorage.getItem(EXPIRES_KEY)
}

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USER_ID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpireDate,
  getUserId,
  clearTokens,
  getUserIsAdmin
}

export default localStorageService

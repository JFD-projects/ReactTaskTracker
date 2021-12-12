const TOKEN_KEY = "jwt-token"
const REFRESH_KEY = "jwt-refresh-token"
const EXPIRES_KEY = "jwt-expires"
const USER_ID_KEY = "jwt-user-id"

export const setTokens = ({ refreshToken, idToken, expiresIn = 3600, userId }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
    localStorage.setItem(USER_ID_KEY, userId)
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

export const getExpireDate = () => {
    return localStorage.getItem(EXPIRES_KEY)
}

export const clearTokens = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpireDate,
    getUserId
}

export default localStorageService

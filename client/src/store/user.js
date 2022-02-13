import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/authService'
import localStorageService, {
  clearTokens,
  setTokens
} from '../services/localStorageService'
import history from '../utils/history'

const initialState = {
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false
}
if (localStorageService.getAccessToken()) {
  initialState.auth = { userId: localStorageService.getUserId() }
  initialState.isLoggedIn = true
  initialState.isLoading = true
  initialState.isAdmin = localStorageService.getUserIsAdmin()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload }
      state.isLoggedIn = true
      state.isAdmin = action.payload?.isAdmin
    },
    authRequestFiled: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false
      state.auth = null
    }
  }
})

const { reducer: userReducer, actions } = userSlice
const { authRequested, authRequestSuccess, authRequestFiled, userLoggedOut } =
  actions

export const login = (payload) => {
  return async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      setTokens(data)
      dispatch(authRequestSuccess({ userId: data.id, isAdmin: data.isAdmin }))
      history.push('/tasks')
    } catch (error) {
      dispatch(
        authRequestFiled(error?.response?.data?.message || error.message)
      )
    }
  }
}

export const signUp = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(authRequested())
      const data = await authService.register(payload)
      setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
      history.push('/tasks')
    } catch (error) {
      dispatch(
        authRequestFiled(error?.response?.data?.message || error.message)
      )
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    try {
      await authService.logout()
    } catch (error) {
      dispatch(
        authRequestFiled(error?.response?.data?.message || error.message)
      )
    } finally {
      clearTokens()
      dispatch(userLoggedOut())
      history.push('/')
    }
  }
}

export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getIsAdmin = () => (state) => state.user.isAdmin
export const getAuthError = () => (state) => state.user.error

export default userReducer

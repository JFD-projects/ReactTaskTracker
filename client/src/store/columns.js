import { createSlice } from '@reduxjs/toolkit'
import columnService from '../services/columnService'

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    columnsRequested: (state) => {
      state.isLoading = true
    },
    columnsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
      state.lastFetch = Date.now()
    },
    columnsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})
const { reducer: columnsReducer, actions } = columnsSlice
const { columnsRequested, columnsReceived, columnsRequestFiled } = actions

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 100) return true
  return false
}

export const loadColumnsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().columns
  if (isOutdated(lastFetch)) {
    dispatch(columnsRequested())
    try {
      const { content } = await columnService.fetchAll()
      dispatch(columnsReceived(content))
    } catch (error) {
      dispatch(columnsRequestFiled(error.message))
    }
  }
}

export const getColumns = () => (state) => state.columns.entities
export const getColumnsLoadingStatus = () => (state) => state.columns.isLoading

export const getColumnById = (id) => (state) => {
  if (state.columns.entities) {
    return state.columns.entities.find((item) => item._id === id)
  }
  return undefined
}
export default columnsReducer

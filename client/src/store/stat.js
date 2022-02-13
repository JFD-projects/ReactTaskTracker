import { createSlice } from '@reduxjs/toolkit'
import statService from '../services/statService'

const statSlice = createSlice({
  name: 'stat',
  initialState: {
    allTasksCount: null,
    columns: null,
    error: null,
    isLoading: true
  },
  reducers: {
    statTasksRequested: (state) => {
      state.isLoading = true
    },
    statTasksReceived: (state, action) => {
      state.allTasksCount = action.payload?.allTasksCount
      state.columns = action.payload?.columns
      state.isLoading = false
    },
    statTasksRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: statReducer, actions } = statSlice
const { statTasksRequested, statTasksReceived, statTasksRequestFiled } = actions

export const loadStatTasks = () => async (dispatch) => {
  dispatch(statTasksRequested())
  try {
    const { content } = await statService.getTasksStat()
    dispatch(statTasksReceived(content))
  } catch (error) {
    dispatch(statTasksRequestFiled(error.message))
  }
}

export const getStatTasksLoadingStatus = () => (state) => state.stat.isLoading
export const getStatTasks = () => (state) => ({
  allTasksCount: state.stat.allTasksCount,
  columns: state.stat.columns
})

export default statReducer

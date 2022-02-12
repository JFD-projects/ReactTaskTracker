import { combineReducers, configureStore } from '@reduxjs/toolkit'
import columnsReducer from './columns'
import tasksReducer from './tasks'
import userReducer from './user'

const rootReducer = combineReducers({
  columns: columnsReducer,
  tasks: tasksReducer,
  user: userReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

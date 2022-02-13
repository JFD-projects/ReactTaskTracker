import { combineReducers, configureStore } from '@reduxjs/toolkit'
import columnsReducer from './columns'
import tasksReducer from './tasks'
import userReducer from './user'
import statReducer from './stat'

const rootReducer = combineReducers({
  columns: columnsReducer,
  tasks: tasksReducer,
  user: userReducer,
  stat: statReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

import {createSlice} from "@reduxjs/toolkit"
import taskService from "../services/taskService"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        tasksRequested: (state) => {
            state.isLoading = true
        },
        tasksReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        tasksRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        taskUpdateRequested: (state) => {
            state.isLoading = true
        },
        taskUpdated: (state, action) => {
            const task = action.payload
            state.entities = state.entities.map(item => {
                if (item._id === task._id) {
                    return task
                }
                return item
            })
            state.isLoading = false
        },
        taskUpdateFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        taskDeleteRequested: (state) => {
            state.isLoading = true
        },
        taskDeleted: (state, action) => {
            const task = action.payload
            state.entities = state.entities.filter(item => item._id !== task._id)
            state.isLoading = false
        },
        taskDeleteFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        taskCreateRequested: (state) => {
            state.isLoading = true
        },
        taskCreated: (state, action) => {
            const task = action.payload
            state.entities.push(task)
            state.isLoading = false
        },
        taskCreateFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})
const {reducer: tasksReducer, actions} = tasksSlice
const {
    tasksRequested,
    tasksReceived,
    tasksRequestFiled,
    taskUpdateRequested,
    taskUpdated,
    taskUpdateFiled,
    taskDeleteRequested,
    taskDeleted,
    taskDeleteFiled,
    taskCreateRequested,
    taskCreated,
    taskCreateFiled
} = actions

export const loadTasksList = () => async (dispatch) => {
    dispatch(tasksRequested())
    try {
        const {content} = await taskService.fetchAll()
        dispatch(tasksReceived(content))
    } catch (error) {
        dispatch(tasksRequestFiled(error.message))
    }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) =>
    state.tasks.isLoading
export const updateTask = (payload) => async (dispatch) => {
    dispatch(taskUpdateRequested())
    try {
        const {content} = await taskService.update(payload._id, payload)
        dispatch(taskUpdated(content))
    } catch (error) {
        dispatch(taskUpdateFiled(error.message))
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    dispatch(taskDeleteRequested())
    try {
        const {content} = await taskService.delete(taskId)
        dispatch(taskDeleted(content))
    } catch (error) {
        dispatch(taskDeleteFiled(error.message))
    }
}

export const createTask = (task) => async (dispatch) => {
    dispatch(taskCreateRequested())
    try {
        const {content} = await taskService.create(task)
        dispatch(taskCreated(content))
    } catch (error) {
        dispatch(taskCreateFiled(error.message))
    }
}

export const getTaskById = (id) => (state) => {
    if (state.tasks.entities) {
        return state.tasks.entities.find((item) => item._id === id)
    }
    return undefined
}
export default tasksReducer

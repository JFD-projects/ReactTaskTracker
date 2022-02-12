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
        tasksUpdateRequested: (state) => {
            state.isLoading = true
        },
        tasksUpdated: (state, action) => {
            const tasks = action.payload
            state.entities = state.entities.map(item => {
                const index = tasks.findIndex(task => item._id === task._id)
                if (index !== -1) {
                    return tasks[index]
                }
                return item
            }).sort((a, b) => a.sort - b.sort)
            state.isLoading = false
        },
        tasksUpdateFiled: (state, action) => {
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
    tasksUpdateRequested,
    tasksUpdated,
    tasksUpdateFiled,
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
export const updateTask = (payload) => async (dispatch, getState) => {
    dispatch(tasksUpdateRequested())
    try {
        const column = payload.column
        const prevColumn = getState().tasks.entities.find(item => item._id === payload._id)?.column
        let tasks = getState().tasks.entities.filter(item => item.column === column && item._id !== payload._id)

        if (payload.nextTask && payload.nextTask !== payload._id) {
            const nextIndex = tasks.findIndex(item => item._id === payload.nextTask)
            tasks = [
                ...tasks.slice(0, nextIndex + 1),
                payload,
                ...tasks.slice(nextIndex + 1)
            ].map((item, index) => {
                return {...item, sort: index}
            })
        } else if (payload.prevTask && payload.prevTask !== payload._id) {
            const prevIndex = tasks.findIndex(item => item._id === payload.prevTask)
            tasks = [
                ...tasks.slice(0, prevIndex),
                payload,
                ...tasks.slice(prevIndex)
            ].map((item, index) => {
                return {...item, sort: index}
            })
        } else {
            let sort = payload.sort
            if (prevColumn !== column) {
                sort = tasks.reduce((sum, item) => {
                    if (item.sort >= sum) return item.sort + 1
                    return sum
                }, 0)
            }
            tasks = [
                ...tasks,
                {...payload, sort}
            ]
        }

        const result = await Promise.all(tasks.map(async (task) => {
            const {content} = await taskService.update(task._id, task)
            return content;
        }))
        dispatch(tasksUpdated(result))

    } catch (error) {
        dispatch(tasksUpdateFiled(error.message))
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

export const createTask = (task) => async (dispatch, getState) => {
    dispatch(taskCreateRequested())
    try {
        // Определяем сортировку по колонке в которую добавляем задачу
        const column = task.column
        const sort = getState().tasks.entities.filter(item => item.column === column).reduce((sum, item) => {
            if (item.sort >= sum) return item.sort + 1
            return sum
        }, 0)
        task.sort = sort
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

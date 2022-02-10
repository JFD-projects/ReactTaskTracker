import React, {useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import TaskForm from "./taskForm"
import {useDispatch, useSelector} from "react-redux";
import {getColumns} from "../../store/columns";
import {getTaskById, updateTask} from "../../store/tasks";

const Task = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const columns = useSelector(getColumns())
    const params = useParams()
    const task = useSelector(getTaskById(params.taskId))
    const [editedTask, setEditedTask] = useState(task)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        await dispatch(updateTask(editedTask))
        history.replace("/tasks")
    }

    const editTaskHandler = (field) => {
        return ({target}) => setEditedTask({...editedTask, [field]: target.value})
    }

    return (
        <>
            {editedTask && <TaskForm {...{task: editedTask, columns, editTaskHandler, onSubmitHandler}} />}
        </>
    )
}

export default Task

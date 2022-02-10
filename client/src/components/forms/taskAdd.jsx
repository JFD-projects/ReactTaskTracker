import React, {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import Loading from "../loading/loading"
import TaskForm from "./taskForm"
import {useDispatch, useSelector} from "react-redux";
import {getColumns} from "../../store/columns";
import {createTask} from "../../store/tasks";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const TaskAdd = () => {
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const columns = useSelector(getColumns())
    const defaultColumn = query.get("column");
    const [task, setTask] = useState({
        text: "",
        title: "",
        responsible: "",
        deadLine: "",
        column: defaultColumn,
    })

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        await dispatch(createTask(task))
        history.replace("/tasks")
    }

    const editTaskHandler = (field) => {
        return ({target}) => {
            setTask({...task, [field]: target.value})
        }
    }

    return (
        <>
            <Loading hidden={columns}></Loading>
            {columns && <TaskForm {...{task, columns, editTaskHandler, onSubmitHandler}} />}
        </>
    )
}

export default TaskAdd

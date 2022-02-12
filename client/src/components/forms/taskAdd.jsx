import React from "react"
import {useHistory, useLocation} from "react-router-dom"

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
    const task = {
        text: "",
        title: "",
        responsible: "",
        deadLine: "",
        column: defaultColumn,
    }

    const onSubmitHandler = async (data) => {
        await dispatch(createTask(data))
        history.replace("/tasks")
    }

    return <TaskForm {...{task, columns, onSubmitHandler}} />
}

export default TaskAdd

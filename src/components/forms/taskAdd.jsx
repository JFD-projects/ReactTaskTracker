import React, {useEffect, useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import Loading from "../loading/loading"
import TaskForm from "./taskForm"
import columnService from "../../services/columnService";
import taskService from "../../services/taskService";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const TaskAdd = () => {
    const query = useQuery()
    const history = useHistory()
    const [columns, setColumns] = useState([])
    const [task, setTask] = useState({
        text: "",
        title: "",
        responsible: "",
        deadLine: "",
        columnId: query.get("columnId"),
    })

    useEffect(() => {
        const loadColumns = () => {
            columnService.fetchAll().then(({content: data}) => {
                const arr = Object.keys(data).map((key) => data[key]).filter(item => item._id)
                setColumns(arr)
                if (arr.findIndex((item) => item._id === Number(task.columnId)) === -1) {
                    setTask({...task, columnId: arr[0]?._id})
                }
            })
        }
        loadColumns()
    }, [task])

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(task)
        task.columnId = Number(task.columnId)
        //Api.addTask(task)
        taskService.create(task)
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

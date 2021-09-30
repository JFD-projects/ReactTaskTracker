import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Api from "../../api/api"
import Loading from "../loading/loading"
import TaskForm from "./taskForm"

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

  const loadColumns = () => {
    Api.getColumns().then((result) => {
      setColumns(result)
      // set default
      if (result.findIndex((item) => item.id === Number(task.columnId)) === -1) {
        setTask({ ...task, columnId: result[0]?.id })
      }
    })
  }

  useEffect(() => {
    loadColumns()
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log(task)
    task.columnId = Number(task.columnId)
    Api.addTask(task)
    history.replace("/tasks")
  }

  const editTaskHandler = (field) => {
    return ({ target }) => {
      setTask({ ...task, [field]: target.value })
    }
  }

  return (
    <>
      <Loading hidden={columns}></Loading>
      {columns && <TaskForm {...{ task, columns, editTaskHandler, onSubmitHandler }} />}
    </>
  )
}

export default TaskAdd

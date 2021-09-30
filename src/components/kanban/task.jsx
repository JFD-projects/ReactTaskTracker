import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Api from "../../api/api"
import Loading from "../../components/loading/loading"
import TaskForm from "./taskForm"

const Task = ({ taskId }) => {
  const history = useHistory()
  const [columns, setColumns] = useState([])
  const [task, setTask] = useState()
  const params = useParams()

  const loadColumns = () => {
    Api.getColumns().then((result) => {
      setColumns(result)
    })
  }

  const loadTask = (id) => {
    Api.getTaskById(id).then((result) => {
      setTask(result)
    })
  }

  useEffect(() => {
    loadColumns()
    loadTask(params.taskId)
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    task.columnId = Number(task.columnId)
    Api.updateTask(params.taskId, task)
    history.replace("/tasks")
  }

  const editTaskHandler = (field) => {
    return ({ target }) => {
      setTask({ ...task, [field]: target.value })
    }
  }

  return (
    <>
      <Loading hidden={task}></Loading>
      {task && <TaskForm {...{ task, columns, editTaskHandler, onSubmitHandler }} />}
    </>
  )
}

export default Task

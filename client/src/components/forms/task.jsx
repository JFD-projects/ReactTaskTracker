import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Loading from "../loading/loading"
import TaskForm from "./taskForm"
import columnService from "../../services/columnService";
import taskService from "../../services/taskService";

const Task = () => {
  const history = useHistory()
  const [columns, setColumns] = useState([])
  const [task, setTask] = useState()
  const params = useParams()

  const loadColumns = () => {
    columnService.fetchAll().then(({content: data}) => {
      setColumns(data)
    })
  }

  const loadTask = (id) => {
    taskService.get(id).then(({content: data}) => {
      setTask(data)
    })
  }

  useEffect(() => {
    loadColumns()
    loadTask(params.taskId)
  }, [params.taskId])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    await taskService.update(params.taskId, task)
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

import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Api from "../../api/api"
import Loading from "../../components/loading/loading"

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
      {task && (
        <div className="container">
          <form onSubmit={onSubmitHandler}>
            <fieldset>
              <div className="mb-3">
                <label htmlFor="taskStatus" className="form-label">
                  Статус
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={task.columnId}
                  onChange={editTaskHandler("columnId")}>
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">
                  Заголовок
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  className="form-control"
                  value={task.title}
                  onChange={editTaskHandler("title")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">
                  Описание задачи
                </label>
                <textarea
                  className="form-control"
                  id="taskDescription"
                  rows="3"
                  value={task.text}
                  onChange={editTaskHandler("text")}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
      )}
    </>
  )
}

export default Task

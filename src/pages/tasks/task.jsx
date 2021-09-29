import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../api/api"

const Task = ({ taskId }) => {
  const [task, setTask] = useState()
  const params = useParams()

  useEffect(() => {
    Api.getTaskById(params.taskId).then((result) => {
      setTask(result)
      console.log("params.taskId", params.taskId)
      console.log("result", result)
    })
  }, [params.taskId])

  if (!task) return "loading..."
  return (
    <>
      <div className="container">
        <form>
          <fieldset disabled>
            <legend>Disabled fieldset example</legend>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="taskTitle" className="col-form-label">
                  Заголовок
                </label>
              </div>
              <div className="col-auto">
                <input type="text" id="taskTitle" className="form-control" value={task.title} />
              </div>
            </div>
            <div className="mb-3">
              <label for="taskDescription" className="form-label">
                Описание задачи
              </label>
              <textarea className="form-control" id="taskDescription" rows="3">
                {task.text}
              </textarea>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default Task

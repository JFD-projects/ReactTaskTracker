import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Api from "../api/api"
import "./kanban.css"

const Kanban = () => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  const loadColumns = () => {
    Api.getColumns().then((result) => {
      setColumns(result)
    })
  }

  const loadTasks = () => {
    Api.getTasks().then((result) => {
      setTasks(result)
    })
  }

  const getTasksByColumn = (columnId) => {
    return tasks.filter((task) => task.columnId === columnId)
  }

  const addNewTaskHanldler = (columnId) => {
    Api.addTask("New", "Text", columnId).then(loadTasks)
  }

  const onOpenTaskHandler = (taskId) => {
    console.log("taskId", taskId)
  }

  useEffect(() => {
    loadColumns()
    loadTasks()
  }, [])

  return (
    <div className="container-fluid">
      <div className="row align-items-start flex-nowrap overflow-auto">
        {columns.map((column) => {
          return (
            <div key={column.id} className="col">
              <div className="pb-1">
                <div
                  className="card-header"
                  style={{ minWidth: 200 + "px", textAlign: "center", backgroundColor: column.color }}>
                  {column.title}
                </div>
                {getTasksByColumn(column.id).map((task) => {
                  return (
                    <div key={task.id} className="card mt-2 mb-2" style={{ borderLeft: "3px solid " + column.color }}>
                      <div className="card-header">
                        <Link to={"/tasks/" + task.id}> {task.title}</Link>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{task.text}</p>
                      </div>
                    </div>
                  )
                })}
                <div className="d-grid  mt-2">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      addNewTaskHanldler(column.id)
                    }}>
                    <i className="bi bi-plus-circle-dotted"></i>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Kanban

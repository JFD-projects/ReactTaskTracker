import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Api from "../../api/api"
import Draggble from "./dragdrop/draggble"
import Droppable from "./dragdrop/droppable"
import "./kanban.css"

const Kanban = () => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])
  const [currentDragTask, setCurrentDragTask] = useState()

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

  const changeTask = (dropTask, newColumn) => {
    if (dropTask) {
      const findIndex = tasks.findIndex((task) => task.id === dropTask.id)
      if (findIndex !== -1) {
        tasks[findIndex].columnId = newColumn
        setTasks([...tasks])
      }
    }
  }

  useEffect(() => {
    loadColumns()
    loadTasks()
  }, [])

  return (
    <div className="container-fluid">
      <div className="row align-items-stretch flex-nowrap overflow-auto">
        {columns.map((column) => {
          return (
            <Droppable
              key={column.id}
              dragItem={currentDragTask}
              onDrop={() => {
                changeTask(currentDragTask, column.id)
                setCurrentDragTask()
              }}
              className="col">
              <div className="pb-1 h-100">
                <div
                  className="card-header"
                  style={{ minWidth: 200 + "px", textAlign: "center", backgroundColor: column.color }}>
                  {column.title}
                </div>
                <div>
                  {getTasksByColumn(column.id).map((task) => {
                    return (
                      <Draggble
                        onStartDrag={() => {
                          setCurrentDragTask(task)
                        }}
                        onEndDrag={() => {
                          setCurrentDragTask()
                        }}
                        key={task.id}
                        className="card mt-2 mb-2"
                        style={{ borderLeft: "3px solid " + column.color }}>
                        <div className="card-header">
                          <Link to={"/tasks/" + task.id}> {task.title}</Link>
                        </div>
                        <div className="card-body">
                          <p className="card-text">{task.text}</p>
                        </div>
                      </Draggble>
                    )
                  })}
                </div>
                <div className="d-grid  mt-2">
                  <Link to={"/tasks/add?columnId=" + column.id} className="btn btn-light" type="button">
                    <i className="bi bi-plus-circle-dotted"></i>
                  </Link>
                </div>
              </div>
            </Droppable>
          )
        })}
      </div>
    </div>
  )
}

export default Kanban

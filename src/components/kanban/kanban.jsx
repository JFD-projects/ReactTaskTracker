import React, { useEffect, useState } from "react"
import Api from "../../api/api"
import DragDrop from "./dragdrop/dragdrop"
import Draggble from "./dragdrop/draggble"
import Droppable from "./dragdrop/droppable"
import TaskPanel from "./components/taskPanel"
import ColumnHeader from "./components/columnHeader"
import ColumnFooter from "./components/columnFooter"
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

  const changeTask = (dropTaskId, newColumn) => {
    if (dropTaskId) {
      const findIndex = tasks.findIndex((task) => task.id === dropTaskId)
      if (findIndex !== -1) {
        //Todo sent to api
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
        <DragDrop>
          {columns.map((column) => {
            return (
              <Droppable key={column.id} onDrop={(taskId) => changeTask(taskId, column.id)} className="col">
                <div className="pb-1 h-100">
                  <ColumnHeader column={column} />
                  {getTasksByColumn(column.id).map((task) => {
                    return (
                      <Draggble item={task.id} key={task.id}>
                        <TaskPanel task={task} column={column} />
                      </Draggble>
                    )
                  })}
                  <ColumnFooter column={column} />
                </div>
              </Droppable>
            )
          })}
        </DragDrop>
      </div>
    </div>
  )
}

export default Kanban

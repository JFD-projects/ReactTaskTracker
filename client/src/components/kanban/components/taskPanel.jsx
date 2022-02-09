import React from "react"
import { Link } from "react-router-dom"

const TaskPanel = ({ task, column, onDelete }) => {
  return (
    <div className="card mt-2 mb-2" style={{ borderLeft: "3px solid " + column.color }}>
      <div className="card-header">
        <Link to={"/tasks/" + task._id}> {task.title}</Link>
          <i className="bi bi-trash float-end" onClick={()=>onDelete(task)} role="button"></i>
      </div>
      <div className="card-body">
        <p className="card-text">{task.text}</p>
      </div>
    </div>
  )
}

export default TaskPanel
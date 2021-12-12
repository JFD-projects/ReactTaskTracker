import React from "react"

const TaskForm = ({ task, columns, editTaskHandler, onSubmitHandler }) => {
  return (
    <div className="container">
      <form onSubmit={onSubmitHandler}>
        <fieldset>
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
              required
            />
          </div>
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
                <option key={column._id} value={column._id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="taskResponsible" className="form-label">
              Ответственный
            </label>
            <input
              type="text"
              id="taskResponsible"
              className="form-control"
              value={task.responsible}
              onChange={editTaskHandler("responsible")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDeadLine" className="form-label">
              Сроки
            </label>
            <input
              type="date"
              id="taskDeadLine"
              className="form-control"
              value={task.deadLine}
              onChange={editTaskHandler("deadLine")}
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
  )
}

export default TaskForm

import React from 'react'
import { useHistory } from 'react-router-dom'
import TaskForm from './taskForm'
import { useDispatch, useSelector } from 'react-redux'
import { getColumns } from '../../store/columns'
import { getTaskById, updateTask } from '../../store/tasks'
import PropTypes from 'prop-types'

const Task = ({ taskId }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const columns = useSelector(getColumns())

  const task = useSelector(getTaskById(taskId))

  const onSubmitHandler = async (data) => {
    await dispatch(updateTask(data))
    history.replace('/tasks')
  }

  return <>{task && <TaskForm {...{ task, columns, onSubmitHandler }} />}</>
}

Task.propTypes = {
  taskId: PropTypes.string.isRequired
}

export default Task

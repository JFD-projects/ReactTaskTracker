import KanbanTask from '../../components/forms/task'
import { useSelector } from 'react-redux'
import { getTasksLoadingStatus } from '../../store/tasks'
import Loading from '../../components/loading/loading'
import React from 'react'
import { getColumnsLoadingStatus } from '../../store/columns'
import TaskAdd from '../../components/forms/taskAdd'
import { useParams } from 'react-router-dom'

const Task = () => {
  const tasksIsLoading = useSelector(getTasksLoadingStatus())
  const columnsIsLoading = useSelector(getColumnsLoadingStatus())
  const params = useParams()
  const taskId = params.taskId
  if (tasksIsLoading || columnsIsLoading) return <Loading></Loading>
  return taskId ? <KanbanTask taskId={taskId} /> : <TaskAdd />
}
export default Task

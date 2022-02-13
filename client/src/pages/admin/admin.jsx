import React, { useEffect } from 'react'
import './admin.css'
import { useDispatch, useSelector } from 'react-redux'
import Progress from '../../components/progress/progress'
import Loading from '../../components/loading/loading'
import { declensionOfNumbers } from '../../utils/declensionOfNumbers'
import {
  getStatTasks,
  getStatTasksLoadingStatus,
  loadStatTasks
} from '../../store/stat'

const Admin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadStatTasks())
  }, [])

  const isStatLoading = useSelector(getStatTasksLoadingStatus())
  const statData = useSelector(getStatTasks())
  const columns = statData?.columns || []
  const allTasksCount = statData?.allTasksCount || 0

  const calcPercent = (itemsCount, total) => {
    return Math.round((100 * itemsCount) / total)
  }
  if (isStatLoading) return <Loading></Loading>
  return (
    <div className="container px-4 py-5 admin-panel">
      <h1 className="pb-2 border-bottom">Статистика по задачам:</h1>
      <h5 className="mt-3 mb-2">
        Всего: {allTasksCount}{' '}
        {declensionOfNumbers(allTasksCount, ['задача', 'задачи', 'задач'])}
      </h5>
      {columns.map((column) => (
        <div key={column._id}>
          <h6 className="mt-3 mb-2">
            {column.title}: {column.tasksCount}{' '}
            {declensionOfNumbers(column.tasksCount, [
              'задача',
              'задачи',
              'задач'
            ])}
          </h6>
          <Progress
            color={column.color}
            percent={calcPercent(column.tasksCount, allTasksCount)}>
            {calcPercent(column.tasksCount, allTasksCount)}%
          </Progress>
        </div>
      ))}
    </div>
  )
}
export default Admin

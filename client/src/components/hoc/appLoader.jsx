import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { loadColumnsList } from '../../store/columns'
import { loadTasksList } from '../../store/tasks'
import Loading from '../loading/loading'
import { getIsLoggedIn } from '../../store/user'
import PropTypes from 'prop-types'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(getIsLoggedIn())
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadColumnsList())
      dispatch(loadTasksList())
    }
  }, [isLoggedIn])
  if (!isLoggedIn) return <Loading></Loading>
  return children
}

export default AppLoader

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

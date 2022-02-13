import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getIsAdmin } from '../../store/user'
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const isAdmin = useSelector(getIsAdmin())
  const location = useLocation()
  if (!isAdmin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    )
  }

  return children
}
AdminRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default AdminRoute

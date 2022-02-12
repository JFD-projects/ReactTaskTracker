import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ColumnFooter = ({ column }) => {
  return (
    <div className="d-grid  mt-2">
      <Link
        to={'/tasks/add?column=' + column._id}
        className="btn btn-light"
        type="button">
        <i className="bi bi-plus-circle-dotted"></i>
      </Link>
    </div>
  )
}

ColumnFooter.propTypes = {
  column: PropTypes.object.isRequired
}

export default ColumnFooter

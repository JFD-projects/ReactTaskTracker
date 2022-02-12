import React from 'react'
import PropTypes from 'prop-types'

const ColumnHeader = ({ column }) => {
  return (
    <div
      className="card-header mb-2"
      style={{
        minWidth: 200 + 'px',
        textAlign: 'center',
        backgroundColor: column.color
      }}>
      {column.title}
    </div>
  )
}

ColumnHeader.propTypes = {
  column: PropTypes.object.isRequired
}

export default ColumnHeader

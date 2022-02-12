import React from 'react'
import PropTypes from 'prop-types'

const NonEntityTaskPanel = ({ task, color }) => {
  return (
    <div
      className="card py-1 text-center"
      style={{ backgroundColor: color, border: '1px darkgray dashed' }}></div>
  )
}

NonEntityTaskPanel.propTypes = {
  task: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
}

export default NonEntityTaskPanel

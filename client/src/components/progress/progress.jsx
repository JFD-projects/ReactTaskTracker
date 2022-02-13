import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ color, percent, children }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{ backgroundColor: color, width: percent + '%' }}
        role="progressbar">
        {children}
      </div>
    </div>
  )
}

Progress.propTypes = {
  color: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Progress

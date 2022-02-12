import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = ({ children }) => {
  return (
    <div className="modal-body">
      <p>{children}</p>
    </div>
  )
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ModalBody

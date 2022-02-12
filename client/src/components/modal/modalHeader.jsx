import React, { useContext } from 'react'
import { ModalContext } from './modal'
import PropTypes from 'prop-types'

const ModalHeader = ({ children }) => {
  const { onClose } = useContext(ModalContext)
  return (
    <div className="modal-header">
      <h5 className="modal-title">{children}</h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={() => onClose()}></button>
    </div>
  )
}

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ModalHeader

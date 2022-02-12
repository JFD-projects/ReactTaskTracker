import React from 'react'
import PropTypes from 'prop-types'

export const ModalContext = React.createContext({})

const Modal = ({ show, onClose, children }) => {
  const closeHandler = (e) => {
    if (typeof onClose === 'function') {
      onClose()
    }
    console.log('onClose')
  }
  const style = {
    display: show ? 'block' : 'none'
  }

  return (
    <ModalContext.Provider value={{ onClose: closeHandler }}>
      <div className="modal" tabIndex="-1" style={style}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Modal

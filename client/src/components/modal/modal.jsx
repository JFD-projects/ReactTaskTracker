import React from 'react'

export const ModalContext = React.createContext({});

const Modal = ({show, onClose, children}) => {

    const closeHandler = (e) => {
        if (typeof onClose === "function") {
            onClose()
        }
        console.log('onClose')
    }
    const style = {
        display: show ? 'block' : 'none'
    }

    return <ModalContext.Provider value={{onClose: closeHandler}}>
        <div className="modal" tabIndex="-1" style={style}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    </ModalContext.Provider>
}

export default Modal
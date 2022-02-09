import React, {useContext} from 'react'
import {ModalContext} from "./modal";

const ModalHeader = ({children}) => {
    const {onClose} = useContext(ModalContext);
    return <div className="modal-header">
        <h5 className="modal-title">{children}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={() => onClose()}></button>
    </div>
}

export default ModalHeader
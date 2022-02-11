import React, {useState, useRef, useContext} from "react"
import {DragDropContext} from "./dragdrop"

const Droppable = ({children, onDrop, ...rest}) => {
    const dragDropContext = useContext(DragDropContext)
    const [dragover, setDragover] = useState(false)
    const element = useRef()

    const onDropHandler = () => {
        onDrop(dragDropContext.currentDragItem, dragDropContext.nextDropItem, dragDropContext.prevDropItem)
        dragDropContext.setCurrentDragItem()
        setDragover(false)
    }

    const onDragOverHandler = (event) => {
        event.preventDefault()
    }

    const onDragEnterHandler = (event) => {
        event.preventDefault()
        setDragover(true)
    }

    const onDragLeaveHandler = (event) => {
        if (!element.current.contains(event.relatedTarget)) {
            setDragover(false)
        }
    }

    const className =
        rest.className + " droppable" + (dragDropContext.currentDragItem ? " active" : "") + (dragover ? " dragover" : "")

    return (
        <div
            ref={element}
            {...rest}
            className={className}
            onDrop={onDropHandler}
            onDragOver={onDragOverHandler}
            onDragEnter={onDragEnterHandler}
            onDragLeave={onDragLeaveHandler}>
            {children}
        </div>
    )
}

export default Droppable

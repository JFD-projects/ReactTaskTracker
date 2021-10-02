import React, { useState, useRef, useContext } from "react"
import { DragDropContext } from "./dragdrop"

const Droppable = ({ children, onDrop, ...rest }) => {
  const [dragover, setDragover] = useState(false)
  const element = useRef()
  const dragDropContext = useContext(DragDropContext)

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

  const onDropHandler = (event) => {
    onDrop(dragDropContext.currentDragItem)
    dragDropContext.setCurrentDragItem()
    setDragover(false)
  }

  let className = rest.className + " droppable" + (dragDropContext.currentDragItem ? " active" : "")
  className += dragover ? " dragover" : ""
  return (
    <div
      ref={element}
      {...rest}
      onDragOver={onDragOverHandler}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
      className={className}>
      {children}
    </div>
  )
}

export default Droppable

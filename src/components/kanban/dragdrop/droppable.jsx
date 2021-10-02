import React, { useState, useRef } from "react"

const Droppable = ({ children, onDrop, dragItem, ...rest }) => {
  const [dragover, setDragover] = useState(false)
  const element = useRef()

  const onDragOverHandler = (event) => {
    event.preventDefault()
  }

  const onDragEnterHandler = (event) => {
    event.preventDefault()

    setDragover(true)
  }

  const onDragLeaveHandler = (event) => {
    // console.log('relatedTarget', event.relatedTarget)
    if (!element.current.contains(event.relatedTarget)) {
      console.log("setDragover")
      setDragover(false)
    }
  }

  const onDropHandler = (event) => {
    onDrop()
    setDragover(false)
  }

  let className = rest.className + " droppable" + (dragItem ? " active" : "")
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

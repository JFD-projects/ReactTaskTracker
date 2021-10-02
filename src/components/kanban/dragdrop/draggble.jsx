import React, { useState, useContext } from "react"
import { DragDropContext } from "./dragdrop"

const Draggble = ({ children, item, ...rest }) => {
  const [hold, setHold] = useState(false)
  const dragDropContext = useContext(DragDropContext)

  const onDragStartHandle = (event) => {
    dragDropContext.setCurrentDragItem(item)
    setHold(true)
  }

  const onDragEndHandle = (event) => {
    dragDropContext.setCurrentDragItem()
    setHold(false)
  }

  let className = rest.className
  className += hold ? " hold" : ""

  return (
    <div {...rest} draggable className={className} onDragStart={onDragStartHandle} onDragEnd={onDragEndHandle}>
      {children}
    </div>
  )
}

export default Draggble

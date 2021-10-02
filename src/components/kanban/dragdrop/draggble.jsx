import React, { useState } from "react"

const Draggble = ({ children, onStartDrag, onEndDrag, ...rest }) => {
  const [hold, setHold] = useState(false)
  const onDragStartHandle = (event) => {
    onStartDrag()
    setHold(true)
  }

  const onDragEndHandle = (event) => {
    onEndDrag()
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

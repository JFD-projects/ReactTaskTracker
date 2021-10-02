import React, { useState } from "react"

export const DragDropContext = React.createContext()

const DragDrop = ({ children }) => {
  const [currentDragItem, setCurrentDragItem] = useState()
  return <DragDropContext.Provider value={{ currentDragItem, setCurrentDragItem }}>{children}</DragDropContext.Provider>
}

export default DragDrop

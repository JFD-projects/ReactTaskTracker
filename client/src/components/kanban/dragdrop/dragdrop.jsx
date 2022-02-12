import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const DragDropContext = React.createContext()

const DragDrop = ({ children }) => {
  const [currentDragItem, setCurrentDragItem] = useState()
  const [prevDropItem, setPrevDropItem] = useState()
  const [nextDropItem, setNextDropItem] = useState()

  return (
    <DragDropContext.Provider
      value={{
        currentDragItem,
        setCurrentDragItem,
        prevDropItem,
        setPrevDropItem,
        nextDropItem,
        setNextDropItem
      }}>
      {children}
    </DragDropContext.Provider>
  )
}

DragDrop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DragDrop

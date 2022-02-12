import React, {useState} from "react"

export const DragDropContext = React.createContext()

const DragDrop = ({children}) => {
    const [currentDragItem, setCurrentDragItem] = useState()
    const [prevDropItem, setPrevDropItem] = useState()
    const [nextDropItem, setNextDropItem] = useState()

    return <DragDropContext.Provider value={{
        currentDragItem,
        setCurrentDragItem,
        prevDropItem,
        setPrevDropItem,
        nextDropItem,
        setNextDropItem
    }}>{children}</DragDropContext.Provider>
}

export default DragDrop

import React, {useState, useContext, useRef} from "react"
import {DragDropContext} from "./dragdrop"
import NonEntityTaskPanel from "../components/nonEntityTaskPanel";

const Draggble = ({children, item, ...rest}) => {
    const [hold, setHold] = useState(false)
    const [showNonEntityTaskBefore, setShowNonEntityTaskBefore] = useState(false)
    const [showNonEntityTaskAfter, setShowNonEntityTaskAfter] = useState(false)
    const dragDropContext = useContext(DragDropContext)
    const element = useRef()

    const onDragStartHandle = () => {
        dragDropContext.setCurrentDragItem(item)
        setHold(true)
    }

    const onDragEndHandle = () => {
        dragDropContext.setCurrentDragItem()
        setHold(false)
    }

    const onDragEnterHandle = (event) => {
        event.preventDefault()
        if (event.target.closest(".card-body") || event.target.closest(".padding-bottom")) {
            // Наведение (при драге) на нижнюю часть карточки
            setShowNonEntityTaskBefore(false);
            setShowNonEntityTaskAfter(true);
            dragDropContext.setNextDropItem(item);
            dragDropContext.setPrevDropItem();

        } else if (event.target.closest(".card-header") || event.target.closest(".padding-top")) {
            // Наведение (при драге) на верхнюю часть карточки
            setShowNonEntityTaskBefore(true);
            setShowNonEntityTaskAfter(false);
            dragDropContext.setNextDropItem();
            dragDropContext.setPrevDropItem(item);
        }
    }

    const onDragLeaveHandler = (event) => {
        // Наведение за пределы карточки (при драге)
        if (!element.current.contains(event.relatedTarget)) {
            setShowNonEntityTaskBefore(false);
            setShowNonEntityTaskAfter(false);
            dragDropContext.setNextDropItem();
            dragDropContext.setPrevDropItem();
        }
    }

    let className = rest.className + (hold ? " hold" : "")

    return (
        <div
            ref={element}
            {...rest}
            draggable
            className={className}
            onDragStart={onDragStartHandle}
            onDragEnd={onDragEndHandle}
            onDragEnter={onDragEnterHandle}
            onDragLeave={onDragLeaveHandler}
        >
            {showNonEntityTaskBefore && !hold && <NonEntityTaskPanel color={rest.color}></NonEntityTaskPanel>}
            <div className={"pt-1 padding-top"}></div>
            {children}
            <div className={"pb-1 padding-bottom"}></div>
            {showNonEntityTaskAfter && !hold && <NonEntityTaskPanel color={rest.color}></NonEntityTaskPanel>}
        </div>


    )
}

export default Draggble

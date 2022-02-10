import React, {useState} from "react"
import DragDrop from "./dragdrop/dragdrop"
import Draggble from "./dragdrop/draggble"
import Droppable from "./dragdrop/droppable"
import TaskPanel from "./components/taskPanel"
import ColumnHeader from "./components/columnHeader"
import ColumnFooter from "./components/columnFooter"
import "./kanban.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../modal"
import {useDispatch, useSelector} from "react-redux";
import {getColumns} from "../../store/columns";
import {deleteTask, getTasks, updateTask} from "../../store/tasks";

const Kanban = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(getTasks())
    const columns = useSelector(getColumns())
    const [modalShow, setModalShow] = useState(false)
    const [taskForDeletion, setTaskForDeletion] = useState({})

    const filterTasksByColumn = (column) => {
        return tasks.filter((task) => String(task.column) === String(column))
    }

    const changeTask = (dropTaskId, newColumn) => {
        if (dropTaskId) {
            const findIndex = tasks.findIndex((task) => task._id === dropTaskId)
            if (findIndex !== -1) {
                dispatch(updateTask({...tasks[findIndex], column: newColumn}))
            }
        }
    }

    const showModalDeletingTask = (task) => {
        setModalShow(true)
        setTaskForDeletion(task)
    }
    const deleteTaskHandler = async () => {
        const taskId = taskForDeletion?._id;
        if (taskId) {
            dispatch(deleteTask(taskId))
        }
        setModalShow(false)
        setTaskForDeletion({})
    }
    const modalCloseHandler = () => {
        setModalShow(false)
    }

    if(!columns || !tasks) return "Loading..."

    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-stretch flex-nowrap overflow-auto">
                    <DragDrop>
                        {columns.map((column) => {
                            return (
                                <Droppable key={column._id} onDrop={(taskId) => changeTask(taskId, column._id)}
                                           className="col">
                                    <div className="pb-1 h-100">
                                        <ColumnHeader column={column}/>
                                        {filterTasksByColumn(column._id).map((task) => {
                                            return (
                                                <Draggble item={task._id} key={task._id}>
                                                    <TaskPanel task={task} column={column}
                                                               onDelete={showModalDeletingTask}/>
                                                </Draggble>
                                            )
                                        })}
                                        <ColumnFooter column={column}/>
                                    </div>
                                </Droppable>
                            )
                        })}
                    </DragDrop>
                </div>
            </div>
            <Modal show={modalShow} onClose={modalCloseHandler}>
                <ModalHeader>Удаление задачи</ModalHeader>
                <ModalBody>Вы действительно хотите удалить задачу "{taskForDeletion?.title}"?</ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-danger" onClick={deleteTaskHandler}>Удалить</button>
                    <button type="button" className="btn btn-primary" onClick={modalCloseHandler}>Отмена</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Kanban

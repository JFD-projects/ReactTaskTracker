import React, {useEffect, useState} from "react"
import DragDrop from "./dragdrop/dragdrop"
import Draggble from "./dragdrop/draggble"
import Droppable from "./dragdrop/droppable"
import TaskPanel from "./components/taskPanel"
import ColumnHeader from "./components/columnHeader"
import ColumnFooter from "./components/columnFooter"
import "./kanban.css"
import columnService from "../../services/columnService";
import taskService from "../../services/taskService";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../modal"

const Kanban = () => {
    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [taskForDeletion, setTaskForDeletion] = useState({})

    const loadColumns = () => {
        columnService.fetchAll().then(({content: data}) => {
            const arr = Object.keys(data).map((key) => data[key]).filter(item => item._id && item.title)
            setColumns(arr)
        })
    }

    const loadTasks = () => {
        taskService.fetchAll().then(({content: data}) => {
            setTasks(data)
        })
    }

    const getTasksByColumn = (column) => {
        return tasks.filter((task) => String(task.column) === String(column))
    }

    const changeTask = (dropTaskId, newColumn) => {
        if (dropTaskId) {
            const findIndex = tasks.findIndex((task) => task._id === dropTaskId)
            if (findIndex !== -1) {
                tasks[findIndex].column = newColumn

                taskService.update(dropTaskId, tasks[findIndex]).then((data) => {
                })
                setTasks([...tasks])
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
            await taskService.delete(taskId)
            setTasks(tasks.filter(task => task._id !== taskId))
        }
        setModalShow(false)
        setTaskForDeletion({})
    }
    const modalCloseHandler = () => {
        setModalShow(false)
    }

    useEffect(() => {
        loadColumns()
        loadTasks()
    }, [])

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
                                        {getTasksByColumn(column._id).map((task) => {
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

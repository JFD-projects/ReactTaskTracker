import KanbanTask from "../../components/forms/task"
import {useSelector} from "react-redux";
import {getTasksLoadingStatus} from "../../store/tasks";
import Loading from "../../components/loading/loading";
import React from "react";

const Task = ({taskId}) => {

    const tasksIsLoading = useSelector(getTasksLoadingStatus())
    if (tasksIsLoading) return <Loading></Loading>
    return <KanbanTask taskId={taskId}/>
}
export default Task

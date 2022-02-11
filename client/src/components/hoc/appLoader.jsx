import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react"
import {getColumnsLoadingStatus, loadColumnsList} from "../../store/columns";
import {getTasksLoadingStatus, loadTasksList} from "../../store/tasks";
import Loading from "../loading/loading";
import {getIsLoggedIn} from "../../store/user";

const AppLoader = ({children}) => {
    const dispatch = useDispatch()
    const columnsIsLoading = useSelector(getColumnsLoadingStatus())
    const tasksIsLoading = useSelector(getTasksLoadingStatus())
    const isLoggedIn = useSelector(getIsLoggedIn())
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadColumnsList())
            dispatch(loadTasksList())
        }
    }, [isLoggedIn])
    if (!isLoggedIn) return <Loading></Loading>
    return children
}

export default AppLoader

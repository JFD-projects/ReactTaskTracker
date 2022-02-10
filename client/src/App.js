import React from "react"
import {Switch, Route, Router} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import Login from "./pages/login/login"
import Main from "./pages/main/main"
import Register from "./pages/register/register"
import Task from "./pages/tasks/task"
import Tasks from "./pages/tasks/tasks"
import MainTemplate from "./templates/main/mainTemplate"
import AuthTemplate from "./templates/auth/authTemplate"
import TaskAdd from "./components/forms/taskAdd"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppLoader from "./components/hoc/appLoader";
import history from "./utils/history"
import ProtectedRoute from "./components/hoc/protectedRoute";


function App() {
    return (
        <>
            <Router history={history}>
                <AppLoader>
                    <Switch>
                        <Route path="/" exact component={() => <MainTemplate content={Main}/>}/>
                        <Route path="/login" component={() => <AuthTemplate content={Login}/>}/>
                        <Route path="/register" component={() => <AuthTemplate content={Register}/>}/>
                        <ProtectedRoute>
                            <Route path="/tasks/add" component={() => <MainTemplate content={TaskAdd}/>}/>
                            <Route path="/tasks/:taskId"
                                   component={(...rest) => <MainTemplate content={Task} {...rest} />}/>
                            <Route path="/tasks" component={() => <MainTemplate content={Tasks}/>}/>
                        </ProtectedRoute>
                    </Switch>
                </AppLoader>
            </Router>
            <ToastContainer/>
        </>
    )
}

export default App

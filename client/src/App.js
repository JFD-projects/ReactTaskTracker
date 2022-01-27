import React from "react"
import { Switch, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import Login from "./pages/login/login"
import Main from "./pages/main/main"
import Register from "./pages/register/register"
import Task from "./pages/tasks/task"
import Tasks from "./pages/tasks/tasks"
import { BrowserRouter as Router } from "react-router-dom"
import MainTemplate from "./templates/main/mainTemplate"
import AuthTemplate from "./templates/auth/authTemplate"
import TaskAdd from "./components/forms/taskAdd"
import {AuthProvider} from "./hooks/useAuth";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Switch>
          <Route path="/" exact component={() => <MainTemplate content={Main} />} />
          <Route path="/login" component={() => <AuthTemplate content={Login} />} />
          <Route path="/register" component={() => <AuthTemplate content={Register} />} />
          <Route path="/tasks/add" component={() => <MainTemplate content={TaskAdd} />} />
          <Route path="/tasks/:taskId" component={(...rest) => <MainTemplate content={Task} {...rest} />} />
          <Route path="/tasks" component={() => <MainTemplate content={Tasks} />} />
        </Switch>
        </AuthProvider>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App

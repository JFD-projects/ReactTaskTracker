import React from "react"
import { Switch, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import Login from "./pages/login/login"
import Main from "./pages/main/main"
import Register from "./pages/register/register"
import NewTask from "./pages/tasks/new"
import Task from "./pages/tasks/task"
import Tasks from "./pages/tasks/tasks"

import { BrowserRouter as Router } from "react-router-dom"
import MainTemplate from "./templates/main/mainTemplate"
import LightTemplate from "./templates/light/lightTemplate"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={() => <MainTemplate content={Main} />} />
          <Route path="/login" component={() => <LightTemplate content={Login} />} />
          <Route path="/register" component={() => <LightTemplate content={Register} />} />
          <Route path="/tasks/new/:columnId" component={() => <MainTemplate content={NewTask} />} />
          <Route path="/tasks/:taskId" component={() => <MainTemplate content={Task} />} />
          <Route path="/tasks" component={() => <MainTemplate content={Tasks} />} />
        </Switch>
      </Router>
    </>
  )
}

export default App

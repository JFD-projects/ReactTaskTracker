import React from "react"
import { Switch, Route } from "react-router-dom"
import Login from "../pages/login/login"
import Main from "../pages/main/main"
import Register from "../pages/register/register"
import Tasks from "../pages/tasks/tasks"

const Content = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/tasks" component={Tasks} />
    </Switch>
  )
}

export default Content

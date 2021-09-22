import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import Header from "./layouts/header"
import Footer from "./layouts/footer"
import Content from "./layouts/content"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Content />
        <Footer />
      </Router>
    </>
  )
}

export default App

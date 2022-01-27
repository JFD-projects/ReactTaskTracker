import React from "react"
import Footer from "./footer"
import Header from "./header"
const MainTemplate = ({ content, children, ...rest }) => {
  return (
    <>
      <Header />
      {content ? content({ ...rest }) : children}
      <Footer />
    </>
  )
}

export default MainTemplate

import React from "react"
import Footer from "./footer"
import Header from "./header"
const MainTemplate = ({ content, children }) => {
  return (
    <>
      <Header />
      {content ? content() : children}
      <Footer />
    </>
  )
}

export default MainTemplate

import React from 'react'
import Footer from './footer'
import Header from './header'
import PropTypes from 'prop-types'

const MainTemplate = ({ content, children, ...rest }) => {
  return (
    <>
      <Header />
      {content ? content({ ...rest }) : children}
      <Footer />
    </>
  )
}
MainTemplate.propTypes = {
  content: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default MainTemplate

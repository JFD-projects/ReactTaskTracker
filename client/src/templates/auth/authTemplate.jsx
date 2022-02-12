import React from 'react'
import Footer from './footer'
import Header from './header'
import PropTypes from 'prop-types'

const AuthTemplate = ({ content, children }) => {
  return (
    <>
      <Header />
      {content ? content() : children}
      <Footer />
    </>
  )
}

AuthTemplate.propTypes = {
  content: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthTemplate

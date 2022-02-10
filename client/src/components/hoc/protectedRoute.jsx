import React from "react"
import {Redirect, useLocation} from "react-router-dom"
import PropTypes from "prop-types"
import {getIsLoggedIn} from "../../store/user"
import {useSelector} from "react-redux"

const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const location = useLocation()

    if (!isLoggedIn) return <Redirect to={{pathname: "/login", state: {from: location.pathname}}}/>
    return children
}
ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default ProtectedRoute

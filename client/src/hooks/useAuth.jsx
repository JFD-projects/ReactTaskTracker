import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import {toast} from "react-toastify"
import axios from "axios"
import userService from "../services/userService"
import localStorageService, {setTokens, clearTokens} from "../services/localStorageService"
import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.apiEndPoint
})

const AuthContext = React.createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState(null)

    const isAuth = () => {
        let userId = localStorageService.getUserId();
        return userId ? true : false;
    }

    const logOut = async () => {
        const url = `auth/logout`
        clearTokens()
        setCurrentUser({})
        await httpAuth.get(url, {
            refreshToken: localStorageService.getRefreshToken()
        })
    }

    const signUp = async ({email, password, name, ...rest}) => {
        const url = `auth/signup`
        try {
            const {data} = await httpAuth.post(url, {
                name,
                email,
                password
            })
            setTokens(data)
            await createUser(data.localId, {email, ...rest})
        } catch (e) {
            errorCatcher(e)
            const {message} = e.response.data
            const errorObject = {error: message}
            throw errorObject
        }
    }

    const signIn = async ({email, password}) => {
        const url = `auth/signin`
        try {
            const {data} = await httpAuth.post(url, {
                email,
                password
            })
            setTokens(data)
            const {id: user_id} = data
            const {content} = await userService.get(user_id)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
            const {message} = e.response.data
            const errorObject = {error: message}
            throw errorObject
        }
    }

    const createUser = async (id, data) => {
        try {
            const {content} = await userService.update(id, {...data, _id: id})
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        }
    }

    useEffect(() => {
        if (error !== null) toast(error)
        setError(null)
    }, [error])

    function errorCatcher(error) {
        const {message} = error.response.data
        setError(message)
    }

    return (
        <AuthContext.Provider value={{signUp, signIn, currentUser, isAuth, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

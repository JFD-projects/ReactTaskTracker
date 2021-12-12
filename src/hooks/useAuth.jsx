import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import {toast} from "react-toastify"
import axios from "axios"
import userService from "../services/userService"
import {setTokens, getRefreshToken, clearTokens} from "../services/localStorageService"

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState(null)

    const throwException = (message) => {
        const errorObject = {error: message}
        throw errorObject
    }

    const isAuth = () => {
        return currentUser?._id ? true : false
    }

    const logOut = () => {
        clearTokens()
        setCurrentUser({})
    }

    const signUp = async ({email, password, ...rest}) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const {data} = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser(data.localId, {email, ...rest})
        } catch (e) {
            errorCatcher(e)
            const {message} = e.response.data.error

            switch (true) {
                case message === "EMAIL_EXISTS":
                    throwException("Пользователь с таким email уже существует");
                    break;
                case message.startsWith('WEAK_PASSWORD'):
                    throwException("Пользователь с таким email уже существует");
                    break;
                default:
                    throwException(message);
            }
        }
    }


    const refreshToken = getRefreshToken()

    useEffect( () => {
        const restoreAuth = async (refreshToken) => {
            const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`
            try {
                const {data} = await httpAuth.post(url, {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                })
                setTokens({refreshToken: data.refresh_token, idToken: data.id_token, expiresIn: data.expires_in, userId: data.user_id})
                const {user_id} = data
                const {content} = await userService.get(user_id)
                setCurrentUser(content)
            } catch (e) {
                errorCatcher(e)
            }
        }
        if (refreshToken) {
            restoreAuth(refreshToken)
        }
    }, [refreshToken])

    const prepareThrowError = (message) => {
        const errorObject = {
            error: message
        }
        return errorObject
    }

    const signIn = async ({email, password}) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const {data} = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            const {localId: user_id} = data
            const {content} = await userService.get(user_id)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
            const {message} = e.response.data.error

            switch (true) {
                case message === "EMAIL_NOT_FOUND":
                case message === "INVALID_PASSWORD":
                    throw prepareThrowError("Пароль или email неверный")
                case message === "USER_DISABLED":
                    throw prepareThrowError(
                        "Учетная запись пользователя отключена администратором"
                    )
                case message.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER"):
                    throw prepareThrowError(
                        "Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже."
                    )
                default:
                    throw prepareThrowError("Неизвесная ошибка")
            }
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

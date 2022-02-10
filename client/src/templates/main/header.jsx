import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn, logOut} from "../../store/user";


const Header = () => {
    const dispatch = useDispatch()
    const logoutHandler = (event) => {
        dispatch(logOut())
    }
    const isLoggedIn = useSelector(getIsLoggedIn())

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    ReactTaskTracker
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {isLoggedIn && (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/tasks" activeClassName="active">
                                        Мои задачи
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                    <span className="nav-link" onClick={logoutHandler} role="button">
                      Выход
                    </span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <div className="navbar-nav me-auto mb-2 mb-md-0"></div>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login" activeClassName="active">
                                            Вход
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register" activeClassName="active">
                                            Регистрация
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header

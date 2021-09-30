import React, { useState } from "react"
import Api from "../../api/api"
import "./login.css"
import Loading from "../../components/loading/loading"
import Auth from "../../services/auth"
import { useHistory } from "react-router-dom"

const Login = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemeber] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()

    setError()
    setLoading(true)
    Api.login(login, password)
      .then((user) => {
        const auth = new Auth()
        auth.signin(user.name, user.token, remember)
        history.replace("/")
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="text-center form-signin-containter">
      <Loading hidden={!loading} />
      <main className="form-signin">
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">Вход</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="Логин"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              required
            />
            <label htmlFor="login">Логин</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value={remember} onChange={(event) => setRemeber(event.target.checked)} />{" "}
              Запомнить меня
            </label>
          </div>
          <div className="mb-3">
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Войти
            </button>
          </div>
          <div className="mb-3">
            <a href="/register"> Регистрация</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login

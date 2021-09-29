import React from "react"
import "./login.css"

const Login = () => {
  return (
    <div className="text-center form-signin-containter">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Вход</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="Логин" />
            <label htmlFor="floatingInput">Логин</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль" />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Запомнить меня
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

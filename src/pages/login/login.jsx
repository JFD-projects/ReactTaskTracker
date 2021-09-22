import React from "react"
import "./login.css"

const Login = () => {
  return (
    <div className="text-center form-signin-containter">
      <main class="form-signin">
        <form>
          <h1 class="h3 mb-3 fw-normal">Вход</h1>

          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="Логин" />
            <label for="floatingInput">Логин</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Пароль" />
            <label for="floatingPassword">Пароль</label>
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Запомнить меня
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Войти
          </button>
          <p class="mt-5 mb-3 text-muted">© 2021</p>
        </form>
      </main>
    </div>
  )
}

export default Login

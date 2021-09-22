import React from "react"
import "./register.css"

const Register = () => {
  return (
    <div className="text-center form-signup-containter">
      <main class="form-signup">
        <form>
          <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Имя" />
            <label for="floatingInput">Имя</label>
          </div>
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="Логин" />
            <label for="floatingInput">Логин</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Пароль" />
            <label for="floatingPassword">Пароль</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Зарегистрироваться
          </button>
          <p class="mt-5 mb-3 text-muted">© 2021</p>
        </form>
      </main>
    </div>
  )
}

export default Register

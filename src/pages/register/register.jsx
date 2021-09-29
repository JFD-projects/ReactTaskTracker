import React from "react"
import "./register.css"

const Register = () => {
  return (
    <div className="text-center form-signup-containter">
      <main className="form-signup">
        <form>
          <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="Имя" />
            <label htmlFor="floatingInput">Имя</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="Логин" />
            <label htmlFor="floatingInput">Логин</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль" />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>
          <div className="mb-3">
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Зарегистрироваться
            </button>
          </div>
          <div className="mb-3">
            <a href="/login"> Авторизация</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Register

import React, { useState } from "react"
import "./register.css"
import { Formik, Field, Form } from "formik"
import Api from "../../api/api"
import Auth from "../../services/auth"
import { useHistory } from "react-router-dom"
import Loading from "../../components/loading/loading"

const Register = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubminHandler = (values) => {
    setError()
    setLoading(true)
    Api.register(values)
      .then((user) => {
        const auth = new Auth()
        auth.signin(user.name, user.token)
        setTimeout(() => {
          history.replace("/")
        })
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="text-center form-signup-containter">
      <Loading hidden={!loading} />
      <main className="form-signup">
        <Formik initialValues={{ name: "", login: "", password: "" }} onSubmit={onSubminHandler}>
          <Form>
            <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="form-floating">
              <Field name="name" type="text" className="form-control" id="floatingInput" placeholder="Имя" />
              <label htmlFor="floatingInput">Имя</label>
            </div>
            <div className="form-floating">
              <Field name="login" type="text" className="form-control" id="floatingInput" placeholder="Логин" />
              <label htmlFor="floatingInput">Логин</label>
            </div>
            <div className="form-floating">
              <Field
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Пароль"
              />
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
          </Form>
        </Formik>
      </main>
    </div>
  )
}

export default Register

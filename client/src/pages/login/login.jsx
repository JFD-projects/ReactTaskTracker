import React from 'react'
import './login.css'
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthError, login } from '../../store/user'
import { Link } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const errors = useSelector(getAuthError())

  const signInSchema = Yup.object().shape({
    email: Yup.string().required('Поле обязательное для заполнения'),
    password: Yup.string().required('Поле обязательное для заполнения')
  })

  const onSubmitHandler = async (values) => {
    dispatch(login(values))
  }

  return (
    <div className="text-center form-signin-containter">
      <main className="form-signin">
        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          onSubmit={onSubmitHandler}
          validationSchema={signInSchema}>
          {({ errors: formicErrors, touched }) => (
            <Form>
              <h1 className="h3 mb-3 fw-normal">Вход</h1>

              {errors && (
                <div className="alert alert-danger" role="alert">
                  {errors}
                </div>
              )}

              <div className="form-floating input-tooltip">
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={
                    'form-control ' +
                    (formicErrors.email && touched.email ? 'is-invalid' : '')
                  }
                  placeholder="email"
                />
                {formicErrors.email && touched.email && (
                  <div className="tooltiptext">{formicErrors.email}</div>
                )}
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating input-tooltip">
                <Field
                  name="password"
                  type="password"
                  className={
                    'form-control ' +
                    (formicErrors.password && touched.password
                      ? 'is-invalid'
                      : '')
                  }
                  id="password"
                  placeholder="Пароль"
                />
                <label htmlFor="floatingPassword">Пароль</label>
                {formicErrors.password && touched.password && (
                  <div className="tooltiptext">{formicErrors.password}</div>
                )}
              </div>

              <div className="form-check form-check-inline mb-3">
                <Field
                  name="rememberMe"
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Запомнить меня
                </label>
              </div>
              <div className="mb-3">
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Войти
                </button>
              </div>
              <div className="mb-3">
                <Link to={'/register'}>Регистрация</Link>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default Login

import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  getAuthError,
  restorePassword,
  setPassword
} from '../../store/user'
import { Link } from 'react-router-dom'
import './restorePassword.css'

const RestorePassword = () => {
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const errors = useSelector(getAuthError())
  const [email, setEmail] = useState()

  useEffect(() => {
    dispatch(clearErrors())
  }, [])

  const step1Schema = Yup.object().shape({
    email: Yup.string().required('Поле обязательное для заполнения')
  })
  const step2Schema = Yup.object().shape({
    code: Yup.string().required('Поле обязательное для заполнения'),
    newPassword: Yup.string().required('Поле обязательное для заполнения')
  })

  const onSubmitStep1Handler = async (values) => {
    setEmail(values.email)
    dispatch(restorePassword(values))
    setStep(2)
  }
  const onSubmitStep2Handler = async (values) => {
    dispatch(setPassword({ ...values, email }))
  }

  return (
    <div className="text-center form-restore-containter">
      <main className="form-restore">
        {step === 1 && (
          <Formik
            initialValues={{ email: '' }}
            onSubmit={onSubmitStep1Handler}
            validationSchema={step1Schema}>
            {({ errors: formicErrors, touched }) => (
              <Form>
                <h1 className="h3 mb-3 fw-normal">Восстановление пароля</h1>

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
                <div className="mb-3">
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit">
                    Далее
                  </button>
                </div>
                <div className="mb-3">
                  <Link to={'/login'}>Авторизация</Link>
                  <Link className="ms-2" to={'/register'}>
                    Регистрация
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {step === 2 && (
          <Formik
            initialValues={{ code: '', newPassword: '' }}
            onSubmit={onSubmitStep2Handler}
            validationSchema={step2Schema}>
            {({ errors: formicErrors, touched }) => (
              <Form>
                <h1 className="h3 mb-3 fw-normal">Восстановление пароля</h1>
                <p>На вашу почту был отправлен код восстановления пароля</p>
                {errors && (
                  <div className="alert alert-danger" role="alert">
                    {errors}
                  </div>
                )}

                <div className="form-floating input-tooltip">
                  <Field
                    name="code"
                    type="code"
                    id="code"
                    className={
                      'form-control ' +
                      (formicErrors.code && touched.code ? 'is-invalid' : '')
                    }
                    placeholder="code"
                  />
                  {formicErrors.code && touched.code && (
                    <div className="tooltiptext">{formicErrors.code}</div>
                  )}
                  <label htmlFor="code">Код</label>
                </div>
                <div className="form-floating input-tooltip">
                  <Field
                    name="newPassword"
                    type="password"
                    className={
                      'form-control ' +
                      (formicErrors.newPassword && touched.newPassword
                        ? 'is-invalid'
                        : '')
                    }
                    id="newPassword"
                    placeholder="Новый пароль"
                    autoComplete="new-password"
                  />
                  <label htmlFor="newPassword">Пароль</label>
                  {formicErrors.newPassword && touched.newPassword && (
                    <div className="tooltiptext">
                      {formicErrors.newPassword}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit">
                    Обновить пароль
                  </button>
                </div>
                <div className="mb-3">
                  <Link to={'/login'}>Авторизация</Link>
                  <Link className="ms-2" to={'/register'}>
                    Регистрация
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </main>
    </div>
  )
}

export default RestorePassword

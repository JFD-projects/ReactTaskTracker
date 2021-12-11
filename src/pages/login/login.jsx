import React, {useState} from "react"
import Api from "../../api/api"
import "./login.css"
import Loading from "../../components/loading/loading"
import Auth from "../../services/auth"
import {useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth";
import * as Yup from "yup"
import {Formik, Field, Form} from "formik";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemeber] = useState(false)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const {signIn} = useAuth()

    const history = useHistory()

    const submitHandler = async (event) => {
        event.preventDefault()

        setErrors()
        setLoading(true)

        try {
            await signIn({email, password})
            history.push("/")
        } catch (e) {
            console.log(e)
            setErrors(e.error)
        } finally {
            setLoading(false)
        }
    }

    const signinSchema = Yup.object().shape({
        email: Yup.string().required('Поле обязательное для заполнения'),
        password: Yup.string().required('Поле обязательное для заполнения'),
    });

    const onSubminHandler = async (values) => {
        console.log(values)
        setErrors()
        /* setLoading(true)
         try {
           await signUp(values)
           history.push("/")
         } catch (e) {
           setErrors(e.error)
         } finally {
           setLoading(false)
         }*/
    }

    return (
        <div className="text-center form-signin-containter">
            <Loading hidden={!loading}/>
            <main className="form-signin">
                <Formik initialValues={{email: "", password: "", rememberMe: false}} onSubmit={onSubminHandler}
                        validationSchema={signinSchema}>
                    {({errors: formicErrors, touched}) => (
                        <Form onSubmit={submitHandler}>
                            <h1 className="h3 mb-3 fw-normal">Вход</h1>

                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    {errors}
                                </div>
                            )}

                            <div className="form-floating input-tooltip">
                                <Field name="email" type="email" id="email"
                                       className={"form-control " + (formicErrors.email && touched.email ? "is-invalid" : "")}
                                       placeholder="email"/>
                                {formicErrors.email && touched.email ? (
                                    <div className="tooltiptext">{formicErrors.email}</div>
                                ) : null}
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating input-tooltip">
                                <Field
                                    name="password"
                                    type="password"
                                    className={"form-control " + (formicErrors.password && touched.password ? "is-invalid" : "")}
                                    id="password"
                                    placeholder="Пароль"
                                />
                                <label htmlFor="floatingPassword">Пароль</label>
                                {formicErrors.password && touched.password ? (
                                    <div className="tooltiptext">{formicErrors.password}</div>
                                ) : null}
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
                                <a href="/register"> Регистрация</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    )
}

export default Login

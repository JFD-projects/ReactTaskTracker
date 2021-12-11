import React, {useState} from "react"
import "./register.css"
import {Formik, Field, Form} from "formik"
import {useHistory} from "react-router-dom"
import Loading from "../../components/loading/loading"
import {useAuth} from "../../hooks/useAuth";
import * as Yup from 'yup';

const Register = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState("")
    const {signUp} = useAuth()

    const onSubminHandler = async (values) => {
        setErrors()
        setLoading(true)
        try {
            await signUp(values)
            history.push("/")
        } catch (e) {
            setErrors(e.error)
        } finally {
            setLoading(false)
        }
    }

    const signupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Имя должно состоять минимум их 2-х символов')
            .max(50, 'Имя должно состоять максимум их 50-ти символов')
            .required('Поле обязательное для заполнения'),
        email: Yup.string().email('Некорректный email').max(255, 'Максимальная длинна email - 255 символов').required('Поле обязательное для заполнения'),
        password: Yup.string().required('Поле обязательное для заполнения').min(6, 'Пароль должен состоять минимум из 6-ти символов'),
    });

    return (
        <div className="text-center form-signup-containter">
            <Loading hidden={!loading}/>
            <main className="form-signup">
                <Formik initialValues={{name: "", email: "", password: ""}} onSubmit={onSubminHandler}
                        validationSchema={signupSchema}>
                    {({errors: formicErrors, touched}) => (
                        <Form>
                            <h1 className="h3 mb-3 fw-normal">Регистрация</h1>
                            {errors && (
                                <div className="alert alert-danger" role="alert">
                                    {errors}
                                </div>
                            )}
                            <div className="form-floating input-tooltip">
                                <Field name="name" type="text" id="first_name" className={"form-control " + (formicErrors.name && touched.name ? "is-invalid" : "")}
                                       placeholder="Имя"/>
                                <label htmlFor="first_name">Имя</label>
                                {formicErrors.name && touched.name ? (
                                    <div className="tooltiptext">{formicErrors.name}</div>
                                ) : null}
                            </div>

                            <div className="form-floating input-tooltip">
                                <Field name="email" type="email" id="email" className={"form-control " + (formicErrors.email && touched.email ? "is-invalid" : "")}
                                       placeholder="email"/>
                                <label htmlFor="email">Email</label>
                                {formicErrors.email && touched.email ? (
                                    <div className="tooltiptext">{formicErrors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-floating input-tooltip">
                                <Field
                                    name="password"
                                    type="password"
                                    className={"form-control " + (formicErrors.password && touched.password ? "is-invalid" : "")}
                                    id="password"
                                    placeholder="Пароль"
                                />
                                <label htmlFor="password">Пароль</label>
                                {formicErrors.password && touched.password ? (
                                    <div className="tooltiptext">{formicErrors.password}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <button className="w-100 btn btn-lg btn-primary" type="submit">
                                    Зарегистрироваться
                                </button>
                            </div>
                            <div className="mb-3">
                                <a href="/login"> Авторизация</a>
                            </div>
                        </Form>)}
                </Formik>
            </main>
        </div>
    )
}

export default Register

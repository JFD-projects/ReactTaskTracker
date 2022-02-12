import React from "react"
import * as Yup from "yup";
import {Formik, Field, Form} from "formik";

const TaskForm = ({task, columns, onSubmitHandler}) => {

    const signInSchema = Yup.object().shape({
        title: Yup.string().required('Поле обязательное для заполнения'),
    });

    return (
        <div className="container">
            <Formik initialValues={task} onSubmit={onSubmitHandler} validationSchema={signInSchema}>
                {({errors: formicErrors, touched}) => (
                    <Form>
                        <fieldset>
                            <div className="mb-3">
                                <label htmlFor="taskTitle" className="form-label">
                                    Заголовок
                                </label>
                                <Field name="title" type="text"
                                       className={"form-control " + (formicErrors.title && touched.title ? "is-invalid" : "")}
                                       placeholder="Заголовок"/>
                                <div className="invalid-feedback">
                                    {formicErrors.title}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskStatus" className="form-label">
                                    Статус
                                </label>
                                <Field as="select" name="column" className="form-select">
                                    {columns.map((column) => (
                                        <option key={column._id} value={column._id}>
                                            {column.title}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskResponsible" className="form-label">
                                    Ответственный
                                </label>
                                <Field name="responsible" type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDeadLine" className="form-label">
                                    Сроки
                                </label>
                                <Field name="deadLine" type="date" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDescription" className="form-label">
                                    Описание задачи
                                </label>
                                <Field as="textarea" name="text" className="form-control" rows="3"/>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Сохранить
                            </button>
                        </fieldset>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default TaskForm

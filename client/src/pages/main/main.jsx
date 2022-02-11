import React, {useEffect, useState} from "react"
import {useArraySlider} from "../../hooks/useArraySlider";
import img_spa from '../../assets/images/spa.jpg';
import img_react from '../../assets/images/react.jpg';
import img_redux from '../../assets/images/redux.jpg';
import img_bootstrap from '../../assets/images/bootstrap.jpg';
import img_rest from '../../assets/images/rest.jpg';
import img_mongodb from '../../assets/images/mongodb.jpg';
import img_express from '../../assets/images/express.jpg';
import img_node from '../../assets/images/node.jpg';
import './main.css'
import randomImagesService from "../../services/randomImagesService";

const Main = () => {
    const [value, start, stop] = useArraySlider(3000, ['spa', 'react', 'redux', 'bootstrap', 'rest', 'mongodb', 'express', 'node'])
    const [randomCatImage, setRandomCatImage] = useState()
    const [randomFoxImage, setRandomFoxImage] = useState()
    useEffect(() => {
        const index = start()
        randomImagesService.getRandomCat().then(({data}) => {
            setRandomCatImage(data.file)
        })
        randomImagesService.getRandomFox().then(({data}) => {
            setRandomFoxImage(data.image)
        })
        return () => stop(index);
    }, [])

    const getClass = (panelName) => {
        return (panelName === value) ? 'shadow bg-white' : ''
    }
    return (
        <>
            <div className="container px-4 py-5" id="icon-grid">
                <h1 className="pb-2 border-bottom">Дипломный проект</h1>
                <p>Канбан доска, которая делает вашу жизнь эффективной. Простой в использовании инструмент для
                    управления
                    задачами</p>

                <h3 className="pb-2 border-bottom pt-4">Стек технологий:</h3>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-4">
                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('spa')}>
                        <div>
                            <h4 className="fw-bold my-2">SPA</h4>
                            <img src={img_spa} className="img-fluid border border-5 rounded-3"/>
                            <p>Одностраничное приложение (англ. single page application, SPA) — это веб-приложение,
                                использующий единственный HTML-документ как оболочку для всех веб-страниц и организующий
                                взаимодействие с пользователем через динамически подгружаемый контент</p>
                        </div>
                    </div>

                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('react')}>
                        <div>
                            <h4 className="fw-bold my-2">React</h4>
                            <img src={img_react} className="img-fluid border border-5 rounded-3"/>
                            <p>React — это декларативная, эффективная и гибкая JavaScript-библиотека для создания
                                пользовательских интерфейсов. Она позволяет вам собирать сложный UI из маленьких
                                изолированных кусочков кода, называемых «компонентами».</p>
                        </div>
                    </div>

                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('redux')}>
                        <div>
                            <h4 className="fw-bold my-2">Redux</h4>
                            <img src={img_redux} className="img-fluid border border-5 rounded-3"/>
                            <p>Redux — библиотека управления состоянием для приложений, написанных на JavaScript.
                                Она помогает писать приложения, которые ведут себя стабильно/предсказуемо, работают на
                                разных окружениях (клиент/сервер/нативный код) и легко тестируемы.</p>
                        </div>
                    </div>

                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('bootstrap')}>
                        <div>
                            <h4 className="fw-bold my-2">Bootstrap</h4>
                            <img src={img_bootstrap} className="img-fluid border border-5 rounded-3"/>
                            <p>Bootstrap (также известен как Twitter Bootstrap) — свободный набор инструментов для
                                создания
                                сайтов и веб-приложений. Включает в себя HTML- и CSS-шаблоны оформления для типографики,
                                веб-форм, кнопок, меток, блоков навигации и прочих компонентов веб-интерфейса.</p>
                        </div>
                    </div>

                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('rest')}>
                        <div>
                            <h4 className="fw-bold my-2">REST API</h4>
                            <img src={img_rest} className="img-fluid border border-5 rounded-3"/>
                            <p>REST API — это API, соответствующий принципам архитектурного стиля REST (от англ.
                                Representational State Transfer — «передача состояния представления»). По этой причине
                                REST
                                API иногда называют RESTful API.</p>
                        </div>
                    </div>
                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('mongodb')}>
                        <div>
                            <h4 className="fw-bold my-2">MongoDB</h4>
                            <img src={img_mongodb} className="img-fluid border border-5 rounded-3"/>
                            <p>MongoDB — документоориентированная система управления базами данных, не требующая
                                описания
                                схемы таблиц. Считается одним из классических примеров NoSQL-систем, использует
                                JSON-подобные документы и схему базы данных. Написана на языке C++. Применяется в
                                веб-разработке, в частности, в рамках JavaScript-ориентированного стека MEAN.</p>
                        </div>
                    </div>
                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('express')}>
                        <div>
                            <h4 className="fw-bold my-2">Express</h4>
                            <img src={img_express} className="img-fluid border border-5 rounded-3"/>
                            <p>Express.js, или просто Express, фреймворк web-приложений для Node.js, реализованный как
                                свободное и открытое программное обеспечение под лицензией MIT. Он спроектирован для
                                создания веб-приложений и API. Де-факто является стандартным каркасом для Node.js</p>
                        </div>
                    </div>
                    <div className={"col d-flex align-items-start rounded-2 main_panel " + getClass('node')}>
                        <div>
                            <h4 className="fw-bold my-2">Node</h4>
                            <img src={img_node} className="img-fluid border border-5 rounded-3"/>
                            <p>Node или Node.js — программная платформа, основанная на движке V8 (транслирующем
                                JavaScript в
                                машинный код), превращающая JavaScript из узкоспециализированного языка в язык общего
                                назначения. Node.js добавляет возможность JavaScript взаимодействовать с устройствами
                                ввода-вывода через свой API, написанный на C++.</p>
                        </div>
                    </div>
                </div>
                <h3 className="pb-2 border-bottom pt-4">Котики с лисичками (без них никуда):</h3>
                <div className="row row-cols-2 py-4">
                    <div className="col text-center">
                        {!randomCatImage && <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                        {randomCatImage && <img src={randomCatImage} className="img-fluid border border-5 rounded-3"/>}
                    </div>
                    <div className="text-center">

                        {!randomFoxImage && <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                        {randomFoxImage && <img src={randomFoxImage} className="img-fluid border border-5 rounded-3"/>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Main

import React from "react"
import img_spa from './spa.jpg';
import img_react from './react.jpg';
import img_redux from './redux.jpg';
import img_bootstrap from './bootstrap.jpg';
import img_rest from './rest.jpg';
import img_mongodb from './mongodb.jpg';
import img_express from './express.jpg';
import img_node from './node.jpg';

const Main = () => {
    return (
        <div className="container px-4 py-5" id="icon-grid">
            <h1 className="pb-2 border-bottom">Дипломный проект</h1>
            <p>Канбан доска, которая делает вашу жизнь эффективной. Простой в использовании инструмент для управления
                задачами</p>

            <h3 className="pb-2 border-bottom pt-4">Стек технологий:</h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-4">
                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">SPA</h4>
                        <img src={img_spa} className="img-fluid border border-5 rounded-3"/>
                        <p>Одностраничное приложение (англ. single page application, SPA) — это веб-приложение,
                            использующий единственный HTML-документ как оболочку для всех веб-страниц и организующий
                            взаимодействие с пользователем через динамически подгружаемый контент</p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">React</h4>
                        <img src={img_react} className="img-fluid border border-5 rounded-3"/>
                        <p>React — это декларативная, эффективная и гибкая JavaScript-библиотека для создания
                            пользовательских интерфейсов. Она позволяет вам собирать сложный UI из маленьких
                            изолированных кусочков кода, называемых «компонентами».</p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">Redux</h4>
                        <img src={img_redux} className="img-fluid border border-5 rounded-3"/>
                        <p>Redux — библиотека управления состоянием для приложений, написанных на JavaScript.
                            Она помогает писать приложения, которые ведут себя стабильно/предсказуемо, работают на
                            разных окружениях (клиент/сервер/нативный код) и легко тестируемы.</p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">Bootstrap</h4>
                        <img src={img_bootstrap} className="img-fluid border border-5 rounded-3"/>
                        <p>Bootstrap (также известен как Twitter Bootstrap) — свободный набор инструментов для создания
                            сайтов и веб-приложений. Включает в себя HTML- и CSS-шаблоны оформления для типографики,
                            веб-форм, кнопок, меток, блоков навигации и прочих компонентов веб-интерфейса.</p>
                    </div>
                </div>

                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">REST API</h4>
                        <img src={img_rest} className="img-fluid border border-5 rounded-3"/>
                        <p>REST API — это API, соответствующий принципам архитектурного стиля REST (от англ.
                            Representational State Transfer — «передача состояния представления»). По этой причине REST
                            API иногда называют RESTful API.</p>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0"> MongoDB</h4>
                        <img src={img_mongodb} className="img-fluid border border-5 rounded-3"/>
                        <p>MongoDB — документоориентированная система управления базами данных, не требующая описания
                            схемы таблиц. Считается одним из классических примеров NoSQL-систем, использует
                            JSON-подобные документы и схему базы данных. Написана на языке C++. Применяется в
                            веб-разработке, в частности, в рамках JavaScript-ориентированного стека MEAN.</p>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">Express</h4>
                        <img src={img_express} className="img-fluid border border-5 rounded-3"/>
                        <p>Express.js, или просто Express, фреймворк web-приложений для Node.js, реализованный как
                            свободное и открытое программное обеспечение под лицензией MIT. Он спроектирован для
                            создания веб-приложений и API. Де-факто является стандартным каркасом для Node.js</p>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div>
                        <h4 className="fw-bold mb-0">Node</h4>
                        <img src={img_node} className="img-fluid border border-5 rounded-3"/>
                        <p>Node или Node.js — программная платформа, основанная на движке V8 (транслирующем JavaScript в
                            машинный код), превращающая JavaScript из узкоспециализированного языка в язык общего
                            назначения. Node.js добавляет возможность JavaScript взаимодействовать с устройствами
                            ввода-вывода через свой API, написанный на C++.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main

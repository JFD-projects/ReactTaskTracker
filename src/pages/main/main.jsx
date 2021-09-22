import React from "react"

const Main = () => {
  return (
    <div className="container px-4 py-5" id="icon-grid">
      <h2 className="pb-2 border-bottom">Дипломный проект</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
        <div className="col d-flex align-items-start">
          <i className="bi bi-alarm-fill flex-shrink-0 me-3" width="1.75em" height="1.75em"></i>
          <div>
            <h4 className="fw-bold mb-0">React</h4>
            <p>Приложение работает на React</p>
          </div>
        </div>

        <div className="col d-flex align-items-start">
          <i className="bi bi-alarm-fill flex-shrink-0 me-3" width="1.75em" height="1.75em"></i>
          <div>
            <h4 className="fw-bold mb-0">Redux</h4>
            <p>Применяется технология Redux для хранения состояния приложения</p>
          </div>
        </div>

        <div className="col d-flex align-items-start">
          <i className="bi bi-alarm-fill flex-shrink-0 me-3" width="1.75em" height="1.75em"></i>
          <div>
            <h4 className="fw-bold mb-0">Bootstrap</h4>
            <p>Верстка основана на css фреймворке Bootstrap v5.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main

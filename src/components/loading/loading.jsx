import React from "react"
import "./loading.css"

const Loading = ({ hidden }) => {
  const blockClass = "loading d-flex align-items-center justify-content-center" + (hidden ? " hidden" : "")
  return (
    <div className={blockClass}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading

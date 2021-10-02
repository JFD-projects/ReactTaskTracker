import React from "react"
import { Link } from "react-router-dom"

const ColumnFooter = ({ column }) => {
  return (
    <div className="d-grid  mt-2">
      <Link to={"/tasks/add?columnId=" + column.id} className="btn btn-light" type="button">
        <i className="bi bi-plus-circle-dotted"></i>
      </Link>
    </div>
  )
}

export default ColumnFooter

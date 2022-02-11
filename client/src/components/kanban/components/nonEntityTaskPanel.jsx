import React from "react"

const NonEntityTaskPanel= ({ task, color }) => {
  return (
    <div className="card py-1 text-center" style={{ backgroundColor: color, border: '1px darkgray dashed' }}>
    </div>
  )
}

export default NonEntityTaskPanel

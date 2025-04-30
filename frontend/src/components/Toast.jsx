"use client"

import { useEffect } from "react"
import ReactDOM from "react-dom"
import "../styles/Toast.css"

function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  // Create a portal to render the toast at the top level of the DOM
  return ReactDOM.createPortal(
    <div className={`toast-container ${type}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === "success" && <i className="fas fa-check-circle"></i>}
          {type === "error" && <i className="fas fa-exclamation-circle"></i>}
          {type === "info" && <i className="fas fa-info-circle"></i>}
          {type === "warning" && <i className="fas fa-exclamation-triangle"></i>}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="toast-progress" style={{ animationDuration: `${duration}ms` }}></div>
    </div>,
    document.body,
  )
}

export default Toast


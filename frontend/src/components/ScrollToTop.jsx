"use client"

import { useState, useEffect } from "react"
import "../styles/ScrollToTop.css"

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </>
  )
}

export default ScrollToTop


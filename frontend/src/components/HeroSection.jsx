"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/HeroSection.css"
import heroBackground1 from "../assets/hero/hero-background-1.jpg"
import heroBackground2 from "../assets/hero/hero-background-2.jpg"
import heroBackground3 from "../assets/hero/hero-background-3.jpg"

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      image: heroBackground1,
      title: "Discover Amazing Places in India",
      subtitle: "Explore the beauty and culture of incredible India with our premium travel packages",
    },
    {
      image: heroBackground2,
      title: "Experience Exotic Destinations",
      subtitle: "Unforgettable journeys to Bali, Vietnam and Maldives at affordable prices",
    },
    {
      image: heroBackground3,
      title: "Create Memories That Last Forever",
      subtitle: "Family vacations, honeymoon packages, and adventure trips tailored for you",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentSlide)
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, slides.length])

  return (
    <section className="hero-section">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""} ${index === prevSlide && isTransitioning ? "prev" : ""}`}
          >
            {/* Use a semi-transparent overlay div and an img tag instead of background-image */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 0,
              }}
            ></div>
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="hero-image" />
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <div className="hero-buttons">
          <Link to="/packages" className="btn btn-primary">
            <i className="fas fa-box"></i>
            <span>View Packages</span>
          </Link>
          <Link to="/contact" className="btn btn-contact">
            <i className="fas fa-envelope"></i>
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


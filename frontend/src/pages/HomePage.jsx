"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import SearchBar from "../components/SearchBar"
import PopularPackages from "../components/PopularPackages"
import PopularDestinations from "../components/PopularDestinations"
import MonthlyDestinations from "../components/MonthlyPackages"
import AnimatedElement from "../components/AnimatedElement"
import "../styles/HomePage.css"

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    // Check if we need to scroll to a specific section
    if (location.state && location.state.scrollToId) {
      const id = location.state.scrollToId
      const element = document.getElementById(id)

      if (element) {
        // Wait for page to fully load before scrolling
        setTimeout(() => {
          const yOffset = -80 // Navbar height offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }, 100)
      }
    }
  }, [location.state])

  return (
    <div className="home-page">
      <div id="home">
        <HeroSection />
        <div className="search-bar-wrapper">
          <AnimatedElement animation="fade-up">
            <SearchBar />
          </AnimatedElement>
        </div>
      </div>

      <div id="packages">
        <AnimatedElement animation="fade-up">
          <PopularPackages />
        </AnimatedElement>
      </div>

      <div id="destinations">
        <AnimatedElement animation="fade-up">
          <PopularDestinations />
        </AnimatedElement>
      </div>

      <div id="monthly-destinations">
        <AnimatedElement animation="fade-up">
          <MonthlyDestinations />
        </AnimatedElement>
      </div>
    </div>
  )
}

export default HomePage


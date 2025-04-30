"use client"

import { Link } from "react-router-dom"
import packagesData from "../data/packagesData.json"
import PackageCard from "./PackageCard"
import "../styles/PopularPackages.css"
import AnimatedSection from "./AnimatedSection"
import AnimatedElement from "./AnimatedElement"

function PopularPackages() {
  // Get featured packages or the ones with highest rating
  const popularPackages = packagesData.packages.filter((pkg) => pkg.featured).slice(0, 6)

  return (
    <section className="popular-packages section">
      <div className="container">
        <AnimatedElement animation="fade-up">
          <div className="section-header">
            <h2 className="section-title">Popular Packages</h2>
            <p className="section-subtitle">Discover our most popular travel experiences</p>
          </div>
        </AnimatedElement>

        <AnimatedSection staggered={true} staggerDelay={150} className="popular-packages-grid">
          {popularPackages.map((pkg) => (
            <div key={pkg.id} className="package-card-wrapper">
              <PackageCard package={pkg} />
            </div>
          ))}
        </AnimatedSection>

        <AnimatedElement animation="fade-up" delay={600}>
          <div className="view-all-container">
            <Link to="/packages#package-list" className="view-all-btn">
              <span>View All Packages</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}

export default PopularPackages


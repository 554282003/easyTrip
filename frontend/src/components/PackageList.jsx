"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import PackageCard from "./PackageCard"
import packagesData from "../data/packagesData.json"
import "../styles/PackageList.css"

function PackageList({ filters = {}, packageType = "all" }) {
  const [currentPage, setCurrentPage] = useState(1)
  const packagesPerPage = 6
  const packageListRef = useRef(null)

  // Use useMemo to optimize filtering logic
  const filteredPackages = useMemo(() => {
    let result = [...packagesData.packages]

    // Filter by package type (domestic or international)
    if (packageType === "domestic") {
      result = result.filter((pkg) => pkg.location && pkg.location.toLowerCase().includes("india"))
    } else if (packageType === "international") {
      result = result.filter((pkg) => !pkg.location || !pkg.location.toLowerCase().includes("india"))
    }

    // Apply filters
    if (filters.destination) {
      const searchTerm = filters.destination.toLowerCase()
      result = result.filter(
        (pkg) => pkg.name.toLowerCase().includes(searchTerm) || pkg.location.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.duration) {
      const [min, max] = filters.duration.split("-").map(Number)
      result = result.filter((pkg) => {
        if (max) {
          return pkg.duration >= min && pkg.duration <= max
        } else {
          // For "15+" case
          return pkg.duration >= min
        }
      })
    }

    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number)
      result = result.filter((pkg) => {
        if (max) {
          return pkg.price >= min && pkg.price <= max
        } else {
          // For "3000+" case
          return pkg.price >= min
        }
      })
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          result.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          result.sort((a, b) => b.price - a.price)
          break
        case "duration-low":
          result.sort((a, b) => a.duration - b.duration)
          break
        case "duration-high":
          result.sort((a, b) => b.duration - a.duration)
          break
        default:
          break
      }
    }

    return result
  }, [filters, packageType])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, packageType])

  // Get current packages
  const indexOfLastPackage = currentPage * packagesPerPage
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top of package list container instead of window top
    if (packageListRef.current) {
      packageListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage)

  return (
    <div className="package-list-container" ref={packageListRef}>
      {filteredPackages.length === 0 ? (
        <div className="no-packages">
          <i className="fas fa-search fa-3x"></i>
          <h3>No packages found matching your criteria</h3>
          <p>Try adjusting your search filters or browse our other destinations</p>
        </div>
      ) : (
        <>
          <div className="results-summary">
            <p>
              Found <span>{filteredPackages.length}</span> packages matching your criteria
            </p>
          </div>

          <div className="package-grid">
            {currentPackages.map((pkg) => (
              <div key={pkg.id} className="package-card-wrapper">
                <PackageCard key={pkg.id} package={pkg} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
                aria-label="Previous page"
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>

              <div className="page-numbers">
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`page-number ${currentPage === number + 1 ? "active" : ""}`}
                    aria-label={`Page ${number + 1}`}
                    aria-current={currentPage === number + 1 ? "page" : undefined}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                aria-label="Next page"
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PackageList


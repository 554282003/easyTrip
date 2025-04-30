"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import PackageList from "../components/PackageList";
import "../styles/PackagesPage.css";
import packagesHeaderImg from "../assets/hero/packages-header.jpg";
import AnimatedElement from "../components/AnimatedElement";

function PackagesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [packageType, setPackageType] = useState("all"); // "all", "domestic", or "international"

  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = {
      destination: searchParams.get("destination") || "",
      duration: searchParams.get("duration") || "",
      budget: searchParams.get("budget") || "",
      sortBy: searchParams.get("sortBy") || "price-low",
    };

    const type = searchParams.get("type") || "all";
    setPackageType(type);

    setFilters(urlFilters);
    setAppliedFilters(urlFilters);
    setIsLoading(false);

    // Scroll to package list if hash is present
    if (location.hash === "#package-list") {
      setTimeout(() => {
        const element = document.getElementById("package-list");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location.search, location.hash]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      setIsLoading(true);
      setAppliedFilters(newFilters);

      // Update URL with new filters
      const searchParams = new URLSearchParams();
      if (newFilters.destination)
        searchParams.set("destination", newFilters.destination);
      if (newFilters.duration)
        searchParams.set("duration", newFilters.duration);
      if (newFilters.budget) searchParams.set("budget", newFilters.budget);
      if (newFilters.sortBy) searchParams.set("sortBy", newFilters.sortBy);
      if (packageType !== "all") searchParams.set("type", packageType);

      // Replace current URL with new search params
      navigate(`${location.pathname}?${searchParams.toString()}#package-list`, {
        replace: true,
      });

      // Short timeout to allow for loading state to be visible
      setTimeout(() => setIsLoading(false), 300);
    },
    [navigate, location.pathname, packageType]
  );

  // Handle package type change
  const handlePackageTypeChange = (type) => {
    setIsLoading(true);
    setPackageType(type);

    // Update URL with new type
    const searchParams = new URLSearchParams(location.search);
    if (type === "all") {
      searchParams.delete("type");
    } else {
      searchParams.set("type", type);
    }

    // Replace current URL with new search params
    navigate(`${location.pathname}?${searchParams.toString()}#package-list`, {
      replace: true,
    });

    // Short timeout to allow for loading state to be visible
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="packages-page">
      <div
        className="packages-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${packagesHeaderImg})`,
        }}
      >
        <div className="container">
          <AnimatedElement animation="fade-up">
            <h1 className="page-title">Travel Packages</h1>
            <p className="page-subtitle">Find your perfect travel package</p>
          </AnimatedElement>
        </div>
      </div>

      <div className="container">
        <AnimatedElement animation="fade-up">
          <FilterBar
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </AnimatedElement>

        <div id="package-list" className="package-type-selector">
          <button
            className={`package-type-btn ${
              packageType === "all" ? "active" : ""
            }`}
            onClick={() => handlePackageTypeChange("all")}
          >
            <i className="fas fa-globe"></i> All Packages
          </button>
          <button
            className={`package-type-btn ${
              packageType === "domestic" ? "active" : ""
            }`}
            onClick={() => handlePackageTypeChange("domestic")}
          >
            <i className="fas fa-map-marker-alt"></i> Domestic Packages
          </button>
          <button
            className={`package-type-btn ${
              packageType === "international" ? "active" : ""
            }`}
            onClick={() => handlePackageTypeChange("international")}
          >
            <i className="fas fa-plane"></i> International Packages
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Finding packages...</p>
          </div>
        ) : (
          <AnimatedElement animation="fade-up" delay={300}>
            <PackageList filters={appliedFilters} packageType={packageType} />
          </AnimatedElement>
        )}
      </div>
    </div>
  );
}

export default PackagesPage;

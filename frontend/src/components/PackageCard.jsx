"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PackageCard.css";
import goaImage from "../assets/packages/goa.jpg";
import manaliImage from "../assets/packages/manali.jpg";
import keralaImage from "../assets/packages/kerala.jpg";
import rajasthanImage from "../assets/packages/rajasthan.jpg";
import ladakhImage from "../assets/packages/ladakh.jpg";
import andamanImage from "../assets/packages/andaman.jpg";
import baliImage from "../assets/packages/bali.jpg";
import vietnamImage from "../assets/packages/vietnam.jpg";
import maldivesImage from "../assets/packages/maldives.jpg";
import dubaiImage from "../assets/packages/dubai.jpg";
import singaporeImage from "../assets/packages/singapore.jpg";
import thailandImage from "../assets/packages/thailand.jpg";
import nepalImage from "../assets/packages/nepal.jpg";
import bhutanImage from "../assets/packages/bhutan.jpg";
import sriLankaImage from "../assets/packages/sri-lanka.jpg";
import damanImage from "../assets/packages/daman.jpg";

import AnimatedElement from "./AnimatedElement";
import Toast from "./Toast";

function PackageCard({ package: pkg }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isCheckingPdf, setIsCheckingPdf] = useState(false);

  // Format duration as nights/days (e.g., 4N/5D)
  const formatDuration = (days) => {
    const nights = days - 1;
    return `${nights}N/${days}D`;
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Original price (10-20% higher than the actual price for display purposes)
  const originalPrice = Math.round(pkg.price * (1 + Math.random() * 0.1 + 0.1));

  // Get the correct image based on the package name
  const getPackageImage = (imagePath) => {
    if (imagePath.includes("goa")) return goaImage;
    if (imagePath.includes("manali")) return manaliImage;
    if (imagePath.includes("kerala")) return keralaImage;
    if (imagePath.includes("rajasthan")) return rajasthanImage;
    if (imagePath.includes("ladakh")) return ladakhImage;
    if (imagePath.includes("andaman")) return andamanImage;
    if (imagePath.includes("bali")) return baliImage;
    if (imagePath.includes("vietnam")) return vietnamImage;
    if (imagePath.includes("maldives")) return maldivesImage;
    if (imagePath.includes("dubai")) return dubaiImage;
    if (imagePath.includes("singapore")) return singaporeImage;
    if (imagePath.includes("thailand")) return thailandImage;
    if (imagePath.includes("nepal")) return nepalImage;
    if (imagePath.includes("bhutan")) return bhutanImage;
    if (imagePath.includes("sri-lanka")) return sriLankaImage;
    if (imagePath.includes("daman")) return damanImage;

    return goaImage; // Default fallback
  };

  // Handle sharing functionality
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Create the share URL for the package
    const shareUrl = `${window.location.origin}/package/${pkg.id}`;

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: pkg.name,
          text: `Check out this amazing travel package: ${pkg.name}`,
          url: shareUrl,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          // Fallback to clipboard copy
          copyToClipboard(shareUrl);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareUrl);
    }
  };

  // Helper function to copy to clipboard without toast for sharing
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
  };

  // Updated handleDownload function to use pdfUrl from JSON data
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCheckingPdf) return; // Prevent multiple clicks while checking

    setIsCheckingPdf(true);

    // Check if the package has a PDF URL defined in the JSON
    if (pkg.pdfUrl && pkg.pdfUrl.trim() !== "") {
      // PDF exists in JSON data, proceed with download
      const packageFileName = pkg.name.replace(/\s+/g, "-").toLowerCase();

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = pkg.pdfUrl;
      link.download = `${packageFileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success toast notification
      setToastMessage("PDF downloaded successfully!");
      setToastType("success");
      setShowToast(true);
    } else {
      // No PDF URL in JSON data, show error toast
      setToastMessage("PDF not available for this package");
      setToastType("error");
      setShowToast(true);
    }

    // Reset checking state
    setIsCheckingPdf(false);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <AnimatedElement animation="fade-up">
      <div className="package-card">
        <div className="package-image-container">
          <img
            src={getPackageImage(pkg.image) || "/placeholder.svg"}
            alt={pkg.name}
            className="package-image"
            loading="lazy" // Add lazy loading for better performance
          />
          <div className="package-duration">
            <i className="fas fa-clock"></i> {formatDuration(pkg.duration)}
          </div>
          <div className="package-actions">
            <button
              className={`package-action-btn download-btn ${isCheckingPdf ? "checking" : ""
                }`}
              onClick={handleDownload}
              aria-label="Download PDF"
              disabled={isCheckingPdf}
            >
              {isCheckingPdf ? (
                <div className="btn-preloader"></div>
              ) : (
                <i className="fas fa-download"></i>
              )}
            </button>
            <button
              className="package-action-btn share-btn"
              onClick={handleShare}
              aria-label="Share Package"
            >
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>

        <div className="package-content">
          <h3 className="package-title1">{pkg.name}</h3>

          <div className="package-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{pkg.location}</span>
          </div>

          <div className="package-features">
            <div className="feature-row">
              <div className="feature-item">
                <i className="fas fa-hotel"></i>
                <span>3 Star Hotel</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-mountain"></i>
                <span>{pkg.highlights[0]}</span>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-item">
                <i className="fas fa-monument"></i>
                <span>{pkg.highlights[1] || "Famous Sights"}</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-umbrella-beach"></i>
                <span>{pkg.highlights[2] || "Local Experiences"}</span>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-item">
                <i className="fas fa-utensils"></i>
                <span>Breakfast & Dinner</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-camera"></i>
                <span>{pkg.highlights[3] || "Sightseeing"}</span>
              </div>
            </div>
          </div>

          <div className="package-price-container">
            <div className="price-details">
              <div className="original-price">
                ₹{originalPrice.toLocaleString("en-IN")}
              </div>
              <div className="current-price">
                ₹{pkg.price.toLocaleString("en-IN")}
              </div>
              <div className="price-per">per person</div>
            </div>

            <Link
              to={`/package/${pkg.id}`}
              className="read-more-btn"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-eye"></i> Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Toast notification will be rendered in a portal at the app level */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </AnimatedElement>
  );
}

export default PackageCard;

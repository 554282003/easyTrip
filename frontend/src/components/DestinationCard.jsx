"use client";

import { Link } from "react-router-dom";
import "../styles/DestinationCard.css";
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

function DestinationCard({ destination }) {
  // Get the correct image based on the destination name
  const getDestinationImage = (imagePath) => {
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
    return goaImage; // Default fallback
  };

  return (
    <div className="destination-card">
      <div className="destination-image-container">
        <img
          src={getDestinationImage(destination.image) || "/placeholder.svg"}
          alt={destination.name}
          className="destination-image"
          loading="lazy" // Add lazy loading for better performance
        />
        <div className="destination-overlay">
          <Link
            to={`/packages?destination=${encodeURIComponent(
              destination.name
            )}#package-list`}
            className="explore-btn"
          >
            <span>Explore</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
      <div className="destination-content">
        <h3 className="destination-name">{destination.name}</h3>
        <p className="destination-count">
          <i className="fas fa-box"></i> {destination.count} Packages
        </p>
      </div>
    </div>
  );
}

export default DestinationCard;

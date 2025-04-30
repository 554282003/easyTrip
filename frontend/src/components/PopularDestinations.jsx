"use client";

import { useRef, useEffect, useState } from "react";
import packagesData from "../data/packagesData.json";
import DestinationCard from "./DestinationCard";
import "../styles/PopularDestinations.css";
import AnimatedElement from "./AnimatedElement";

function PopularDestinations() {
  const domesticRef = useRef(null);
  const internationalRef = useRef(null);
  const [isPausedDomestic, setIsPausedDomestic] = useState(false);
  const [isPausedInternational, setIsPausedInternational] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [scrollDirectionDomestic, setScrollDirectionDomestic] =
    useState("right");
  const [scrollDirectionInternational, setScrollDirectionInternational] =
    useState("right");
  const [reachedEndDomestic, setReachedEndDomestic] = useState(false);
  const [reachedEndInternational, setReachedEndInternational] = useState(false);
  const [canScrollLeftDomestic, setCanScrollLeftDomestic] = useState(false);
  const [canScrollRightDomestic, setCanScrollRightDomestic] = useState(true);
  const [canScrollLeftInternational, setCanScrollLeftInternational] =
    useState(false);
  const [canScrollRightInternational, setCanScrollRightInternational] =
    useState(true);

  // Filter domestic and international destinations
  const domesticDestinations = packagesData.destinations.filter(
    (dest) => dest.location && dest.location.toLowerCase().includes("india")
  );

  const internationalDestinations = packagesData.destinations.filter(
    (dest) => !dest.location || !dest.location.toLowerCase().includes("india")
  );

  // Update the scroll function to include null checks
  const scroll = (ref, direction) => {
    if (!ref || !ref.current) return;

    // Stop auto-scrolling when manually scrolling
    setAutoScrollEnabled(false);

    // Calculate the width of a single card (250px) plus gap (20px)
    const cardWidth = 270;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Update scroll position indicators after scrolling
    setTimeout(() => {
      checkScrollPosition(ref);
    }, 300);
  };

  // Check if scroll has reached the end or beginning
  const checkScrollPosition = (ref) => {
    if (!ref || !ref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    if (ref === domesticRef) {
      // Update scroll indicators
      setCanScrollLeftDomestic(scrollLeft > 10);
      setCanScrollRightDomestic(scrollLeft + clientWidth < scrollWidth - 10);

      // Set reachedEnd for auto-scroll functionality
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setReachedEndDomestic(true);
        setScrollDirectionDomestic("left");
      } else if (scrollLeft <= 10 && scrollDirectionDomestic === "left") {
        setReachedEndDomestic(false);
        setScrollDirectionDomestic("right");
      }
    } else if (ref === internationalRef) {
      // Update scroll indicators
      setCanScrollLeftInternational(scrollLeft > 10);
      setCanScrollRightInternational(
        scrollLeft + clientWidth < scrollWidth - 10
      );

      // Set reachedEnd for auto-scroll functionality
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setReachedEndInternational(true);
        setScrollDirectionInternational("left");
      } else if (scrollLeft <= 10 && scrollDirectionInternational === "left") {
        setReachedEndInternational(false);
        setScrollDirectionInternational("right");
      }
    }
  };

  // Initialize scroll position indicators
  useEffect(() => {
    // Add scroll event listeners to update indicators during scrolling
    if (domesticRef.current) {
      domesticRef.current.addEventListener("scroll", () =>
        checkScrollPosition(domesticRef)
      );
    }

    if (internationalRef.current) {
      internationalRef.current.addEventListener("scroll", () =>
        checkScrollPosition(internationalRef)
      );
    }

    // Initial check
    setTimeout(() => {
      checkScrollPosition(domesticRef);
      checkScrollPosition(internationalRef);
    }, 100);

    return () => {
      if (domesticRef.current) {
        domesticRef.current.removeEventListener("scroll", () =>
          checkScrollPosition(domesticRef)
        );
      }
      if (internationalRef.current) {
        internationalRef.current.removeEventListener("scroll", () =>
          checkScrollPosition(internationalRef)
        );
      }
    };
  }, [domesticDestinations, internationalDestinations]);

  // Auto-scroll functionality with improved direction change
  useEffect(() => {
    if (!autoScrollEnabled) return;

    const scrollDomestic = () => {
      if (domesticRef.current && !isPausedDomestic) {
        const cardWidth = 1; // Scroll 1px at a time for smooth scrolling

        domesticRef.current.scrollBy({
          left: scrollDirectionDomestic === "right" ? cardWidth : -cardWidth,
          behavior: "auto",
        });

        checkScrollPosition(domesticRef);
      }
    };

    const scrollInternational = () => {
      if (internationalRef.current && !isPausedInternational) {
        const cardWidth = 1; // Scroll 1px at a time for smooth scrolling

        internationalRef.current.scrollBy({
          left:
            scrollDirectionInternational === "right" ? cardWidth : -cardWidth,
          behavior: "auto",
        });

        checkScrollPosition(internationalRef);
      }
    };

    // Set intervals for smooth scrolling
    const domesticInterval = setInterval(scrollDomestic, 30);
    const internationalInterval = setInterval(scrollInternational, 30);

    return () => {
      clearInterval(domesticInterval);
      clearInterval(internationalInterval);
    };
  }, [
    isPausedDomestic,
    isPausedInternational,
    autoScrollEnabled,
    scrollDirectionDomestic,
    scrollDirectionInternational,
    reachedEndDomestic,
    reachedEndInternational,
  ]);

  return (
    <section className="popular-destinations section">
      <div className="container">
        <AnimatedElement animation="fade-up">
          <div className="section-header">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">
              Explore our most visited places around the world
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={200}>
          <div className="destination-section">
            <div className="destination-section-header">
              <h3 className="destination-section-title">
                Domestic Destinations
              </h3>
            </div>

            <div className="destinations-scroll-container">
              <div className="scroll-buttons">
                <button
                  className={`scroll-button ${
                    !canScrollLeftDomestic ? "disabled" : ""
                  }`}
                  onClick={() => scroll(domesticRef, "left")}
                  aria-label="Scroll left"
                  disabled={!canScrollLeftDomestic}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className={`scroll-button ${
                    !canScrollRightDomestic ? "disabled" : ""
                  }`}
                  onClick={() => scroll(domesticRef, "right")}
                  aria-label="Scroll right"
                  disabled={!canScrollRightDomestic}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div
                className="destinations-scroll"
                ref={domesticRef}
                onMouseEnter={() => setIsPausedDomestic(true)}
                onMouseLeave={() => setIsPausedDomestic(false)}
              >
                {domesticDestinations.map((destination, index) => (
                  <DestinationCard
                    key={`${destination.id}-${index}`}
                    destination={destination}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={400}>
          <div className="destination-section">
            <div className="destination-section-header">
              <h3 className="destination-section-title">
                International Destinations
              </h3>
            </div>

            <div className="destinations-scroll-container">
              <div className="scroll-buttons">
                <button
                  className={`scroll-button ${
                    !canScrollLeftInternational ? "disabled" : ""
                  }`}
                  onClick={() => scroll(internationalRef, "left")}
                  aria-label="Scroll left"
                  disabled={!canScrollLeftInternational}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className={`scroll-button ${
                    !canScrollRightInternational ? "disabled" : ""
                  }`}
                  onClick={() => scroll(internationalRef, "right")}
                  aria-label="Scroll right"
                  disabled={!canScrollRightInternational}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div
                className="destinations-scroll"
                ref={internationalRef}
                onMouseEnter={() => setIsPausedInternational(true)}
                onMouseLeave={() => setIsPausedInternational(false)}
              >
                {internationalDestinations.map((destination, index) => (
                  <DestinationCard
                    key={`${destination.id}-${index}`}
                    destination={destination}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default PopularDestinations;

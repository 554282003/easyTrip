"use client";

import { useState, useEffect, useRef } from "react";
import DestinationCard from "./DestinationCard";
import packagesData from "../data/packagesData.json";
import "../styles/MonthlyPackages.css";
import AnimatedElement from "./AnimatedElement";

function MonthlyDestinations() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const destinationsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Map of best destinations for each month (0-11 for Jan-Dec)
  const monthlyDestinations = {
    0: ["Goa", "Jaipur", "Kerala", "Maldives"], // January
    1: ["Andaman", "Rajasthan", "Bali", "Goa"], // February
    2: ["Sikkim", "Darjeeling", "Andaman", "Vietnam"], // March
    3: ["Manali", "Rishikesh", "Ooty", "Bali"], // April
    4: ["Shimla", "Manali", "Mussoorie", "Darjeeling"], // May
    5: ["Ladakh", "Spiti Valley", "Coorg", "Munnar"], // June
    6: ["Ladakh", "Valley of Flowers", "Meghalaya", "Maldives"], // July
    7: ["Ladakh", "Kerala", "Rajasthan", "Bali"], // August
    8: ["Andaman", "Goa", "Kerala", "Vietnam"], // September
    9: ["Rajasthan", "Goa", "Andaman", "Bali"], // October
    10: ["Goa", "Andaman", "Kerala", "Maldives"], // November
    11: ["Goa", "Andaman", "Rajasthan", "Bali"], // December
  };

  // Filter destinations based on current month's best destinations
  const getMonthlyDestinations = (month) => {
    const bestDestinations = monthlyDestinations[month] || [];
    return packagesData.destinations.filter((dest) =>
      bestDestinations.some((bestDest) =>
        dest.name.toLowerCase().includes(bestDest.toLowerCase())
      )
    );
  };

  const [monthlyDestinationsList, setMonthlyDestinationsList] = useState([]);

  useEffect(() => {
    const destinations = getMonthlyDestinations(currentMonth);
    setMonthlyDestinationsList(destinations);
    setReachedEnd(false); // Reset when month changes

    // Reset scroll position when month changes
    if (destinationsRef.current) {
      destinationsRef.current.scrollLeft = 0;
    }

    // Update scroll indicators after a short delay to ensure DOM is updated
    setTimeout(() => {
      checkScrollPosition();
    }, 100);
  }, [currentMonth]);

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const scroll = (direction) => {
    if (!destinationsRef || !destinationsRef.current) return;

    // Stop auto-scrolling when manually scrolling
    setAutoScrollEnabled(false);

    // Calculate the width of a single card (250px) plus gap (20px)
    const cardWidth = 270;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    destinationsRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    // Update scroll position indicators after scrolling
    setTimeout(() => {
      checkScrollPosition();
    }, 300);
  };

  // Add state for scroll direction
  const [scrollDirection, setScrollDirection] = useState("right");

  // Check if scroll has reached the end or beginning
  const checkScrollPosition = () => {
    if (!destinationsRef || !destinationsRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = destinationsRef.current;

    // Update scroll indicators
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Set reachedEnd for auto-scroll functionality
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setReachedEnd(true);
      setScrollDirection("left");
    } else if (scrollLeft <= 10 && scrollDirection === "left") {
      setReachedEnd(false);
      setScrollDirection("right");
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollElement = destinationsRef.current;

    const handleScroll = () => checkScrollPosition();

    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollDirection]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScrollEnabled || monthlyDestinationsList.length === 0) return;

    const scrollDestinations = () => {
      if (destinationsRef.current && !isPaused) {
        const { scrollLeft, scrollWidth, clientWidth } =
          destinationsRef.current;

        // Check if we've reached the end or beginning
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          setScrollDirection("left");
        } else if (scrollLeft <= 0) {
          setScrollDirection("right");
        }

        // Scroll in the current direction
        destinationsRef.current.scrollBy({
          left: scrollDirection === "right" ? 1 : -1,
          behavior: "auto",
        });
      }
    };

    const scrollInterval = setInterval(scrollDestinations, 30);

    return () => clearInterval(scrollInterval);
  }, [isPaused, monthlyDestinationsList, autoScrollEnabled, scrollDirection]);

  return (
    <section className="monthly-destinations section" id="monthly-destinations">
      <div className="container">
        <AnimatedElement animation="fade-up">
          <div className="section-header">
            <h2 className="section-title">
              Best Destinations for {months[currentMonth]}
            </h2>
            <p className="section-subtitle">
              Discover the perfect places to visit this month
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={200}>
          <div className="month-selector">
            {months.map((month, index) => (
              <button
                key={index}
                className={`month-btn ${
                  index === currentMonth ? "active" : ""
                }`}
                onClick={() => handleMonthChange(index)}
              >
                {month}
              </button>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={400}>
          <div className="monthly-destinations-container">
            <div className="scroll-buttons">
              <button
                className={`scroll-button ${!canScrollLeft ? "disabled" : ""}`}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                disabled={!canScrollLeft}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className={`scroll-button ${!canScrollRight ? "disabled" : ""}`}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                disabled={!canScrollRight}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="destinations-scroll-container">
              <div
                className="destinations-scroll"
                ref={destinationsRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {monthlyDestinationsList.length > 0 ? (
                  monthlyDestinationsList.map((destination, index) => (
                    <DestinationCard
                      key={`${destination.id}-${index}`}
                      destination={destination}
                    />
                  ))
                ) : (
                  <div className="no-destinations">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>
                      No destinations available for this month. Please check
                      other months.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default MonthlyDestinations;

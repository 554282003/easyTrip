"use client";

import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { useEffect } from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  // Add useEffect to handle scrolling after navigation
  useEffect(() => {
    // Check if we need to scroll to a section after navigation
    const sectionToScroll = sessionStorage.getItem("scrollToSection");
    if (sectionToScroll) {
      // Clear the stored section
      sessionStorage.removeItem("scrollToSection");

      // Wait for the page to fully load
      setTimeout(() => {
        const element = document.getElementById(sectionToScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500);
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>TravelPackages</h3>
          <p>
            Discover the world with our premium travel packages. We offer
            unforgettable experiences at affordable prices.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2Fflyanytripindia"
              className="social-link"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/flyanytripindia?igsh=MTkxbzcxenJnNjA5aw=="
              className="social-link"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/flyanytripindia/"
              className="social-link"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-home footer-icon"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/packages" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-box footer-icon"></i> Packages
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-info-circle footer-icon"></i> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-envelope footer-icon"></i> Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Popular Destinations</h3>
          <ul className="footer-links">
            <li>
              <Link
                to={`/package/1`} // Assuming package ID 1 is for Goa
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-map-marker-alt footer-icon"></i> Goa
              </Link>
            </li>
            <li>
              <Link
                to={`/package/2`} // Assuming package ID 2 is for Manali
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-map-marker-alt footer-icon"></i> Manali
              </Link>
            </li>
            <li>
              <Link
                to={`/package/3`} // Assuming package ID 3 is for Bali
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-map-marker-alt footer-icon"></i> Kerala
              </Link>
            </li>
            <li>
              <Link
                to={`/package/4`} // Assuming package ID 4 is for Maldives
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-map-marker-alt footer-icon"></i> Rajasthan
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <address className="contact-info">
            <p>
              <a
                href="https://maps.google.com/?q=Shop+No+16,+2nd+Floor,+VED+TransCube+opposite+the+Main+Railway+Station,+Vadodara,+Gujarat+390002+India"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-map-marker-alt"></i> Shop No 16, 2nd Floor,
                VED TransCube opposite the Main Railway Station, Vadodara,
                Gujarat 390002 India
              </a>
            </p>
            <p>
              <a href="tel:+91-8511231514">
                <i className="fas fa-phone"></i> +91 8511231514
              </a>
            </p>
            <p>
              <a href="mailto:info@travelpackages.com">
                <i className="fas fa-envelope"></i> info@travelpackages.com
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copyright">
            &copy; {currentYear} TravelPackages. All rights reserved.
          </p>
          <div className="footer-policies">
            <Link
              to="/privacy-policy"
              target="_blank"
              className="footer-policy-link"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              target="_blank"
              className="footer-policy-link"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              target="_blank"
              className="footer-policy-link"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

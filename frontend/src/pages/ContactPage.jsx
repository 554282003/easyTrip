"use client";

import { useState } from "react";
import "../styles/ContactPage.css";
import contactHeroImg from "../assets/contact/contact-hero.jpg";
import AnimatedElement from "../components/AnimatedElement";
import AnimatedSection from "../components/AnimatedSection";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    success: false,
    message: "",
  });

  // Add this new state for the success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Validate form fields and return an error object
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is required";
    }

    // Phone number is now required and must be 10 digits
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    // Subject validation
    if (!formData.subject) {
      errors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters ";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message for this field as user types
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  // Update the handleSubmit function to show the success popup on successful submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus({
        submitted: true,
        submitting: false,
        success: false,
        message: "Please fill all the required fields.",
      });
      return;
    }

    setFormStatus({
      submitted: true,
      submitting: true,
      success: false,
      message: "Sending your message...",
    });

    try {
      // Dynamically import EmailJS
      const emailjs = await import("@emailjs/browser");

      const result = await emailjs.send(
        "service_dp6tvzm", // Replace with your EmailJS service ID
        "template_314cpmi", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          from_subject: formData.subject,
          message: formData.message,
        },
        "MNhx38PkDt55b8s1C" // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setFormStatus({
          submitted: true,
          submitting: false,
          success: true,
          message: "Thank you for your message! We will get back to you soon.",
        });

        // Show success popup
        setShowSuccessPopup(true);

        // Reset form and errors
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormStatus({
        submitted: true,
        submitting: false,
        success: false,
        message: "An error occurred. Please try again later.",
      });
    }
  };

  // Add this function to close the success popup
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="contact-page">
      <div
        className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactHeroImg})`,
        }}
      >
        <div className="container">
          <AnimatedElement animation="fade-up">
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">We'd love to hear from you</p>
          </AnimatedElement>
        </div>
      </div>

      <section className="contact-section section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                Our team is here to help you with any questions
              </p>
            </div>
          </AnimatedElement>

          <div className="contact-grid">
            {/* Contact Info Cards */}
            <AnimatedSection
              staggered={true}
              staggerDelay={150}
              className="contact-info"
            >
              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Our Location</h3>
                </div>
                <p>
                  <a
                    href="https://maps.google.com/?q=Shop+No+16,+2nd+Floor,+VED+TransCube+opposite+the+Main+Railway+Station,+Vadodara,+Gujarat+390002+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    Shop No 16, 2nd Floor, VED TransCube opposite the Main
                    Railway Station, Vadodara, Gujarat 390002 India
                  </a>
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-phone"></i>
                  <h3>Phone Number</h3>
                </div>
                <p>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </p>
                <p>
                  <a href="tel:+911234567890">+91 12345 67890</a>
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-envelope"></i>
                  <h3>Email Address</h3>
                </div>
                <p>
                  <a href="mailto:info@travelpackages.com">
                    info@travelpackages.com
                  </a>
                </p>
                <p>
                  <a href="mailto:support@travelpackages.com">
                    support@travelpackages.com
                  </a>
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-clock"></i>
                  <h3>Working Hours</h3>
                </div>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>

              <div className="social-links1">
                <a href="#" className="social-link1">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://x.com/i/flow/login?redirect_after_login=%2Fflyanytripindia"
                  className="social-link1"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/flyanytripindia?igsh=MTkxbzcxenJnNjA5aw=="
                  className="social-link1"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/flyanytripindia/"
                  className="social-link1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedElement
              animation="fade-left"
              className="contact-form-container"
            >
              {formStatus.submitted && (
                <div
                  className={`form-message ${
                    formStatus.success ? "success" : "error"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {formErrors.name && (
                      <span className="error-text">{formErrors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Your Email <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <span className="error-text">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                      <span className="error-text">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {formErrors.subject && (
                      <span className="error-text">{formErrors.subject}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Your Message <span className="required-asterisk">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {formErrors.message && (
                    <span className="error-text">{formErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={formStatus.submitting}
                >
                  <span>
                    {formStatus.submitting ? "Sending..." : "Send Message"}
                  </span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Find Us</h2>
              <p className="section-subtitle">
                Visit our office or contact us online
              </p>
            </div>
          </AnimatedElement>
          <AnimatedElement animation="zoom-in" delay={300}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d461.38220708861104!2d73.18106761565096!3d22.31365911089673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc575c736f7db%3A0x2bd8a3c08cdad680!2sFlyAnyTrip.com!5e0!3m2!1sen!2sin!4v1742556553157!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Success Popup with Enhanced Animation */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="checkmark-circle-container">
              <div className="checkmark-circle-bg"></div>
              <svg className="checkmark-circle" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" />
              </svg>
              <svg className="checkmark" viewBox="0 0 50 50">
                <path d="M14,27 L22,35 L36,15" />
              </svg>
              <div className="success-circle-fill"></div>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We will get back to you soon.</p>
            <button className="close-popup-btn" onClick={closeSuccessPopup}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactPage;

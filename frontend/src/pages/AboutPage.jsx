import "../styles/AboutPage.css"
import aboutHeroImg from "../assets/about/about-hero.jpg"
import aboutImg1 from "../assets/about/about-img-1.jpg"
import aboutImg2 from "../assets/about/about-img-2.jpg"
import guide1Img from "../assets/about/guide-1.jpg"
import guide2Img from "../assets/about/guide-2.jpg"
import guide3Img from "../assets/about/guide-3.png"
import guide4Img from "../assets/about/guide-4.jpg"
import AnimatedElement from "../components/AnimatedElement"
import CounterAnimation from "../components/CounterAnimation"
import AnimatedSection from "../components/AnimatedSection"

function AboutPage() {
  return (
    <div className="about-page">
      <div
        className="about-hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${aboutHeroImg})`,
        }}
      >
        <div className="container">
          <AnimatedElement animation="fade-up">
            <h1 className="about-page-title">About Us</h1>
            <p className="about-page-subtitle">Learn more about FlyAnyTrip</p>
          </AnimatedElement>
        </div>
      </div>

      <section className="about-intro section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Our Story</h2>
              <p className="section-subtitle">How we started and where we're going</p>
            </div>
          </AnimatedElement>

          <div className="about-content-grid">
            <AnimatedElement animation="fade-right">
              <div className="about-content-text">
                <p>
                  FlyAnyTrip was founded in 2015 with a simple mission: to make travel accessible, enjoyable, and
                  enriching for everyone. We believe that travel has the power to transform lives, broaden perspectives,
                  and create lasting memories.
                </p>
                <p>
                  What started as a small team of passionate travelers has grown into a trusted travel company serving
                  thousands of happy customers across India. We specialize in creating customized travel experiences
                  that cater to diverse interests, budgets, and preferences.
                </p>
                <p>
                  Our focus on customer satisfaction, attention to detail, and deep knowledge of destinations sets us
                  apart. We're not just selling packages; we're crafting experiences that will stay with you for a
                  lifetime.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-left">
              <div className="about-content-image">
                <img src={aboutImg1 || "/placeholder.svg"} alt="Our team planning travel experiences" />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="about-why-choose-section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Why Choose FlyAnyTrip</h2>
              <p className="section-subtitle">What makes us different from other travel agencies</p>
            </div>
          </AnimatedElement>

          <div className="about-why-choose-grid">
            <AnimatedElement animation="fade-up" delay={100}>
              <div className="about-why-choose-card">
                <div className="about-why-choose-icon">
                  <i className="fas fa-gem"></i>
                </div>
                <h3 className="about-why-choose-title">Best Value</h3>
                <p className="about-why-choose-text">
                  We negotiate the best rates with our partners to offer you competitive prices without compromising on
                  quality.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={200}>
              <div className="about-why-choose-card">
                <div className="about-why-choose-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="about-why-choose-title">Safe & Secure</h3>
                <p className="about-why-choose-text">
                  Your safety is our priority. We partner with trusted service providers and offer 24/7 support during
                  your trip.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={300}>
              <div className="about-why-choose-card">
                <div className="about-why-choose-icon">
                  <i className="fas fa-thumbs-up"></i>
                </div>
                <h3 className="about-why-choose-title">Satisfaction Guaranteed</h3>
                <p className="about-why-choose-text">
                  We're committed to your satisfaction. If you're not happy with any aspect of your trip, we'll make it
                  right.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="about-why-choose-card">
                <div className="about-why-choose-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="about-why-choose-title">Expert Guidance</h3>
                <p className="about-why-choose-text">
                  Our travel experts have firsthand knowledge of destinations and can provide personalized
                  recommendations.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="about-services-section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">Comprehensive travel solutions for every need</p>
            </div>
          </AnimatedElement>

          <div className="about-services-grid">
            <AnimatedElement animation="fade-up" delay={100}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-plane"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Flight Bookings</h3>
                  <p className="about-service-text">
                    Domestic and international flight bookings at competitive prices with flexible change and
                    cancellation options.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={150}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-hotel"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Hotel Accommodations</h3>
                  <p className="about-service-text">
                    Handpicked hotels ranging from budget-friendly options to luxury resorts, ensuring comfort and
                    quality.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={200}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-route"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Tour Packages</h3>
                  <p className="about-service-text">
                    Comprehensive tour packages including transportation, accommodation, sightseeing, and activities.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={250}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-car"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Transportation</h3>
                  <p className="about-service-text">
                    Car rentals, airport transfers, and private transportation services for hassle-free travel.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={300}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-passport"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Visa Assistance</h3>
                  <p className="about-service-text">
                    Guidance and support for visa applications, ensuring a smooth process for international travel.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={350}>
              <div className="about-service-card">
                <div className="about-service-icon">
                  <i className="fas fa-hiking"></i>
                </div>
                <div className="about-service-content">
                  <h3 className="about-service-title">Adventure Activities</h3>
                  <p className="about-service-text">
                    Exciting adventure activities and experiences, from trekking and water sports to wildlife safaris.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">The principles that guide everything we do</p>
            </div>
          </AnimatedElement>

          <div className="about-values-grid">
            <AnimatedElement animation="fade-up" delay={100}>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3 className="about-value-title">Passion for Travel</h3>
                <p className="about-value-text">
                  We're travelers at heart. Our passion for exploration drives us to create exceptional experiences for
                  our customers.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={200}>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="about-value-title">Customer First</h3>
                <p className="about-value-text">
                  Your satisfaction is our priority. We go above and beyond to ensure every journey exceeds your
                  expectations.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={300}>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3 className="about-value-title">Responsible Tourism</h3>
                <p className="about-value-text">
                  We're committed to sustainable travel practices that respect local cultures and protect the
                  environment.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="about-mission-section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-subtitle">What drives us every day</p>
            </div>
          </AnimatedElement>

          <div className="about-content-grid reverse">
            <AnimatedElement animation="fade-left">
              <div className="about-content-text">
                <p>
                  Our mission is to make travel accessible, enjoyable, and enriching for everyone. We believe that
                  travel has the power to transform lives, broaden perspectives, and create lasting memories. That's why
                  we're dedicated to crafting exceptional travel experiences that cater to diverse interests, budgets,
                  and preferences.
                </p>
                <p>
                  We strive to provide our customers with the highest level of service, ensuring that every aspect of
                  their journey is seamless and memorable. From the moment you book with us to the time you return home,
                  we're committed to exceeding your expectations and making your travel dreams a reality.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-right">
              <div className="about-content-image">
                <img src={aboutImg2 || "/placeholder.svg"} alt="Beautiful destination" />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="travel-guide section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Our Team</h2>
              <p className="section-subtitle">Meet Our Team</p>
            </div>
          </AnimatedElement>

          <AnimatedSection staggered={true} staggerDelay={150}>
            <div className="travel-guide-row">
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide1Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Anshuman Singh</h4>
                      <p className="travel-guide-position">CEO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide2Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Vibhu Panchal</h4>
                      <p className="travel-guide-position">CTO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide2Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Vivek Vishwakarma</h4>
                      <p className="travel-guide-position">CDO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide2Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Alis Patel</h4>
                      <p className="travel-guide-position">MERN Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide2Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Abhishek Jha</h4>
                      <p className="travel-guide-position">MERN Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide2Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Harsh Patel</h4>
                      <p className="travel-guide-position">INTERN</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide3Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Vibhu Panchal</h4>
                      <p className="travel-guide-position">Tour Guide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel-guide-col">
                <div className="travel-guide-item">
                  <div className="travel-guide-img">
                    <div className="travel-guide-img-effects">
                      <img src={guide4Img || "/placeholder.svg"} className="travel-guide-image" alt="Guide" />
                    </div>
                    <div className="travel-guide-icon">
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a className="travel-guide-social-btn" href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                  <div className="travel-guide-title">
                    <div className="travel-guide-title-inner">
                      <h4 className="travel-guide-name">Swastik</h4>
                      <p className="travel-guide-position">Tour Guide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="about-stats section">
        <div className="container">
          <AnimatedElement animation="fade-up">
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <div className="about-stat-number">
                  <CounterAnimation end={8} suffix="+" />
                </div>
                <div className="about-stat-label">Years Experience</div>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-number">
                  <CounterAnimation end={10000} suffix="+" />
                </div>
                <div className="about-stat-label">Happy Customers</div>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-number">
                  <CounterAnimation end={100} suffix="+" />
                </div>
                <div className="about-stat-label">Destinations</div>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-number">
                  <CounterAnimation end={500} suffix="+" />
                </div>
                <div className="about-stat-label">Packages</div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  )
}

export default AboutPage


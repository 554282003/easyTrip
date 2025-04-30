"use client";

import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/App.css";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const PackageDetailPage = lazy(() => import("./pages/PackageDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PaymentStatus = lazy(() => import("./pages/PaymentStatusPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const TermsAndConditions = lazy(() => import("./pages/terms-and-conditions"));
const RefundPolicy = lazy(() => import("./pages/refund-policy"));

// ScrollToTop component to handle scrolling on route change
function ScrollToTopOnNavigation() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTopOnNavigation />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Suspense
            fallback={
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
              </div>
            }
          >
            <Helmet>
              <link rel="icon" href="/tripeasy-logo.png" />
              <link rel="apple-touch-icon" href="/tripeasy-logo.png" />
            </Helmet>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/package/:id" element={<PackageDetailPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/payment/:id" element={<PaymentPage />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/refund-policy" element={<RefundPolicy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;

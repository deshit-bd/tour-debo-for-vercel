'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function VisaDetailPage() {
  const [applicantCount, setApplicantCount] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({
    stickerVisa: true,
    requiredDocs: false,
    importantNotes: true,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Gallery Layout */}
        <div className="detail-gallery-grid">
          <div className="gallery-main-view">
            <Image
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
              alt="Eiffel Tower Vista"
              fill
              className="detail-main-img"
              priority
            />
            <button className="gallery-arrow left-arrow">‹</button>
            <button className="gallery-arrow right-arrow">›</button>
          </div>

          <div className="gallery-thumbs-col">
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80" alt="Vista" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=300&q=80" alt="Louvre" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=300&q=80" alt="Street" fill className="thumb-img" />
            </div>
            <div className="thumb-item thumb-more-overlay">
              <Image src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80" alt="River" fill className="thumb-img" />
              <div className="overlay-text">10+</div>
            </div>
          </div>
        </div>

        {/* Visa Header Info */}
        <div className="visa-header-card">
          <div className="detail-title-row">
            <div className="title-and-rating">
              <h1>Canada</h1>
              <div className="stars-row">
                <span className="star-gold">★★★★★</span>
                <span className="rating-score">4.5</span>
                <small className="rating-count">(Ratings)</small>
              </div>
            </div>

            <div className="action-buttons-group">
              <button className="btn-icon-circle" aria-label="Share">↗</button>
              <button className="btn-icon-circle" aria-label="Wishlist">♡</button>
            </div>
          </div>

          <p className="visa-subtitle-type">Student Visa / Tourist Visa Available</p>

          <div className="visa-country-meta-grid">
            <div className="meta-info-item">🏙 <strong>Capital City :</strong> London</div>
            <div className="meta-info-item">🕒 <strong>Local Time :</strong> GMT +0</div>
            <div className="meta-info-item">📞 <strong>Telephone Code :</strong> + 44</div>
            <div className="meta-info-item">💱 <strong>Exchange Rate :</strong> 1 GBP is equivalent to 140 BDT</div>
            <div className="meta-info-item full-width-item">
              📍 <strong>Embassy Address :</strong> United Nations Road Baridhara . P O Box 6079 Dhaka - 1212, Bangladesh Email: press.dhaka@fco.gov.uk Telephone: +88 02 882 2705 Consular fax / email: +880 2 988 2819 / consular.bangladesh@fco.gov.uk
            </div>
          </div>

          <div className="starting-visa-fee-badge">
            <small>Starting From!</small>
            <div className="fee-big-text">
              Visa Fee <strong>$10</strong> <small>For One Person</small>
            </div>
          </div>
        </div>

        {/* Two-Column Content & Sidebar */}
        <div className="detail-two-col-layout">
          {/* Left Column: Accordions */}
          <div className="left-content-column">
            {/* Accordion 1: Required Documents for Sticker visa */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('stickerVisa')}>
                <h3>Required Documents for Sticker visa</h3>
                <span className="chevron">{openAccordions.stickerVisa ? '▲' : '▼'}</span>
              </div>
              {openAccordions.stickerVisa && (
                <div className="accordion-body docs-body">
                  <h4>Student:</h4>
                  <ul>
                    <li>07 Months Valid Passport With Old Passport (If have)</li>
                    <li>Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)</li>
                    <li>ID card (Student) one photocopy both sides</li>
                    <li>Leave letter from school or collage original copy</li>
                    <li>Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Required Documents */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('requiredDocs')}>
                <h3>Required Documents</h3>
                <span className="chevron">{openAccordions.requiredDocs ? '▲' : '▼'}</span>
              </div>
              {openAccordions.requiredDocs && (
                <div className="accordion-body docs-body">
                  <h4>Student:</h4>
                  <ul>
                    <li>07 Months Valid Passport With Old Passport (If have)</li>
                    <li>Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)</li>
                    <li>ID card (Student) one photocopy both sides</li>
                    <li>Leave letter from school or collage original copy</li>
                    <li>Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 3: Important Notes */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('importantNotes')}>
                <h3>Important Notes</h3>
                <span className="chevron">{openAccordions.importantNotes ? '▲' : '▼'}</span>
              </div>
              {openAccordions.importantNotes && (
                <div className="accordion-body">
                  <p>Please contact the Visa department for Document processing after the payment. Visa rate may change without any prior notice</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="right-sidebar-column">
            {/* Tour Planner Card */}
            <div className="tour-planner-card">
              <div className="planner-header">
                <div>
                  <small>Tour Planner</small>
                  <h4>DeshIT-BD</h4>
                </div>
                <button className="btn-chat">💬 Chat</button>
              </div>

              <div className="planner-badge-row">
                <span className="check-badge">✔ Bronze Planner</span>
              </div>

              <div className="planner-stats-circles">
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Positive Tourist Review</small>
                </div>
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Chat Response Rate</small>
                </div>
              </div>

              <button className="btn-view-shop">View Shop</button>
            </div>

            {/* Processing Fee & Booking Card */}
            <div className="booking-price-card">
              <div className="price-card-header">
                <small>Starting From!</small>
                <div className="package-rate-item active">
                  <div className="rate-left">
                    <strong>Processing Fee</strong>
                    <span>+ Visa Fee $20</span>
                  </div>
                  <div className="rate-right">
                    <span className="main-dollar">$10</span>
                    <span className="tag-discount">-30% $10</span>
                  </div>
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setApplicantCount(Math.max(1, applicantCount - 1))}>−</button>
                <span className="count-number">{applicantCount}</span>
                <button className="counter-btn" onClick={() => setApplicantCount(applicantCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack">
                <button className="btn-add-wishlist">Add To Wishlist</button>
                <button className="btn-book-now">Book now</button>
              </div>
            </div>

            {/* Other Countries Section */}
            <div className="others-interest-section">
              <h4>Other Countries</h4>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="visa-card-figma mini-visa-card">
                  <div className="visa-card-image-wrap">
                    <Image src="https://images.unsplash.com/photo-1519832979-6fa011b87615?auto=format&fit=crop&w=800&q=80" alt="Canada" fill className="visa-card-img" />
                    <span className="badge-featured">★ Featured</span>
                    <button className="heart-circle-btn">♡</button>
                  </div>
                  <div className="visa-card-body">
                    <div className="title-rating-row">
                      <h4>Canada</h4>
                      <span className="star-rating">★ 4.7</span>
                    </div>
                    <small>Student Visa Available</small>
                    <div className="visa-price-footer">
                      <span className="current-price">$200</span>
                      <span className="strike-price">$250</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <div className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </div>

      <Footer />
    </div>
  );
}

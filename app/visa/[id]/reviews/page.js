'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function VisaReviewsPage() {
  const [activeAccordion, setActiveAccordion] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const otherCountries = [
    { title: 'Canada', price: '$200', oldPrice: '$250', rating: 4.7, served: '0 People Served' },
    { title: 'Canada', price: '$200', oldPrice: '$250', rating: 4.7, served: '0 People Served' },
    { title: 'Canada', price: '$200', oldPrice: '$250', rating: 4.7, served: '0 People Served' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Photo Gallery Grid */}
        <div className="detail-gallery-grid">
          <div className="gallery-main-view">
            <Image
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
              alt="Eiffel Tower / Canada Visa"
              fill
              className="detail-main-img"
              priority
            />
            <button className="gallery-arrow left-arrow">‹</button>
            <button className="gallery-arrow right-arrow">›</button>
          </div>

          <div className="gallery-thumbs-col">
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" alt="Thumb" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" alt="Thumb" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" alt="Thumb" fill className="thumb-img" />
            </div>
            <div className="thumb-item thumb-more-overlay">
              <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" alt="Thumb" fill className="thumb-img" />
              <div className="overlay-text">10+</div>
            </div>
          </div>
        </div>

        {/* Header Title Block */}
        <div className="visa-header-card">
          <div className="detail-title-row">
            <div className="title-and-rating">
              <h1>Canada <span className="star-rating">★ 4.5 <small>(120 Ratings)</small></span></h1>
              <p className="visa-subtitle-type">Student Visa / Tourist Visa Available</p>
            </div>
            <div className="action-buttons-group">
              <button className="btn-icon-circle">↗</button>
              <button className="btn-icon-circle">♡</button>
            </div>
          </div>

          <div className="visa-country-meta-grid">
            <div>🏛️ <strong>Capital City :</strong> London</div>
            <div>🕐 <strong>Local Time :</strong> GMT +0</div>
            <div>📞 <strong>Telephone Code :</strong> + 44</div>
            <div>💱 <strong>Exchange Rate :</strong> 1 GBP is equivalent to 140 BDT</div>
            <div className="full-width-item">
              📍 <strong>Embassy Address :</strong> United Nations Road Baridhara . P O Box 6079 Dhaka - 1212, Bangladesh Email: press.dhaka@fco.gov.uk Telephone: +88 02 882 2705 Consular fax / email: +880 2 988 2819 / consular.bangladesh@fco.gov.uk
            </div>
          </div>

          <div className="starting-visa-fee-badge">
            <small>Starting From</small>
            <span className="fee-big-text">Visa Fee <strong>$10</strong></span>
            <small style={{ display: 'block', fontSize: '0.68rem', marginTop: '2px' }}>For One Person</small>
          </div>
        </div>

        {/* Two-Column Grid: Left Accordions & Reviews vs Right Cards */}
        <div className="detail-two-col-layout">
          {/* Left Column */}
          <div className="left-content-column">
            {/* Accordion 1: Required Documents for Sticker visa */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                <h3>Required Documents for Sticker visa</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: activeAccordion === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {activeAccordion === 1 && (
                <div className="accordion-body docs-body">
                  <strong>Student:</strong>
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
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                <h3>Required Documents</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: activeAccordion === 2 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {activeAccordion === 2 && (
                <div className="accordion-body docs-body">
                  <strong>Student:</strong>
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
              <div className="accordion-header" onClick={() => toggleAccordion(3)}>
                <h3>Important Notes</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: activeAccordion === 3 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {activeAccordion === 3 && (
                <div className="accordion-body">
                  <p>
                    Please contact the Visa department for Document processing after the payment. Visa rate may change without any prior notice.
                  </p>
                </div>
              )}
            </div>

            {/* Travellers Review Block */}
            <div className="travellers-review-card">
              <h3>Travellers Review</h3>

              <div className="review-summary-grid">
                <div className="big-rating-box">
                  <span className="big-score">4.0</span>
                  <div className="stars-gold-row">★★★★☆</div>
                  <small className="rating-count">52 Reviews</small>
                </div>

                <div className="rating-bars-col">
                  <div className="bar-row"><span>5 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%' }}></div></div></div>
                  <div className="bar-row"><span>4 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '60%' }}></div></div></div>
                  <div className="bar-row"><span>3 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '30%' }}></div></div></div>
                  <div className="bar-row"><span>2 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '40%' }}></div></div></div>
                  <div className="bar-row"><span>1 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '10%' }}></div></div></div>
                </div>
              </div>

              <div className="user-reviews-list">
                <div className="user-review-item">
                  <div className="reviewer-avatar">CH</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Courtney Henry</strong>
                      <span className="stars-gold-row">★★★★★</span>
                      <small className="review-time">2 mins ago</small>
                    </div>
                    <p>Consequat velit qui adipisicing sunt do mependent ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua</p>
                  </div>
                </div>

                <div className="user-review-item">
                  <div className="reviewer-avatar">CW</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Cameron Williamson</strong>
                      <span className="stars-gold-row">★★★★★</span>
                      <small className="review-time">2 mins ago</small>
                    </div>
                    <p>Consequat velit qui adipisicing sunt do mependent ad laborum tempor ullamco exercitation.</p>
                  </div>
                </div>

                <div className="user-review-item">
                  <div className="reviewer-avatar">JC</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Jane Cooper</strong>
                      <span className="stars-gold-row">★★★★★</span>
                      <small className="review-time">2 mins ago</small>
                    </div>
                    <p>Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Planner & Booking Cards + Other Countries */}
          <div className="right-sidebar-column">
            {/* Tour Planner Card */}
            <div className="tour-planner-card">
              <div className="planner-header">
                <div>
                  <small>TOUR PLANNER</small>
                  <h4>DeshIT-BD</h4>
                </div>
                <Link href="/account/messages" className="btn-chat" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>💬 Chat</Link>
              </div>
              <div className="planner-badge-row">
                <span className="check-badge">✔ Bronze Planner</span>
              </div>
              <div className="planner-stats-circles">
                <div className="stat-circle"><span className="stat-percent">90%</span><small>Positive Review</small></div>
                <div className="stat-circle"><span className="stat-percent">90%</span><small>Response Time</small></div>
              </div>
              <Link href="/planner/deshit" className="btn-view-shop" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>View Shop</Link>
            </div>

            {/* Booking Price & Counter Card */}
            <div className="booking-price-card">
              <div className="price-card-header">
                <small>Starting From</small>
                <div className="package-rate-item active">
                  <div className="rate-left">
                    <strong>Processing Fee</strong>
                    <span>+ Visa Fee</span>
                  </div>
                  <div className="rate-right">
                    <span className="main-dollar">$10 <small className="strike-price">$12</small></span>
                    <span className="tag-discount">-80%</span>
                    <div style={{ fontSize: '1rem', fontWeight: '800' }}>$20</div>
                  </div>
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>-</button>
                <span className="count-number">{ticketCount}</span>
                <button className="counter-btn" onClick={() => setTicketCount(ticketCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack">
                <button className="btn-add-wishlist">⊕ Add To Wishlist</button>
                <button className="btn-book-now">⊕ Book now</button>
              </div>
            </div>

            {/* Other Countries Section */}
            <div className="others-interest-section" style={{ marginTop: '20px' }}>
              <h4>Other Countries</h4>

              {otherCountries.map((visa, idx) => (
                <div key={idx} className="visa-card-figma mini-visa-card">
                  <div className="visa-card-image-wrap">
                    <Image
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                      alt={visa.title}
                      fill
                      className="visa-card-img"
                    />
                    <span className="badge-featured">Featured</span>
                    <button className="heart-circle-btn">♡</button>
                  </div>
                  <div className="visa-card-body">
                    <div className="title-rating-row">
                      <h3>{visa.title}</h3>
                      <span className="star-rating">★ {visa.rating}</span>
                    </div>
                    <span className="visa-served-badge">👥 {visa.served}</span>
                    <div className="visa-price-footer">
                      <small>Starting From</small>
                      <div className="price-tag-row">
                        <span className="current-price">{visa.price}</span>
                        <span className="strike-price">{visa.oldPrice}</span>
                      </div>
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

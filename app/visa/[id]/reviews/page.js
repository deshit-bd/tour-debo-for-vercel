'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function VisaReviewsPage() {
  const [activeAccordion, setActiveAccordion] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

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
          <div className="detail-title-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', color: '#0F172A' }}>Canada</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="star-gold" style={{ color: '#FFB800', fontSize: '1rem' }}>★★★★★</span>
                <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>4.5</strong>
                <small style={{ fontSize: '0.82rem', color: '#64748B' }}>(120 Ratings)</small>
              </div>

              {/* Share & Wishlist Buttons Inline right beside Ratings */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {/* Share Button with Popover */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowShareModal(!showShareModal)}
                    title="Share Visa Page"
                    style={{
                      background: showShareModal ? '#DCFCE7' : '#EFF6FF',
                      border: showShareModal ? '1px solid #86EFAC' : '1px solid #BFDBFE',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#2563EB',
                      transition: 'all 0.2s ease-in-out',
                      boxShadow: '0 2px 6px rgba(37,99,235,0.1)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </button>

                  {/* Share Modal / Popover */}
                  {showShareModal && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '36px',
                        left: '0',
                        background: '#ffffff',
                        borderRadius: '20px',
                        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.22)',
                        border: '1px solid #E2E8F0',
                        padding: '22px 20px',
                        width: '310px',
                        zIndex: 999,
                        animation: 'modalFadeIn 0.2s ease-out',
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                        <strong style={{ fontSize: '1rem', color: '#0F172A', fontWeight: '800' }}>Share Package</strong>
                        <button
                          type="button"
                          onClick={() => setShowShareModal(false)}
                          style={{ border: 'none', background: '#F1F5F9', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.85rem', color: '#64748B', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Social Icons Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px', textAlign: 'center' }}>
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowShareModal(false)}
                          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                        >
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(24,119,242,0.3)' }}>
                            f
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Facebook</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Canada Visa Package')}%20${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowShareModal(false)}
                          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                        >
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(37,211,102,0.3)' }}>
                            💬
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>WhatsApp</span>
                        </a>

                        {/* Twitter (X) */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Canada Visa Package')}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowShareModal(false)}
                          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                        >
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '800', boxShadow: '0 4px 10px rgba(15,23,42,0.3)' }}>
                            𝕏
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Twitter</span>
                        </a>

                        {/* Email */}
                        <a
                          href={`mailto:?subject=${encodeURIComponent('Canada Visa Package')}&body=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                          onClick={() => setShowShareModal(false)}
                          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                        >
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EA4335', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(234,67,53,0.3)' }}>
                            ✉️
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Email</span>
                        </a>
                      </div>

                      {/* Copy Link Input Capsule */}
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>Page Link</span>
                        <div style={{ display: 'flex', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', padding: '3px' }}>
                          <input
                            type="text"
                            readOnly
                            value={typeof window !== 'undefined' ? window.location.href : ''}
                            style={{ flex: 1, border: 'none', background: 'transparent', padding: '6px 10px', fontSize: '0.78rem', color: '#475569', outline: 'none' }}
                          />
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            style={{ background: copiedLink ? '#16A34A' : '#2563EB', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
                          >
                            {copiedLink ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  title="Add to Wishlist"
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECDD3',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#E11D48',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: '0 2px 6px rgba(225,29,72,0.1)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="visa-subtitle-type" style={{ margin: '4px 0 0 0' }}>Student Visa / Tourist Visa Available</p>
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
              <p style={{ fontSize: '0.72rem', color: '#64748B', textAlign: 'left', lineHeight: '1.4', margin: '10px 0 0 0' }}>
                Upon clicking 'Book Now', I confirm I have read and acknowledged <Link href="/help" style={{ color: '#2563EB', textDecoration: 'underline' }}>all terms and policies</Link>.
              </p>
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

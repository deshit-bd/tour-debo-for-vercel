'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';
import { generateTicketPDF } from '../../utils/pdfGenerator';

const galleryImages = [
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
];

export default function TourDetailPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('single'); // 'single', 'couple', 'deluxe'
  const [inWishlist, setInWishlist] = useState(false);
  const [couponSaved, setCouponSaved] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Accordion open/close state
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    packageDetails: true,
    cancellation: false,
    included: true,
    terms: false,
    tips: false,
    policy: false,
  });

  // Review Form Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Courtney Henry',
      avatar: 'CH',
      rating: 5,
      time: '2 mins ago',
      text: 'An unforgettable experience! The Eiffel Tower guided tour and Seine river cruise exceeded all expectations. Highly recommended!',
    },
    {
      name: 'Cameron Williamson',
      avatar: 'CW',
      rating: 5,
      time: '1 hour ago',
      text: 'Super smooth booking, fantastic 4-star hotel stay in Paris, and our local tour guide was super knowledgeable.',
    },
    {
      name: 'Jane Cooper',
      avatar: 'JC',
      rating: 4,
      time: '1 day ago',
      text: 'Great itinerary! Walking through Champs-Élysées at sunset was breathtaking. Downloaded our PDF voucher instantly.',
    },
  ]);

  const packagePrices = {
    single: 100,
    couple: 180,
    deluxe: 320,
  };

  const currentPricePerUnit = packagePrices[selectedPackage] || 100;
  const totalPrice = currentPricePerUnit * ticketCount;

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookNow = () => {
    router.push(`/checkout?package=${selectedPackage}&count=${ticketCount}`);
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const handleSaveCoupon = () => {
    setCouponSaved(true);
    setTimeout(() => setCouponSaved(false), 3000);
  };

  const handleDownloadVoucher = async () => {
    setDownloadingPdf(true);
    await generateTicketPDF({
      title: 'Paris : City of Love Tour',
      amount: formatPrice(totalPrice),
      date: '27 - 29 June, 2026',
      touristName: 'Hi, Tourist',
    });
    setDownloadingPdf(false);
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const added = {
      name: newReview.name,
      avatar: newReview.name.substring(0, 2).toUpperCase(),
      rating: Number(newReview.rating),
      time: 'Just now',
      text: newReview.comment,
    };

    setReviewsList([added, ...reviewsList]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewModal(false);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Gallery Layout with Live Image Switcher */}
        <div className="detail-gallery-grid">
          <div className="gallery-main-view" style={{ position: 'relative' }}>
            <Image
              src={galleryImages[activeImageIdx]}
              alt="Paris Experience"
              fill
              className="detail-main-img"
              priority
              style={{ cursor: 'pointer', objectFit: 'cover', borderRadius: '20px' }}
              onClick={() => setShowLightbox(true)}
            />
            <button
              className="gallery-arrow left-arrow"
              onClick={() => setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="gallery-arrow right-arrow"
              onClick={() => setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
              aria-label="Next image"
            >
              ›
            </button>
            <span
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                pointerEvents: 'none',
              }}
            >
              📷 {activeImageIdx + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Thumbnail Stack */}
          <div className="gallery-thumbs-col">
            {galleryImages.slice(1, 4).map((imgUrl, i) => (
              <div
                key={i}
                className={`thumb-item ${activeImageIdx === i + 1 ? 'active-thumb' : ''}`}
                onClick={() => setActiveImageIdx(i + 1)}
                style={{
                  cursor: 'pointer',
                  border: activeImageIdx === i + 1 ? '3px solid var(--primary-blue)' : '2px solid transparent',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <Image src={imgUrl} alt={`Thumbnail ${i + 1}`} fill className="thumb-img" style={{ objectFit: 'cover' }} />
              </div>
            ))}
            <div
              className="thumb-item thumb-more-overlay"
              onClick={() => setShowLightbox(true)}
              style={{ cursor: 'pointer' }}
            >
              <Image src={galleryImages[4]} alt="More images" fill className="thumb-img" style={{ objectFit: 'cover' }} />
              <div className="overlay-text">+{galleryImages.length - 3} More</div>
            </div>
          </div>
        </div>

        {/* Title, Rating & Quick Action Row */}
        <div className="detail-header-card" style={{ marginTop: '24px' }}>
          <div className="detail-title-row">
            <div className="title-and-rating">
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                Paris : <em style={{ color: 'var(--primary-blue)', fontStyle: 'italic' }}>City of Love & Lights</em>
              </h1>
              <div className="stars-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span className="star-gold" style={{ color: '#FFB800', fontSize: '1.2rem' }}>★★★★★</span>
                <span className="rating-score" style={{ fontWeight: '800', fontSize: '1.1rem' }}>4.8</span>
                <small className="rating-count" style={{ color: 'var(--text-muted)' }}>(52 Verified Ratings)</small>
              </div>
            </div>

            <div className="action-buttons-group" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                className="btn-icon-circle"
                onClick={handleDownloadVoucher}
                disabled={downloadingPdf}
                title="Download Official Voucher PDF"
                style={{
                  background: 'var(--primary-blue)',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 14px rgba(11, 87, 208, 0.3)',
                }}
              >
                📄 {downloadingPdf ? 'Downloading...' : 'PDF Voucher'}
              </button>
              <button
                className="btn-icon-circle"
                onClick={handleToggleWishlist}
                aria-label="Wishlist"
                style={{
                  background: inWishlist ? '#FFE4E6' : 'var(--bg-card)',
                  color: inWishlist ? '#E11D48' : 'var(--text-dark)',
                  border: '1px solid var(--border-light)',
                  padding: '10px',
                  borderRadius: '14px',
                  fontSize: '1.2rem',
                }}
              >
                {inWishlist ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          <div className="meta-badges-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            <span className="meta-badge location-badge">📍 Paris, France</span>
            <span className="meta-badge icons-badge">✈️ Flights 🏨 4★ Hotel 🍽️ Meals 🚌 Transport</span>
            <span className="meta-badge date-badge">📅 27 - 29 June, 2026</span>
            <span className="meta-badge weather-badge">⛅ 3 Days / 2 Nights</span>
            <span className="meta-badge visited-badge">👥 144+ Travelers Visited</span>
            <span className="meta-badge interest-badge">🔥 98% Recommended</span>
          </div>
        </div>

        {/* Two-Column Main Content & Right Sidebar Layout */}
        <div className="detail-two-col-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', marginTop: '32px' }}>
          {/* Left Column: Itinerary, Package Details, Policies, Reviews */}
          <div className="left-content-column">
            {/* Accordion 1: Itinerary */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('itinerary')}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🗺️ Detailed Day-by-Day Itinerary
                </h3>
                <span className="chevron">{openAccordions.itinerary ? '▲' : '▼'}</span>
              </div>
              {openAccordions.itinerary && (
                <div className="accordion-body">
                  <div className="day-block" style={{ padding: '16px', background: 'var(--primary-blue-light)', borderRadius: '14px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ color: 'var(--primary-blue)', fontWeight: '800' }}>Day 1 : Arrival & Seine River Cruise</h4>
                      <span style={{ fontSize: '0.8rem', background: '#0B57D0', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>Morning / Evening</span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                      VIP Airport pickup at Charles de Gaulle Airport and transfer to your 4-star hotel in central Paris. Rest and freshen up before an evening guided Seine River Cruise with wine tasting and views of the illuminated Eiffel Tower.
                    </p>
                  </div>

                  <div className="day-block" style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '14px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '800' }}>Day 2 : Louvre Museum & Arc de Triomphe</h4>
                      <span style={{ fontSize: '0.8rem', background: '#10B981', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>Full Day Tour</span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                      Skip-the-line entry to Louvre Museum featuring the Mona Lisa. Afternoon leisure stroll along Champs-Élysées, followed by sunset access to Arc de Triomphe rooftop deck.
                    </p>
                  </div>

                  <div className="day-block" style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '800' }}>Day 3 : Montmartre & Departure</h4>
                      <span style={{ fontSize: '0.8rem', background: '#F59E0B', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>Half Day</span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                      Morning visit to Sacré-Cœur Basilica and Montmartre artist square. Souvenir shopping and private airport transfer for return flight.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Package Details & Inclusions */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('packageDetails')}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ✨ What&apos;s Included & Features
                </h3>
                <span className="chevron">{openAccordions.packageDetails ? '▲' : '▼'}</span>
              </div>
              {openAccordions.packageDetails && (
                <div className="accordion-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    <div style={{ padding: '12px', background: 'var(--bg-page)', borderRadius: '12px' }}>
                      <strong>✔️ Included In Price:</strong>
                      <ul style={{ paddingLeft: '20px', marginTop: '6px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                        <li>4-Star Hotel Room Accommodation</li>
                        <li>Daily Buffet Breakfast</li>
                        <li>Seine River Cruise Tickets</li>
                        <li>Louvre Museum Priority Passes</li>
                        <li>Airport Transfers & AC Coach</li>
                      </ul>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--bg-page)', borderRadius: '12px' }}>
                      <strong>❌ Exclusions:</strong>
                      <ul style={{ paddingLeft: '20px', marginTop: '6px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                        <li>Visa processing fees</li>
                        <li>Personal expenses & shopping</li>
                        <li>International flight tickets</li>
                        <li>Dinner meals (optional add-on)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Cancellation & Refund Policy */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('cancellation')}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🛡️ Cancellation & Refund Policy
                </h3>
                <span className="chevron">{openAccordions.cancellation ? '▲' : '▼'}</span>
              </div>
              {openAccordions.cancellation && (
                <div className="accordion-body cancellation-text">
                  <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Full transparency policy for all bookings made via Tour Dibo platform:
                  </p>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', lineHeight: '1.8' }}>
                    <li><strong>15+ Days prior to trip:</strong> 100% Refund (minus 5% bank processing fee).</li>
                    <li><strong>10-14 Days prior to trip:</strong> 75% Refund of total package cost.</li>
                    <li><strong>5-9 Days prior to trip:</strong> 50% Refund of total package cost.</li>
                    <li><strong>Under 5 Days:</strong> Non-refundable. Voucher can be rescheduled once within 6 months.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Travellers Review Section */}
            <div className="travellers-review-card" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>💬 Travellers Review</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified traveler reviews & star ratings</p>
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  style={{
                    background: 'var(--primary-gradient)',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 12px rgba(11, 87, 208, 0.25)',
                  }}
                >
                  ✍️ Write a Review
                </button>
              </div>

              <div className="review-summary-grid">
                <div className="big-rating-box">
                  <span className="big-score">4.8</span>
                  <div className="stars-gold">★★★★★</div>
                  <small>{reviewsList.length} Total Reviews</small>
                </div>

                <div className="rating-bars-col">
                  <div className="bar-row"><span>5 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}></div></div></div>
                  <div className="bar-row"><span>4 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '12%' }}></div></div></div>
                  <div className="bar-row"><span>3 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '3%' }}></div></div></div>
                  <div className="bar-row"><span>2 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '0%' }}></div></div></div>
                  <div className="bar-row"><span>1 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '0%' }}></div></div></div>
                </div>
              </div>

              {/* User Reviews List */}
              <div className="user-reviews-list" style={{ marginTop: '20px' }}>
                {reviewsList.map((rev, index) => (
                  <div key={index} className="user-review-item" style={{ padding: '16px', background: 'var(--bg-page)', borderRadius: '16px', marginBottom: '12px' }}>
                    <div className="reviewer-avatar" style={{ background: 'var(--primary-blue)', color: '#fff', fontWeight: '800', width: '42px', height: '42px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.9rem' }}>
                      {rev.avatar}
                    </div>
                    <div className="review-main-text" style={{ flex: 1 }}>
                      <div className="reviewer-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '0.95rem' }}>{rev.name}</strong>
                          <span className="stars-gold" style={{ color: '#FFB800', marginLeft: '8px' }}>
                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                          </span>
                        </div>
                        <small style={{ color: 'var(--text-muted)' }}>{rev.time}</small>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '6px', lineHeight: '1.5' }}>{rev.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="right-sidebar-column">
            {/* Verified Tour Planner Card */}
            <div className="tour-planner-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '20px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <div className="planner-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certified Tour Planner</small>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>DeshIT-BD Travels</h4>
                </div>
                <Link href="/account/messages" className="btn-chat" style={{ background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '0.85rem' }}>
                  💬 Direct Chat
                </Link>
              </div>

              <div className="planner-badge-row" style={{ marginTop: '12px' }}>
                <span className="check-badge" style={{ background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                  ✔ Silver Verified Operator
                </span>
              </div>

              <div className="planner-stats-circles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                <div className="stat-circle" style={{ background: 'var(--bg-page)', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
                  <span className="stat-percent" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-blue)', display: 'block' }}>98%</span>
                  <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Service Score</small>
                </div>
                <div className="stat-circle" style={{ background: 'var(--bg-page)', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
                  <span className="stat-percent" style={{ fontSize: '1.3rem', fontWeight: '800', color: '#10B981', display: 'block' }}>&lt; 5m</span>
                  <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Response Time</small>
                </div>
              </div>

              <Link href="/planner/deshit" className="btn-view-shop" style={{ display: 'block', textAlign: 'center', marginTop: '16px', background: 'var(--bg-page)', color: 'var(--text-dark)', padding: '10px', borderRadius: '12px', fontWeight: '700', fontSize: '0.85rem' }}>
                View Planner Shop & Packages
              </Link>
            </div>

            {/* Dynamic Price & Interactive Booking Card */}
            <div className="booking-price-card" style={{ background: 'var(--bg-card)', border: '2px solid var(--primary-blue)', padding: '24px', borderRadius: '20px', marginTop: '24px', boxShadow: '0 12px 30px rgba(11, 87, 208, 0.12)' }}>
              <div className="price-card-header">
                <small style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-blue)', textTransform: 'uppercase' }}>Select Package Tier</small>

                {/* Package Options Radio Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  <div
                    onClick={() => setSelectedPackage('single')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: selectedPackage === 'single' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                      background: selectedPackage === 'single' ? 'var(--primary-blue-light)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>Single Traveler</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 Person Pass + Stay</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{formatPrice(packagePrices.single)}</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedPackage('couple')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: selectedPackage === 'couple' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                      background: selectedPackage === 'couple' ? 'var(--primary-blue-light)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>Couple Package 💕</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 Persons Shared Room</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{formatPrice(packagePrices.couple)}</span>
                      <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: '700' }}>Save 10%</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedPackage('deluxe')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: selectedPackage === 'deluxe' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                      background: selectedPackage === 'deluxe' ? 'var(--primary-blue-light)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>Deluxe VIP Suite ⭐</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5★ Hotel + Helicopter Tour</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{formatPrice(packagePrices.deluxe)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '12px', background: 'var(--bg-page)', borderRadius: '14px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>Number of Passes:</span>
                <div className="counter-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button className="counter-btn" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} style={{ width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '8px', fontWeight: '800', border: '1px solid var(--border-light)' }}>−</button>
                  <span className="count-number" style={{ fontWeight: '800', fontSize: '1.1rem' }}>{ticketCount}</span>
                  <button className="counter-btn" onClick={() => setTicketCount(ticketCount + 1)} style={{ width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '8px', fontWeight: '800', border: '1px solid var(--border-light)' }}>+</button>
                </div>
              </div>

              {/* Total Computed Calculation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px stroke var(--border-light)' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '700' }}>Total Amount:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-blue)' }}>{formatPrice(totalPrice)}</span>
              </div>

              {/* Action Buttons */}
              <div className="booking-buttons-stack" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <button
                  className="btn-book-now"
                  onClick={handleBookNow}
                  style={{
                    background: 'var(--primary-gradient)',
                    color: '#ffffff',
                    padding: '14px',
                    borderRadius: '14px',
                    fontWeight: '800',
                    fontSize: '1rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 20px rgba(11, 87, 208, 0.3)',
                    cursor: 'pointer',
                  }}
                >
                  ⚡ Book Now ({formatPrice(totalPrice)})
                </button>
              </div>
            </div>

            {/* Promo Coupon Box */}
            <div className="coupon-promo-card" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', color: '#ffffff', padding: '20px', borderRadius: '20px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="coupon-left">
                <span style={{ background: '#FF4D4F', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase' }}>LIMITED OFFER</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>{formatPrice(20)} INSTANT OFF</h3>
                <small style={{ opacity: 0.85, fontSize: '0.78rem' }}>Promo Code: TOURDIBO20</small>
              </div>
              <button
                className="btn-save-coupon"
                onClick={handleSaveCoupon}
                style={{
                  background: couponSaved ? '#10B981' : '#ffffff',
                  color: couponSaved ? '#ffffff' : '#0F172A',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                }}
              >
                {couponSaved ? 'Claimed! ✓' : 'Claim Coupon'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justify: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <button
            onClick={() => setShowLightbox(false)}
            style={{ position: 'absolute', top: '24px', right: '32px', color: '#fff', fontSize: '2rem', fontWeight: '800', cursor: 'pointer' }}
          >
            ✕
          </button>

          <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '70vh' }}>
            <Image src={galleryImages[activeImageIdx]} alt="Full view" fill style={{ objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                style={{
                  width: '60px',
                  height: '40px',
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImageIdx === idx ? '3px solid #0B57D0' : 'none',
                }}
              >
                <Image src={img} alt="thumb" fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '480px', color: 'var(--text-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>✍️ Write Your Review</h3>
              <button onClick={() => setShowReviewModal(false)} style={{ fontSize: '1.2rem', fontWeight: '800' }}>✕</button>
            </div>

            <form onSubmit={handleAddReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Your Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Rating:</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', outline: 'none' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) Very Good</option>
                  <option value={3}>⭐⭐⭐ (3/5) Average</option>
                  <option value={2}>⭐⭐ (2/5) Poor</option>
                  <option value={1}>⭐ (1/5) Terrible</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Review Comment:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience during the tour..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary-gradient)', color: '#fff', padding: '14px', borderRadius: '14px', fontWeight: '800', fontSize: '1rem', marginTop: '10px' }}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

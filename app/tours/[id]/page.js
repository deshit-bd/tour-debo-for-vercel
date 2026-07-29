'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';

export default function TourDetailPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [ticketCount, setTicketCount] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [couponSaved, setCouponSaved] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    packageDetails: false,
    cancellation: true,
    included: false,
    terms: false,
    tips: false,
    policy: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookNow = () => {
    router.push('/checkout');
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const handleSaveCoupon = () => {
    setCouponSaved(true);
    setTimeout(() => setCouponSaved(false), 3000);
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
              alt="Paris Eiffel Tower"
              fill
              className="detail-main-img"
              priority
            />
            <button className="gallery-arrow left-arrow">‹</button>
            <button className="gallery-arrow right-arrow">›</button>
          </div>

          <div className="gallery-thumbs-col">
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80" alt="Eiffel Tower close" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=300&q=80" alt="Louvre Paris" fill className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=300&q=80" alt="Paris park" fill className="thumb-img" />
            </div>
            <div className="thumb-item thumb-more-overlay">
              <Image src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80" alt="Paris river" fill className="thumb-img" />
              <div className="overlay-text">10+</div>
            </div>
          </div>
        </div>

        {/* Title, Quick Stats & Action Row */}
        <div className="detail-header-card">
          <div className="detail-title-row">
            <div className="title-and-rating">
              <h1>Paris : <em>City of Love</em></h1>
              <div className="stars-row">
                <span className="star-gold">★★★★★</span>
                <span className="rating-score">4.5</span>
                <small className="rating-count">(Ratings)</small>
              </div>
            </div>
            <div className="action-buttons-group">
              <button className="btn-icon-circle" aria-label="Share">↗</button>
              <button className="btn-icon-circle" onClick={handleToggleWishlist} aria-label="Wishlist">
                {inWishlist ? '♥' : '♡'}
              </button>
            </div>
          </div>

          <div className="meta-badges-flex">
            <span className="meta-badge location-badge">📍 Paris, France</span>
            <span className="meta-badge icons-badge">✈️ 🏨 🍽️ 🚌 (INCLUDED)</span>
            <span className="meta-badge date-badge">📅 27 - 29 June, 2024</span>
            <span className="meta-badge weather-badge">⛅ 3 Days / 2 Night</span>
            <span className="meta-badge visited-badge">👥 144 People Visited!</span>
            <span className="meta-badge interest-badge">👥 144 People Showed Interest!</span>
          </div>
        </div>

        {/* Two-Column Main Content & Right Sidebar Layout */}
        <div className="detail-two-col-layout">
          {/* Left Column: Accordions & Reviews */}
          <div className="left-content-column">
            {/* Accordion: Itinerary */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('itinerary')}>
                <h3>Itinerary</h3>
                <span className="chevron">{openAccordions.itinerary ? '▲' : '▼'}</span>
              </div>
              {openAccordions.itinerary && (
                <div className="accordion-body">
                  <div className="day-block">
                    <h4>Day 1 : Arrival & Eiffel Tower Tour</h4>
                    <p>
                      Arrive at Charles de Gaulle Airport, transfer to hotel. Evening tour of the illuminated Eiffel Tower with Seine River Cruise.
                    </p>
                  </div>
                  <div className="day-block">
                    <h4>Day 2 : Louvre Museum & Arc de Triomphe</h4>
                    <p>
                      Guided morning tour of the Louvre Museum, walking down Champs-Élysées, and sunset view from Arc de Triomphe.
                    </p>
                  </div>
                  <div className="day-block">
                    <h4>Day 3 : Montmartre & Departure</h4>
                    <p>
                      Visit Sacré-Cœur Basilica in Montmartre, explore local cafes, and departure transfer.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion: Package Details */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('packageDetails')}>
                <h3>Package Details</h3>
                <span className="chevron">{openAccordions.packageDetails ? '▲' : '▼'}</span>
              </div>
              {openAccordions.packageDetails && (
                <div className="accordion-body">
                  <p>Includes flights, 4-star hotel stay, daily breakfast & guided museum entries in Paris.</p>
                </div>
              )}
            </div>

            {/* Accordion: Cancellation Policy */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('cancellation')}>
                <h3>Cancellation Policy</h3>
                <span className="chevron">{openAccordions.cancellation ? '▲' : '▼'}</span>
              </div>
              {openAccordions.cancellation && (
                <div className="accordion-body cancellation-text">
                  <p>Your confirmation of the Holiday will ensure that you have read the Cancellation Policy thoroughly and accepted it.</p>
                  <ul>
                    <li>15 days prior to the travel date - 50 % of total holiday cost.</li>
                    <li>10 days prior to the travel date - 75 % of total holiday cost.</li>
                    <li>05 days prior to the travel date - 100% of holiday cost will be non-refundable.</li>
                  </ul>
                  <p>convenience fee is non-refundable for online purchases.</p>
                </div>
              )}
            </div>

            {/* Accordion: Included service & Excluded service */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('included')}>
                <h3>Included service & Excluded service</h3>
                <span className="chevron">{openAccordions.included ? '▲' : '▼'}</span>
              </div>
              {openAccordions.included && (
                <div className="accordion-body">
                  <p><strong>Included:</strong> Hotel, Breakfast, Tour guide, Local transport.</p>
                  <p><strong>Excluded:</strong> Personal shopping, visa fees, dinner.</p>
                </div>
              )}
            </div>

            {/* Accordion: Terms & Conditions */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('terms')}>
                <h3>Terms & Conditions</h3>
                <span className="chevron">{openAccordions.terms ? '▲' : '▼'}</span>
              </div>
              {openAccordions.terms && (
                <div className="accordion-body">
                  <p>All bookings are non-transferable. Valid ID proof required at check-in.</p>
                </div>
              )}
            </div>

            {/* Accordion: Travel Tips */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('tips')}>
                <h3>Travel Tips</h3>
                <span className="chevron">{openAccordions.tips ? '▲' : '▼'}</span>
              </div>
              {openAccordions.tips && (
                <div className="accordion-body">
                  <p>Keep comfortable walking shoes and universal power adapters ready for France.</p>
                </div>
              )}
            </div>

            {/* Accordion: Policy */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('policy')}>
                <h3>Policy</h3>
                <span className="chevron">{openAccordions.policy ? '▲' : '▼'}</span>
              </div>
              {openAccordions.policy && (
                <div className="accordion-body">
                  <p>Standard safety and privacy policies apply for all travellers.</p>
                </div>
              )}
            </div>

            {/* Travellers Review Section */}
            <div className="travellers-review-card">
              <h3>Travellers Review</h3>
              <div className="review-summary-grid">
                <div className="big-rating-box">
                  <span className="big-score">4.0</span>
                  <div className="stars-gold">★★★★☆</div>
                  <small>52 Reviews</small>
                </div>

                <div className="rating-bars-col">
                  <div className="bar-row"><span>5 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '80%' }}></div></div></div>
                  <div className="bar-row"><span>4 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '65%' }}></div></div></div>
                  <div className="bar-row"><span>3 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '30%' }}></div></div></div>
                  <div className="bar-row"><span>2 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '45%' }}></div></div></div>
                  <div className="bar-row"><span>1 ★</span><div className="bar-track"><div className="bar-fill" style={{ width: '5%' }}></div></div></div>
                </div>
              </div>

              {/* Review Comments */}
              <div className="user-reviews-list">
                <div className="user-review-item">
                  <div className="reviewer-avatar">CH</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Courtney Henry</strong>
                      <span className="stars-gold">★★★★★</span>
                      <small>2 mins ago</small>
                    </div>
                    <p>Consequat velit qui mepellat sodales sunt do reprehenderit ad laborum ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua.</p>
                  </div>
                </div>

                <div className="user-review-item">
                  <div className="reviewer-avatar">CW</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Cameron Williamson</strong>
                      <span className="stars-gold">★★★★★</span>
                      <small>2 mins ago</small>
                    </div>
                    <p>Consequat velit qui mepellat sodales sunt do reprehenderit ad laborum ullamco.</p>
                  </div>
                </div>

                <div className="user-review-item">
                  <div className="reviewer-avatar">JC</div>
                  <div className="review-main-text">
                    <div className="reviewer-info">
                      <strong>Jane Cooper</strong>
                      <span className="stars-gold">★★★★★</span>
                      <small>2 mins ago</small>
                    </div>
                    <p>Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex.</p>
                  </div>
                </div>
              </div>
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
                <Link href="/account/messages" className="btn-chat">💬 Chat</Link>
              </div>

              <div className="planner-badge-row">
                <span className="check-badge">✔ Silver Tour Planner</span>
              </div>

              <div className="planner-stats-circles">
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Tour Planner Service Rating</small>
                </div>
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Chat Response Rate</small>
                </div>
              </div>

              <Link href="/planner/deshit" className="btn-view-shop" style={{ display: 'block', textCenter: 'center' }}>
                View Shop
              </Link>
            </div>

            {/* Price & Booking Card */}
            <div className="booking-price-card">
              <div className="price-card-header">
                <small>Package Starting From!</small>
                <div className="package-rate-item active">
                  <div className="rate-left">
                    <strong>Single</strong>
                    <span>For One Person</span>
                  </div>
                  <div className="rate-right">
                    <span className="main-dollar">{formatPrice(100 * ticketCount)}</span>
                    <span className="tag-discount">-30%</span>
                  </div>
                </div>

                <div className="package-rate-item">
                  <div className="rate-left">
                    <strong>Couple</strong>
                  </div>
                  <div className="rate-right">
                    <span>{formatPrice(180 * ticketCount)}</span>
                    <small>-30% ▼</small>
                  </div>
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>−</button>
                <span className="count-number">{ticketCount}</span>
                <button className="counter-btn" onClick={() => setTicketCount(ticketCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack">
                <button className="btn-add-wishlist" onClick={handleToggleWishlist}>
                  {inWishlist ? '♥ Wishlisted' : 'Add To Wishlist'}
                </button>
                <button className="btn-book-now" onClick={handleBookNow}>
                  Book now ({formatPrice(100 * ticketCount)})
                </button>
              </div>
            </div>

            {/* Coupon Promo Banner */}
            <div className="coupon-promo-card">
              <div className="coupon-left">
                <h3>{formatPrice(20)} OFF</h3>
                <small>Minimum Spend : {formatPrice(100)}</small><br />
                <small>Capped At. : {formatPrice(20)}</small><br />
                <small className="coupon-date">Dec 26 - 31 2024</small>
              </div>
              <button className="btn-save-coupon" onClick={handleSaveCoupon}>
                {couponSaved ? 'Saved! ✓' : 'Save Coupon >'}
              </button>
            </div>

            {/* Others Also Showed Interest Stack */}
            <div className="others-interest-section">
              <h4>Others Also Showed Interest</h4>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="tour-card-figma mini-card">
                  <div className="tour-card-image-wrap">
                    <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" alt="Cox's Bazar" fill className="tour-card-img" />
                    <button className="heart-circle-btn">♡</button>
                    <div className="badge-duration">3 Days / 2 Night</div>
                  </div>
                  <div className="tour-card-content">
                    <div className="title-rating-row">
                      <h4>Tenting at Cox's Bazar</h4>
                      <span className="star-rating">★ 4.7</span>
                    </div>
                    <div className="price-row">
                      <span className="current-price">{formatPrice(200)}</span>
                      <span className="strike-price">{formatPrice(250)}</span>
                    </div>
                    <p className="tour-snippet">Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

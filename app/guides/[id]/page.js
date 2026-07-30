'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const GUIDE_DETAILS = {
  dhaka: {
    title: 'Explore Dhaka',
    location: 'Dhaka, Bangladesh',
    rating: '4.7',
    guideName: 'Kaalam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    ],
    description: 'Explore Old Dhaka heritage lanes, Ahsan Manzil, Buriganga river life, and iconic local food stops with a verified city guide.',
    service: 'Private city tour, historical landmark walk, street food curation, riverfront guidance and personal photography support.',
  },
  sajek: {
    title: 'Sajek Mountain Trek',
    location: 'Sajek Valley, Bangladesh',
    rating: '4.9',
    guideName: 'Robin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80',
    ],
    description: 'Cloud viewpoints, hill trails, Konglak Peak, local villages and regional food experiences guided by a mountain route specialist.',
    service: 'Trek planning, viewpoint timing, local transport coordination, food stops, photo points and safety support.',
  },
  'cox-bazar': {
    title: "Cox's Bazar Beach Guide",
    location: "Cox's Bazar, Bangladesh",
    rating: '4.8',
    guideName: 'Tanvir',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    ],
    description: 'Beach camp, marine drive stops, parasailing coordination and sunset photography support with a certified coastal guide.',
    service: 'Beach safety support, activity scheduling, local seafood recommendations, photo session and transport guidance.',
  },
  sylhet: {
    title: 'Sylhet Tea Estate Escapade',
    location: 'Sylhet, Bangladesh',
    rating: '4.6',
    guideName: 'Hasan',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80',
    ],
    description: 'Tea garden photography, Ratargul swamp forest boat routes, Sreemangal food stops and scenic day planning.',
    service: 'Boat route guidance, tea estate walk, local transport coordination, viewpoint planning and photography support.',
  },
};

const RELATED_TOURS = [
  {
    title: "Cox's Bazar Beach Camp",
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: '$200',
    oldPrice: '$250',
    duration: '3 Days / 2 Night',
    desc: 'Oceanfront camp stay with beach walks, local seafood stops and sunset photography support.',
  },
  {
    title: 'Sajek Cloud Valley Trek',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: '4.9',
    price: '$220',
    oldPrice: '$280',
    duration: '3 Days / 2 Night',
    desc: 'Hilltop viewpoints, cloud trails, indigenous food experiences and guided sunrise routes.',
  },
];

export default function GuideDetailPage({ params }) {
  const guide = GUIDE_DETAILS[params?.id] || GUIDE_DETAILS.dhaka;
  const [ticketCount, setTicketCount] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    serviceDetails: false,
    cancellation: true,
    terms1: false,
    terms2: false,
    tips: false,
    policy: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Gallery Banner */}
        <div className="detail-gallery-grid">
          <div className="gallery-main-view">
            <Image
              src={guide.hero}
              alt={guide.title}
              fill
              sizes="(max-width: 768px) 100vw, 78vw"
              className="detail-main-img"
              priority
              style={{ objectPosition: 'center center' }}
            />
            <button className="gallery-arrow left-arrow">‹</button>
            <button className="gallery-arrow right-arrow">›</button>
          </div>

          <div className="gallery-thumbs-col">
            <div className="thumb-item">
              <Image src={guide.thumbs[0]} alt={`${guide.title} photo 1`} fill sizes="(max-width: 768px) 25vw, 220px" className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src={guide.thumbs[1]} alt={`${guide.title} photo 2`} fill sizes="(max-width: 768px) 25vw, 220px" className="thumb-img" />
            </div>
            <div className="thumb-item">
              <Image src={guide.thumbs[2]} alt={`${guide.title} photo 3`} fill sizes="(max-width: 768px) 25vw, 220px" className="thumb-img" />
            </div>
            <div className="thumb-item thumb-more-overlay">
              <Image src={guide.thumbs[3]} alt={`${guide.title} more photos`} fill sizes="(max-width: 768px) 25vw, 220px" className="thumb-img" />
              <div className="overlay-text">10+</div>
            </div>
          </div>
        </div>

        {/* Guide Header Banner Card (Avatar + Info) */}
        <div className="guide-profile-header-card">
          <div className="guide-avatar-large">
            <Image
              src={guide.avatar}
              alt={`${guide.guideName} avatar`}
              fill
              sizes="120px"
              className="guide-avatar-img"
            />
          </div>

          <div className="guide-header-info">
            <div className="guide-title-row">
              <div className="title-and-rating">
                <h1>{guide.title}</h1>
                <div className="stars-row">
                  <span className="star-gold">★★★★★</span>
                  <span className="rating-score">{guide.rating}</span>
                  <small className="rating-count">(Ratings)</small>
                </div>
              </div>
              <div className="action-buttons-group">
                <button className="btn-icon-circle" aria-label="Share">↗</button>
                <button className="btn-icon-circle" aria-label="Wishlist">♡</button>
              </div>
            </div>

            <div className="meta-badges-flex">
              <span className="meta-badge location-badge">Location: {guide.location}</span>
              <span className="meta-badge icons-badge">Flights, hotel, meals and transport included</span>
              <span className="meta-badge weather-badge">3 Days / 2 Nights</span>
              <span className="meta-badge interest-badge">144 people showed interest</span>
              <span className="meta-badge visited-badge">144 people visited</span>
            </div>
          </div>
        </div>

        {/* Description Header */}
        <div className="guide-description-block">
          <h3>Description :</h3>
          <p>
            {guide.description}
          </p>
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
                    <h4>Day 1 :</h4>
                    <p>
                      {guide.description}
                    </p>
                  </div>
                  <div className="day-block">
                    <h4>Day 2 :</h4>
                    <p>
                      {guide.description}
                    </p>
                  </div>
                  <div className="day-block">
                    <h4>Day 3 :</h4>
                    <p>
                      {guide.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion: Service Details */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('serviceDetails')}>
                <h3>Service Details</h3>
                <span className="chevron">{openAccordions.serviceDetails ? '▲' : '▼'}</span>
              </div>
              {openAccordions.serviceDetails && (
                <div className="accordion-body">
                  <p>{guide.service}</p>
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

            {/* Accordion: Terms & Conditions */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('terms1')}>
                <h3>Terms & Conditions</h3>
                <span className="chevron">{openAccordions.terms1 ? '▲' : '▼'}</span>
              </div>
              {openAccordions.terms1 && (
                <div className="accordion-body">
                  <p>Guide services are subject to weather conditions and local authority schedules.</p>
                </div>
              )}
            </div>

            {/* Accordion: Terms & Conditions (Duplicate in Figma) */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('terms2')}>
                <h3>Terms & Conditions</h3>
                <span className="chevron">{openAccordions.terms2 ? '▲' : '▼'}</span>
              </div>
              {openAccordions.terms2 && (
                <div className="accordion-body">
                  <p>Advance booking required 24 hours prior to service date.</p>
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
                  <p>Wear comfortable walking shoes and bring water bottles for walking tours.</p>
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
                  <p>All guide interactions follow strict traveler safety standards.</p>
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
                <button className="btn-chat">💬 Chat</button>
              </div>

              <div className="planner-badge-row">
                <span className="check-badge">✔ Bronze Tour Planner</span>
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

              <button className="btn-view-shop">View Shop</button>
            </div>

            {/* Package Starting From! Box */}
            <div className="booking-price-card">
              <div className="price-card-header">
                <small>Package Starting From!</small>
                <div className="package-rate-item active">
                  <div className="rate-left">
                    <strong>Single</strong>
                    <span>For One Person</span>
                  </div>
                  <div className="rate-right">
                    <span className="main-dollar">$10</span>
                    <span className="tag-discount">-30% $10</span>
                  </div>
                </div>

                <div className="package-rate-item">
                  <div className="rate-left">
                    <strong>Couple</strong>
                  </div>
                  <div className="rate-right">
                    <span>$10</span>
                    <small>-30% $10 ▼</small>
                  </div>
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>−</button>
                <span className="count-number">{ticketCount}</span>
                <button className="counter-btn" onClick={() => setTicketCount(ticketCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack">
                <button className="btn-add-wishlist">Add To Wishlist</button>
                <button className="btn-book-now">Book now</button>
              </div>
            </div>

            {/* Coupon Promo Banner */}
            <div className="coupon-promo-card">
              <div className="coupon-left">
                <h3>$20 OFF</h3>
                <small>Minimum Spend : $100</small><br />
                <small>Capped At. : $20</small><br />
                <small className="coupon-date">Dec 26 - 31 2024</small>
              </div>
              <button className="btn-save-coupon">Save Coupon &gt;</button>
            </div>

            {/* Language Proficiency Chart Card */}
            <div className="language-proficiency-card">
              <h4>Language Proficiency</h4>
              <div className="language-bars-list">
                <div className="lang-row">
                  <span className="lang-label">Bengali</span>
                  <div className="lang-bar-track">
                    <div className="lang-bar-fill green-bar" style={{ width: '80%' }}><span>4</span></div>
                  </div>
                </div>

                <div className="lang-row">
                  <span className="lang-label">English</span>
                  <div className="lang-bar-track">
                    <div className="lang-bar-fill green-bar" style={{ width: '100%' }}><span>5</span></div>
                  </div>
                </div>

                <div className="lang-row">
                  <span className="lang-label">Hindi</span>
                  <div className="lang-bar-track">
                    <div className="lang-bar-fill green-bar" style={{ width: '40%' }}><span>2</span></div>
                  </div>
                </div>
              </div>
              <div className="lang-scale-numbers">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>

            {/* Others Also Showed Interest Stack */}
            <div className="others-interest-section">
              <h4>Others Also showed Interest</h4>
              {RELATED_TOURS.map((tour) => (
                <div key={tour.title} className="tour-card-figma mini-card">
                  <div className="tour-card-image-wrap">
                    <Image src={tour.image} alt={tour.title} fill sizes="320px" className="tour-card-img" />
                    <button className="heart-circle-btn">♡</button>
                    <div className="badge-duration">{tour.duration}</div>
                  </div>
                  <div className="tour-card-content">
                    <div className="title-rating-row">
                      <h4>{tour.title}</h4>
                      <span className="star-rating">★ 4.7</span>
                    </div>
                    <div className="price-row">
                      <span className="current-price">{tour.price}</span>
                      <span className="strike-price">{tour.oldPrice}</span>
                    </div>
                    <p className="tour-snippet">{tour.desc}</p>
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


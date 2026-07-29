'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PlannerStorePage() {
  const productsList = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "Tenting at Cox's Bazar",
    price: "$200",
    oldPrice: "$250",
    rating: 4.7,
    duration: "3 Days / 2 Night",
    snippet: "Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.",
    interested: 144
  }));

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Vendor Planner Header Banner */}
        <div className="planner-vendor-header-card">
          <div className="vendor-left-profile">
            <div className="vendor-avatar-box">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
                alt="DeshIT - BD"
                fill
                className="vendor-img"
              />
            </div>
            <div className="vendor-info-meta">
              <h2>DeshIT - BD</h2>
              <ul>
                <li>👥 999 Followers</li>
                <li>👍 90% Positive Review</li>
                <li>🏖️ 100% Successful Tours</li>
                <li>✔ Bronze Planner</li>
              </ul>
            </div>
          </div>

          <div className="vendor-center-actions">
            <button className="btn-vendor-chat">💬 Chat Now</button>
            <button className="btn-vendor-follow">+ Follow</button>
          </div>

          <div className="vendor-right-stats">
            <div className="vendor-stat-circle">
              <div className="circle-wrap">
                <span className="percent-text">90%</span>
              </div>
              <small>Positive Tourist Review</small>
            </div>

            <div className="vendor-stat-circle">
              <div className="circle-wrap">
                <span className="percent-text">90%</span>
              </div>
              <small>Chat Response Time</small>
            </div>
          </div>
        </div>

        {/* Vendor Sub Navbar */}
        <nav className="vendor-nav-bar">
          <div className="vendor-nav-links">
            <span className="categories-dropdown">∨ Categories</span>
            <Link href="/planner/deshit" className="vendor-nav-link active">Homepage</Link>
            <Link href="/planner/deshit/products" className="vendor-nav-link">All Products</Link>
          </div>

          <div className="vendor-search-box">
            <input type="text" placeholder="Search" />
            <button className="btn-vendor-search">🔍</button>
          </div>
        </nav>

        {/* Products Section 1: 3-Column Grid */}
        <div className="tours-3col-grid" style={{ marginBottom: '30px' }}>
          {productsList.slice(0, 3).map((tour) => (
            <div key={tour.id} className="tour-card-figma">
              <div className="tour-card-image-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  alt={tour.title}
                  fill
                  className="tour-card-img"
                />
                <button className="heart-circle-btn">♡</button>
                <span className="badge-duration">{tour.duration}</span>
              </div>

              <div className="tour-card-content">
                <div className="title-rating-row">
                  <h3>{tour.title}</h3>
                  <span className="star-rating">★ {tour.rating}</span>
                </div>

                <div className="price-row">
                  <small>Starting From</small>
                  <div className="price-tag">
                    <span className="current-price">{tour.price}</span>
                    <span className="strike-price">{tour.oldPrice}</span>
                    <span className="discount-tag">20% OFF</span>
                  </div>
                </div>

                <p className="tour-snippet">{tour.snippet}</p>

                <div className="icons-features-row">
                  <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚶</span><span>⛰️</span>
                </div>

                <div className="interest-counter">
                  👥 {tour.interested} People Showed Interest!
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Wide Skiing / Adventure Promotion Banner */}
        <div className="planner-middle-banner">
          <Image
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1400&q=80"
            alt="Skiing Banner"
            fill
            className="banner-img"
          />
        </div>

        {/* Products Section 2: 3-Column Grid */}
        <div className="tours-3col-grid">
          {productsList.slice(3, 6).map((tour) => (
            <div key={tour.id} className="tour-card-figma">
              <div className="tour-card-image-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  alt={tour.title}
                  fill
                  className="tour-card-img"
                />
                <button className="heart-circle-btn">♡</button>
                <span className="badge-duration">{tour.duration}</span>
              </div>

              <div className="tour-card-content">
                <div className="title-rating-row">
                  <h3>{tour.title}</h3>
                  <span className="star-rating">★ {tour.rating}</span>
                </div>

                <div className="price-row">
                  <small>Starting From</small>
                  <div className="price-tag">
                    <span className="current-price">{tour.price}</span>
                    <span className="strike-price">{tour.oldPrice}</span>
                    <span className="discount-tag">20% OFF</span>
                  </div>
                </div>

                <p className="tour-snippet">{tour.snippet}</p>

                <div className="icons-features-row">
                  <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚶</span><span>⛰️</span>
                </div>

                <div className="interest-counter">
                  👥 {tour.interested} People Showed Interest!
                </div>
              </div>
            </div>
          ))}
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function PlannerHomepage2() {
  const justForYouList = Array.from({ length: 6 }).map((_, i) => ({
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
                sizes="110px"
                priority
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

        {/* Featured Asymmetric Grid Section */}
        <div className="planner-showcase-grid-top" style={{ marginBottom: '24px' }}>
          {/* Left Big Showcase Card */}
          <div className="showcase-card-big">
            <div className="showcase-img-wrap">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Parasailing"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="showcase-img"
              />
            </div>
            <div className="showcase-card-footer">
              <h3>Parasailing!</h3>
              <div className="footer-meta-row">
                <span className="price-tag">Starting From <strong>$200</strong> <small>$250</small> <span className="discount-tag">20% OFF</span></span>
                <span>📍 Cox's Bazar</span>
                <span>🕒 3 Days</span>
                <div className="icons-features-row">
                  <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚶</span><span>⛰️</span>
                </div>
                <span>👥 144 People Showed Interest!</span>
              </div>
            </div>
          </div>

          {/* Right Stack of 2 Medium Cards */}
          <div className="showcase-thumbs-stack">
            <div className="showcase-card-medium">
              <div className="showcase-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80"
                  alt="Parasailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="showcase-img"
                />
              </div>
              <div className="showcase-card-footer">
                <h3>Parasailing!</h3>
                <div className="footer-meta-row">
                  <span className="price-tag">Starting From <strong>$200</strong> <small>$250</small></span>
                  <span>📍 Cox's Bazar</span>
                  <span>🕒 3 Days</span>
                </div>
              </div>
            </div>

            <div className="showcase-card-medium">
              <div className="showcase-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80"
                  alt="Parasailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="showcase-img"
                />
              </div>
              <div className="showcase-card-footer">
                <h3>Parasailing!</h3>
                <div className="footer-meta-row">
                  <span className="price-tag">Starting From <strong>$200</strong> <small>$250</small></span>
                  <span>📍 Cox's Bazar</span>
                  <span>🕒 3 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle 2-Column Grid Section */}
        <div className="offers-2col-grid" style={{ marginBottom: '40px' }}>
          <div className="offer-card-figma">
            <div className="offer-card-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
                alt="Parasailing"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="offer-card-img"
              />
            </div>
            <div className="offer-card-content">
              <h3>Parasailing!</h3>
              <div className="horizontal-footer-row">
                <span className="price-tag">Starting From <strong>$200</strong> <small>$250</small> <span className="discount-tag">20% OFF</span></span>
                <span>📍 Cox's Bazar</span>
                <span>🕒 3 Days</span>
              </div>
            </div>
          </div>

          <div className="offer-card-figma">
            <div className="offer-card-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
                alt="Parasailing"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="offer-card-img"
              />
            </div>
            <div className="offer-card-content">
              <h3>Parasailing!</h3>
              <div className="horizontal-footer-row">
                <span className="price-tag">Starting From <strong>$200</strong> <small>$250</small> <span className="discount-tag">20% OFF</span></span>
                <span>📍 Cox's Bazar</span>
                <span>🕒 3 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Just For You 3-Column Grid */}
        <div className="figma-section">
          <div className="section-header-flex">
            <h2>Just For You</h2>
          </div>

          <div className="tours-3col-grid">
            {justForYouList.map((tour) => (
              <div key={tour.id} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

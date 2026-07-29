'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCurrency } from './context/CurrencyContext';

const heroImages = [
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
];

const servicesData = [
  {
    title: 'Guided Tours',
    desc: 'Professional local guides for authentic travel experiences.',
    link: '/guides',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    title: 'Tour Packages',
    desc: 'Curated all-inclusive tour packages with unbeatable offers.',
    link: '/tours',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" strokeWidth="2">
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    title: 'Visa Services',
    desc: 'Hassle-free visa assistance for top international destinations.',
    link: '/visa',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <line x1="15" y1="8" x2="19" y2="8" />
        <line x1="15" y1="12" x2="19" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Travel Insurance',
    desc: 'Comprehensive travel coverage for total peace of mind.',
    link: '/checkout',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const popularTours = [
  {
    id: '1',
    title: "Tenting at Cox's Bazar",
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: 200,
    oldPrice: 250,
    duration: '3 Days / 2 Night',
    desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.',
  },
  {
    id: '2',
    title: 'Sajek Valley Tour',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: 200,
    oldPrice: 250,
    duration: '3 Days / 2 Night',
    desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.',
  },
  {
    id: '3',
    title: 'Amazing Shundarban',
    image: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: 200,
    oldPrice: 250,
    duration: '3 Days / 2 Night',
    desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.',
  },
];

const offersData = [
  {
    title: 'Parasailing!',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: 200,
    oldPrice: 250,
    desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.',
  },
  {
    title: 'Kayaking!',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
    price: 200,
    oldPrice: 250,
    desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.',
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const { formatPrice } = useCurrency();

  // Fast Auto-Carousel Timer (2.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextHero = () => {
    setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Section 1: Fast Auto Hero Carousel Banner & Side Services Card */}
        <section className="hero-grid-section">
          <div className="hero-banner-card">
            <div className="hero-image-container">
              {heroImages.map((imgUrl, i) => (
                <Image
                  key={i}
                  src={imgUrl}
                  alt={`Travel Hero Banner ${i + 1}`}
                  fill
                  className={`hero-img ${i === heroIndex ? 'active-slide' : 'inactive-slide'}`}
                  priority={i === 0}
                  style={{
                    opacity: i === heroIndex ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    objectFit: 'cover',
                  }}
                />
              ))}

              <button className="slider-arrow prev-arrow" onClick={prevHero} aria-label="Previous slide">‹</button>
              <button className="slider-arrow next-arrow" onClick={nextHero} aria-label="Next slide">›</button>

              {/* Slider Dots Overlay */}
              <div className="img-dots-overlay" style={{ bottom: '16px', zIndex: 10 }}>
                {heroImages.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === heroIndex ? 'active' : ''}`}
                    onClick={() => setHeroIndex(i)}
                    style={{ cursor: 'pointer' }}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          <aside className="our-services-card">
            <h3>Our Services</h3>
            <ul className="services-list-menu">
              <li><Link href="/tours">Tour Packages</Link></li>
              <li><Link href="/visa">Visa Services</Link></li>
              <li><Link href="/guides">Travel Guide</Link></li>
              <li><Link href="/planner/deshit">Planner Store</Link></li>
            </ul>
          </aside>
        </section>

        {/* Section 2: We Offer Best Services */}
        <section className="figma-section">
          <div className="section-center-header">
            <h2>We Offer Best Services</h2>
          </div>
          <div className="best-services-grid">
            {servicesData.map((s, idx) => (
              <Link key={idx} href={s.link} className="service-box-card">
                <div className="service-box-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Popular Tours */}
        <section className="figma-section">
          <div className="section-header-flex">
            <h2>Popular Tours</h2>
            <Link href="/tours" className="link-view-all">View All &gt;</Link>
          </div>
          <div className="tours-3col-grid">
            {popularTours.map((t) => (
              <Link href={`/tours/paris`} key={t.id} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image src={t.image} alt={t.title} fill className="tour-card-img" />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `pop-${t.id}`)}
                  >
                    {favorites[`pop-${t.id}`] ? '♥' : '♡'}
                  </button>
                  <div className="badge-duration">{t.duration}</div>
                </div>
                <div className="tour-card-content">
                  <div className="title-rating-row">
                    <h3>{t.title}</h3>
                    <span className="star-rating">★ {t.rating}</span>
                  </div>
                  <div className="price-row">
                    <small>Starting From</small>
                    <div className="price-tag">
                      <span className="current-price">{formatPrice(t.price)}</span>
                      <span className="strike-price">{formatPrice(t.oldPrice)}</span>
                      <span className="discount-tag">20% OFF</span>
                    </div>
                  </div>
                  <p className="tour-snippet">{t.desc}</p>
                  <div className="icons-features-row">
                    <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚌</span><span>⛰️</span>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> 144 People Showed Interest!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Matha Noshto Offers!!! */}
        <section className="figma-section">
          <div className="section-header-flex">
            <h2>Matha Noshto Offers!!!</h2>
            <Link href="/tours" className="link-view-all">View All &gt;</Link>
          </div>
          <div className="offers-2col-grid">
            {offersData.map((o, idx) => (
              <Link href="/tours/paris" key={idx} className="offer-card-figma">
                <div className="offer-card-image-wrap">
                  <Image src={o.image} alt={o.title} fill className="offer-card-img" />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `offer-${idx}`)}
                  >
                    {favorites[`offer-${idx}`] ? '♥' : '♡'}
                  </button>
                  <div className="badge-duration">3 Days / 2 Night</div>
                </div>
                <div className="offer-card-content">
                  <div className="title-rating-row">
                    <h3>{o.title}</h3>
                    <span className="star-rating">★ {o.rating}</span>
                  </div>
                  <div className="price-row">
                    <small>Starting From</small>
                    <div className="price-tag">
                      <span className="current-price">{formatPrice(o.price)}</span>
                      <span className="strike-price">{formatPrice(o.oldPrice)}</span>
                      <span className="discount-tag">20% OFF</span>
                    </div>
                  </div>
                  <p className="tour-snippet">{o.desc}</p>
                  <div className="icons-features-row">
                    <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚌</span><span>⛰️</span>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> 144 People Showed Interest!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: Most Visited Tours! */}
        <section className="figma-section">
          <div className="section-header-flex">
            <h2>Most Visited Tours!</h2>
            <Link href="/tours" className="link-view-all">View All &gt;</Link>
          </div>
          <div className="most-visited-grid-figma">
            <Link href="/tours/paris" className="visited-card-large">
              <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" alt="Dubai" fill className="visited-img" />
              <div className="visited-top-badge">⏱ 3 Days</div>
              <div className="visited-bottom-bar">
                <span className="city-pill">Dubai</span>
                <span className="visited-count">👥 144 People Visited!</span>
              </div>
            </Link>

            <Link href="/tours/paris" className="visited-card-large">
              <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" alt="Paris Eiffel" fill className="visited-img" />
              <div className="visited-top-badge">⏱ 3 Days</div>
              <div className="visited-bottom-bar">
                <span className="city-pill">Paris</span>
                <span className="visited-count">👥 144 People Visited!</span>
              </div>
            </Link>

            <Link href="/tours/paris" className="visited-card-medium">
              <Image src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80" alt="Paris Canal" fill className="visited-img" />
              <div className="visited-top-badge">⏱ 3 Days</div>
              <div className="visited-bottom-bar">
                <span className="city-pill">Paris</span>
                <span className="visited-count">👥 144 People Visited!</span>
              </div>
            </Link>

            <Link href="/tours/paris" className="visited-card-medium">
              <Image src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" alt="Paris Street" fill className="visited-img" />
              <div className="visited-top-badge">⏱ 3 Days</div>
              <div className="visited-bottom-bar">
                <span className="city-pill">Paris</span>
                <span className="visited-count">👥 144 People Visited!</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 6: Just For You! */}
        <section className="figma-section">
          <div className="section-header-flex">
            <h2>Just For You!</h2>
            <Link href="/tours" className="link-view-all">View All &gt;</Link>
          </div>
          <div className="tours-3col-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Link href="/tours/paris" key={`just-${idx}`} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image
                    src={[
                      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                    ][idx % 3]}
                    alt="Cox's Bazar"
                    fill
                    className="tour-card-img"
                  />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `just-${idx}`)}
                  >
                    {favorites[`just-${idx}`] ? '♥' : '♡'}
                  </button>
                  <div className="badge-duration">3 Days / 2 Night</div>
                </div>
                <div className="tour-card-content">
                  <div className="title-rating-row">
                    <h3>Tenting at Cox's Bazar</h3>
                    <span className="star-rating">★ 4.7</span>
                  </div>
                  <div className="price-row">
                    <small>Starting From</small>
                    <div className="price-tag">
                      <span className="current-price">{formatPrice(200)}</span>
                      <span className="strike-price">{formatPrice(250)}</span>
                      <span className="discount-tag">20% OFF</span>
                    </div>
                  </div>
                  <p className="tour-snippet">Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.</p>
                  <div className="icons-features-row">
                    <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚌</span><span>⛰️</span>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> 144 People Showed Interest!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Messages Button */}
      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

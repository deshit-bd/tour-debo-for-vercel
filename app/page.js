'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCurrency } from './context/CurrencyContext';
import { POPULAR_TOURS, MOST_VISITED_TOURS, JUST_FOR_YOU_TOURS } from '../lib/toursData';

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
                  sizes="(max-width: 1024px) 100vw, 1020px"
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
            {POPULAR_TOURS.map((t) => (
              <Link href={`/tours/${t.id}`} key={t.id} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image src={t.image} alt={t.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="tour-card-img" />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `pop-${t.id}`)}
                  >
                    {favorites[`pop-${t.id}`] ? '♥' : '♡'}
                  </button>
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
                      {t.isOffer && <span className="discount-tag">20% OFF</span>}
                    </div>
                  </div>
                  <div style={{ margin: '4px 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                      🚌 Route: {t.transportRoute || `${t.startingPoint || 'Dhaka'} - ${t.location} - ${t.startingPoint || 'Dhaka'}`}
                    </span>
                  </div>
                  <p className="tour-snippet">{t.desc}</p>
                  <div className="icons-features-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      🌤️ {t.badge}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span title="Flight (Included)">✈️</span>
                      <span title="Hotel (Included)">🏨</span>
                      <span title="Meals (Included)">🍽️</span>
                      <span title="Transport (Included)">🚌</span>
                      <span title="Sightseeing (Included)">⛰️</span>
                    </div>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> {t.interestCount} People Showed Interest!
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
          <div className="tours-3col-grid">
            {POPULAR_TOURS.filter((t) => t.isOffer).slice(0, 2).map((o, idx) => (
              <Link href={`/tours/${o.id}`} key={o.id} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image src={o.image} alt={o.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="tour-card-img" />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `offer-${o.id}`)}
                  >
                    {favorites[`offer-${o.id}`] ? '♥' : '♡'}
                  </button>
                </div>
                <div className="tour-card-content">
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
                  <div style={{ margin: '4px 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                      🚌 Route: {o.transportRoute || `${o.startingPoint || 'Dhaka'} - ${o.location} - ${o.startingPoint || 'Dhaka'}`}
                    </span>
                  </div>
                  <p className="tour-snippet">{o.desc}</p>
                  <div className="icons-features-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      🌤️ {o.badge}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span title="Flight (Included)">✈️</span>
                      <span title="Hotel (Included)">🏨</span>
                      <span title="Meals (Included)">🍽️</span>
                      <span title="Transport (Included)">🚌</span>
                      <span title="Sightseeing (Included)">⛰️</span>
                    </div>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> {o.interestCount} People Showed Interest!
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
          <div className="tours-3col-grid">
            {MOST_VISITED_TOURS.map((t) => (
              <Link href={`/tours/${t.id}`} key={`mv-${t.id}`} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image src={t.image} alt={t.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="tour-card-img" />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `mv-${t.id}`)}
                  >
                    {favorites[`mv-${t.id}`] ? '♥' : '♡'}
                  </button>
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
                      {t.isOffer && <span className="discount-tag">20% OFF</span>}
                    </div>
                  </div>
                  <div style={{ margin: '4px 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                      🚌 Route: {t.transportRoute || `${t.startingPoint || 'Dhaka'} - ${t.location} - ${t.startingPoint || 'Dhaka'}`}
                    </span>
                  </div>
                  <p className="tour-snippet">{t.desc}</p>
                  <div className="icons-features-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      🌤️ {t.badge || t.duration}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span title="Flight (Included)">✈️</span>
                      <span title="Hotel (Included)">🏨</span>
                      <span title="Meals (Included)">🍽️</span>
                      <span title="Transport (Included)">🚌</span>
                      <span title="Sightseeing (Included)">⛰️</span>
                    </div>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> {t.interestCount || t.visitedCount || 144} People Showed Interest!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 6: Just For You! */}
        <section className="figma-section">
          <div className="section-header-flex">
            <h2>Just For You!</h2>
            <Link href="/tours" className="link-view-all">View All &gt;</Link>
          </div>
          <div className="tours-3col-grid">
            {JUST_FOR_YOU_TOURS.map((tour, idx) => (
              <Link href={`/tours/${tour.id}`} key={`just-${tour.id}`} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="tour-card-img"
                  />
                  <button
                    className="heart-circle-btn"
                    onClick={(e) => toggleFavorite(e, `just-${tour.id}`)}
                  >
                    {favorites[`just-${tour.id}`] ? '♥' : '♡'}
                  </button>
                </div>
                <div className="tour-card-content">
                  <div className="title-rating-row">
                    <h3>{tour.title}</h3>
                    <span className="star-rating">★ {tour.rating}</span>
                  </div>
                  <div className="price-row">
                    <small>Starting From</small>
                    <div className="price-tag">
                      <span className="current-price">{formatPrice(tour.price)}</span>
                      <span className="strike-price">{formatPrice(tour.oldPrice)}</span>
                      {tour.isOffer && <span className="discount-tag">20% OFF</span>}
                    </div>
                  </div>
                  <div style={{ margin: '4px 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                      🚌 Route: {tour.transportRoute || `${tour.startingPoint || 'Dhaka'} - ${tour.location} - ${tour.startingPoint || 'Dhaka'}`}
                    </span>
                  </div>
                  <p className="tour-snippet">{tour.desc}</p>
                  <div className="icons-features-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      🌤️ {tour.badge}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span title="Flight (Included)">✈️</span>
                      <span title="Hotel (Included)">🏨</span>
                      <span title="Meals (Included)">🍽️</span>
                      <span title="Transport (Included)">🚌</span>
                      <span title="Sightseeing (Included)">⛰️</span>
                    </div>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> {tour.interestCount} People Showed Interest!
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Customer Service (Chat / Email) Widget (SRS Page 6 Standard) */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link
          href="/account/messages"
          className="floating-messages-btn"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '30px',
            fontWeight: '700',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          💬 Tour Planner Chat (Online)
        </Link>
      </div>

      <Footer />
    </div>
  );
}

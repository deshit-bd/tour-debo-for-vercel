'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import { useCurrency } from '../context/CurrencyContext';

const ALL_TOURS_DATA = [
  {
    id: 'tour-1',
    title: 'Parasailing Adventure!',
    location: "Cox's Bazar",
    rating: 4.7,
    price: 180,
    oldPrice: 250,
    duration: '3 Days',
    badge: '3 Days / 2 Night',
    isOffer: true,
    countryType: 'Single Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '4 Star',
    sightseeing: 'Sea',
    desc: 'Fly high above the Bay of Bengal coastline with certified instructors and premium equipment.',
  },
  {
    id: 'tour-2',
    title: 'Sajek Valley Cloud Tour',
    location: 'Sajek Valley',
    rating: 4.9,
    price: 220,
    oldPrice: 280,
    duration: '3 Days',
    badge: '3 Days / 2 Night',
    isOffer: true,
    countryType: 'Single Country',
    packageType: 'Family',
    transportation: 'Include',
    meal: 'All Include',
    accommodation: 'Bamboo Cottage',
    sightseeing: 'Mountain',
    desc: 'Witness the sea of clouds from Helipad and Konglak Hilltop cottage with local indigenous cuisine.',
  },
  {
    id: 'tour-3',
    title: 'Sundarbans Mangrove Cruise',
    location: 'Sundarbans',
    rating: 4.8,
    price: 250,
    oldPrice: 320,
    duration: '5 Days',
    badge: '5 Days / 4 Night',
    isOffer: false,
    countryType: 'Single Country',
    packageType: 'Group',
    transportation: 'Partial Include',
    meal: 'All Include',
    accommodation: 'Ship',
    sightseeing: 'Forest',
    desc: 'Explore Kotka beach and Harbaria wild forest inside the world largest mangrove forest.',
  },
  {
    id: 'tour-4',
    title: 'Paris City of Romance Tour',
    location: 'Paris',
    rating: 5.0,
    price: 290,
    oldPrice: 350,
    duration: '7 Days',
    badge: '7 Days / 6 Night',
    isOffer: true,
    countryType: 'Multi - Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '5 Star',
    sightseeing: 'City',
    desc: 'Full access Eiffel Tower pass, Seine River cruise, Louvre museum guided walkthrough.',
  },
  {
    id: 'tour-5',
    title: 'Sylhet Ratargul & Jaflong Escaped',
    location: 'Sylhet',
    rating: 4.6,
    price: 120,
    oldPrice: 160,
    duration: '3 Days',
    badge: '3 Days / 2 Night',
    isOffer: true,
    countryType: 'Single Country',
    packageType: 'Family',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '3 Star',
    sightseeing: 'Nature',
    desc: 'Explore freshwater swamp forest by wooden boat and clear tea gardens of Sreemangal.',
  },
  {
    id: 'tour-6',
    title: 'Saint Martin Coral Island Camp',
    location: 'Saint Martin',
    rating: 4.8,
    price: 195,
    oldPrice: 240,
    duration: '3 Days',
    badge: '3 Days / 2 Night',
    isOffer: false,
    countryType: 'Single Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Dinner',
    accommodation: 'Tent',
    sightseeing: 'Sea',
    desc: 'Bicycle ride on Chera Dwip, night beach camp bonfire and fresh sea seafood dinner.',
  },
];

function TourListingContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { formatPrice } = useCurrency();

  const [sortBy, setSortBy] = useState('lowest');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [favorites, setFavorites] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [filters, setFilters] = useState({
    rating: 1,
    maxPrice: 300,
    startingPoint: searchQuery,
    onlyOffer: false,
    countryType: [],
    packageType: [],
    duration: [],
    transportation: [],
    meal: [],
    accommodation: [],
    sightseeing: [],
  });

  const sampleImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  ];

  // Dynamic filtering & sorting engine
  const filteredTours = useMemo(() => {
    return ALL_TOURS_DATA.filter((tour) => {
      if (filters.rating && tour.rating < filters.rating) return false;
      if (filters.maxPrice && tour.price > filters.maxPrice) return false;
      if (
        filters.startingPoint &&
        !tour.location.toLowerCase().includes(filters.startingPoint.toLowerCase()) &&
        !tour.title.toLowerCase().includes(filters.startingPoint.toLowerCase())
      ) {
        return false;
      }
      if (filters.onlyOffer && !tour.isOffer) return false;
      if (filters.countryType?.length > 0 && !filters.countryType.includes(tour.countryType)) return false;
      if (filters.packageType?.length > 0 && !filters.packageType.includes(tour.packageType)) return false;
      if (filters.duration?.length > 0 && !filters.duration.includes(tour.duration)) return false;
      if (filters.transportation?.length > 0 && !filters.transportation.includes(tour.transportation)) return false;
      if (filters.meal?.length > 0 && !filters.meal.includes(tour.meal)) return false;
      if (filters.accommodation?.length > 0 && !filters.accommodation.includes(tour.accommodation)) return false;
      if (filters.sightseeing?.length > 0 && !filters.sightseeing.includes(tour.sightseeing)) return false;
      return true;
    }).sort((a, b) => (sortBy === 'lowest' ? a.price - b.price : b.price - a.price));
  }, [filters, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextImage = (id) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % sampleImages.length,
    }));
  };

  const prevImage = (id) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? sampleImages.length - 1 : (prev[id] || 0) - 1,
    }));
  };

  return (
    <div className="listing-layout-grid">
      {/* Left Column: Reactive Filter Sidebar */}
      <FilterSidebar filters={filters} onFilterChange={setFilters} />

      {/* Right Column: Dynamic Search Results */}
      <div className="results-container">
        <div className="results-top-bar">
          <h2>
            Search results{' '}
            <small style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '500' }}>
              ({filteredTours.length} packages found)
            </small>
          </h2>

          <div className="results-controls-right">
            {/* Sort Dropdown Selector */}
            <div className="sort-dropdown" style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '999px', border: '1px solid #E2E8F0' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontWeight: '700',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  color: 'var(--text-dark)',
                }}
              >
                <option value="lowest">Price (lowest) ▾</option>
                <option value="highest">Price (highest) ▾</option>
              </select>
            </div>

            {/* List vs Grid Layout View Toggle Buttons */}
            <div className="view-grid-toggle">
              <button
                className={`view-icon ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                aria-label="List View"
              >
                ☰
              </button>
              <button
                className={`view-icon ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                ⊞
              </button>
            </div>
          </div>
        </div>

        {/* Empty State when zero tours match filters */}
        {filteredTours.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #E2E8F0',
              marginTop: '20px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px' }}>
              No Tour Packages Match Your Filters
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '20px' }}>
              Try resetting or relaxing some filters in the left sidebar to explore more destinations.
            </p>
            <button
              className="btn-reset-filter"
              onClick={() =>
                setFilters({
                  rating: 1,
                  maxPrice: 300,
                  startingPoint: '',
                  onlyOffer: false,
                  countryType: [],
                  packageType: [],
                  duration: [],
                  transportation: [],
                  meal: [],
                  accommodation: [],
                  sightseeing: [],
                })
              }
              style={{
                background: 'var(--primary-blue)',
                color: '#ffffff',
                padding: '10px 24px',
                borderRadius: '999px',
                fontWeight: '700',
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Vertical Grid View (2 Columns) */
          <div className="tours-2col-grid">
            {filteredTours.map((item) => (
              <div key={item.id} className="tour-card-figma">
                <div className="tour-card-image-wrap">
                  <Image
                    src={sampleImages[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="tour-card-img"
                  />
                  <button
                    className="heart-circle-btn"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    {favorites[item.id] ? '♥' : '♡'}
                  </button>
                  <div className="badge-duration">{item.badge}</div>
                </div>
                <div className="tour-card-content">
                  <div className="title-rating-row">
                    <Link href="/tours/paris">
                      <h3>{item.title}</h3>
                    </Link>
                    <span className="star-rating">★ {item.rating}</span>
                  </div>
                  <div className="price-row">
                    <small>Starting From</small>
                    <div className="price-tag">
                      <span className="current-price">{formatPrice(item.price)}</span>
                      <span className="strike-price">{formatPrice(item.oldPrice)}</span>
                      {item.isOffer && <span className="discount-tag">20% OFF</span>}
                    </div>
                  </div>
                  <p className="tour-snippet">{item.desc}</p>
                  <div className="icons-features-row">
                    <span>✈️</span><span>🏨</span><span>🍽️</span><span>🚌</span><span>⛰️</span>
                  </div>
                  <div className="interest-counter">
                    <span className="users-icon">👥</span> 144 People Showed Interest!
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Horizontal List View */
          <div className="tour-horizontal-list">
            {filteredTours.map((item) => {
              const imgIdx = activeImageIndex[item.id] || 0;
              return (
                <div key={item.id} className="tour-card-horizontal">
                  <div className="horizontal-img-box">
                    <Image
                      src={sampleImages[imgIdx]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="card-horizontal-img"
                    />
                    <button
                      className="heart-circle-btn"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      {favorites[item.id] ? '♥' : '♡'}
                    </button>
                    <button className="img-arrow left-arrow" onClick={() => prevImage(item.id)}>
                      ‹
                    </button>
                    <button className="img-arrow right-arrow" onClick={() => nextImage(item.id)}>
                      ›
                    </button>
                    <div className="badge-duration">{item.badge}</div>
                    <div className="img-dots-overlay">
                      {sampleImages.map((_, i) => (
                        <span
                          key={i}
                          className={`dot ${i === imgIdx ? 'active' : ''}`}
                        ></span>
                      ))}
                    </div>
                  </div>

                  <div className="horizontal-content-box">
                    <div className="horizontal-header-row">
                      <div className="title-location-group">
                        <Link href="/tours/paris">
                          <h3>{item.title}</h3>
                        </Link>
                        <span className="location-tag">📍 {item.location}</span>
                      </div>
                      <div className="rating-price-group">
                        <div className="star-rating">★ {item.rating}</div>
                        <div className="price-stack">
                          <small>Starting From</small>
                          <div className="price-numbers">
                            <span className="current-price">{formatPrice(item.price)}</span>
                            <span className="strike-price">{formatPrice(item.oldPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="duration-tag-row">
                      <span className="duration-pill">⏱ {item.duration}</span>
                      {item.isOffer && <span className="discount-tag">20% OFF</span>}
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: '#F1F5F9',
                          color: '#475569',
                          fontWeight: '600',
                        }}
                      >
                        🏡 {item.accommodation}
                      </span>
                    </div>

                    <p className="tour-description-text">{item.desc}</p>

                    <div className="horizontal-footer-row">
                      <div className="icons-features-row">
                        <span>✈️</span>
                        <span>🏨</span>
                        <span>🍽️</span>
                        <span>🚌</span>
                        <span>⛰️</span>
                      </div>
                      <div className="interest-counter">
                        <span className="users-icon">👥</span> 144 People Showed Interest!
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TourListingPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontWeight: '700' }}>Loading tour packages...</div>}>
          <TourListingContent />
        </Suspense>
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

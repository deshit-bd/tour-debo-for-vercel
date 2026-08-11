'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import { useCurrency } from '../context/CurrencyContext';
import { ALL_TOURS } from '../../lib/toursData';

function TourListingContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { formatPrice } = useCurrency();

  const [allToursList, setAllToursList] = useState(ALL_TOURS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tour_dibo_custom_packages');
      if (saved) {
        const customItems = JSON.parse(saved);
        setAllToursList([...customItems, ...ALL_TOURS]);
      }
    } catch (e) {
      console.error('Failed to load custom packages on /tours page:', e);
    }
  }, []);

  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [favorites, setFavorites] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [filters, setFilters] = useState({
    rating: 1,
    maxPrice: 5000000,
    startingPoint: searchQuery,
    onlyOffer: false,
    localTour: false,
    countryType: [],
    selectedCountries: [],
    packageType: [],
    duration: [],
    transportation: [],
    meal: [],
    accommodation: [],
    sightseeing: [],
  });

  // Dynamic filtering & sorting engine
  const filteredTours = useMemo(() => {
    return allToursList.filter((tour) => {
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
      if (filters.localTour && !tour.isLocal) return false;
      if (filters.countryType?.length > 0 && !filters.countryType.includes(tour.countryType)) return false;
      
      // Multi-Country Filter Matching
      if (filters.selectedCountries?.length > 0) {
        const tourCountries = tour.multiCountries || [tour.country || tour.location];
        const hasMatch = filters.selectedCountries.some(sc =>
          tourCountries.some(tc => tc.toLowerCase().includes(sc.toLowerCase()) || sc.toLowerCase().includes(tc.toLowerCase()))
        );
        if (!hasMatch) return false;
      }

      if (filters.packageType?.length > 0 && !filters.packageType.includes(tour.packageType)) return false;
      if (filters.maxDays && filters.maxDays < 30) {
        const daysNum = parseInt((tour.duration || '').replace(/[^0-9]/g, '')) || 0;
        if (daysNum > 0 && daysNum > filters.maxDays) return false;
      }
      if (filters.duration?.length > 0 && !filters.duration.includes(tour.duration)) return false;
      if (filters.transportation?.length > 0 && !filters.transportation.includes(tour.transportation)) return false;
      if (filters.meal?.length > 0 && !filters.meal.includes(tour.meal)) return false;
      if (filters.accommodation?.length > 0 && !filters.accommodation.includes(tour.accommodation)) return false;
      if (filters.sightseeing?.length > 0 && !filters.sightseeing.includes(tour.sightseeing)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'lowest') return a.price - b.price;
      if (sortBy === 'highest') return b.price - a.price;
      return 0;
    });
  }, [allToursList, filters, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextImage = (id, total = 4) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const prevImage = (id, total = 4) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? total - 1 : (prev[id] || 0) - 1,
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
                <option value="newest">Newest First ▾</option>
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
          <div className="tours-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {filteredTours.map((item) => (
              <Link key={item.id} href={`/tours/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <div className="grid-tour-card" style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', height: '180px' }}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item.id); }}
                      style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', zIndex: 2 }}
                    >
                      {favorites[item.id] ? '❤️' : '♡'}
                    </button>
                  </div>
                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E293B', marginBottom: '4px' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '6px' }}>📍 {item.location}</p>
                      
                      {/* Route description badge (From Image 2) */}
                      <div style={{ margin: '6px 0 8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                          🚌 Route: {item.transportRoute || `${item.startingPoint || 'Dhaka'} - ${item.location} - ${item.startingPoint || 'Dhaka'}`}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <span style={{ fontWeight: '800', color: 'var(--primary-blue)', fontSize: '1.1rem' }}>
                        {item.prices?.single ? `৳${item.prices.single.toLocaleString()}` : formatPrice(item.price)}
                      </span>
                      {filteredTours.indexOf(item) % 2 === 0 ? (
                        <span style={{ fontSize: '0.72rem', background: '#FFF1F2', color: '#E11D48', border: '1.5px dashed #F43F5E', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          🎟️ Voucher Available
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.72rem', background: '#F0FDF4', color: '#15803D', border: '1.5px dashed #16A34A', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          🏷️ Extra Discount Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="tour-horizontal-list">
            {filteredTours.map((item) => {
              const fallbackCover = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
              const currentImgIdx = activeImageIndex[item.id] || 0;
              const rawImg = (item.images && item.images.length > 0) ? item.images[currentImgIdx] : item.image;
              const displaySrc = (!rawImg || typeof rawImg !== 'string' || rawImg.startsWith('blob:')) ? fallbackCover : rawImg;
              const itemImages = (item.images && item.images.length > 0) ? item.images : [displaySrc];

              return (
                <Link key={item.id} href={`/tours/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="tour-card-horizontal">
                  <div className="horizontal-img-box" style={{ position: 'relative', minHeight: '220px', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Image
                      src={displaySrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                    <button
                      className="img-nav left"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(item.id, itemImages.length); }}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    >
                      ‹
                    </button>
                    <button
                      className="img-nav right"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(item.id, itemImages.length); }}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    >
                      ›
                    </button>
                    <button
                      className="heart-btn"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item.id); }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    >
                      {favorites[item.id] ? '❤️' : '♡'}
                    </button>
                    <div
                      className="img-dots"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '6px',
                        zIndex: 2,
                      }}
                    >
                      {itemImages.map((_, i) => (
                        <span
                          key={i}
                          style={{
                            width: i === currentImgIdx ? '16px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            background: i === currentImgIdx ? '#ffffff' : 'rgba(255,255,255,0.6)',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="horizontal-content-box" style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2px' }}>
                    <div className="horizontal-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="title-and-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="tour-title-link" style={{ fontSize: '1.12rem', fontWeight: '800', color: 'var(--text-dark)' }}>
                            {item.title}
                          </span>
                          <span className="rating-badge" style={{ background: '#FFFBEB', color: '#B45309', padding: '2px 7px', borderRadius: '6px', fontWeight: '700', fontSize: '0.82rem' }}>★ {item.rating}</span>
                        </div>
                        <p className="location-text" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '1px 0 0 0' }}>📍 {item.location}</p>
                      </div>

                      <div className="price-and-action" style={{ textAlign: 'right' }}>
                        <div className="price-box">
                          <small style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Starting From</small>
                          <div className="price-numbers" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                            <span className="current-price" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-blue)' }}>
                              {item.prices?.single ? `৳${item.prices.single.toLocaleString()}` : formatPrice(item.price)}
                            </span>
                            {(() => {
                              const orig = item.prices?.singleOriginal;
                              const curr = item.prices?.single || item.price;
                              if (orig && curr && orig > curr && orig < curr * 10) {
                                return (
                                  <span className="strike-price" style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                                    ৳{orig.toLocaleString()}
                                  </span>
                                );
                              }
                              return null;
                            })()}
                            <span className="discount-tag" style={{ fontSize: '0.74rem', background: '#FFE4E6', color: '#E11D48', border: '1px dashed #F43F5E', padding: '2px 6px', borderRadius: '6px', fontWeight: '800' }}>
                              20% OFF
                            </span>
                            {filteredTours.indexOf(item) % 2 === 0 ? (
                              <span style={{ fontSize: '0.72rem', background: '#FFF1F2', color: '#E11D48', border: '1.5px dashed #F43F5E', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                🎟️ Voucher Available
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.72rem', background: '#F0FDF4', color: '#15803D', border: '1.5px dashed #16A34A', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                🏷️ Extra Discount Available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="duration-tag-row" style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', margin: '1px 0' }}>
                      <span className="duration-pill" style={{ fontSize: '0.76rem', background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>⏱ {item.duration}</span>
                      {item.isOffer && (
                        <span className="discount-tag" style={{ fontSize: '0.76rem', background: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                          {(() => {
                            if (item.discountTag && item.discountTag !== '100% OFF' && !item.discountTag.includes('100%')) {
                              return item.discountTag;
                            }
                            const orig = item.prices?.singleOriginal;
                            const curr = item.prices?.single || item.price;
                            if (orig && curr && orig > curr && orig < curr * 10) {
                              const pct = Math.round(((orig - curr) / orig) * 100);
                              return `${pct}% OFF`;
                            }
                            return '20% OFF';
                          })()}
                        </span>
                      )}
                      <span style={{ fontSize: '0.76rem', background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>🏡 {item.accommodation}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '999px', fontSize: '0.76rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                        🚌 Route: {item.transportRoute || `${item.startingPoint || 'Dhaka'} - ${item.location} - ${item.startingPoint || 'Dhaka'}`}
                      </span>
                    </div>

                    <p className="tour-description-text" style={{ fontSize: '0.84rem', color: 'var(--text-body)', margin: '1px 0', lineHeight: '1.35' }}>{item.desc}</p>

                    <div className="horizontal-footer-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid #F1F5F9', marginTop: '1px' }}>
                      <div className="icons-features-row" style={{ display: 'flex', gap: '8px', fontSize: '1rem', alignItems: 'center' }}>
                        {item.amenities ? (
                          item.amenities.map((a) => (
                            <span
                              key={a.id}
                              title={`${a.name} (${a.included ? 'INCLUDED' : 'EXCLUDED'})`}
                              style={{
                                opacity: a.included ? 1 : 0.25,
                                filter: a.included ? 'none' : 'grayscale(100%)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {a.icon}
                            </span>
                          ))
                        ) : (
                          <>
                            <span title="Flight (INCLUDED)">✈️</span>
                            <span title="Hotel (INCLUDED)">🏨</span>
                            <span title="Meals (INCLUDED)">🍽️</span>
                            <span title="Transport (INCLUDED)">🚌</span>
                            <span title="Sightseeing (INCLUDED)">⛰️</span>
                          </>
                        )}
                        <span style={{ fontSize: '0.72rem', background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                          (INCLUDED)
                        </span>
                      </div>
                      <div className="interest-counter" style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>
                        <span className="users-icon">👥</span> 144 People Showed Interest!
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
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

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FilterSidebar from '../../../components/FilterSidebar';

const VENDOR_PRODUCTS_DATA = [
  { id: 1, title: 'Parasailing Adventure!', location: "Cox's Bazar", price: 200, oldPrice: '$250', rating: 4.7, duration: '3 Days / 2 Nights', isOffer: true, desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.' },
  { id: 2, title: 'Sajek Valley Cloud Cottage', location: 'Sajek Valley', price: 220, oldPrice: '$280', rating: 4.9, duration: '3 Days / 2 Nights', isOffer: true, desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.' },
  { id: 3, title: 'Sundarbans River Cruise', location: 'Sundarbans', price: 250, oldPrice: '$320', rating: 4.8, duration: '5 Days / 4 Nights', isOffer: false, desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.' },
  { id: 4, title: 'Sylhet Swamp Forest Boat Tour', location: 'Sylhet', price: 120, oldPrice: '$160', rating: 4.6, duration: '3 Days / 2 Nights', isOffer: true, desc: 'Lorem ipsum dolor sit amet consectetur. Lacinia sodales vulputate pharetra eu proin at adipiscing suspendisse risus.' },
];

export default function PlannerAllProductsPage() {
  const params = useParams();
  const [sortBy, setSortBy] = useState('lowest');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [favorites, setFavorites] = useState({});
  const [filters, setFilters] = useState({
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
  });

  const filteredProducts = useMemo(() => {
    return VENDOR_PRODUCTS_DATA.filter((item) => {
      if (filters.rating && item.rating < filters.rating) return false;
      if (filters.maxPrice && item.price > filters.maxPrice) return false;
      if (
        filters.startingPoint &&
        !item.location.toLowerCase().includes(filters.startingPoint.toLowerCase()) &&
        !item.title.toLowerCase().includes(filters.startingPoint.toLowerCase())
      ) return false;
      if (filters.onlyOffer && !item.isOffer) return false;
      return true;
    }).sort((a, b) => (sortBy === 'lowest' ? a.price - b.price : b.price - a.price));
  }, [filters, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
                unoptimized
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
            <Link href="/account/messages" className="btn-vendor-chat">💬 Chat Now</Link>
            <button className="btn-vendor-follow">+ Follow Tour Planner</button>
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
            <Link href={`/planner/${params?.id || 'deshit'}`} className="vendor-nav-link">Homepage</Link>
            <Link href={`/planner/${params?.id || 'deshit'}/products`} className="vendor-nav-link active">All Products</Link>
          </div>

          {/* Quick Add Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link
              href={`/planner/${params?.id || 'deshit'}/add-visa`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(37,99,235,0.25)' }}
            >
              🌐 Add Visa Service
            </Link>
          </div>

          <div className="vendor-sort-controls">
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
        </nav>

        {/* 2-Column Grid: Filter Sidebar + Horizontal/Grid Package List */}
        <div className="listing-layout-grid" style={{ marginTop: '24px' }}>
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          <div className="results-container">
            {filteredProducts.length === 0 ? (
              <div style={{ background: '#ffffff', borderRadius: '18px', padding: '40px 20px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <p style={{ fontWeight: '700' }}>No products match your selected filters in this store.</p>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="tours-2col-grid">
                {filteredProducts.map((tour) => (
                  <div key={tour.id} className="tour-card-figma">
                    <div className="tour-card-image-wrap">
                      <Image
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                        className="tour-card-img"
                      />
                      <button
                        className="heart-circle-btn"
                        onClick={() => toggleFavorite(tour.id)}
                      >
                        {favorites[tour.id] ? '♥' : '♡'}
                      </button>
                      <div className="badge-duration">{tour.duration}</div>
                    </div>

                    <div className="tour-card-content">
                      <div className="title-rating-row">
                        <Link href={`/tours/${tour.id}`}>
                          <h3>{tour.title}</h3>
                        </Link>
                        <span className="star-rating">★ {tour.rating}</span>
                      </div>
                      <div className="price-row">
                        <small>Starting From</small>
                        <div className="price-tag">
                          <span className="current-price">${tour.price}</span>
                          <span className="strike-price">{tour.oldPrice}</span>
                          {tour.isOffer && <span className="discount-tag">20% OFF</span>}
                        </div>
                      </div>
                      <p className="tour-snippet">{tour.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="tour-horizontal-list">
                {filteredProducts.map((tour) => (
                  <div key={tour.id} className="tour-card-horizontal">
                    <div className="horizontal-img-box">
                      <Image
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        unoptimized
                        className="card-horizontal-img"
                      />
                    </div>
                    <div className="horizontal-content-box" style={{ padding: '16px' }}>
                      <Link href={`/tours/${tour.id}`}>
                        <h3>{tour.title}</h3>
                      </Link>
                      <p className="tour-snippet">{tour.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import { useCurrency } from '../context/CurrencyContext';

const INITIAL_GUIDES = [
  {
    id: 'dhaka',
    title: 'Explore Dhaka',
    locationTag: '(Dhaka)',
    rating: '4.7',
    guideName: 'With Kaalam',
    price: 200,
    priceNote: '(Family) + $50 per person',
    discount: '20% OFF',
    desc: 'Experienced local heritage guide for Old Dhaka street food tours, Ahsan Manzil, and Buriganga boat rides.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    completedCount: '144 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Family',
  },
  {
    id: 'sajek',
    title: 'Sajek Mountain Trek',
    locationTag: '(Sajek)',
    rating: '4.9',
    price: 180,
    guideName: 'With Robin',
    priceNote: '(Group) + $30 per person',
    discount: '15% OFF',
    desc: 'Indigenous hill guide for cloud helipad view, Konglak Peak trekking, and bamboo chicken dining.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    completedCount: '198 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Group',
  },
  {
    id: 'cox-bazar',
    title: "Cox's Bazar Beach Guide",
    locationTag: "(Cox's Bazar)",
    rating: '4.8',
    guideName: 'With Tanvir',
    price: 220,
    priceNote: '(Couple) + $40 per person',
    discount: '25% OFF',
    desc: 'Certified parasailing and marine beach camp instructor with private photo session.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    completedCount: '210 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Couple',
  },
  {
    id: 'sylhet',
    title: 'Sylhet Tea Estate Escapade',
    locationTag: '(Sylhet)',
    rating: '4.6',
    guideName: 'With Hasan',
    price: 150,
    priceNote: '(Family) + $25 per person',
    discount: '10% OFF',
    desc: 'Specialized guide for Ratargul Swamp Forest boat cruises and Sreemangal tea garden photography.',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    completedCount: '112 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Family',
  },
];

const defaultFilterState = {
  rating: 1,
  maxPrice: 300,
  startingPoint: '',
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
};

export default function TourGuidesPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState('lowest');
  const [favorites, setFavorites] = useState({});
  const [filters, setFilters] = useState(defaultFilterState);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGuides = INITIAL_GUIDES.filter((guide) => {
    if (parseFloat(guide.rating) < filters.rating) return false;
    if (guide.price > filters.maxPrice) return false;
    if (filters.onlyOffer && !guide.discount) return false;
    if (filters.startingPoint) {
      const q = filters.startingPoint.toLowerCase();
      const matchLoc = guide.locationTag.toLowerCase().includes(q);
      const matchTitle = guide.title.toLowerCase().includes(q);
      const matchName = guide.guideName.toLowerCase().includes(q);
      if (!matchLoc && !matchTitle && !matchName) return false;
    }
    if (filters.countryType.length > 0 && !filters.countryType.includes(guide.countryType)) {
      return false;
    }
    if (filters.packageType.length > 0 && !filters.packageType.includes(guide.packageType)) {
      return false;
    }
    return true;
  });

  const sortedGuides = [...filteredGuides].sort((a, b) =>
    sortBy === 'lowest' ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="listing-layout-grid">
          {/* Left Column: Fully Functional Filter Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Right Column: Tour Guides Grid */}
          <div className="results-container">
            <div className="results-top-bar">
              <h2>
                Tour Guides{' '}
                <small style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '500' }}>
                  ({sortedGuides.length} verified guides)
                </small>
              </h2>
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
            </div>

            {/* 2-Column Grid of Tour Guide Cards */}
            {sortedGuides.length === 0 ? (
              <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '20px', border: '1px solid #E2E8F0', marginTop: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>No Tour Guides Found</h4>
                <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '16px' }}>Try resetting your filter parameters or increasing price range.</p>
                <button
                  onClick={() => setFilters(defaultFilterState)}
                  style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="guides-2col-grid">
                {sortedGuides.map((guide, index) => (
                  <div
                    key={guide.id}
                    className="guide-card-figma"
                    onClick={() => router.push(`/guides/${guide.id}`)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') router.push(`/guides/${guide.id}`);
                    }}
                  >
                    <div className="guide-cover-wrap">
                      <Image
                        src={guide.coverImage}
                        alt={guide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 38vw"
                        priority={index < 2}
                        className="guide-cover-img"
                      />
                      <button
                        className="heart-circle-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(guide.id);
                        }}
                      >
                        {favorites[guide.id] ? '♥' : '♡'}
                      </button>

                      {/* Guide Profile Avatar Overlay */}
                      <div className="guide-avatar-overlay">
                        <Image
                          src={guide.avatarImage}
                          alt={`${guide.guideName} avatar`}
                          fill
                          sizes="72px"
                          priority={index < 2}
                          className="guide-avatar-img"
                        />
                      </div>
                    </div>

                    <div className="guide-card-body">
                      <div className="title-rating-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Link href={`/guides/${guide.id}`} style={{ textDecoration: 'none' }}>
                          <span className="guide-card-title" style={{ color: '#000000', fontWeight: '600', fontSize: '0.98rem' }}>{guide.title}</span>
                        </Link>
                        <span className="location-tag" style={{ fontSize: '0.8rem', color: '#64748B' }}>{guide.locationTag}</span>
                        <div className="rating-pill" style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: '700', color: '#D97706' }}>★ {guide.rating}</div>
                      </div>

                      <div className="guide-name-text">{guide.guideName}</div>

                      <div className="price-line-row" style={{ margin: '8px 0' }}>
                        <span className="starting-label" style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>STARTING FROM</span>
                        <div className="price-val-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '3px' }}>
                          <strong className="guide-price-text" style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>{formatPrice(guide.price)}</strong>
                          <span className="price-note" style={{ fontSize: '0.82rem', color: '#64748B' }}>{guide.priceNote}</span>
                          <span className="discount-pill-green" style={{ background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800', border: '1px solid #A7F3D0' }}>{guide.discount}</span>
                        </div>
                      </div>

                      <p className="guide-desc">{guide.desc}</p>

                      <div className="card-footer-icons-row">
                        <div className="mini-meta-icons">
                          <span>✈️</span>
                          <span>🏨</span>
                          <span>🍽️</span>
                          <span>🚌</span>
                        </div>
                        <div className="completed-count-text">🏃 {guide.completedCount}</div>
                      </div>
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

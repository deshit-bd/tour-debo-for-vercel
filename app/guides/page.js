'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import { useCurrency } from '../context/CurrencyContext';

const INITIAL_GUIDES = [
  {
    id: 'guide-1',
    title: 'Explore Dhaka',
    locationTag: '(Dhaka)',
    rating: '4.7',
    guideName: 'With Kaalam',
    price: 200,
    priceNote: '(Family) + $50 per person',
    discount: '20% OFF',
    desc: 'Experienced local heritage guide for Old Dhaka street food tours, Ahsan Manzil, and Buriganga boat rides.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    completedCount: '144 Tour Completed!',
  },
  {
    id: 'guide-2',
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
  },
  {
    id: 'guide-3',
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
  },
  {
    id: 'guide-4',
    title: 'Sylhet Tea Estate Escapade',
    locationTag: '(Sylhet)',
    rating: '4.6',
    guideName: 'With Hasan',
    price: 150,
    priceNote: '(Family) + $25 per person',
    discount: '10% OFF',
    desc: 'Specialized guide for Ratargul Swamp Forest boat cruises and Sreemangal tea garden photography.',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    completedCount: '112 Tour Completed!',
  },
];

export default function TourGuidesPage() {
  const { formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState('lowest');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedGuides = [...INITIAL_GUIDES].sort((a, b) =>
    sortBy === 'lowest' ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="listing-layout-grid">
          {/* Left Column: Filter Sidebar */}
          <FilterSidebar />

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
            <div className="guides-2col-grid">
              {sortedGuides.map((guide) => (
                <div key={guide.id} className="guide-card-figma">
                  <div className="guide-cover-wrap">
                    <Image src={guide.coverImage} alt={guide.title} fill className="guide-cover-img" />
                    <button
                      className="heart-circle-btn"
                      onClick={() => toggleFavorite(guide.id)}
                    >
                      {favorites[guide.id] ? '♥' : '♡'}
                    </button>

                    {/* Guide Profile Avatar Overlay */}
                    <div className="guide-avatar-overlay">
                      <Image src={guide.avatarImage} alt="Guide Avatar" fill className="guide-avatar-img" />
                    </div>
                  </div>

                  <div className="guide-card-body">
                    <div className="title-rating-row">
                      <Link href="/guides/dhaka">
                        <h3>{guide.title} <small style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '500' }}>{guide.locationTag}</small></h3>
                      </Link>
                      <span className="star-rating">★ {guide.rating}</span>
                    </div>

                    <div className="guide-subtitle" style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '4px' }}>
                      {guide.guideName}
                    </div>

                    <div className="guide-price-row">
                      <small style={{ display: 'block', fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Starting From</small>
                      <div className="price-tag-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                        <strong className="current-price">{formatPrice(guide.price)}</strong>
                        <span className="price-note" style={{ fontSize: '0.78rem', color: '#64748B' }}>{guide.priceNote}</span>
                        <span className="discount-tag">{guide.discount}</span>
                      </div>
                    </div>

                    <p className="guide-desc" style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4', margin: '8px 0' }}>{guide.desc}</p>

                    <div className="guide-footer-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #E2E8F0', marginTop: 'auto' }}>
                      <div className="icons-features-row" style={{ display: 'flex', gap: '8px', fontSize: '0.9rem' }}>
                        <span>✈️</span><span>🏨</span><span>🍽️</span><span>🏃</span><span>🚌</span><span>⛰️</span>
                      </div>
                      <div className="completed-counter" style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-blue)' }}>
                        <span>🏃</span> {guide.completedCount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

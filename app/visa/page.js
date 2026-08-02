'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VisaFilterSidebar, { defaultVisaFilters } from '../components/VisaFilterSidebar';

// ─────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — all prices in BDT
// ─────────────────────────────────────────────────────
const ALL_VISAS = [
  {
    id: 'canada',
    country: 'Canada',
    countryType: 'Multi - Country',
    rating: 4.7,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '6-12 Months',
    visaFeeBdt: 1800,
    peopleServed: 1240,
    priceBdt: 24000,
    oldPriceBdt: 30000,
    isOffer: true,
    processingTime: '4-8 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    countryType: 'Multi - Country',
    rating: 4.8,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '4-8 Months',
    visaFeeBdt: 1800,
    peopleServed: 980,
    priceBdt: 31200,
    oldPriceBdt: 38400,
    isOffer: true,
    processingTime: '3-6 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'australia',
    country: 'Australia',
    countryType: 'Multi - Country',
    rating: 4.6,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '3-7 Months',
    visaFeeBdt: 1440,
    peopleServed: 760,
    priceBdt: 28800,
    oldPriceBdt: 36000,
    isOffer: true,
    processingTime: '4-8 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'usa',
    country: 'United States',
    countryType: 'Multi - Country',
    rating: 4.9,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '5-10 Months',
    visaFeeBdt: 2400,
    peopleServed: 1580,
    priceBdt: 36000,
    oldPriceBdt: 45600,
    isOffer: false,
    processingTime: '6-10 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'germany',
    country: 'Germany',
    countryType: 'Multi - Country',
    rating: 4.5,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '3-6 Months',
    visaFeeBdt: 1200,
    peopleServed: 620,
    priceBdt: 25200,
    oldPriceBdt: 31200,
    isOffer: false,
    processingTime: '3-5 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    countryType: 'Single Country',
    rating: 4.7,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '2-4 Months',
    visaFeeBdt: 960,
    peopleServed: 890,
    priceBdt: 21600,
    oldPriceBdt: 27600,
    isOffer: true,
    processingTime: '2-4 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'japan',
    country: 'Japan',
    countryType: 'Single Country',
    rating: 4.8,
    availability: 'Tourist Visa Available',
    visaType: 'Tourist',
    duration: '1-3 Months',
    visaFeeBdt: 1200,
    peopleServed: 1100,
    priceBdt: 22800,
    oldPriceBdt: 28800,
    isOffer: true,
    processingTime: '2-3 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'singapore',
    country: 'Singapore',
    countryType: 'Single Country',
    rating: 4.9,
    availability: 'Work Visa Available',
    visaType: 'Work',
    duration: '1-2 Months',
    visaFeeBdt: 1440,
    peopleServed: 720,
    priceBdt: 26400,
    oldPriceBdt: 32400,
    isOffer: false,
    processingTime: '1-2 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dubai',
    country: 'UAE (Dubai)',
    countryType: 'Multi - Country',
    rating: 4.8,
    availability: 'Tourist Visa Available',
    visaType: 'Tourist',
    duration: '1-3 Months',
    visaFeeBdt: 1800,
    peopleServed: 1350,
    priceBdt: 23400,
    oldPriceBdt: 30000,
    isOffer: true,
    processingTime: '1-2 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'france',
    country: 'France',
    countryType: 'Multi - Country',
    rating: 4.7,
    availability: 'Student Visa Available',
    visaType: 'Student',
    duration: '4-8 Months',
    visaFeeBdt: 1440,
    peopleServed: 540,
    priceBdt: 27600,
    oldPriceBdt: 34200,
    isOffer: false,
    processingTime: '3-6 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'turkey',
    country: 'Turkey',
    countryType: 'Single Country',
    rating: 4.6,
    availability: 'Tourist Visa Available',
    visaType: 'Tourist',
    duration: '1-3 Months',
    visaFeeBdt: 960,
    peopleServed: 890,
    priceBdt: 18000,
    oldPriceBdt: 22200,
    isOffer: true,
    processingTime: '1-2 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'newzealand',
    country: 'New Zealand',
    countryType: 'Multi - Country',
    rating: 4.7,
    availability: 'Work Visa Available',
    visaType: 'Work',
    duration: '6-12 Months',
    visaFeeBdt: 2160,
    peopleServed: 410,
    priceBdt: 33600,
    oldPriceBdt: 40800,
    isOffer: false,
    processingTime: '4-8 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
  },
];

function fmtBdt(amount) {
  return `৳${Number(amount).toLocaleString()}`;
}

function discountPct(price, old) {
  return Math.round(((old - price) / old) * 100);
}

export default function StudentVisaPage() {
  const [filters, setFilters] = useState(defaultVisaFilters);
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState({});

  const toggleFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((p) => ({ ...p, [id]: !p[id] }));
  };

  // ── Fully functional filter engine ──────────────────
  const filteredVisas = useMemo(() => {
    let result = ALL_VISAS.filter((v) => {
      if ((filters.rating || 1) > 1 && v.rating < filters.rating) return false;
      if (filters.maxPriceBdt && v.priceBdt > filters.maxPriceBdt) return false;
      if (
        filters.countrySearch &&
        !v.country.toLowerCase().includes(filters.countrySearch.toLowerCase())
      ) return false;
      if (filters.onlyOffer && !v.isOffer) return false;
      if (filters.visaType?.length > 0 && !filters.visaType.includes(v.visaType)) return false;
      if (filters.countryType?.length > 0 && !filters.countryType.includes(v.countryType)) return false;
      if (filters.selectedCountries?.length > 0) {
        const match = filters.selectedCountries.some(
          (sc) =>
            v.country.toLowerCase().includes(sc.toLowerCase()) ||
            sc.toLowerCase().includes(v.country.toLowerCase())
        );
        if (!match) return false;
      }
      return true;
    });

    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price_low') result.sort((a, b) => a.priceBdt - b.priceBdt);
    else if (sortBy === 'price_high') result.sort((a, b) => b.priceBdt - a.priceBdt);
    else if (sortBy === 'popular') result.sort((a, b) => b.peopleServed - a.peopleServed);

    return result;
  }, [filters, sortBy]);

  const activeFilterCount = [
    filters.rating > 1,
    filters.maxPriceBdt < 60000,
    !!filters.countrySearch,
    filters.onlyOffer,
    (filters.visaType?.length || 0) > 0,
    (filters.countryType?.length || 0) > 0,
    (filters.selectedCountries?.length || 0) > 0,
  ].filter(Boolean).length;

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Page Header */}
        <div className="visa-page-header" style={{ marginBottom: '24px' }}>
          <div>
            <span className="visa-eyebrow">Study Abroad Support</span>
            <h2>Student Visa</h2>
            <p>
              Verified visa processing packages for top study destinations.{' '}
              <strong style={{ color: '#2563EB' }}>{filteredVisas.length} results found.</strong>
              {activeFilterCount > 0 && (
                <span style={{ marginLeft: '8px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '700' }}>
                  {activeFilterCount} filter active
                </span>
              )}
            </p>
          </div>

          {/* Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#64748B' }}>Sort by:</span>
            {[
              { value: 'rating', label: '⭐ Rating' },
              { value: 'price_low', label: '৳ Price: Low' },
              { value: 'price_high', label: '৳ Price: High' },
              { value: 'popular', label: '🔥 Popular' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', border: '1px solid',
                  borderColor: sortBy === opt.value ? '#2563EB' : '#E2E8F0',
                  background: sortBy === opt.value ? '#2563EB' : '#fff',
                  color: sortBy === opt.value ? '#fff' : '#475569',
                  fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="listing-layout-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* VisaFilterSidebar — dedicated, fully functional */}
          <VisaFilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Results Grid */}
          <div>
            {filteredVisas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ color: '#475569', marginBottom: '8px' }}>No visas found</h3>
                <p style={{ fontSize: '0.88rem' }}>Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters(defaultVisaFilters)}
                  style={{ marginTop: '16px', padding: '10px 24px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="visa-3col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
                {filteredVisas.map((v) => (
                  <Link href={`/visa/${v.id}`} key={v.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div
                      className="visa-card-figma"
                      style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#fff', transition: 'box-shadow 0.25s, transform 0.25s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                    >
                      {/* Image */}
                      <div className="visa-card-image-wrap" style={{ height: '140px', position: 'relative' }}>
                        <Image
                          src={v.flagImage}
                          alt={v.country}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={v.id === 'canada' || v.id === 'uk'}
                          className="visa-card-img"
                          style={{ objectFit: 'cover' }}
                        />
                        {v.isOffer && (
                          <span style={{ position: 'absolute', top: '10px', right: '42px', background: '#EF4444', color: '#fff', fontSize: '0.68rem', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                            -{discountPct(v.priceBdt, v.oldPriceBdt)}% OFF
                          </span>
                        )}
                        <button
                          className="heart-circle-btn"
                          onClick={(e) => toggleFav(e, v.id)}
                          style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                          {favorites[v.id] ? '❤️' : '♡'}
                        </button>
                      </div>

                      {/* Card Body */}
                      <div className="visa-card-body" style={{ padding: '8px 12px' }}>
                        <div className="title-rating-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '0.98rem', margin: 0, fontWeight: '700', color: '#0F172A' }}>{v.country}</h3>
                          <span className="star-rating" style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: '700' }}>★ {v.rating}</span>
                        </div>

                        <div className="visa-info-lines" style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.2', display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '5px' }}>
                          <p style={{ margin: 0, fontWeight: '600', color: '#2563EB' }}>{v.availability}</p>
                          <p style={{ margin: 0 }}>Duration : {v.duration}</p>
                          <p style={{ margin: 0 }}>Visa Fee : {fmtBdt(v.visaFeeBdt)}</p>
                        </div>

                        <div className="visa-served-badge" style={{ padding: '2px 6px', fontSize: '0.7rem', marginBottom: '5px', background: '#F1F5F9', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          👥 <span>{v.peopleServed.toLocaleString()} People Served</span>
                        </div>

                        <div className="visa-price-footer" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '4px', marginTop: '2px' }}>
                          <small style={{ fontSize: '0.64rem', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Processing Fee Starting From</small>
                          <div className="price-tag-row" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                            <span className="current-price" style={{ fontSize: '0.95rem', fontWeight: '800', color: '#2563EB' }}>{fmtBdt(v.priceBdt)}</span>
                            <span className="strike-price" style={{ fontSize: '0.74rem', textDecoration: 'line-through', color: '#94A3B8' }}>{fmtBdt(v.oldPriceBdt)}</span>
                            {v.isOffer && (
                              <span className="discount-tag" style={{ fontSize: '0.66rem', background: '#FEE2E2', color: '#DC2626', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold' }}>
                                -{discountPct(v.priceBdt, v.oldPriceBdt)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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

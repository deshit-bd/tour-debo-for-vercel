'use client';

import { useState, useEffect, useMemo } from 'react';
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
  {
    id: 'hajj-saudi',
    country: 'Saudi Arabia (Hajj)',
    countryType: 'Single Country',
    rating: 4.9,
    availability: 'Hajj Visa Available',
    visaType: 'Hajj',
    duration: '1-2 Months',
    visaFeeBdt: 3500,
    peopleServed: 2450,
    priceBdt: 45000,
    oldPriceBdt: 55000,
    isOffer: true,
    processingTime: '2-4 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'umrah-saudi',
    country: 'Saudi Arabia (Umrah)',
    countryType: 'Single Country',
    rating: 4.9,
    availability: 'Umrah Visa Available',
    visaType: 'Umrah',
    duration: '15-30 Days',
    visaFeeBdt: 2200,
    peopleServed: 3100,
    priceBdt: 18500,
    oldPriceBdt: 24000,
    isOffer: true,
    processingTime: '1-2 Weeks',
    flagImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
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
  const [showAll, setShowAll] = useState(false);
  const [visas, setVisas] = useState(ALL_VISAS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_visa_services');
      if (saved) {
        const customList = JSON.parse(saved).map(item => ({
          id: item.id || ('custom-' + Date.now()),
          country: item.country || 'Custom Country',
          countryType: 'Single Country',
          rating: Number(item.rating || 5.0),
          availability: item.visaAvailableLabel || (item.visaType ? item.visaType + ' Available' : 'Visa Available'),
          visaType: (item.visaType || 'Tourist').replace(' Visa', ''),
          duration: item.validity || '30 Days',
          visaFeeBdt: Number((item.visaFee || '0').replace(/[^0-9]/g, '')) || 1800,
          peopleServed: 1,
          priceBdt: Number((item.processingFee || '0').replace(/[^0-9]/g, '')) || 24000,
          oldPriceBdt: (Number((item.processingFee || '0').replace(/[^0-9]/g, '')) || 24000) * 1.2,
          isOffer: false,
          processingTime: item.processingTime || '5-7 Working Days',
          flagImage: (item.mainImage && !item.mainImage.startsWith('blob:')) ? item.mainImage : 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
          isCustom: true
        }));

        const customIds = new Set(customList.map(c => c.id));
        const filteredAll = ALL_VISAS.filter(v => !customIds.has(v.id));
        setVisas([...customList, ...filteredAll]);
      }
    } catch (e) {
      console.error('Error loading saved visa services:', e);
    }
  }, []);

  const toggleFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((p) => ({ ...p, [id]: !p[id] }));
  };

  // ── Fully functional filter engine ──────────────────
  const filteredVisas = useMemo(() => {
    let result = visas.filter((v) => {
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
  }, [visas, filters, sortBy]);

  const displayedVisas = useMemo(() => {
    return showAll ? filteredVisas : filteredVisas.slice(0, 12);
  }, [filteredVisas, showAll]);

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
        {/* Top Header Card */}
        <div
          className="listing-header-banner"
          style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)',
            borderRadius: '16px',
            padding: '18px 24px',
            marginBottom: '16px',
            border: '1px solid #DBEAFE',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ flex: '1 1 280px' }}>
            <span style={{ fontSize: '0.70rem', fontWeight: '800', background: '#DBEAFE', color: '#1E40AF', padding: '3px 10px', borderRadius: '10px', letterSpacing: '0.5px' }}>
              STUDY ABROAD SUPPORT
            </span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginTop: '6px', marginBottom: '3px' }}>
              Student Visa
            </h1>
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0 }}>
              Verified visa processing packages for top study destinations.{' '}
              <strong style={{ color: '#2563EB' }}>{filteredVisas.length} results found.</strong>
            </p>
          </div>

          {/* Sort bar in far right corner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Sort by:</span>
            {[
              { id: 'rating', label: '⭐ Rating' },
              { id: 'price_low', label: '↓ Price: Low' },
              { id: 'price_high', label: '↑ Price: High' },
              { id: 'popular', label: '🔥 Popular' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: sortBy === opt.id ? '#2563EB' : '#ffffff',
                  color: sortBy === opt.id ? '#fff' : '#475569',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
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
              <>
                <div className="visa-3col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
                  {displayedVisas.map((v) => (
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
                          <button
                            className="heart-circle-btn"
                            onClick={(e) => toggleFav(e, v.id)}
                            style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '0.9rem' }}
                          >
                            {favorites[v.id] ? '❤️' : '♡'}
                          </button>
                        </div>

                        {/* Card Body */}
                        <div className="visa-card-body" style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <div className="title-rating-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
                            <h3 style={{ fontSize: '0.92rem', margin: 0, fontWeight: '600', color: '#0F172A' }}>{v.country}</h3>
                            <span className="star-rating" style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: '600' }}>★ {v.rating}</span>
                          </div>

                          <div className="visa-info-lines" style={{ fontSize: '0.74rem', color: '#475569', lineHeight: '1.2', display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '0px' }}>
                            <p style={{ margin: 0, fontWeight: '500', color: '#2563EB' }}>{v.availability}</p>
                            <p style={{ margin: 0, fontWeight: '400' }}>Duration : {v.duration}</p>
                            <p style={{ margin: 0, fontWeight: '400' }}>Visa Fee : {fmtBdt(v.visaFeeBdt)}</p>
                          </div>

                          <div className="visa-served-badge" style={{ padding: '2px 6px', fontSize: '0.68rem', fontWeight: '500', margin: '1px 0', background: '#F1F5F9', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            👥 <span>{v.peopleServed.toLocaleString()} People Served</span>
                          </div>

                          <div className="visa-price-footer" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '3px', marginTop: '1px' }}>
                            <small style={{ fontSize: '0.62rem', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.2px', fontWeight: '500', marginBottom: '1px' }}>Processing Fee Starting From</small>
                            <div className="price-tag-row" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                              <span className="current-price" style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2563EB' }}>{fmtBdt(v.priceBdt)}</span>
                              <span className="strike-price" style={{ fontSize: '0.72rem', textDecoration: 'line-through', color: '#94A3B8', fontWeight: '400' }}>{fmtBdt(v.oldPriceBdt)}</span>
                              {v.isOffer && (
                                <span className="discount-tag" style={{ fontSize: '0.64rem', background: '#FEE2E2', color: '#DC2626', padding: '1px 4px', borderRadius: '3px', fontWeight: '600' }}>
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

                {filteredVisas.length > 12 && (
                  <div style={{ textAlign: 'center', marginTop: '28px' }}>
                    <button
                      type="button"
                      onClick={() => setShowAll((prev) => !prev)}
                      style={{
                        padding: '10px 28px',
                        background: '#ffffff',
                        border: '1.5px solid #2563EB',
                        color: '#2563EB',
                        borderRadius: '24px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 10px rgba(37,99,235,0.12)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2563EB'; }}
                    >
                      {showAll ? 'Show Less ▲' : `Show More (${filteredVisas.length - 12} More) ▼`}
                    </button>
                  </div>
                )}
              </>
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

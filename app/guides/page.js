'use client';

import { useState, useEffect } from 'react';
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
    title: 'Explore Dhaka Heritage',
    locationTag: 'Dhaka, Bangladesh',
    rating: '4.7',
    guideName: 'With Kaalam',
    languages: 'English, Bengali',
    coveredSpots: 'Old Dhaka, Ahsan Manzil, Lalbagh Fort & Buriganga River',
    price: 200,
    priceNote: '(Family) + $50 per person',
    discount: '20% OFF',
    desc: 'Experienced local heritage guide for Old Dhaka street food tours, Ahsan Manzil, and Buriganga boat rides.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    completedCount: '144 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Family',
    duration: '2 Days / 1 Night',
    included: 'Flights, hotel, meals and transport included',
    showedInterest: '144 people showed interest',
    visitedCount: '144 people visited',
  },
  {
    id: 'sajek',
    title: 'Sajek Mountain Trek',
    locationTag: 'Sajek, Bangladesh',
    rating: '4.9',
    guideName: 'With Robin',
    languages: 'English, Bengali, Chakma',
    coveredSpots: 'Konglak Peak, Helipad Viewpoint, Ruilui Para & Hazachora Waterfalls',
    price: 180,
    priceNote: '(Group) + $30 per person',
    discount: '15% OFF',
    desc: 'Indigenous hill guide for cloud helipad view, Konglak Peak trekking, and bamboo chicken dining.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    completedCount: '198 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Group',
    duration: '3 Days / 2 Nights',
    included: 'Flights, hotel, meals and transport included',
    showedInterest: '198 people showed interest',
    visitedCount: '198 people visited',
  },
  {
    id: 'cox-bazar',
    title: "Cox's Bazar Beach Guide",
    locationTag: "Cox's Bazar, Bangladesh",
    rating: '4.8',
    guideName: 'With Tanvir',
    languages: 'English, Bengali',
    coveredSpots: 'Inani Coral Beach, Himchari Waterfall, Marine Drive & Sunset Point',
    price: 220,
    priceNote: '(Couple) + $40 per person',
    discount: '25% OFF',
    desc: 'Certified parasailing and marine beach camp instructor with private photo session.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    completedCount: '210 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Couple',
    duration: '4 Days / 3 Nights',
    included: 'Flights, hotel, meals and transport included',
    showedInterest: '210 people showed interest',
    visitedCount: '210 people visited',
  },
  {
    id: 'sylhet',
    title: 'Sylhet Tea Estate Escapade',
    locationTag: 'Sylhet, Bangladesh',
    rating: '4.6',
    guideName: 'With Hasan',
    languages: 'English, Bengali, Sylheti',
    coveredSpots: 'Ratargul Swamp Forest, Jaflong Zero Point, Sreemangal Tea Garden & Bholaganj White Stones',
    price: 150,
    priceNote: '(Family) + $25 per person',
    discount: '10% OFF',
    desc: 'Specialized guide for Ratargul Swamp Forest boat cruises and Sreemangal tea garden photography.',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    completedCount: '112 Tour Completed!',
    countryType: 'Single Country',
    packageType: 'Family',
    duration: '3 Days / 2 Nights',
    included: 'Flights, hotel, meals and transport included',
    showedInterest: '144 people showed interest',
    visitedCount: '144 people visited',
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
  languages: [],
  foods: [],
};

export default function TourGuidesPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState('lowest');
  const [favorites, setFavorites] = useState({});
  const [filters, setFilters] = useState(defaultFilterState);
  const [guides, setGuides] = useState(INITIAL_GUIDES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_tour_guides');
      if (saved) {
        const customList = JSON.parse(saved).map((item) => ({
          id: item.id || ('guide-' + Date.now()),
          title: item.title || 'Professional Local Tour Guide',
          locationTag: item.location || 'Bangladesh',
          rating: item.rating || '5.0',
          guideName: item.guideName ? (item.guideName.startsWith('With ') ? item.guideName : 'With ' + item.guideName) : 'With Local Expert',
          languages: item.languagesList ? item.languagesList.join(', ') : 'English, Bengali',
          coveredSpots: item.coveredSpots || 'Heritage Sites, Local Landmarks & Cultural Spots',
          price: Number(item.price1Person) || 150,
          priceNote: `(${item.packageType || 'Single'}) ৳${item.price2Person || '2500'} couple`,
          discount: '15% OFF',
          desc: item.description || 'Experienced local tour guide for custom trips and cultural tours.',
          coverImage: (item.coverImage && !item.coverImage.startsWith('blob:')) ? item.coverImage : 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
          avatarImage: (item.avatarImage && !item.avatarImage.startsWith('blob:')) ? item.avatarImage : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          completedCount: 'Verified Guide',
          countryType: 'Single Country',
          packageType: item.packageType || 'Family',
          duration: item.duration || 'Full Day',
          included: item.service || 'Sightseeing, local guidance & photography support',
          showedInterest: '45 people showed interest',
          visitedCount: '45 people visited',
          isCustom: true
        }));

        const customIds = new Set(customList.map(c => c.id));
        const filteredInitial = INITIAL_GUIDES.filter(g => !customIds.has(g.id));
        setGuides([...customList, ...filteredInitial]);
      }
    } catch (e) {
      console.error('Error loading custom tour guides:', e);
    }
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGuides = guides.filter((guide) => {
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
    // Languages Checkbox filter
    if (filters.languages && filters.languages.length > 0) {
      const guideLangs = (guide.languages || '').toLowerCase();
      const matches = filters.languages.some((lang) => guideLangs.includes(lang.toLowerCase()));
      if (!matches) return false;
    }
    // Foods Checkbox filter
    if (filters.foods && filters.foods.length > 0) {
      const guideText = ((guide.included || '') + ' ' + (guide.desc || '')).toLowerCase();
      const matches = filters.foods.some((food) => {
        const f = food.toLowerCase();
        if (f === 'street foods') return guideText.includes('street food') || guideText.includes('food');
        return guideText.includes(f) || guideText.includes('meal') || guideText.includes('breakfast');
      });
      if (!matches) return false;
    }
    if (filters.sightseeing && filters.sightseeing.length > 0) {
      const selectedLang = filters.sightseeing[0].toLowerCase();
      const guideLangs = (guide.languages || '').toLowerCase();
      if (selectedLang.includes('english') && !guideLangs.includes('english')) return false;
      if (selectedLang.includes('bengali') && !guideLangs.includes('bengali')) return false;
      if (selectedLang.includes('sylheti') && !guideLangs.includes('sylheti')) return false;
      if (selectedLang.includes('chakma') && !guideLangs.includes('chakma')) return false;
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
        {/* Tour Guide Store Marketplace Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #0284C7 100%)', color: '#ffffff', borderRadius: '24px', padding: '30px 36px', marginBottom: '24px', boxShadow: '0 12px 36px rgba(37, 99, 235, 0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#FEF08A', backdropFilter: 'blur(8px)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', border: '1px solid rgba(255,255,255,0.25)' }}>
              ✨ Official Tour Guide Store Marketplace
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '14px 0 8px 0', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
              Hire Verified Local Tour Guides
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#E0F2FE', margin: 0, lineHeight: 1.55 }}>
              Connect directly with background-checked local tour guides across Cox's Bazar, Sajek, Sylhet, Sundarbans &amp; Heritage spots. Enjoy 100% personalized itineraries, photography support &amp; private tours.
            </p>
          </div>
        </div>

        <div className="listing-layout-grid">
          {/* Left Column: Fully Functional Filter Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} hideCountryType={true} />

          {/* Right Column: Tour Guides List */}
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

            {/* Horizontal List of Tour Guide Cards (Matching Figma Screenshot) */}
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
              <div className="guides-horizontal-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {sortedGuides.map((guide) => (
                  <div
                    key={guide.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #E2E8F0',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      position: 'relative',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/guides/${guide.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)';
                      e.currentTarget.style.borderColor = '#BFDBFE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    {/* Left Avatar */}
                    <div style={{ width: '95px', height: '95px', borderRadius: '16px', overflow: 'hidden', position: 'relative', flexShrink: 0, background: '#F1F5F9' }}>
                      <Image
                        src={guide.avatarImage || guide.coverImage}
                        alt={guide.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Title and Top Right Icons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.2px' }}>
                          {guide.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <span style={{ cursor: 'pointer', fontSize: '0.95rem', color: '#64748B' }} title="Share">↗</span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(guide.id);
                            }}
                            style={{ cursor: 'pointer', fontSize: '1.1rem', color: favorites[guide.id] ? '#DC2626' : '#64748B' }}
                          >
                            {favorites[guide.id] ? '♥' : '♡'}
                          </span>
                        </div>
                      </div>

                      {/* Rating & Languages Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#F59E0B', fontSize: '0.95rem', letterSpacing: '1px' }}>★★★★★</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginLeft: '4px' }}>
                            {guide.rating}(Ratings)
                          </span>
                        </div>
                        <span style={{ color: '#CBD5E1', fontSize: '0.82rem' }}>•</span>
                        <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>
                          🌐 Languages: <strong style={{ color: '#0F172A', fontWeight: '700' }}>{guide.languages || 'English, Bengali'}</strong>
                        </span>
                      </div>

                      {/* Pill Tags Row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', color: '#334155' }}>
                          Location: {guide.locationTag}
                        </span>
                        {guide.coveredSpots && (
                          <span style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '700', color: '#1D4ED8' }}>
                            📍 Covered Spots: {guide.coveredSpots}
                          </span>
                        )}
                        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', color: '#334155' }}>
                          {guide.included}
                        </span>
                        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', color: '#334155' }}>
                          {guide.duration}
                        </span>
                        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', color: '#334155' }}>
                          {guide.showedInterest}
                        </span>
                        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', color: '#334155' }}>
                          {guide.visitedCount}
                        </span>
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

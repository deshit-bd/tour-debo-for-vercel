'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

function AddGuideFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams ? searchParams.get('edit') : null;
  const [isEditing, setIsEditing] = useState(false);

  // ── 1. Guide Basic Info & Slot Capacity ──
  const [guideName, setGuideName] = useState('Sanjid Rahman');
  const [title, setTitle] = useState('Explore Dhaka Heritage & Street Food Guide');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [coveredSpots, setCoveredSpots] = useState('Old Dhaka, Ahsan Manzil, Lalbagh Fort & Buriganga River');
  const [packageType, setPackageType] = useState('Family');
  const [duration, setDuration] = useState('3 Days / 2 Nights');
  const [availableDates, setAvailableDates] = useState('2026-08-10');
  const [maxGuests, setMaxGuests] = useState('10');
  const [bookedDates, setBookedDates] = useState(['2026-08-15', '2026-08-18']);
  const [includedSummary, setIncludedSummary] = useState('Flights, hotel, meals and transport included');

  // ── 2. Performance & Experience Stats ──
  const [completedTours, setCompletedTours] = useState('112+ Tours');
  const [responseTime, setResponseTime] = useState('< 1 Hour');
  const [experience, setExperience] = useState('5+ Years');
  const [satisfaction, setSatisfaction] = useState('99% Rating');

  // ── 3. 5-Box Language Proficiency ──
  const [languages, setLanguages] = useState({
    Bengali: 5,
    English: 4,
    Hindi: 3,
  });
  const [customLangInput, setCustomLangInput] = useState('');
  const [showAddLangModal, setShowAddLangModal] = useState(false);

  // ── 4. Group Variety Pricing Tiers ──
  const [price1Person, setPrice1Person] = useState('1500');
  const [price2Person, setPrice2Person] = useState('2500');
  const [price3Person, setPrice3Person] = useState('3200');

  // ── 5. Bio, Services & Policy ──
  const [description, setDescription] = useState('Explore Old Dhaka heritage lanes, Ahsan Manzil, Buriganga river life, and iconic local food stops with a verified city guide.');
  const [service, setService] = useState('Private city tour, historical landmark walk, street food curation, riverfront guidance and personal photography support.');
  const [policy, setPolicy] = useState('Free Cancellation: Cancel up to 24 hours prior to tour start for a 100% full refund to your Tour Dibo wallet.');

  // ── 6. Media Uploads (Base64) ──
  const [avatarImage, setAvatarImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80');
  const [galleryImages, setGalleryImages] = useState([
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80'
  ]);

  const [saved, setSaved] = useState(false);
  const [createdGuideId, setCreatedGuideId] = useState('');

  // ── File Handlers (Base64) ──
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setAvatarImage(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setCoverImage(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setGalleryImages(prev => [...prev, evt.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (idx) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleLangRating = (lang, level) => {
    setLanguages((prev) => ({ ...prev, [lang]: level }));
  };

  const handleAddCustomLang = () => {
    const trimmed = customLangInput.trim();
    if (trimmed) {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      setLanguages(prev => ({ ...prev, [capitalized]: 4 }));
      setCustomLangInput('');
      setShowAddLangModal(false);
    }
  };

  // ── Populate state if in EDIT mode ──
  useEffect(() => {
    if (!editId) return;
    setIsEditing(true);

    try {
      const savedList = JSON.parse(localStorage.getItem('planner_tour_guides') || '[]');
      const item = savedList.find(g => g.id === editId);

      if (item) {
        if (item.guideName) setGuideName(item.guideName);
        if (item.title) setTitle(item.title);
        if (item.location) setLocation(item.location);
        if (item.coveredSpots) setCoveredSpots(item.coveredSpots);
        if (item.packageType) setPackageType(item.packageType);
        if (item.duration) setDuration(item.duration);
        if (item.availableDates) setAvailableDates(item.availableDates);
        if (item.includedSummary) setIncludedSummary(item.includedSummary);
        if (item.completedTours) setCompletedTours(item.completedTours);
        if (item.responseTime) setResponseTime(item.responseTime);
        if (item.experience) setExperience(item.experience);
        if (item.satisfaction) setSatisfaction(item.satisfaction);
        if (item.price1Person) setPrice1Person(item.price1Person);
        if (item.price2Person) setPrice2Person(item.price2Person);
        if (item.price3Person) setPrice3Person(item.price3Person);
        if (item.description) setDescription(item.description);
        if (item.service) setService(item.service);
        if (item.policy) setPolicy(item.policy);
        if (item.languages) setLanguages(item.languages);
        if (item.avatarImage && !item.avatarImage.startsWith('blob:')) setAvatarImage(item.avatarImage);
        if (item.coverImage && !item.coverImage.startsWith('blob:')) setCoverImage(item.coverImage);
        if (item.galleryImages && Array.isArray(item.galleryImages) && item.galleryImages.length > 0) {
          const validGallery = item.galleryImages.filter(img => img && !img.startsWith('blob:'));
          if (validGallery.length > 0) setGalleryImages(validGallery);
        }
      }
    } catch (err) {
      console.error('Error populating guide edit data:', err);
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const slugId = editId || `guide-${location.split(',')[0].toLowerCase().trim().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;

    const newGuide = {
      id: slugId,
      guideName,
      title,
      location,
      coveredSpots,
      packageType,
      duration,
      availableDates,
      includedSummary,
      completedTours,
      responseTime,
      experience,
      satisfaction,
      price1Person,
      price2Person,
      price3Person,
      languages,
      languagesList: Object.keys(languages),
      description,
      service,
      policy,
      avatarImage,
      coverImage,
      galleryImages,
      rating: '4.8',
      isCustom: true,
      updatedAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('planner_tour_guides') || '[]');
      const index = existing.findIndex(g => g.id === slugId);

      if (index !== -1) {
        existing[index] = newGuide;
      } else {
        existing.unshift(newGuide);
      }

      localStorage.setItem('planner_tour_guides', JSON.stringify(existing));
      setCreatedGuideId(slugId);
      setSaved(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to save tour guide:', err);
    }
  };

  const inpStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' };
  const lblStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' };
  const secTitle = { fontSize: '1.08rem', fontWeight: '700', color: '#1E293B', marginBottom: '14px', borderBottom: '2px solid #F1F5F9', paddingBottom: '8px' };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">
            <header className="seller-header">
              <div>
                <h1 className="seller-page-title">{isEditing ? 'Edit Tour Guide Service Package' : 'Register & Add Tour Guide Service'}</h1>
                <p className="seller-page-subtitle">Configure guide profile details, spots, performance stats, 5-box language ratings, and tier variety pricing.</p>
              </div>
            </header>

          {saved && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '16px', borderRadius: '12px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✓</span>
                <span>{isEditing ? 'Tour Guide Package Updated Successfully!' : 'Tour Guide Service Published Successfully!'}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                <Link href="/guides" style={{ background: '#059669', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                  View on Public Tour Guides Page ➔
                </Link>
                <Link href={`/guides/${createdGuideId}`} style={{ background: '#0284C7', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                  View Guide Detail Page ➔
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', marginTop: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            
            {/* ── 1. Guide Basic Details ── */}
            <h3 style={secTitle}>1. Guide & Tour Package Information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={lblStyle}>Guide Full Name *</label>
                <input type="text" value={guideName} onChange={(e) => setGuideName(e.target.value)} required style={inpStyle} placeholder="e.g. Sanjid Rahman" />
              </div>

              <div>
                <label style={lblStyle}>Professional Headline / Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inpStyle} placeholder="e.g. Explore Dhaka Heritage & Street Food Guide" />
              </div>

              <div>
                <label style={lblStyle}>Location / Service Area *</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={inpStyle} placeholder="e.g. Dhaka, Bangladesh" />
              </div>

              <div>
                <label style={lblStyle}>Tour Duration *</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required style={inpStyle} placeholder="e.g. 3 Days / 2 Nights or 8 Hours" />
              </div>

              <div>
                <label style={lblStyle}>Package Group Category *</label>
                <select value={packageType} onChange={(e) => setPackageType(e.target.value)} style={inpStyle}>
                  <option value="Family">Family Tour</option>
                  <option value="Group">Group Trekking & Tour</option>
                  <option value="Couple">Couple Private Tour</option>
                  <option value="Solo">Solo Traveler Escort</option>
                </select>
              </div>

              <div>
                <label style={lblStyle}>Available Start Date *</label>
                <input type="date" value={availableDates} onChange={(e) => setAvailableDates(e.target.value)} required style={inpStyle} />
              </div>

              <div>
                <label style={lblStyle}>Maximum Guest Capacity (Persons) *</label>
                <input type="number" min="1" max="100" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} required style={inpStyle} placeholder="e.g. 10" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={lblStyle}>Covered Spots & Key Destinations *</label>
                <input type="text" value={coveredSpots} onChange={(e) => setCoveredSpots(e.target.value)} required style={inpStyle} placeholder="e.g. Old Dhaka, Ahsan Manzil, Lalbagh Fort & Buriganga River" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={lblStyle}>Inclusions Badge Summary *</label>
                <input type="text" value={includedSummary} onChange={(e) => setIncludedSummary(e.target.value)} required style={inpStyle} placeholder="e.g. Flights, hotel, meals and transport included" />
              </div>
            </div>

            {/* ── Calendar of Tour Date Availability & Maximum Guest Capacity Notice ── */}
            <div style={{ background: '#F0F9FF', border: '1.5px solid #7DD3FC', padding: '18px 22px', borderRadius: '16px', marginBottom: '28px' }}>
              <div style={{ fontWeight: '800', color: '#0369A1', fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>📅</span>
                <span>Calendar of Tour Date Availability &amp; Capacity Rules:</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li>
                  <strong>Condition 1 (Free / Open):</strong> If you are not booked on a date, any customer can select that date and book your guide package for any destination.
                </li>
                <li>
                  <strong>Condition 2 (Shared Group Booking - Same Location):</strong> If booked for a specific location (e.g., <em>Sajek Valley</em>), another customer wanting to go to <strong>the exact same destination</strong> can book on that date as long as total guests do not exceed your <strong>Maximum Guest Capacity ({maxGuests || 10} Persons Max)</strong>.
                </li>
                <li>
                  <strong>Condition 3 (Locked / Unavailable for Different Location):</strong> If booked for a destination, customers trying to book a <strong>different location</strong> on that same date will see <strong>"🔴 Today slot not vacant (Booked for another location)"</strong>.
                </li>
              </ul>
            </div>

            {/* ── 2. Language Proficiency (5 Box Rating) ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ ...secTitle, margin: 0, border: 'none', padding: 0 }}>2. Language Proficiency (5-Box Parameter)</h3>
              <button
                type="button"
                onClick={() => setShowAddLangModal(true)}
                style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
              >
                + Add Custom Language
              </button>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '16px' }}>Click on the boxes (1 to 5) to set fluency level for each language.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '12px', marginBottom: '28px' }}>
              {Object.keys(languages).map((langKey) => {
                const currentVal = languages[langKey] || 3;
                return (
                  <div key={langKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: '#fff', padding: '10px 16px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 'bold', color: '#1E293B', minWidth: '110px' }}>{langKey}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((boxIdx) => (
                        <div
                          key={boxIdx}
                          onClick={() => handleLangRating(langKey, boxIdx)}
                          title={`Level ${boxIdx} / 5`}
                          style={{
                            width: '42px',
                            height: '24px',
                            borderRadius: '5px',
                            background: boxIdx <= currentVal ? '#10B981' : '#E2E8F0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease-in-out',
                            border: boxIdx <= currentVal ? '1px solid #059669' : '1px solid #CBD5E1'
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#047857', minWidth: '85px', textAlign: 'right' }}>Level {currentVal} / 5</span>
                  </div>
                );
              })}
            </div>

            {/* ── 3. Group Variety Pricing Tiers ── */}
            <h3 style={secTitle}>3. Group Variety Pricing (Tiers)</h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '16px' }}>Set customized rates based on group size (1 person, 2 persons, or 3+ group).</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#FEFCE8', padding: '16px', borderRadius: '12px', border: '1px solid #FEF08A' }}>
                <label style={lblStyle}>1 Person Rate (৳) *</label>
                <input type="number" value={price1Person} onChange={(e) => setPrice1Person(e.target.value)} required style={inpStyle} placeholder="1500" />
              </div>
              <div style={{ background: '#F0FDF4', padding: '16px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                <label style={lblStyle}>2 Persons Variety Rate (৳) *</label>
                <input type="number" value={price2Person} onChange={(e) => setPrice2Person(e.target.value)} required style={inpStyle} placeholder="2500" />
              </div>
              <div style={{ background: '#EFF6FF', padding: '16px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
                <label style={lblStyle}>3 Persons Group Variety Rate (৳) *</label>
                <input type="number" value={price3Person} onChange={(e) => setPrice3Person(e.target.value)} required style={inpStyle} placeholder="3200" />
              </div>
            </div>

            {/* ── 4. Bio, Services & Cancellation Policy ── */}
            <h3 style={secTitle}>4. Tour Itinerary Overview, Services & Policy</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '28px' }}>
              <div>
                <label style={lblStyle}>Detailed Itinerary & Guide Overview *</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inpStyle, resize: 'vertical' }} placeholder="Describe your experience, local knowledge, and key tour highlights..." />
              </div>
              <div>
                <label style={lblStyle}>Included & Excluded Guide Services *</label>
                <textarea rows="3" value={service} onChange={(e) => setService(e.target.value)} required style={{ ...inpStyle, resize: 'vertical' }} placeholder="e.g. Private transport, historical landmark walk, food curation, photo support..." />
              </div>
              <div>
                <label style={lblStyle}>Safety Guarantee & Cancellation Policy *</label>
                <textarea rows="2" value={policy} onChange={(e) => setPolicy(e.target.value)} required style={{ ...inpStyle, resize: 'vertical' }} placeholder="e.g. Free Cancellation up to 24 hours prior to tour start..." />
              </div>
            </div>

            {/* ── 5. Banner Cover & Gallery Photos ── */}
            <h3 style={secTitle}>5. Tour Banner Cover & Gallery Photos</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '28px' }}>
              <div>
                <label style={lblStyle}>Cover / Hero Image *</label>
                <input type="file" accept="image/*" onChange={handleCoverUpload} id="guide-cover-input" style={{ display: 'none' }} />
                <label htmlFor="guide-cover-input" style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '14px', cursor: 'pointer', background: '#F8FAFC' }}>
                  {coverImage ? (
                    <img src={coverImage} alt="Cover Preview" style={{ width: '120px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #0EA5E9' }} />
                  ) : (
                    <div style={{ width: '120px', height: '70px', borderRadius: '8px', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📷</div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#2563EB' }}>Click to upload banner cover image</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Landscape destination or tour photo (JPG, PNG, WEBP)</div>
                  </div>
                </label>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={lblStyle}>Gallery Photos (Multiple) — {galleryImages.length} images added</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} id="guide-gallery-input" style={{ display: 'none' }} />
                
                <div style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '16px', background: '#F8FAFC' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                    {galleryImages.map((img, i) => (
                      <div key={i} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1', border: '1px solid #CBD5E1' }}>
                        <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          style={{ position: 'absolute', top: '3px', right: '3px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.7rem', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <label htmlFor="guide-gallery-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #3B82F6', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', cursor: 'pointer', aspectRatio: '1', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <span style={{ fontSize: '1.4rem' }}>+</span>
                      <span>Add</span>
                    </label>
                  </div>
                  {galleryImages.length > 0 && (
                    <button type="button" onClick={() => setGalleryImages([])} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: '600' }}>
                      Clear All Photos
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Submit Button ── */}
            <button
              type="submit"
              style={{
                background: '#059669',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(5,150,105,0.2)'
              }}
            >
              {isEditing ? '✓ Update Tour Guide Package' : '✓ Publish Tour Guide Package'}
            </button>
          </form>

          {/* ── Add Custom Language Modal ── */}
          {showAddLangModal && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#1E293B' }}>Add New Language</h4>
                <label style={lblStyle}>Language Name</label>
                <input
                  type="text"
                  value={customLangInput}
                  onChange={(e) => setCustomLangInput(e.target.value)}
                  placeholder="e.g. French, German, Spanish, Chakma..."
                  style={{ ...inpStyle, marginBottom: '16px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" onClick={() => setShowAddLangModal(false)} style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button type="button" onClick={handleAddCustomLang} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Add Language</button>
                </div>
              </div>
            </div>
          )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AddTourGuidePage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Tour Guide Editor...</div>}>
      <AddGuideFormContent />
    </Suspense>
  );
}

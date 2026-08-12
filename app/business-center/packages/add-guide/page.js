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
  const [dynamicPricingItems, setDynamicPricingItems] = useState([
    {
      id: 1,
      title: 'Single Person Package',
      regularPrice: '1800',
      discountType: 'percentage',
      discountValue: '16',
    },
    {
      id: 2,
      title: 'Couple Package (2 Persons)',
      regularPrice: '3000',
      discountType: 'amount',
      discountValue: '500',
    },
  ]);

  const calculateFinalPrice = (item) => {
    const reg = parseFloat(String(item.regularPrice).replace(/[^0-9.]/g, '')) || 0;
    const val = parseFloat(String(item.discountValue).replace(/[^0-9.]/g, '')) || 0;
    if (item.discountType === 'percentage') {
      return Math.max(0, Math.round(reg - (reg * val / 100)));
    } else {
      return Math.max(0, Math.round(reg - val));
    }
  };

  const handlePricingItemChange = (index, field, value) => {
    const updated = [...dynamicPricingItems];
    updated[index][field] = value;
    setDynamicPricingItems(updated);
  };

  const addPricingItem = () => {
    setDynamicPricingItems([
      ...dynamicPricingItems,
      {
        id: Date.now(),
        title: 'Couple Package (2 Persons)',
        regularPrice: '3000',
        discountType: 'percentage',
        discountValue: '10',
      },
    ]);
  };

  const removePricingItem = (index) => {
    if (dynamicPricingItems.length > 1) {
      setDynamicPricingItems(dynamicPricingItems.filter((_, idx) => idx !== index));
    }
  };

  const [price1Person, setPrice1Person] = useState('1512');
  const [price2Person, setPrice2Person] = useState('2500');
  const [price3Person, setPrice3Person] = useState('3200');

  // ── 4b. Child & Infant Pricing Breakdown ──
  const [childDiscountType, setChildDiscountType] = useState('percentage'); // 'percentage' | 'flat'
  const [childDiscountValue, setChildDiscountValue] = useState('50'); // 50% Off
  const [childPrice, setChildPrice] = useState('750');
  const [infantPrice, setInfantPrice] = useState('0');
  const [childPolicyNotes, setChildPolicyNotes] = useState('50% Off for Children aged 2-11 years. Infants under 2 years are free of charge.');

  // Auto-sync Child Policy Notes
  useEffect(() => {
    const childDesc = childDiscountType === 'percentage'
      ? `${childDiscountValue || 0}% Off`
      : `৳${Number(childPrice || 0).toLocaleString()} fixed rate`;
    const infantDesc = infantPrice && Number(infantPrice) > 0
      ? `Infant rate is fixed at ৳${Number(infantPrice).toLocaleString()} for children under 2 years.`
      : 'Infants under 2 years are free of charge.';
    setChildPolicyNotes(`${childDesc} for Children aged 2-11 years. ${infantDesc}`);
  }, [childDiscountType, childDiscountValue, childPrice, infantPrice]);

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
        if (item.pricingItems && Array.isArray(item.pricingItems) && item.pricingItems.length > 0) {
          setDynamicPricingItems(item.pricingItems);
        } else if (item.price1Person) {
          setDynamicPricingItems([
            { id: 1, title: 'Single Person Package', regularPrice: item.price1Person, discountType: 'amount', discountValue: '0' },
            { id: 2, title: 'Couple Package (2 Persons)', regularPrice: item.price2Person || '2500', discountType: 'amount', discountValue: '0' },
          ]);
        }
        if (item.price1Person) setPrice1Person(item.price1Person);
        if (item.price2Person) setPrice2Person(item.price2Person);
        if (item.price3Person) setPrice3Person(item.price3Person);
        if (item.childDiscountType) setChildDiscountType(item.childDiscountType);
        if (item.childDiscountValue) setChildDiscountValue(item.childDiscountValue);
        if (item.childPrice) setChildPrice(item.childPrice);
        if (item.infantPrice) setInfantPrice(item.infantPrice);
        if (item.childPolicyNotes) setChildPolicyNotes(item.childPolicyNotes);
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

    const formattedPricingItems = dynamicPricingItems.map(item => ({
      ...item,
      finalPrice: calculateFinalPrice(item),
    }));

    const p1 = formattedPricingItems[0] ? formattedPricingItems[0].finalPrice : price1Person;
    const p2 = formattedPricingItems[1] ? formattedPricingItems[1].finalPrice : price2Person;

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
      price1Person: String(p1),
      price2Person: String(p2),
      price3Person: String(price3Person),
      pricingItems: formattedPricingItems,
      childDiscountType,
      childDiscountValue,
      childPrice,
      infantPrice,
      childPolicyNotes,
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
                <label style={lblStyle}>Covered Spots &amp; Key Destinations *</label>
                <input type="text" value={coveredSpots} onChange={(e) => setCoveredSpots(e.target.value)} required style={inpStyle} placeholder="e.g. Old Dhaka, Ahsan Manzil, Lalbagh Fort &amp; Buriganga River" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={lblStyle}>Inclusions Badge Summary *</label>
                <input type="text" value={includedSummary} onChange={(e) => setIncludedSummary(e.target.value)} required style={inpStyle} placeholder="e.g. Flights, hotel, meals and transport included" />
              </div>
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

            {/* ── 3. Dynamic Pricing Tiers & Discounts ── */}
            <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#6B21A8', margin: '0 0 4px 0' }}>
                    3. Dynamic Pricing Tiers &amp; Discounts
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>
                    Configure pricing options (Single Person Package, Couple Package) with regular price and discounts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addPricingItem}
                  style={{
                    background: '#8B5CF6',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139,92,246,0.25)',
                  }}
                >
                  + Add Pricing Option Tier
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dynamicPricingItems.map((item, index) => {
                  const autoFinalPrice = calculateFinalPrice(item);
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #DDD6FE',
                        borderRadius: '12px',
                        padding: '14px',
                        boxShadow: '0 2px 8px rgba(126,34,206,0.04)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ background: '#F3E8FF', color: '#6B21A8', padding: '3px 10px', borderRadius: '16px', fontSize: '0.76rem', fontWeight: 700 }}>
                          Pricing Option #{index + 1}
                        </span>
                        {dynamicPricingItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePricingItem(index)}
                            style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Remove Tier ✕
                          </button>
                        )}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', alignItems: 'end' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Package Title *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Single Person Package"
                            value={item.title}
                            onChange={(e) => handlePricingItemChange(index, 'title', e.target.value)}
                            required
                            style={{ ...inpStyle, fontSize: '0.84rem', fontWeight: 600 }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Regular Price (৳) *
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 1800"
                            value={item.regularPrice}
                            onChange={(e) => handlePricingItemChange(index, 'regularPrice', e.target.value)}
                            required
                            style={{ ...inpStyle, fontSize: '0.84rem', fontWeight: 600 }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Discount Type *
                          </label>
                          <select
                            value={item.discountType}
                            onChange={(e) => handlePricingItemChange(index, 'discountType', e.target.value)}
                            style={{ ...inpStyle, fontSize: '0.84rem', fontWeight: 600, background: '#FFFFFF' }}
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="amount">Fixed Amount (৳)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Discount Value ({item.discountType === 'percentage' ? '%' : '৳'}) *
                          </label>
                          <input
                            type="number"
                            placeholder={item.discountType === 'percentage' ? 'e.g. 10' : 'e.g. 300'}
                            value={item.discountValue}
                            onChange={(e) => handlePricingItemChange(index, 'discountValue', e.target.value)}
                            required
                            style={{ ...inpStyle, fontSize: '0.84rem', fontWeight: 600 }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#047857', display: 'block', marginBottom: '4px' }}>
                            Final Price (৳)
                          </label>
                          <div style={{ padding: '8px 12px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', fontWeight: 800, color: '#15803D', fontSize: '0.88rem' }}>
                            ৳{autoFinalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 4. Child & Infant Pricing Breakdown ── */}
            <h3 style={secTitle}>4. Child &amp; Infant Pricing Breakdown</h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '16px' }}>Configure separate pricing rules, discounts, and policy notes for children and infants.</p>

            <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={lblStyle}>Child Pricing Discount Type *</label>
                  <select
                    value={childDiscountType}
                    onChange={(e) => setChildDiscountType(e.target.value)}
                    style={{ ...inpStyle, fontWeight: 600, background: '#FFFFFF' }}
                  >
                    <option value="percentage">Percentage Discount (% Off Adult Rate)</option>
                    <option value="flat">Fixed Rate (৳ per Child)</option>
                  </select>
                </div>

                <div>
                  <label style={lblStyle}>
                    {childDiscountType === 'percentage' ? 'Child Discount Percentage (% Off) *' : 'Child Fixed Price (৳) *'}
                  </label>
                  <input
                    type="number"
                    placeholder={childDiscountType === 'percentage' ? 'e.g. 50' : 'e.g. 750'}
                    value={childDiscountType === 'percentage' ? childDiscountValue : childPrice}
                    onChange={(e) => {
                      if (childDiscountType === 'percentage') {
                        setChildDiscountValue(e.target.value);
                      } else {
                        setChildPrice(e.target.value);
                      }
                    }}
                    style={{ ...inpStyle, fontWeight: 600 }}
                  />
                  {(() => {
                    const firstAdultFee = parseFloat(price1Person) || 1500;
                    const sampleChildFee = childDiscountType === 'percentage'
                      ? Math.round(firstAdultFee * (1 - (parseFloat(childDiscountValue) || 0) / 100))
                      : (parseFloat(childPrice) || 0);
                    return (
                      <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>💡 Calculated Child Fee:</span>
                        <strong style={{ color: '#047857' }}>৳{sampleChildFee.toLocaleString()}</strong>
                        <span style={{ color: '#6B7280' }}>(from ৳{firstAdultFee.toLocaleString()} Single rate)</span>
                      </div>
                    );
                  })()}
                </div>

                <div>
                  <label style={lblStyle}>Infant Price (৳) <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>(Under 2 Yrs)</span> *</label>
                  <input
                    type="number"
                    placeholder="e.g. 0"
                    value={infantPrice}
                    onChange={(e) => setInfantPrice(e.target.value)}
                    style={{ ...inpStyle, fontWeight: 600 }}
                  />
                </div>
              </div>

              <div>
                <label style={lblStyle}>Child &amp; Infant Policy Notes</label>
                <textarea
                  rows="2"
                  placeholder="e.g. 50% Off for Children aged 2-11 years. Infants under 2 years are free of charge."
                  value={childPolicyNotes}
                  onChange={(e) => setChildPolicyNotes(e.target.value)}
                  style={{ ...inpStyle, resize: 'vertical' }}
                />
              </div>
            </div>

            {/* ── 5. Bio, Services & Cancellation Policy ── */}
            <h3 style={secTitle}>5. Tour Itinerary Overview, Services & Policy</h3>

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

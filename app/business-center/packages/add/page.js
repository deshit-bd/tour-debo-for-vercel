'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';
import RoleGuard from '../../../components/RoleGuard';
import { getTourById } from '../../../../lib/toursData';

export default function AddPackagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams ? searchParams.get('edit') : null;
  const isEditing = Boolean(editId);

  // Basic Info
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [packageType, setPackageType] = useState('Fixed Date'); // Fixed Date vs Open Tour Option
  const [fixedDateRange, setFixedDateRange] = useState('');
  const [mainProduct, setMainProduct] = useState('Travel Package');
  const [destination, setDestination] = useState('');
  
  // Transport & Amenities Preview Tags
  const [includedTags, setIncludedTags] = useState(['Flight', 'Hotel', 'Bus', 'Cab']);

  // Dynamic Day-by-Day Itinerary (🌟 Dynamic Days & Daily Plan Fields)
  const [daysCount, setDaysCount] = useState(3);
  const [nightsCount, setNightsCount] = useState(2);
  const [dayPlans, setDayPlans] = useState([
    { day: 1, title: '', description: '' },
    { day: 2, title: '', description: '' },
    { day: 3, title: '', description: '' },
  ]);

  // Handle Dynamic Days Change
  const updateDaysCount = (newCount) => {
    const val = Math.max(1, parseInt(newCount) || 1);
    setDaysCount(val);
    setNightsCount(Math.max(0, val - 1));

    setDayPlans((prevPlans) => {
      if (val > prevPlans.length) {
        // Add new empty days
        const added = [];
        for (let i = prevPlans.length + 1; i <= val; i++) {
          added.push({
            day: i,
            title: '',
            description: '',
          });
        }
        return [...prevPlans, ...added];
      } else {
        // Truncate to new count
        return prevPlans.slice(0, val);
      }
    });
  };

  const handleDayPlanChange = (index, field, value) => {
    const updated = [...dayPlans];
    updated[index][field] = value;
    setDayPlans(updated);
  };

  const addExtraDay = () => {
    updateDaysCount(daysCount + 1);
  };

  const removeLastDay = () => {
    if (daysCount > 1) {
      updateDaysCount(daysCount - 1);
    }
  };

  // Gallery & Cover Images from PC File Picker
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [coverFileName, setCoverFileName] = useState('');
  
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFileName(file.name);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Helper for Auto Bullet Points on Enter key & Button click
  const handleBulletKeyDown = (e, setter, value) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cursor = e.target.selectionStart || value.length;
      const before = value.substring(0, cursor);
      const after = value.substring(cursor);
      const bulletPrefix = '\n• ';
      const newValue = before + bulletPrefix + after;
      setter(newValue);
      setTimeout(() => {
        const newPos = cursor + bulletPrefix.length;
        if (e.target.setSelectionRange) {
          e.target.setSelectionRange(newPos, newPos);
        }
      }, 0);
    }
  };

  const addBulletPointItem = (setter, value) => {
    if (!value || value.trim() === '') {
      setter('• ');
    } else {
      const suffix = value.endsWith('\n') ? '• ' : '\n• ';
      setter(value + suffix);
    }
  };

  // Service Amenity Badges (Flight, Hotel, Meals, Transport, Sightseeing)
  const [amenities, setAmenities] = useState([
    { id: 'flight', name: 'Flight', icon: '✈️', included: false },
    { id: 'hotel', name: 'Hotel', icon: '🏨', included: true },
    { id: 'meals', name: 'Meals', icon: '🍽️', included: true },
    { id: 'transport', name: 'Transport', icon: '🚌', included: true },
    { id: 'sightseeing', name: 'Sightseeing', icon: '⛰️', included: true },
  ]);

  const toggleAmenity = (id) => {
    setAmenities(prev => prev.map(a => a.id === id ? { ...a, included: !a.included } : a));
  };

  // Package Details & Inclusions / Exclusions
  const [packageDetails, setPackageDetails] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState('');
  const [whatsExcluded, setWhatsExcluded] = useState('');

  // Cancellation Policy & Policies
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [termsConditions, setTermsConditions] = useState('');
  const [travelTips, setTravelTips] = useState('');
  const [hotelPolicy, setHotelPolicy] = useState('');

  // Pricing Options
  const [singlePrice, setSinglePrice] = useState('');
  const [singleOriginalPrice, setSingleOriginalPrice] = useState('');
  const [couplePrice, setCouplePrice] = useState('');
  const [extraBedPrice, setExtraBedPrice] = useState('');

  // Discount Offer Banner & Percentage Badge Tag
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [minSpend, setMinSpend] = useState('');
  const [discountExpiry, setDiscountExpiry] = useState('');

  // Load package data when editing
  useEffect(() => {
    if (editId) {
      const pkgToEdit = getTourById(editId);
      if (pkgToEdit) {
        setTitle(pkgToEdit.title || '');
        setDestination(pkgToEdit.location || pkgToEdit.fullLocation || '');
        setPackageType(pkgToEdit.mode || 'Fixed Date Tour');
        setFixedDateRange(pkgToEdit.dates || '');
        if (pkgToEdit.prices?.single) setSinglePrice(pkgToEdit.prices.single.toLocaleString());
        if (pkgToEdit.prices?.couple) setCouplePrice(pkgToEdit.prices.couple.toLocaleString());
        if (pkgToEdit.prices?.extraBed) setExtraBedPrice(pkgToEdit.prices.extraBed.toLocaleString());
        if (pkgToEdit.discountTag) setDiscountPercent(pkgToEdit.discountTag);
        if (pkgToEdit.discount?.expiry) setDiscountExpiry(pkgToEdit.discount.expiry);
        if (pkgToEdit.amenities) setAmenities(pkgToEdit.amenities);
        if (pkgToEdit.desc) setPackageDetails(pkgToEdit.desc);
        if (pkgToEdit.whatsIncluded) setWhatsIncluded(pkgToEdit.whatsIncluded);
        if (pkgToEdit.whatsExcluded) setWhatsExcluded(pkgToEdit.whatsExcluded);
        if (pkgToEdit.cancellationPolicy) setCancellationPolicy(pkgToEdit.cancellationPolicy);
        if (pkgToEdit.termsConditions) setTermsConditions(pkgToEdit.termsConditions);
        if (pkgToEdit.travelTips) setTravelTips(pkgToEdit.travelTips);
        if (pkgToEdit.hotelPolicy) setHotelPolicy(pkgToEdit.hotelPolicy);
        if (pkgToEdit.image) setCoverImagePreview(pkgToEdit.image);
        if (pkgToEdit.images) setGalleryPreviews(pkgToEdit.images);
        if (pkgToEdit.dayPlans && pkgToEdit.dayPlans.length > 0) {
          setDayPlans(pkgToEdit.dayPlans);
          setDaysCount(pkgToEdit.dayPlans.length);
          setNightsCount(Math.max(0, pkgToEdit.dayPlans.length - 1));
        }
      }
    }
  }, [editId]);

  // Form State
  const [submitted, setSubmitted] = useState(false);

  // Submit Handler: Saves to LocalStorage and redirects
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const packageTitle = title || 'Custom Tour Package';
    const slugId = packageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `pkg-${Date.now()}`;
    const targetId = isEditing && editId ? editId : slugId;
    
    const singlePriceNum = parseInt(singlePrice.replace(/[^0-9]/g, '')) || 10000;
    const coupleNum = couplePrice ? parseInt(couplePrice.replace(/[^0-9]/g, '')) : Math.round(singlePriceNum * 1.8);
    const extraBedNum = parseInt(extraBedPrice.replace(/[^0-9]/g, '')) || 0;

    const discountPctNum = parseInt(discountPercent.replace(/[^0-9]/g, '')) || 0;
    
    // Auto-Calculate Original Price (Strikethrough Price): Price / (1 - pct/100)
    const singleOriginalNum = discountPctNum > 0 && discountPctNum < 100
      ? Math.round(singlePriceNum / (1 - discountPctNum / 100))
      : 0;

    const coupleOriginalNum = discountPctNum > 0 && discountPctNum < 100
      ? Math.round(coupleNum / (1 - discountPctNum / 100))
      : 0;

    // Auto-Calculate Voucher OFF Amount: Price * (pct/100)
    const voucherOffAmount = discountPctNum > 0
      ? Math.round(singlePriceNum * (discountPctNum / 100))
      : 0;

    const calculatedTag = discountPctNum > 0 ? `${discountPctNum}% OFF` : '';

    const newPackage = {
      id: targetId,
      title: packageTitle,
      titlePrefix: packageTitle.includes(':') ? `${packageTitle.split(':')[0]} : ` : `${packageTitle} : `,
      titleSub: packageTitle.includes(':') ? packageTitle.split(':')[1] : 'Special Tour Package',
      location: destination || 'Bangladesh',
      fullLocation: destination || 'Bangladesh',
      country: destination.includes(',') ? destination.split(',').pop().trim() : 'Bangladesh',
      rating: 5.0,
      type: mainProduct,
      mode: packageType,
      status: 'Active',
      sales: 0,
      price: Math.round(singlePriceNum / 120),
      oldPrice: Math.round(singleOriginalNum / 120),
      duration: `${daysCount} Days / ${nightsCount} Nights`,
      badge: `${daysCount} Days / ${nightsCount} Nights`,
      isOffer: true,
      discountTag: calculatedTag,
      amenities: amenities,
      isLocal: true,
      countryType: 'Single Country',
      packageType: 'Couple',
      transportation: 'Include',
      meal: 'All Include',
      accommodation: '4 Star Hotel',
      sightseeing: 'Popular Landmarks',
      desc: packageDetails || 'Comprehensive custom tour package.',
      image: coverImagePreview || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      visitedCount: '1',
      interestCount: '1',
      dates: fixedDateRange || 'Flexible Travel Dates',
      guideName: 'DeshIT-BD Planner',
      guideLangs: 'English, Bengali',
      guideRating: '5.0 Verified Planner',
      guideAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      prices: {
        single: singlePriceNum,
        singleOriginal: singleOriginalNum,
        couple: coupleNum,
        coupleOriginal: coupleOriginalNum,
        extraBed: extraBedNum,
      },
      discount: {
        amount: voucherOffAmount > 0 ? voucherOffAmount.toLocaleString() : '',
        minSpend: singlePriceNum.toLocaleString(),
        expiry: discountExpiry || 'Offer Expiration',
        tag: calculatedTag,
      },
      dayPlans: dayPlans,
      whatsIncluded: whatsIncluded,
      whatsExcluded: whatsExcluded,
      cancellationPolicy: cancellationPolicy,
      termsConditions: termsConditions,
      travelTips: travelTips,
      hotelPolicy: hotelPolicy,
      images: galleryPreviews.length > 0 ? galleryPreviews : [coverImagePreview],
      createdAt: new Date().toISOString(),
    };

    // Store into LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tour_dibo_custom_packages') || '[]');
      const updated = [newPackage, ...existing.filter(p => p.id !== newPackage.id)];
      localStorage.setItem('tour_dibo_custom_packages', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save custom package to localStorage:', err);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show browser alert and redirect to Package List
    alert(`🎉 Tour Package "${packageTitle}" ${isEditing ? 'Updated' : 'Created'} & Published Successfully!\n\nRedirecting to Manage Packages page...`);
    router.push('/business-center/packages');
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <RoleGuard allowedRoles={['PLANNER']}>
        <main className="figma-main-content seller-main-wrapper">
          <div className="seller-layout-grid">
            <SellerSidebar />

            <div className="seller-main-content">
              <div className="seller-card">
                <div className="seller-card-title">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                        {isEditing ? 'Edit Tour Package' : 'Create Full Tour Package'}
                      </h2>
                      <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
                        Comprehensive Tour Form
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                      Fill in all input fields required for the Tour Detail page (Itinerary, Inclusions, Pricing, Policies & Images).
                    </p>
                  </div>
                  <Link href="/business-center/packages" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
                    Back to Package List
                  </Link>
                </div>

                {submitted && (
                  <div style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0', color: '#047857', padding: '16px 20px', borderRadius: '16px', fontSize: '0.95rem', fontWeight: 600, marginBottom: '24px', boxShadow: '0 4px 12px rgba(4,120,87,0.1)' }}>
                    Tour Package Published Successfully! All dynamic day itineraries, pricing tiers, and policies are now live on the marketplace.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="seller-form-grid">
                  
                  {/* 1. BASIC INFORMATION */}
                  <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>1. Basic Package Information</span>
                    </h3>
                  </div>

                  <div className="seller-form-group full-width">
                    <label>Tour Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Paris : City of Love"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Destination / Location *</label>
                    <input
                      type="text"
                      placeholder="e.g. Paris, France"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Main Product Service *</label>
                    <select value={mainProduct} onChange={(e) => setMainProduct(e.target.value)}>
                      <option value="Travel Package">Travel Package</option>
                      <option value="Visa Processing Service">Visa Processing Service</option>
                      <option value="Tour Guide Service">Tour Guide Service</option>
                    </select>
                  </div>

                  <div className="seller-form-group">
                    <label>Tour Option Type *</label>
                    <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                      <option value="Fixed Date">Fixed Date Tour</option>
                      <option value="Open Option">Open Tour Option</option>
                    </select>
                  </div>

                  {packageType === 'Fixed Date' && (
                    <div className="seller-form-group">
                      <label>Fixed Date Range *</label>
                      <input
                        type="text"
                        placeholder="e.g. 27 - 29 June, 2024"
                        value={fixedDateRange}
                        onChange={(e) => setFixedDateRange(e.target.value)}
                      />
                    </div>
                  )}

                  {/* 2. DYNAMIC DAY-BY-DAY ITINERARY PLAN */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '18px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#2563EB', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            2. Dynamic Day-by-Day Tour Itinerary
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '4px 0 0 0' }}>
                            Set total days. Input fields for every single day plan will automatically adjust dynamically!
                          </p>
                        </div>

                        {/* Days Counter Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', padding: '6px 14px', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Total Duration:</span>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={daysCount}
                            onChange={(e) => updateDaysCount(e.target.value)}
                            style={{ width: '60px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1.5px solid #2563EB', fontWeight: 600, fontSize: '0.95rem', color: '#2563EB' }}
                          />
                          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748B' }}>Days / {nightsCount} Nights</span>
                        </div>
                      </div>

                      {/* Dynamic Day Input Fields */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dayPlans.map((dayItem, index) => (
                          <div
                            key={index}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '14px',
                              padding: '16px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                              <span
                                style={{
                                  background: '#2563EB',
                                  color: '#FFFFFF',
                                  padding: '4px 12px',
                                  borderRadius: '20px',
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                }}
                              >
                                Day {dayItem.day}
                              </span>
                              <input
                                type="text"
                                placeholder={`Day ${dayItem.day} Title (e.g. Arrival & Eiffel Tower Visit)`}
                                value={dayItem.title}
                                onChange={(e) => handleDayPlanChange(index, 'title', e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  border: '1px solid #CBD5E1',
                                  fontWeight: 500,
                                  fontSize: '0.9rem',
                                }}
                              />
                            </div>

                            <textarea
                              rows="3"
                              placeholder={`Write the complete itinerary plan for Day ${dayItem.day} (Sightseeing, meals, hotel stay, transport)...`}
                              value={dayItem.description}
                              onChange={(e) => handleDayPlanChange(index, 'description', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #CBD5E1',
                                fontSize: '0.88rem',
                                outline: 'none',
                                lineHeight: '1.5',
                                fontWeight: 400,
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Add / Remove Buttons */}
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button
                          type="button"
                          onClick={addExtraDay}
                          style={{
                            background: '#EFF6FF',
                            color: '#2563EB',
                            border: '1.5px solid #93C5FD',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                          }}
                        >
                          Add Another Day
                        </button>
                        {daysCount > 1 && (
                          <button
                            type="button"
                            onClick={removeLastDay}
                            style={{
                              background: '#FEF2F2',
                              color: '#DC2626',
                              border: '1.5px solid #FCA5A5',
                              padding: '10px 18px',
                              borderRadius: '10px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                            }}
                          >
                            Remove Last Day
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. IMAGES & GALLERY (PC FILE UPLOADER) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      3. Main Cover & Gallery Photos (Choose from PC)
                    </h3>
                  </div>

                  {/* Main Cover Image PC Picker */}
                  <div className="seller-form-group full-width">
                    <label style={{ fontWeight: 600 }}>Main Cover Image (Select file from PC) *</label>
                    
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1.5px dashed #CBD5E1' }}>
                      {/* Image Thumbnail Preview */}
                      {coverImagePreview && (
                        <div style={{ position: 'relative', width: '160px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #2563EB', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                          <img src={coverImagePreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 10px 0', fontWeight: 500 }}>
                          {coverFileName ? `Selected: ${coverFileName}` : 'Select a high-resolution cover photo from your computer.'}
                        </p>

                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#2563EB',
                            color: '#FFFFFF',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
                          }}
                        >
                          Choose Cover Photo from PC
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Photos PC Picker */}
                  <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                      <label style={{ fontWeight: 600, margin: 0 }}>Gallery Photos (Upload Multiple Images from PC)</label>
                      
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#EFF6FF',
                          color: '#2563EB',
                          border: '1.5px solid #BFDBFE',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                        }}
                      >
                        Add Gallery Photos from PC
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryFilesChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    {/* Gallery Preview Thumbnail Grid */}
                    {galleryPreviews.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                        {galleryPreviews.map((imgUrl, index) => (
                          <div
                            key={index}
                            style={{
                              position: 'relative',
                              height: '100px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '1px solid #CBD5E1',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            }}
                          >
                            <img src={imgUrl} alt={`Gallery ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'rgba(220, 38, 38, 0.85)',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                              title="Remove photo"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '24px', background: '#F8FAFC', borderRadius: '14px', border: '1.5px dashed #CBD5E1', color: '#64748B', fontSize: '0.85rem' }}>
                        No gallery photos uploaded yet. Click <strong>"Add Gallery Photos from PC"</strong> to pick images from your computer.
                      </div>
                    )}
                  </div>

                  {/* 4. PACKAGE DETAILS & INCLUSIONS / EXCLUSIONS */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      4. Package Details & Amenities
                    </h3>
                  </div>

                  <div className="seller-form-group full-width">
                    <label style={{ fontWeight: 600 }}>Package Summary Details *</label>
                    <input
                      type="text"
                      placeholder="e.g. Includes 4 star hotel stay, daily breakfast, museum passes, and airport shuttle service."
                      value={packageDetails}
                      onChange={(e) => setPackageDetails(e.target.value)}
                      required
                    />
                  </div>

                  {/* Card Service Icon Badges (Included / Excluded Toggle) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                      Package Included Amenities & Services *
                    </label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {amenities.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleAmenity(item.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 14px',
                            borderRadius: '12px',
                            border: item.included ? '2px solid #2563EB' : '1.5px dashed #CBD5E1',
                            background: item.included ? '#EFF6FF' : '#F8FAFC',
                            color: item.included ? '#1E40AF' : '#94A3B8',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                          <span>{item.name}</span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: item.included ? '#DCFCE7' : '#FEE2E2',
                              color: item.included ? '#15803D' : '#DC2626',
                              fontWeight: 700,
                              marginLeft: '4px',
                            }}
                          >
                            {item.included ? 'INCLUDED' : 'EXCLUDED'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="seller-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ color: '#166534', fontWeight: 600, margin: 0 }}>What's Included *</label>
                      <button
                        type="button"
                        onClick={() => addBulletPointItem(setWhatsIncluded, whatsIncluded)}
                        style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '3px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        + Add Bullet (`•`)
                      </button>
                    </div>
                    <textarea
                      rows="5"
                      placeholder="Write bullet points of included services... (Press Enter for new bullet)"
                      value={whatsIncluded}
                      onChange={(e) => setWhatsIncluded(e.target.value)}
                      onKeyDown={(e) => handleBulletKeyDown(e, setWhatsIncluded, whatsIncluded)}
                      required
                    />
                    <small style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                      Tip: Press <code>Enter</code> key to automatically create a disc bullet point (<code>•</code>).
                    </small>
                  </div>

                  <div className="seller-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ color: '#991B1B', fontWeight: 600, margin: 0 }}>What's Excluded *</label>
                      <button
                        type="button"
                        onClick={() => addBulletPointItem(setWhatsExcluded, whatsExcluded)}
                        style={{ background: '#FEE2E2', color: '#B91C1C', border: '1px solid #FCA5A5', padding: '3px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        + Add Bullet (`•`)
                      </button>
                    </div>
                    <textarea
                      rows="5"
                      placeholder="Write bullet points of excluded services... (Press Enter for new bullet)"
                      onChange={(e) => setWhatsExcluded(e.target.value)}
                      onKeyDown={(e) => handleBulletKeyDown(e, setWhatsExcluded, whatsExcluded)}
                      required
                    />
                    <small style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                      Tip: Press <code>Enter</code> key to automatically create a disc bullet point (<code>•</code>).
                    </small>
                  </div>

                  {/* 5. PRICING TIERS & DISCOUNT BANNER */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      5. Pricing Tiers & Discount Offer
                    </h3>
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Single Person Price (৳) *</label>
                    <input
                      type="text"
                      placeholder="e.g. 1,728,000"
                      value={singlePrice}
                      onChange={(e) => setSinglePrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Couple Price (৳)</label>
                    <input
                      type="text"
                      placeholder="e.g. 2,880,000"
                      value={couplePrice}
                      onChange={(e) => setCouplePrice(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Discount Percentage (%)</label>
                    <input
                      type="text"
                      placeholder="e.g. 20%"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Offer Expiry Date *</label>
                    <input
                      type="date"
                      value={discountExpiry.includes('-') ? discountExpiry : '2026-12-31'}
                      onChange={(e) => setDiscountExpiry(e.target.value)}
                      required
                      style={{ cursor: 'pointer', fontWeight: 500 }}
                    />
                  </div>

                  {/* 6. POLICIES & TERMS */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      6. Policies, Terms & Travel Tips
                    </h3>
                  </div>

                  <div className="seller-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontWeight: 600, margin: 0 }}>Cancellation Policy *</label>
                      <button
                        type="button"
                        onClick={() => addBulletPointItem(setCancellationPolicy, cancellationPolicy)}
                        style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        + Add Bullet (`•`)
                      </button>
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Write cancellation refund rules..."
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(e.target.value)}
                      onKeyDown={(e) => handleBulletKeyDown(e, setCancellationPolicy, cancellationPolicy)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontWeight: 600, margin: 0 }}>Terms & Conditions *</label>
                      <button
                        type="button"
                        onClick={() => addBulletPointItem(setTermsConditions, termsConditions)}
                        style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        + Add Bullet (`•`)
                      </button>
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Write tour terms & conditions..."
                      value={termsConditions}
                      onChange={(e) => setTermsConditions(e.target.value)}
                      onKeyDown={(e) => handleBulletKeyDown(e, setTermsConditions, termsConditions)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Travel Tips for Travelers</label>
                    <textarea
                      rows="3"
                      placeholder="Write pro tips for travelers..."
                      value={travelTips}
                      onChange={(e) => setTravelTips(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Hotel Check-In & Child Policy</label>
                    <textarea
                      rows="3"
                      placeholder="Write check-in times & child stay policy..."
                      value={hotelPolicy}
                      onChange={(e) => setHotelPolicy(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <button
                      type="submit"
                      className="btn-seller-primary"
                      style={{
                        justifyContent: 'center',
                        fontSize: '1rem',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        boxShadow: '0 6px 16px rgba(37,99,235,0.2)',
                        fontWeight: 600,
                      }}
                    >
                      {isEditing ? '✓ Save & Update Package' : 'Publish Complete Tour Package'}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </main>
      </RoleGuard>

      <Footer />
    </div>
  );
}


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

  // 1. Basic Information States
  const [title, setTitle] = useState('');
  // SRS Document Specified Fields:
  const [skuCode, setSkuCode] = useState('SKU-PKG-2026');
  const [tourClassification, setTourClassification] = useState('Domestic'); // Domestic | International
  const [internationalCategory, setInternationalCategory] = useState('Single Country'); // Single Country | Multi Country
  const [tourCategory, setTourCategory] = useState('Multi-Day Tour'); // Day Tour, Multi-Day Tour, Cruise, Adventure, Honeymoon, Family, Wildlife, Trekking, Hill track
  const [packageTypes, setPackageTypes] = useState(['Single', 'Couple', 'Group']); // Single, Couple, Family, Group
  const [startingPoint, setStartingPoint] = useState('Dhaka');
  const [startingCountry, setStartingCountry] = useState('Bangladesh');
  const [destinationCountry, setDestinationCountry] = useState('Bangladesh');
  const [destinationCity, setDestinationCity] = useState('Cox\'s Bazar');
  const [destination, setDestination] = useState('Cox\'s Bazar');
  const [multipleDestinations, setMultipleDestinations] = useState('Sajek, Rangamati, Bandarban');
  const [transportationType, setTransportationType] = useState('Include'); // Air Fare, Include, Partial Include, Exclude
  
  // Tour Includes Checkboxes (Shown in Top Summary)
  const [tourIncludes, setTourIncludes] = useState([
    'Bus', 'Hotel', 'Breakfast', 'Dinner', 'Local Transport', 'Tour Guide', 'Entrance Fees'
  ]);
  const allTourIncludesOptions = [
    'Airfare', 'Bus', 'Ferry', 'Hotel', 'Breakfast', 'Lunch', 'Dinner', 'Airport Transfer',
    'Local Transport', 'Cruise', 'Tour Guide', 'Entrance Fees', 'Visa Support', 'Travel', 'Photography', 'Insurance'
  ];

  const toggleTourInclude = (item) => {
    setTourIncludes((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Times & Flexibility
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('08:00 PM');
  const [flexibleDates, setFlexibleDates] = useState('No'); // Yes | No
  const [isFeaturedPackage, setIsFeaturedPackage] = useState(false);

  // Accommodation & Package Option States
  const [accommodationType, setAccommodationType] = useState('Standard Hotel (3 Star)');
  const [accommodationOptions, setAccommodationOptions] = useState([
    'Standard Hotel (3 Star)',
    'Luxury Resort (5 Star)',
    'Boutique Hotel',
    'Eco Resort / Cottage',
    'Houseboat / Cruise',
    'Camping Tent'
  ]);
  const [showAddAccomModal, setShowAddAccomModal] = useState(false);
  const [newAccomTitle, setNewAccomTitle] = useState('');

  const [selectedMeals, setSelectedMeals] = useState(['Breakfast', 'Dinner']);
  const [mainProduct, setMainProduct] = useState('Travel Package');
  const [packageType, setPackageType] = useState('Fixed Date');
  const [fixedDateRange, setFixedDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateAccomType = () => {
    if (newAccomTitle && newAccomTitle.trim() !== '') {
      const trimmed = newAccomTitle.trim();
      if (!accommodationOptions.includes(trimmed)) {
        setAccommodationOptions([...accommodationOptions, trimmed]);
      }
      setAccommodationType(trimmed);
      setNewAccomTitle('');
      setShowAddAccomModal(false);
    }
  };

  // Section 2: Videos & 360 Photo
  const [tourVideoUrl, setTourVideoUrl] = useState('');
  const [photo360Url, setPhoto360Url] = useState('');

  // Section 6: Availability (Optional)
  const [bookingDeadline, setBookingDeadline] = useState('');
  const [minTravelers, setMinTravelers] = useState(1);
  const [maxTravelers, setMaxTravelers] = useState(15);

  // Section 7: Pricing Breakdown & Child Policy
  const [childDiscountType, setChildDiscountType] = useState('percentage'); // 'percentage' | 'flat'
  const [childDiscountValue, setChildDiscountValue] = useState('50'); // 50% Off
  const [childPrice, setChildPrice] = useState('5000');
  const [infantPrice, setInfantPrice] = useState('1500');
  const [groupDiscount, setGroupDiscount] = useState('10% Off for 5+ Guests');
  const [childPolicyNotes, setChildPolicyNotes] = useState('50% Off for Children aged 2-11 years. Infant fee is fixed at ৳1,500 for children under 2 years.');

  // Auto-sync Child Policy Notes
  useEffect(() => {
    const childDesc = childDiscountType === 'percentage'
      ? `${childDiscountValue || 0}% Off`
      : `৳${Number(childPrice || 0).toLocaleString()} fixed rate`;
    const infantDesc = infantPrice
      ? `Infant fee is fixed at ৳${Number(infantPrice || 0).toLocaleString()} for children under 2 years.`
      : 'Infants under 2 years apply free or nominal fee.';
    setChildPolicyNotes(`${childDesc} for Children aged 2-11 years. ${infantDesc}`);
  }, [childDiscountType, childDiscountValue, childPrice, infantPrice]);

  // Section 22: Publish Settings & Status
  const [publishStatus, setPublishStatus] = useState('Published'); // Draft | Pending Review | Published | Rejected

  // Dynamic Day-by-Day Itinerary
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

  // Gallery & Cover Images
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

  // Helper for Auto Bullet Points on Enter key
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

  // Service Amenity Badges
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

  // Meal Selection Toggle
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Partial Included', 'All Meals Included', 'None'];
  const toggleMealOption = (meal) => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter(m => m !== meal));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  // Package Details & Policies
  const [packageDetails, setPackageDetails] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState('');
  const [whatsExcluded, setWhatsExcluded] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [termsConditions, setTermsConditions] = useState('');
  const [travelTips, setTravelTips] = useState('');
  const [hotelPolicy, setHotelPolicy] = useState('');

  // 6. Requirement 6: Dynamic Pricing Items with Auto Calculation
  const [dynamicPricingItems, setDynamicPricingItems] = useState([
    {
      id: 1,
      title: 'Single Person Package',
      regularPrice: '24000',
      discountType: 'percentage', // 'percentage' | 'amount'
      discountValue: '10',
    },
    {
      id: 2,
      title: 'Couple Package (2 Persons)',
      regularPrice: '40000',
      discountType: 'amount',
      discountValue: '4000',
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
        title: `Package Option ${dynamicPricingItems.length + 1}`,
        regularPrice: '15000',
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

  // 7. Requirement 7: Dynamic Optional Add-ons with Prices
  const [optionalAddOns, setOptionalAddOns] = useState([
    { id: 1, title: 'Private Airport Pickup & Drop Shuttle', price: '1500' },
    { id: 2, title: 'Candle Light Buffet Dinner on Beach', price: '1200' },
  ]);

  const handleAddOnChange = (index, field, value) => {
    const updated = [...optionalAddOns];
    updated[index][field] = value;
    setOptionalAddOns(updated);
  };

  const addOptionalAddOn = () => {
    setOptionalAddOns([
      ...optionalAddOns,
      { id: Date.now(), title: '', price: '' },
    ]);
  };

  const removeAddOn = (index) => {
    setOptionalAddOns(optionalAddOns.filter((_, idx) => idx !== index));
  };

  const [discountExpiry, setDiscountExpiry] = useState('2026-12-31');

  // Load package data when editing
  useEffect(() => {
    if (editId) {
      const pkgToEdit = getTourById(editId);
      if (pkgToEdit) {
        setTitle(pkgToEdit.title || '');
        setDestination(pkgToEdit.location || pkgToEdit.fullLocation || '');
        setDestinationCountry(pkgToEdit.country || 'France');
        setPackageType(pkgToEdit.mode || 'Fixed Date');
        setFixedDateRange(pkgToEdit.dates || '');
        if (pkgToEdit.amenities) setAmenities(pkgToEdit.amenities);
        if (pkgToEdit.desc) setPackageDetails(pkgToEdit.desc);
        if (pkgToEdit.whatsIncluded) setWhatsIncluded(pkgToEdit.whatsIncluded);
        if (pkgToEdit.whatsExcluded) setWhatsExcluded(pkgToEdit.whatsExcluded);
        if (pkgToEdit.childDiscountType) setChildDiscountType(pkgToEdit.childDiscountType);
        if (pkgToEdit.childDiscountValue) setChildDiscountValue(pkgToEdit.childDiscountValue);
        if (pkgToEdit.childPrice) setChildPrice(pkgToEdit.childPrice);
        if (pkgToEdit.infantPrice) setInfantPrice(pkgToEdit.infantPrice);
        if (pkgToEdit.groupDiscount) setGroupDiscount(pkgToEdit.groupDiscount);
        if (pkgToEdit.childPolicyNotes) setChildPolicyNotes(pkgToEdit.childPolicyNotes);
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

  // Form Submission
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const packageTitle = title || 'Custom Tour Package';
    const slugId = packageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `pkg-${Date.now()}`;
    const targetId = isEditing && editId ? editId : slugId;
    
    const formattedDateRange = startDate && endDate ? `${startDate} to ${endDate}` : (fixedDateRange || 'Flexible Dates');

    const formattedPricingItems = dynamicPricingItems.map(item => ({
      ...item,
      finalPrice: calculateFinalPrice(item),
    }));

    const newPackage = {
      id: targetId,
      title: packageTitle,
      location: destination || 'Paris, France',
      country: destinationCountry,
      startingCountry: startingCountry,
      accommodationType: accommodationType,
      meals: selectedMeals,
      rating: 5.0,
      type: mainProduct,
      mode: packageType,
      dates: formattedDateRange,
      startDate: startDate,
      endDate: endDate,
      status: 'Active',
      sales: 0,
      pricingItems: formattedPricingItems,
      childDiscountType,
      childDiscountValue,
      childPrice,
      infantPrice,
      groupDiscount,
      childPolicyNotes,
      addOns: optionalAddOns,
      duration: `${daysCount} Days / ${nightsCount} Nights`,
      image: coverImagePreview || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      images: galleryPreviews.length > 0 ? galleryPreviews : ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
      desc: packageDetails,
      whatsIncluded,
      whatsExcluded,
      cancellationPolicy,
      termsConditions,
      travelTips,
      hotelPolicy,
      dayPlans,
    };

    try {
      const saved = JSON.parse(localStorage.getItem('tour_dibo_custom_packages') || '[]');
      const updated = isEditing ? saved.map(p => p.id === targetId ? newPackage : p) : [newPackage, ...saved];
      localStorage.setItem('tour_dibo_custom_packages', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save custom package to localStorage:', err);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                      Fill in all input fields required for the Tour Detail page (Itinerary, Pricing, Policies & Images).
                    </p>
                  </div>
                  <Link href="/business-center/packages" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
                    Back to Package List
                  </Link>
                </div>

                {submitted && (
                  <div style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0', color: '#047857', padding: '16px 20px', borderRadius: '16px', fontSize: '0.95rem', fontWeight: 600, marginBottom: '24px', boxShadow: '0 4px 12px rgba(4,120,87,0.1)' }}>
                    Tour Package Published Successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="seller-form-grid">
                  
                  {/* 1. BASIC INFORMATION (SRS Section 1) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>1. Basic Information</span>
                    </h3>
                  </div>

                  <div className="seller-form-group">
                    <label>Package Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Cox's Bazar Beach & Resort Excursion"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Package Code / SKU *</label>
                    <input
                      type="text"
                      placeholder="e.g. SKU-CXB-2026"
                      value={skuCode}
                      onChange={(e) => setSkuCode(e.target.value)}
                      required
                      style={{ fontWeight: 700, color: '#2563EB' }}
                    />
                  </div>

                  {/* Tour Type: Domestic vs International */}
                  <div className="seller-form-group">
                    <label>Tour Scope *</label>
                    <select
                      value={tourClassification}
                      onChange={(e) => setTourClassification(e.target.value)}
                      style={{ fontWeight: 600 }}
                    >
                      <option value="Domestic">Domestic Tour</option>
                      <option value="International">International Tour</option>
                    </select>
                  </div>

                  {tourClassification === 'International' && (
                    <div className="seller-form-group">
                      <label>International Category *</label>
                      <select
                        value={internationalCategory}
                        onChange={(e) => setInternationalCategory(e.target.value)}
                        style={{ fontWeight: 600 }}
                      >
                        <option value="Single Country">Single Country Tour</option>
                        <option value="Multi Country">Multi Country Tour</option>
                      </select>
                    </div>
                  )}

                  {/* Tour Category / Type */}
                  <div className="seller-form-group">
                    <label>Tour Category *</label>
                    <select
                      value={tourCategory}
                      onChange={(e) => setTourCategory(e.target.value)}
                      style={{ fontWeight: 600 }}
                    >
                      <option value="Day Tour">Day Tour</option>
                      <option value="Multi-Day Tour">Multi-Day Tour</option>
                      <option value="Cruise">Cruise</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Family">Family</option>
                      <option value="Wildlife">Wildlife</option>
                      <option value="Trekking">Trekking</option>
                      <option value="Hill track">Hill track</option>
                    </select>
                  </div>

                  {/* Starting Point & Destination City */}
                  <div className="seller-form-group">
                    <label>Starting Point *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhaka (Hazrat Shahjalal Airport / Arambagh)"
                      value={startingPoint}
                      onChange={(e) => setStartingPoint(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Destination City *</label>
                    <input
                      type="text"
                      placeholder="e.g. Cox's Bazar / Sylhet"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Multiple Destinations (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Sajek Valley, Rangamati, Bandarban"
                      value={multipleDestinations}
                      onChange={(e) => setMultipleDestinations(e.target.value)}
                    />
                  </div>

                  {/* Transportation Dropdown */}
                  <div className="seller-form-group">
                    <label>Transportation Mode *</label>
                    <select
                      value={transportationType}
                      onChange={(e) => setTransportationType(e.target.value)}
                      style={{ fontWeight: 600 }}
                    >
                      <option value="Air Fare">Air Fare Included</option>
                      <option value="Include">Full Transport Included</option>
                      <option value="Partial Include">Partial Transport Included</option>
                      <option value="Exclude">Transport Excluded</option>
                    </select>
                  </div>

                  {/* Tour Includes Checkboxes (Shown in Top Summary) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '6px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                      Tour Includes (Checkboxes - Displayed in Top Summary) *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      {allTourIncludesOptions.map((inc) => {
                        const isChecked = tourIncludes.includes(inc);
                        return (
                          <label
                            key={inc}
                            onClick={() => toggleTourInclude(inc)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: isChecked ? 700 : 500,
                              color: isChecked ? '#1E40AF' : '#475569',
                              cursor: 'pointer',
                              userSelect: 'none',
                              padding: '6px 8px',
                              borderRadius: '6px',
                              background: isChecked ? '#EFF6FF' : '#FFFFFF',
                              border: `1px solid ${isChecked ? '#93C5FD' : '#CBD5E1'}`,
                            }}
                          >
                            <input type="checkbox" checked={isChecked} onChange={() => {}} style={{ accentColor: '#2563EB' }} />
                            <span>{inc}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Start & End Times */}
                  <div className="seller-form-group">
                    <label>Start Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 08:00 AM"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>End Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 08:00 PM"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label>Flexible Dates Option *</label>
                    <select value={flexibleDates} onChange={(e) => setFlexibleDates(e.target.value)}>
                      <option value="No">No (Fixed Specific Dates)</option>
                      <option value="Yes">Yes (Travelers can choose flexible dates)</option>
                    </select>
                  </div>

                  {/* Tour Starting Country */}
                  <div className="seller-form-group">
                    <label>Tour Starting Country *</label>
                    <select
                      value={startingCountry}
                      onChange={(e) => setStartingCountry(e.target.value)}
                      required
                      style={{ fontWeight: 600 }}
                    >
                      {[
                        'Bangladesh',
                        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
                        'Bahamas', 'Bahrain', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
                        'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
                        'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
                        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
                        'Fiji', 'Finland', 'France',
                        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guyana',
                        'Haiti', 'Honduras', 'Hungary',
                        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
                        'Jamaica', 'Japan', 'Jordan',
                        'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
                        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
                        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
                        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
                        'Oman',
                        'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
                        'Qatar',
                        'Romania', 'Russia', 'Rwanda',
                        'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
                        'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
                        'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
                        'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
                        'Yemen',
                        'Zambia', 'Zimbabwe'
                      ].map((countryName) => (
                        <option key={`start-${countryName}`} value={countryName}>{countryName}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination Country */}
                  <div className="seller-form-group">
                    <label>Destination Country *</label>
                    <select
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      required
                      style={{ fontWeight: 600 }}
                    >
                      {[
                        'Bangladesh',
                        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
                        'Bahamas', 'Bahrain', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
                        'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
                        'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
                        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
                        'Fiji', 'Finland', 'France',
                        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guyana',
                        'Haiti', 'Honduras', 'Hungary',
                        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
                        'Jamaica', 'Japan', 'Jordan',
                        'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
                        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
                        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
                        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
                        'Oman',
                        'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
                        'Qatar',
                        'Romania', 'Russia', 'Rwanda',
                        'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
                        'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
                        'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
                        'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
                        'Yemen',
                        'Zambia', 'Zimbabwe'
                      ].map((countryName) => (
                        <option key={`dest-${countryName}`} value={countryName}>{countryName}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination / Location */}
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

                  {/* Requirement 5: Accommodation Type */}
                  <div className="seller-form-group" style={{ position: 'relative' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Accommodation Type *</label>

                    <div style={{ position: 'relative' }}>
                      <select
                        value={accommodationType}
                        onChange={(e) => setAccommodationType(e.target.value)}
                        required
                        style={{ width: '100%', fontWeight: 600, paddingRight: '40px' }}
                      >
                        {accommodationOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>

                      {/* Plus Icon Overlay Button on Top Right Border Edge */}
                      <button
                        type="button"
                        onClick={() => setShowAddAccomModal(true)}
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '-4px',
                          background: '#F0FDF4',
                          color: '#166534',
                          border: '1.5px solid #86EFAC',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: 1,
                          boxShadow: '0 2px 6px rgba(22,101,52,0.15)',
                          zIndex: 2,
                        }}
                        title="Create new accommodation type"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Popup Modal for Custom Accommodation Type */}
                  {showAddAccomModal && (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '20px',
                      }}
                      onClick={() => setShowAddAccomModal(false)}
                    >
                      <div
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '20px',
                          width: '100%',
                          maxWidth: '460px',
                          padding: '24px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                          border: '1px solid #E2E8F0',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            Create Accommodation Type
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowAddAccomModal(false)}
                            style={{ background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                          >
                            ✕
                          </button>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 18px 0' }}>
                          Enter a custom accommodation type name to add to your package dropdown list.
                        </p>

                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                            Accommodation Type Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Treehouse Eco Lodge / Deluxe Houseboat"
                            value={newAccomTitle}
                            onChange={(e) => setNewAccomTitle(e.target.value)}
                            autoFocus
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 500 }}
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => setShowAddAccomModal(false)}
                            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleCreateAccomType}
                            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#166534', color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 101, 52, 0.25)' }}
                          >
                            + Save &amp; Select
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="seller-form-group">
                    <label>Main Product Service *</label>
                    <select value={mainProduct} onChange={(e) => setMainProduct(e.target.value)}>
                      <option value="Travel Package">Travel Package</option>
                    </select>
                  </div>

                  <div className="seller-form-group">
                    <label>Tour Option Type *</label>
                    <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                      <option value="Fixed Date">Fixed Date Tour</option>
                      <option value="Open Option">Open Tour Option</option>
                    </select>
                  </div>

                  {/* Requirement 2: Date in Calendar Format */}
                  {packageType === 'Fixed Date' && (
                    <>
                      <div className="seller-form-group">
                        <label>Tour Start Date *</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                          style={{ cursor: 'pointer', fontWeight: 600 }}
                        />
                      </div>

                      <div className="seller-form-group">
                        <label>Tour End Date *</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                          style={{ cursor: 'pointer', fontWeight: 600 }}
                        />
                      </div>
                    </>
                  )}

                  {/* Requirement 4: Food Inclusions */}
                  <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                      Food / Meal Inclusions *
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {mealOptions.map((meal) => {
                        const isSelected = selectedMeals.includes(meal);
                        return (
                          <div
                            key={meal}
                            onClick={() => toggleMealOption(meal)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: '12px',
                              border: isSelected ? '2px solid #2563EB' : '1.5px solid #CBD5E1',
                              background: isSelected ? '#EFF6FF' : '#F8FAFC',
                              color: isSelected ? '#1E40AF' : '#475569',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              userSelect: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>{isSelected ? '✓' : '○'}</span>
                            <span>{meal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

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

                  {/* 3. IMAGES & GALLERY */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      3. Main Cover & Gallery Photos (Choose from PC)
                    </h3>
                  </div>

                  {/* Main Cover Image PC Picker */}
                  <div className="seller-form-group full-width">
                    <label style={{ fontWeight: 600 }}>Main Cover Image (Select file from PC) *</label>
                    
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1.5px dashed #CBD5E1' }}>
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
                      value={whatsExcluded}
                      onChange={(e) => setWhatsExcluded(e.target.value)}
                      onKeyDown={(e) => handleBulletKeyDown(e, setWhatsExcluded, whatsExcluded)}
                      required
                    />
                  </div>

                  {/* Requirement 6: Dynamic Pricing Options with Create New Item Tab & Auto Calculation */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: '18px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#7E22CE', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          5. Dynamic Pricing Options & Discount Calculator
                        </h3>

                        <button
                          type="button"
                          onClick={addPricingItem}
                          style={{
                            background: '#7E22CE',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(126,34,206,0.25)',
                          }}
                        >
                          + Create New Pricing Item / Tier
                        </button>
                      </div>

                      {/* Pricing Items List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dynamicPricingItems.map((item, index) => {
                          const autoFinalPrice = calculateFinalPrice(item);
                          return (
                            <div
                              key={item.id}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #DDD6FE',
                                borderRadius: '14px',
                                padding: '16px',
                                boxShadow: '0 2px 8px rgba(126,34,206,0.05)',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                                <span style={{ background: '#F3E8FF', color: '#6B21A8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                                  Pricing Item #{index + 1}
                                </span>
                                {dynamicPricingItems.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removePricingItem(index)}
                                    style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                                  >
                                    Remove Item ✕
                                  </button>
                                )}
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr', gap: '10px', alignItems: 'end' }}>
                                <div>
                                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                    Package Title *
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Single Person Package"
                                    value={item.title}
                                    onChange={(e) => handlePricingItemChange(index, 'title', e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                                  />
                                </div>

                                <div>
                                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                    Regular Price (৳) *
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="e.g. 24000"
                                    value={item.regularPrice}
                                    onChange={(e) => handlePricingItemChange(index, 'regularPrice', e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                                  />
                                </div>

                                <div>
                                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                    Discount Type *
                                  </label>
                                  <select
                                    value={item.discountType}
                                    onChange={(e) => handlePricingItemChange(index, 'discountType', e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                                  >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="amount">Fixed Amount (৳)</option>
                                  </select>
                                </div>

                                <div>
                                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                    Discount Value ({item.discountType === 'percentage' ? '%' : '৳'}) *
                                  </label>
                                  <input
                                    type="number"
                                    placeholder={item.discountType === 'percentage' ? 'e.g. 10' : 'e.g. 2000'}
                                    value={item.discountValue}
                                    onChange={(e) => handlePricingItemChange(index, 'discountValue', e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                                  />
                                </div>

                                {/* Auto-Calculated Result */}
                                <div>
                                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857', display: 'block', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                                    Final Price
                                  </label>
                                  <div style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '37px' }}>
                                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669', whiteSpace: 'nowrap' }}>
                                      ৳{autoFinalPrice.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Requirement 7: Optional Add-ons with Prices */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '18px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#15803D', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          6. Dynamic Optional Add-on Services (Optional with Price)
                        </h3>

                        <button
                          type="button"
                          onClick={addOptionalAddOn}
                          style={{
                            background: '#16A34A',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
                          }}
                        >
                          + Add Optional Add-on Service
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {optionalAddOns.map((addOn, index) => (
                          <div key={addOn.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', background: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
                            <input
                              type="text"
                              placeholder="Add-on Title (e.g. Private Airport Pickup Shuttle)"
                              value={addOn.title}
                              onChange={(e) => handleAddOnChange(index, 'title', e.target.value)}
                              style={{ flex: 2, minWidth: '200px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                            />
                            <input
                              type="number"
                              placeholder="Add-on Price (৳)"
                              value={addOn.price}
                              onChange={(e) => handleAddOnChange(index, 'price', e.target.value)}
                              style={{ flex: 1, minWidth: '130px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                            />
                            <button
                              type="button"
                              onClick={() => removeAddOn(index)}
                              style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Remove ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 7. POLICIES & TERMS */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      7. Policies, Terms & Travel Tips
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

                  {/* 6. AVAILABILITY SETTINGS (SRS Section 6 - Optional) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      6. Availability Settings (Optional)
                    </h3>
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Booking Deadline Date</label>
                    <input
                      type="date"
                      value={bookingDeadline}
                      onChange={(e) => setBookingDeadline(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Minimum Travelers</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 1"
                      value={minTravelers}
                      onChange={(e) => setMinTravelers(e.target.value)}
                    />
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Maximum Travelers</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 15"
                      value={maxTravelers}
                      onChange={(e) => setMaxTravelers(e.target.value)}
                    />
                  </div>

                  {/* 7. Child, Infant & Group Pricing Breakdown */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '16px', padding: '20px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#166534', margin: '0 0 6px 0' }}>
                        7. Child &amp; Infant Pricing Breakdown
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: '#4B5563', margin: '0 0 16px 0' }}>
                        Configure separate pricing rules, discounts, and policy notes for children and infants.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Child Pricing Discount Type *
                          </label>
                          <select
                            value={childDiscountType}
                            onChange={(e) => setChildDiscountType(e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                          >
                            <option value="percentage">Percentage Discount (% Off Adult Rate)</option>
                            <option value="flat">Fixed Rate (৳ per Child)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            {childDiscountType === 'percentage' ? 'Child Discount Percentage (% Off) *' : 'Child Fixed Price (৳) *'}
                          </label>
                          <input
                            type="number"
                            placeholder={childDiscountType === 'percentage' ? 'e.g. 50' : 'e.g. 5000'}
                            value={childDiscountType === 'percentage' ? childDiscountValue : childPrice}
                            onChange={(e) => {
                              if (childDiscountType === 'percentage') {
                                setChildDiscountValue(e.target.value);
                              } else {
                                setChildPrice(e.target.value);
                              }
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                          />
                          {(() => {
                            const firstAdultFee = parseFloat(dynamicPricingItems[0]?.regularPrice) || 0;
                            const sampleChildFee = childDiscountType === 'percentage'
                              ? Math.round(firstAdultFee * (1 - (parseFloat(childDiscountValue) || 0) / 100))
                              : (parseFloat(childPrice) || 0);
                            return (
                              <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span>💡 Calculated Child Fee:</span>
                                <strong style={{ color: '#047857' }}>৳{sampleChildFee.toLocaleString()}</strong>
                                {firstAdultFee > 0 && <span style={{ color: '#6B7280' }}>(from ৳{firstAdultFee.toLocaleString()} Adult rate)</span>}
                              </div>
                            );
                          })()}
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                            Infant Price (৳) <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>(Under 2 Yrs)</span> *
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 1500"
                            value={infantPrice}
                            onChange={(e) => setInfantPrice(e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Child &amp; Infant Policy Notes
                        </label>
                        <textarea
                          rows="2"
                          placeholder="e.g. 50% Off for Children aged 2-11 years. Infant fee is fixed at ৳1,500 for children under 2 years."
                          value={childPolicyNotes}
                          onChange={(e) => setChildPolicyNotes(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 22. PUBLISH SETTINGS & STATUS (SRS Section 22) */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
                      22. Publish Settings & Status
                    </h3>
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Publish Status *</label>
                    <select value={publishStatus} onChange={(e) => setPublishStatus(e.target.value)} style={{ fontWeight: 700 }}>
                      <option value="Published">Published (Live for Customers)</option>
                      <option value="Draft">Save Draft (Draft Mode)</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="seller-form-group">
                    <label style={{ fontWeight: 600 }}>Featured Package Badge</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '8px', fontSize: '0.88rem', fontWeight: 600, color: '#1E293B' }}>
                      <input
                        type="checkbox"
                        checked={isFeaturedPackage}
                        onChange={(e) => setIsFeaturedPackage(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#2563EB' }}
                      />
                      <span>Mark as Featured Package (Top Banner Highlight)</span>
                    </label>
                  </div>

                  {/* SRS Section 22: Save Draft, Preview & Publish Buttons */}
                  <div className="seller-form-group full-width" style={{ marginTop: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      onClick={() => setPublishStatus('Published')}
                      className="btn-seller-primary"
                      style={{
                        flex: 2,
                        minWidth: '220px',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        boxShadow: '0 6px 16px rgba(37,99,235,0.2)',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {isEditing ? 'Save & Update Package' : 'Publish Complete Tour Package'}
                    </button>

                    <button
                      type="submit"
                      onClick={() => setPublishStatus('Draft')}
                      style={{
                        flex: 1,
                        minWidth: '140px',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: '#334155',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                      }}
                    >
                      Save Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Previewing Package: "${title || 'Untitled Tour'}" (${daysCount} Days / ${nightsCount} Nights)\n\nDestination: ${destinationCity}\nStatus: ${publishStatus}`)}
                      style={{
                        flex: 1,
                        minWidth: '120px',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        border: '1.5px solid #93C5FD',
                        background: '#EFF6FF',
                        color: '#1D4ED8',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                      }}
                    >
                      Preview
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

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { generateTicketPDF } from '../../utils/pdfGenerator';
import { ALL_TOURS, getTourById, resolveId } from '../../../lib/toursData';


export default function TourDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();

  const rawId = params?.id ? String(params.id) : 'paris';
  
  // 1. Initial state always resolves static tour so SSR HTML matches initial Client Hydration HTML 100%
  const staticTour = ALL_TOURS.find((t) => t.id === resolveId(rawId)) || ALL_TOURS[0];
  const [tour, setTour] = useState(staticTour);

  // 2. On client mount, load custom package from LocalStorage
  useEffect(() => {
    const customOrStatic = getTourById(rawId);
    if (customOrStatic) {
      setTour(customOrStatic);
    }
  }, [rawId]);

  const galleryImages = tour.images || [];
  const bedPrices = tour.prices || {};

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('single');
  const [inWishlist, setInWishlist] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  
  // Tour Type State: 'fixed' (Fixed Date Tour) or 'open' (Open Tour)
  const [tourType, setTourType] = useState('fixed');
  const [selectedCustomDate, setSelectedCustomDate] = useState('2026-07-15');
  const [toastMsg, setToastMsg] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShowShareModal(false);
      setToastMsg('🔗 Tour link copied to clipboard!');
      setTimeout(() => setToastMsg(''), 4000);
    }
  };

  // Interactive Reviews State & Submission Handler with LocalStorage Persistence
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Courtney Henry',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      time: '2 mins ago',
      rating: 5,
      text: 'Exceptional trip! Guided tour of Louvre and Eiffel tower exceeded all our family expectations.',
    },
    {
      name: 'Cameron Williamson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      time: '1 hour ago',
      rating: 5,
      text: 'Smooth booking and great hotel quality in Paris. Our tour guide Hasan was super friendly.',
    },
    {
      name: 'Jane Cooper',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      time: '3 hours ago',
      rating: 5,
      text: 'Unforgettable experience. Highly recommend Tour Dibo for authentic international travel packages!',
    },
  ]);

  // Load reviews from localStorage on page load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`tour_dibo_reviews_${tour.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }
  }, [tour.id]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const loggedInName = user?.name || 'Md Monjurul Islam';

    const newEntry = {
      name: loggedInName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      time: 'Just now',
      rating: newReviewRating,
      text: newReviewText.trim(),
    };

    const updated = [newEntry, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem(`tour_dibo_reviews_${tour.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save review to localStorage', e);
    }

    setNewReviewText('');
    setShowReviewForm(false);
    setToastMsg('🎉 Thank you! Your rating and review have been posted successfully.');
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Accordion state matching PDF Page 2
  const [openAccordions, setOpenAccordions] = useState({
    packageDetails: false,
    cancellation: true,
    includedExcluded: false,
    terms: false,
    travelTips: false,
    policy: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const handleBookNow = () => {
    router.push(`/checkout?tourId=${tour.id}&package=${selectedPackage}&count=${ticketCount}`);
  };

  const handleDownloadVoucher = async () => {
    setDownloadingPdf(true);
    await generateTicketPDF({
      title: tour.title,
      amount: formatPrice(bedPrices[selectedPackage] * ticketCount),
      date: tour.dates,
      touristName: user?.name || 'Tourist',
    });
    setDownloadingPdf(false);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Gallery Layout */}
        <div className="detail-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', height: '580px' }}>
          <div className="gallery-main-view" style={{ position: 'relative', height: '580px', borderRadius: '16px', overflow: 'hidden' }}>
            <Image
              src={galleryImages[activeImageIdx] || galleryImages[0] || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80'}
              alt="Tour Gallery Image"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
              suppressHydrationWarning
              style={{ objectFit: 'cover' }}
            />
            <button className="gallery-arrow left-arrow" onClick={() => setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>‹</button>
            <button className="gallery-arrow right-arrow" onClick={() => setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>›</button>
          </div>

          <div className="gallery-thumbs-col" style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'repeat(4, 1fr)', gap: '10px', height: '580px' }}>
            {galleryImages.slice(1, 4).map((imgUrl, i) => (
              <div
                key={i}
                onClick={() => setActiveImageIdx(i + 1)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImageIdx === i + 1 ? '2px solid #2563EB' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Image src={imgUrl || galleryImages[0]} alt={`Thumb ${i + 1}`} fill sizes="280px" suppressHydrationWarning style={{ objectFit: 'cover' }} />
              </div>
            ))}
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: activeImageIdx === 4 ? '2px solid #2563EB' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onClick={() => setActiveImageIdx(Math.min(4, galleryImages.length - 1))}
            >
              <Image src={galleryImages[4] || galleryImages[0]} alt="Thumb 4" fill sizes="280px" suppressHydrationWarning style={{ objectFit: 'cover', opacity: 0.4 }} />
              <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', zIndex: 2 }}>
                {galleryImages.length > 4 ? `+${galleryImages.length - 4}` : 'View'}
              </span>
            </div>
          </div>
        </div>

        {/* Header Summary Section (PDF Page 2 Reference) */}
        <div className="detail-header-card" style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#1E293B', margin: 0, fontFamily: 'sans-serif' }}>
                {tour.titlePrefix}<span style={{ fontStyle: 'italic', fontWeight: '400', color: '#334155' }}>{tour.titleSub}</span>
              </h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
                <span style={{ color: '#FFB800', fontSize: '1rem' }}>★★★★★</span>
                <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>{tour.rating}</strong>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>(Ratings)</span>

                {/* Share & Wishlist Icons Moved Beside Ratings */}
                <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', marginLeft: '6px' }}>
                  {/* Share Arrow Icon with Popover */}
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => setShowShareModal(!showShareModal)}
                      title="Share Tour"
                      style={{
                        background: showShareModal ? '#EFF6FF' : '#F1F5F9',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563EB">
                        <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" />
                      </svg>
                    </button>

                    {/* Daraz-Style Share Modal / Popover */}
                    {showShareModal && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '40px',
                          left: '0',
                          background: '#ffffff',
                          borderRadius: '16px',
                          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.2)',
                          border: '1px solid #E2E8F0',
                          padding: '20px',
                          width: '310px',
                          zIndex: 100,
                        }}
                      >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <strong style={{ fontSize: '0.95rem', color: '#0F172A', fontWeight: '800' }}>Share Package</strong>
                          <button
                            type="button"
                            onClick={() => setShowShareModal(false)}
                            style={{ border: 'none', background: '#F1F5F9', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.85rem', color: '#64748B', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Social Icons Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px', textAlign: 'center' }}>
                          {/* Facebook */}
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowShareModal(false)}
                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                          >
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(24,119,242,0.3)' }}>
                              f
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Facebook</span>
                          </a>

                          {/* WhatsApp */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(tour.titlePrefix + tour.titleSub)}%20${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowShareModal(false)}
                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                          >
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(37,211,102,0.3)' }}>
                              💬
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>WhatsApp</span>
                          </a>

                          {/* Twitter (X) */}
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tour.titlePrefix + tour.titleSub)}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowShareModal(false)}
                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                          >
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '800', boxShadow: '0 4px 10px rgba(15,23,42,0.3)' }}>
                              𝕏
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Twitter</span>
                          </a>

                          {/* Email */}
                          <a
                            href={`mailto:?subject=${encodeURIComponent(tour.titlePrefix + tour.titleSub)}&body=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                            onClick={() => setShowShareModal(false)}
                            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
                          >
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EA4335', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(234,67,53,0.3)' }}>
                              ✉️
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600' }}>Email</span>
                          </a>
                        </div>

                        {/* Copy Link Input Capsule */}
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>Page Link</span>
                          <div style={{ display: 'flex', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', padding: '3px' }}>
                            <input
                              type="text"
                              readOnly
                              value={typeof window !== 'undefined' ? window.location.href : ''}
                              style={{ flex: 1, border: 'none', background: 'transparent', padding: '6px 10px', fontSize: '0.78rem', color: '#475569', outline: 'none' }}
                            />
                            <button
                              type="button"
                              onClick={handleCopyLink}
                              style={{ background: '#2563EB', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={() => setInWishlist(!inWishlist)}
                    title="Save to Wishlist"
                    style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', fontSize: '1rem', color: inWishlist ? '#E11D48' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {inWishlist ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.96rem', color: '#334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600', fontSize: '0.98rem' }}>📍 {tour.fullLocation}</span>

              {tour.transportRoute && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', color: '#B45309', padding: '5px 14px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: '800', border: '1px solid #FDE68A' }}>
                  🚍 Route: {tour.transportRoute}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tour.amenities && tour.amenities.length > 0 ? (
                  tour.amenities.map((item) => (
                    <span
                      key={item.id}
                      title={`${item.name} (${item.included ? 'Included' : 'Excluded'})`}
                      style={{
                        opacity: item.included ? 1 : 0.25,
                        filter: item.included ? 'none' : 'grayscale(100%)',
                        fontSize: '1.2rem',
                      }}
                    >
                      {item.icon}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>✈️ 🏨 🍽️ 🚌 ⛰️</span>
                )}
                <strong style={{ fontSize: '0.8rem', background: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                  (INCLUDED)
                </strong>
              </span>

              {/* Premium Segmented Toggle Switch for Fixed Date vs Open Tour */}
              <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: '4px', borderRadius: '24px', border: '1px solid #CBD5E1', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setTourType('fixed')}
                  style={{
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '20px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: tourType === 'fixed' ? '#2563EB' : 'transparent',
                    color: tourType === 'fixed' ? '#ffffff' : '#475569',
                    boxShadow: tourType === 'fixed' ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
                    transition: 'all 0.2s ease-in-out',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  📅 Fixed Date Tour: {tour.dates}
                </button>
                <button
                  type="button"
                  onClick={() => setTourType('open')}
                  style={{
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '20px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: tourType === 'open' ? '#059669' : 'transparent',
                    color: tourType === 'open' ? '#ffffff' : '#475569',
                    boxShadow: tourType === 'open' ? '0 2px 8px rgba(5,150,105,0.3)' : 'none',
                    transition: 'all 0.2s ease-in-out',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  🔓 Open Tour Option
                </button>
              </div>
            </div>

            {/* Flexible Date Picker Box when Open Tour is active */}
            {tourType === 'open' && (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#065F46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🗓️ Open Tour Mode: Select your desired travel start date:
                </span>
                <input
                  type="date"
                  value={selectedCustomDate}
                  onChange={(e) => setSelectedCustomDate(e.target.value)}
                  style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #10B981', fontSize: '0.9rem', color: '#065F46', fontWeight: 'bold', background: '#ffffff', cursor: 'pointer' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.94rem', fontWeight: '600', color: '#334155' }}>
              <span>🌤️ {tour.badge || `${tour.duration} / 2 Night`}</span>
              <span>👥 {tour.visitedCount} People Visited!</span>
              <span>👤 {tour.interestCount} People Showed Interest!</span>
            </div>
          </div>


        </div>

        {/* Two-Column Main Section Layout */}
        <div className="detail-two-col-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginTop: '24px' }}>
          
          {/* Left Column: Itinerary Card & Accordions Stack */}
          <div className="left-content-column">
            
            {/* 1. Dynamic Day-by-Day Itinerary Box */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
              {tour.dayPlans && tour.dayPlans.length > 0 ? (
                tour.dayPlans.map((dp, idx) => (
                  <div key={idx} style={{ marginBottom: idx === tour.dayPlans.length - 1 ? 0 : '20px' }}>
                    <h4 style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                      Day {dp.day}: {dp.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                      {dp.description || 'Sightseeing, accommodation, meals, and guided activities.'}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>Day 1: Arrival & Welcome</h4>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      Arrival at destination, airport transfer to hotel, check-in and evening local sightseeing walk.
                    </p>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>Day 2: Full Day Sightseeing Tour</h4>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      Guided tour of major landmarks, cultural spots, local cuisine lunch, and boat cruise experience.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>Day 3: Shopping & Departure</h4>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      Morning breakfast at hotel, free time for local souvenir shopping, checkout and departure transfer.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* 2. Package Details Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
              <div onClick={() => toggleAccordion('packageDetails')} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span>Package Details</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.packageDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.packageDetails && (
                <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', color: '#475569', whiteSpace: 'pre-line' }}>
                  {tour.desc || tour.packageDetails || 'Includes 4-star hotel stay, daily breakfast, museum passes, and airport shuttle service.'}
                </div>
              )}
            </div>

            {/* 3. Cancellation Policy Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
              <div onClick={() => toggleAccordion('cancellation')} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span>Cancellation Policy</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.cancellation ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.cancellation && (
                <div style={{ padding: '0 20px 20px', fontSize: '0.84rem', color: '#64748B', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {tour.cancellationPolicy || (
                    <>
                      <p style={{ margin: '0 0 10px 0' }}>
                        Your confirmation of the Holiday will ensure that you have read the Cancellation Policy thoroughly and accepted it.
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
                        <li>15 days prior to the travel date - 50% of total holiday cost.</li>
                        <li>10 days prior to the travel date - 75% of total holiday cost.</li>
                        <li>03 days prior to the travel date - 100% of holiday cost will be non-refundable.</li>
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 4. Included & Excluded Tour Services Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden', padding: '6px' }}>
              <div onClick={() => toggleAccordion('includedExcluded')} style={{ background: '#EFF6FF', borderRadius: '10px', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.94rem' }}>🎒 Included &amp; Excluded Tour Services</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.includedExcluded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.includedExcluded && (
                <div style={{ padding: '12px 6px 6px', fontSize: '0.84rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  {/* Left Box: Included */}
                  <div style={{ background: '#F0FDF4', padding: '12px 16px', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                    <h5 style={{ color: '#15803D', fontWeight: '700', margin: '0 0 6px 0', fontSize: '0.86rem' }}>✓ What's Included:</h5>
                    <div style={{ margin: 0, color: '#166534', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                      {tour.whatsIncluded || (
                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                          <li>All airport transfers &amp; comfortable AC vehicle transportation.</li>
                          <li>Deluxe hotel accommodation with daily breakfast.</li>
                          <li>All sight-seeing entry tickets &amp; guided tours.</li>
                          <li>English speaking professional local tour guide.</li>
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Right Box: Excluded */}
                  <div style={{ background: '#FEF2F2', padding: '12px 16px', borderRadius: '10px', border: '1px solid #FECACA' }}>
                    <h5 style={{ color: '#B91C1C', fontWeight: '700', margin: '0 0 6px 0', fontSize: '0.86rem' }}>✕ What's Excluded:</h5>
                    <div style={{ margin: 0, color: '#991B1B', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                      {tour.whatsExcluded || (
                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                          <li>International airfare tickets &amp; airport tax.</li>
                          <li>Personal expenses, laundry, minibar, and telephone calls.</li>
                          <li>Visa processing &amp; embassy application fees.</li>
                          <li>Driver &amp; tour guide personal tipping gratuities.</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Terms & Conditions Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
              <div onClick={() => toggleAccordion('terms')} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span>Terms & Conditions</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.terms ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.terms && (
                <div style={{ padding: '0 20px 20px', fontSize: '0.84rem', color: '#64748B', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {tour.termsConditions || "1. All travelers must hold a valid passport.\n2. Schedules are subject to weather conditions.\n3. Third-party flight delays are not liable."}
                </div>
              )}
            </div>

            {/* 6. Travel Tips Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
              <div onClick={() => toggleAccordion('travelTips')} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span>Travel Tips</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.travelTips ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.travelTips && (
                <div style={{ padding: '0 20px 20px', fontSize: '0.84rem', color: '#64748B', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {tour.travelTips || "Wear comfortable walking shoes. Keep local currency cash for small street cafes. Keep digital copies of visa documents on your phone."}
                </div>
              )}
            </div>

            {/* 7. Policy Accordion */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
              <div onClick={() => toggleAccordion('policy')} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}>
                <span>Policy</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.policy ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.policy && (
                <div style={{ padding: '0 20px 20px', fontSize: '0.84rem', color: '#64748B', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {tour.hotelPolicy || "Standard Hotel Check-In: 02:00 PM | Check-Out: 11:00 AM. Child policy: Children under 5 stay free sharing existing bedding."}
                </div>
              )}
            </div>

            {/* 8. Travellers Review Section */}
            <div style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  Travellers Review
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  style={{
                    background: showReviewForm ? '#F1F5F9' : '#2563EB',
                    color: showReviewForm ? '#475569' : '#ffffff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: showReviewForm ? 'none' : '0 2px 8px rgba(37,99,235,0.25)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {showReviewForm ? '✕ Close Form' : '✍️ Write a Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  style={{
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '14px',
                    padding: '20px',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Share Your Travel Experience & Rating
                  </h4>

                  {/* Interactive Star Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                      Select Your Rating:
                    </label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.6rem',
                            cursor: 'pointer',
                            color: (hoverRating || newReviewRating) >= star ? '#FFB800' : '#CBD5E1',
                            padding: '2px',
                            transition: 'color 0.15s ease',
                          }}
                        >
                          ★
                        </button>
                      ))}
                      <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', marginLeft: '8px' }}>
                        {hoverRating || newReviewRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* User Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.88rem' }}>
                      {(user?.name || 'Md Monjurul Islam')[0]}
                    </div>
                    <strong style={{ fontSize: '0.92rem', color: '#0F172A' }}>
                      {user?.name || 'Md Monjurul Islam'}
                    </strong>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                      Your Feedback / Review:
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write details about your experience, guide service, hotel, or travel tips..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        background: '#ffffff',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#ffffff',
                        color: '#475569',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '8px 22px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#2563EB',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
                      }}
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Rating Overview Summary Box (PDF Page 2 Reference) */}
              <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ textAlign: 'center', borderRight: '1px solid #E2E8F0', paddingRight: '16px' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', lineHeight: 1 }}>
                    {(reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)}
                  </div>
                  <div style={{ color: '#FFB800', fontSize: '1rem', margin: '6px 0 2px 0' }}>★★★★★</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>({reviewsList.length + 49} Ratings)</div>
                  <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 'bold', marginTop: '4px' }}>Exceeded Expectations</div>
                </div>

                {/* Rating Distribution Progress Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { stars: '5.0', pct: '85%' },
                    { stars: '4.0', pct: '70%' },
                    { stars: '3.0', pct: '45%' },
                    { stars: '2.0', pct: '60%' },
                    { stars: '1.0', pct: '10%' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#475569' }}>
                      <span style={{ width: '24px', fontWeight: '600' }}>{row.stars}</span>
                      <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: row.pct, height: '100%', background: '#2563EB', borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviewsList.map((rev, idx) => (
                  <div key={idx} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                          <Image src={rev.avatar} alt={rev.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: '#0F172A', display: 'block' }}>{rev.name}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748B' }}>
                            <span style={{ color: '#FFB800' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                            <span>• {rev.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (PDF Page 2 Reference) */}
          <div className="right-sidebar-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Block 1: Planner / Shop Card */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#2563EB' }}>
                  D
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>DeshIT-BD</strong>
                  <Link href="/account/messages" style={{ fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    💬 Chat Available
                  </Link>
                </div>
              </div>
              <Link href="/planner/deshit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
                View Shop
              </Link>
            </div>

            {/* Top Block 2: Booking Card */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', textTransform: 'capitalize' }}>
                  {selectedPackage === 'couple' ? 'Couple' : 'Single'} {(() => {
                    const priceVal = bedPrices[selectedPackage] || (selectedPackage === 'couple' ? 18000 : 10000);
                    return typeof priceVal === 'number' ? `৳${priceVal.toLocaleString()}` : priceVal;
                  })()}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '700', textDecoration: 'line-through', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  {(() => {
                    const priceVal = bedPrices[selectedPackage] || (selectedPackage === 'couple' ? 18000 : 10000);
                    const origVal = bedPrices[`${selectedPackage}Original`];
                    if (origVal && origVal > priceVal && origVal < priceVal * 10) {
                      return `৳${origVal.toLocaleString()}`;
                    }
                    const rawTag = tour.discountTag || tour.discount?.tag || '20% OFF';
                    let pct = parseInt(rawTag.replace(/[^0-9]/g, '')) || 20;
                    if (pct >= 100 || pct <= 0) pct = 20;
                    
                    const calcOrig = Math.round(priceVal / (1 - pct / 100));
                    return `৳${calcOrig.toLocaleString()}`;
                  })()}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {[
                  { id: 'single', label: 'Single', price: bedPrices?.single || 10000 },
                  { id: 'couple', label: 'Couple', price: bedPrices?.couple || (bedPrices?.single ? Math.round(bedPrices.single * 1.8) : 18000) },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedPackage(opt.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: selectedPackage === opt.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                      background: selectedPackage === opt.id ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}
                  >
                    <span>{opt.label}</span>
                    <span>{typeof opt.price === 'number' ? `৳${opt.price.toLocaleString()}` : opt.price}</span>
                  </div>
                ))}
              </div>

              {/* Pass Counter & Book Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Passes:</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>-</button>
                  <span style={{ fontWeight: 'bold' }}>{ticketCount}</span>
                  <button onClick={() => setTicketCount(ticketCount + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>+</button>
                </div>
              </div>

              <button onClick={handleBookNow} style={{ background: '#1E293B', color: '#fff', border: 'none', width: '100%', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.92rem' }}>
                Book Now
              </button>
              <p style={{ fontSize: '0.72rem', color: '#64748B', textAlign: 'center', lineHeight: '1.4', margin: '10px 0 0 0' }}>
                Upon clicking 'Book Now', I confirm I have read and acknowledged <Link href="/help" style={{ color: '#2563EB', textDecoration: 'underline' }}>all terms and policies</Link>.
              </p>
            </div>

            {/* Top Block 3: Coupon Voucher Banner */}
            <div style={{ background: '#EFF6FF', border: '1px dashed #3B82F6', borderRadius: '16px', padding: '16px', color: '#1E40AF' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                {(() => {
                  const rawTag = tour.discountTag || tour.discount?.tag || '20% OFF';
                  let pct = parseInt(rawTag.replace(/[^0-9]/g, '')) || 20;
                  if (pct >= 100 || pct <= 0) pct = 20;
                  
                  const priceVal = bedPrices?.single || 10000;
                  const calcAmt = Math.round(priceVal * (pct / 100));
                  return `৳${calcAmt.toLocaleString()} OFF (${pct}%)`;
                })()}
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                Minimum Spend: {(() => {
                  const priceVal = bedPrices?.single || 10000;
                  return `৳${priceVal.toLocaleString()}`;
                })()}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '2px' }}>
                {tour.discount?.expiry && tour.discount.expiry !== '31 Dec 2026' ? `Valid till ${tour.discount.expiry}` : 'Valid till Offer Expiration'}
              </div>
            </div>

            {/* Bottom Block 4: Others Also Showed Interest Cards Stack (PDF Page 2 Reference) */}
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', marginBottom: '12px' }}>
                Others Also Showed Interest
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { title: 'Tenting at Cox\'s Bazar', price: 21600, old: 27600, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
                  { title: 'Parasailing Adventure!', price: 18500, old: 24000, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
                  { title: 'Sylhet Tea Garden Escapade', price: 15000, old: 19500, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80' },
                ].map((item, idx) => (
                  <Link href="/tours/paris" key={idx} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none' }}>
                    <div style={{ height: '110px', position: 'relative' }}>
                      <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '10px' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block' }}>{item.title}</strong>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#2563EB' }}>{formatPrice(item.price)}</span>
                        <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#94A3B8' }}>{formatPrice(item.old)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '80px', right: '24px', background: '#0F172A', color: '#ffffff', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontSize: '0.88rem', fontWeight: '600', zIndex: 999 }}>
          {toastMsg}
        </div>
      )}

      <Footer />
    </div>
  );
}

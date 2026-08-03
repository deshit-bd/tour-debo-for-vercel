'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const GUIDE_DETAILS = {
  dhaka: {
    title: 'Explore Dhaka',
    location: 'Dhaka, Bangladesh',
    rating: '4.7',
    guideName: 'Kaalam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    ],
    coveredSpots: 'Old Dhaka, Ahsan Manzil, Lalbagh Fort & Buriganga River',
    description: 'Explore Old Dhaka heritage lanes, Ahsan Manzil, Buriganga river life, and iconic local food stops with a verified city guide.',
    service: 'Private city tour, historical landmark walk, street food curation, riverfront guidance and personal photography support.',
  },
  sajek: {
    title: 'Sajek Mountain Trek',
    location: 'Sajek Valley, Bangladesh',
    rating: '4.9',
    guideName: 'Robin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80',
    ],
    coveredSpots: 'Konglak Peak, Helipad Viewpoint, Ruilui Para & Hazachora Waterfalls',
    description: 'Cloud viewpoints, hill trails, Konglak Peak, local villages and regional food experiences guided by a mountain route specialist.',
    service: 'Trek planning, viewpoint timing, local transport coordination, food stops, photo points and safety support.',
  },
  sylhet: {
    title: 'Sylhet Tea Estate Escapade',
    location: 'Sylhet, Bangladesh',
    rating: '4.6',
    guideName: 'Hasan',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80',
    ],
    coveredSpots: 'Ratargul Swamp Forest, Jaflong Zero Point, Sreemangal Tea Garden & Bholaganj White Stones',
    description: 'Explore Ratargul Swamp Forest boat cruises, Jaflong stone collection points, and Sreemangal tea garden photography with a native Sylheti guide.',
    service: 'Swamp forest boat hire, tea estate walks, seven-layer tea tasting, Jaflong river trip, and photography assistance.',
  },
  'cox-bazar': {
    title: "Cox's Bazar Beach Guide",
    location: "Cox's Bazar, Bangladesh",
    rating: '4.8',
    guideName: 'Tanvir',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
    ],
    coveredSpots: 'Inani Coral Beach, Himchari Waterfall, Marine Drive & Sunset Point',
    description: 'Certified marine beach camping, parasailing assistance, Inani Beach coral walkthrough, and sunset point curation by a local sea-guide.',
    service: 'Marine Drive tour, parasailing booking, seafood dining spot guide, sunset photography and beach camp setup.',
  },
};

export default function GuideDetailPage({ params }) {
  const router = useRouter();
  const routeParams = useParams();
  const rawId = routeParams?.id || params?.id || 'dhaka';
  const guideId = String(rawId).toLowerCase();

  const guide = GUIDE_DETAILS[guideId] || GUIDE_DETAILS[guideId.replace('-', '')] || {
    title: `Explore ${guideId.charAt(0).toUpperCase() + guideId.slice(1)}`,
    location: `${guideId.charAt(0).toUpperCase() + guideId.slice(1)}, Bangladesh`,
    rating: '4.8',
    guideName: 'Local Expert',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    thumbs: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    ],
    description: `Custom private sightseeing, local food walk, and heritage spot tour in ${guideId.charAt(0).toUpperCase() + guideId.slice(1)} with a verified tour guide.`,
    service: 'Private transport coordination, landmark entrance guidance, local food recommendation and photo support.',
  };

  const [selectedTier, setSelectedTier] = useState(2); // 1 | 2 | 3
  const [passCount, setPassCount] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    serviceDetails: false,
    cancellation: true,
  });

  const tierOptions = [
    { tier: 1, name: 'Single', label: '1 Person Tour Rate', rate: 1500, originalPrice: 1800 },
    { tier: 2, name: 'Couple', label: '2 Persons Variety', rate: 2500, originalPrice: 3000 },
    { tier: 3, name: 'Group', label: '3 Persons Variety', rate: 3200, originalPrice: 4000 },
  ];

  const selectedOption = tierOptions.find((o) => o.tier === selectedTier) || tierOptions[1];
  const totalPrice = selectedOption.rate * passCount;
  const totalOriginalPrice = selectedOption.originalPrice * passCount;

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Mahmudur Rahman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      date: '3 days ago',
      rating: 5,
      comment: `Hasan is an amazing local guide! He showed us hidden photo spots in Sreemangal tea estate that normal tourists never get to see.`,
    },
    {
      name: 'Anika Bushra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      date: '1 week ago',
      rating: 5,
      comment: `Very punctual and polite guide. Handled boat booking at Ratargul smoothly without any hassle. Highly recommended!`,
    },
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const createdReview = {
      name: 'Sanjid Ibrahim',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      date: 'Just now',
      rating: newRating,
      comment: newComment.trim(),
    };
    setReviewsList([createdReview, ...reviewsList]);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2000);
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookGuide = () => {
    // Navigate directly to Checkout / Booking Confirmation Page
    router.push(`/checkout?type=guide&guide=${encodeURIComponent(guide.guideName)}&title=${encodeURIComponent(guide.title)}&variety=${encodeURIComponent(selectedOption.name)}&passes=${passCount}&price=${totalPrice}`);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="detail-gallery-grid">
          <div className="gallery-main-view" style={{ position: 'relative' }}>
            <Image
              src={guide.hero}
              alt={guide.title}
              fill
              sizes="(max-width: 768px) 100vw, 78vw"
              className="detail-main-img"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="gallery-thumbs-col">
            {guide.thumbs.map((thumb, idx) => (
              <div key={idx} className="thumb-item" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <Image src={thumb} alt="Guide photo" fill sizes="200px" priority={idx === 0} style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Guide Header Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#fff', padding: '14px 18px', borderRadius: '14px', border: '1px solid #E5E7EB', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '2px solid #E2E8F0', background: '#F1F5F9' }}>
              <Image src={guide.avatar} alt={guide.guideName} fill style={{ objectFit: 'cover' }} />
            </div>

            {/* Details Column */}
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: 0, lineHeight: '1.2' }}>{guide.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 9px', borderRadius: '14px', fontSize: '0.74rem', fontWeight: '700', border: '1px solid #BBF7D0' }}>✓ NID & Bill Copy Verified</span>
                  <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '3px 9px', borderRadius: '14px', fontSize: '0.74rem', fontWeight: '700', border: '1px solid #BFDBFE' }}>✓ Selfie Verified Guide</span>
                  <div style={{ color: '#D97706', fontWeight: '700', fontSize: '0.84rem', background: '#FFFBEB', padding: '3px 10px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                    ★ {guide.rating} Rating
                  </div>
                </div>
              </div>

              <p style={{ color: '#4B5563', margin: '4px 0 6px 0', fontSize: '0.86rem' }}>
                Guide Name: <strong style={{ color: '#0F172A' }}>{guide.guideName}</strong> • {guide.location}
              </p>

              {/* Feature Pill Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '3px' }}>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '600', color: '#334155' }}>
                  Location: {guide.location}
                </span>
                <span style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '700', color: '#1D4ED8' }}>
                  📍 Covered Spots: {guide.coveredSpots || 'Ratargul Swamp, Jaflong, Sreemangal & Bholaganj'}
                </span>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '600', color: '#334155' }}>
                  Flights, hotel, meals and transport included
                </span>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '600', color: '#334155' }}>
                  3 Days / 2 Nights
                </span>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '600', color: '#334155' }}>
                  144 people showed interest
                </span>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '3px 10px', fontSize: '0.74rem', fontWeight: '600', color: '#334155' }}>
                  144 people visited
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '10px', marginTop: '6px' }}>
          <div className="left-content-column" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            
            {/* Guide Performance Quick Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>COMPLETED TOURS</span>
                <strong style={{ fontSize: '0.96rem', color: '#2563EB', fontWeight: '800' }}>112+ Tours</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>RESPONSE TIME</span>
                <strong style={{ fontSize: '0.96rem', color: '#059669', fontWeight: '800' }}>&lt; 1 Hour</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>EXPERIENCE</span>
                <strong style={{ fontSize: '0.96rem', color: '#7C3AED', fontWeight: '800' }}>5+ Years</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>SATISFACTION</span>
                <strong style={{ fontSize: '0.96rem', color: '#D97706', fontWeight: '800' }}>99% Rating</strong>
              </div>
            </div>

            {/* 1. Itinerary Accordion */}
            <div className="accordion-card" style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', border: '1px solid #E5E7EB' }}>
              <div className="accordion-header" onClick={() => toggleAccordion('itinerary')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.94rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>📋 Detailed Itinerary & Guide Overview</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.itinerary ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.itinerary && (
                <div className="accordion-body" style={{ marginTop: '6px', fontSize: '0.84rem', color: '#374151', lineHeight: '1.45' }}>
                  <p style={{ margin: 0 }}>{guide.description}</p>
                </div>
              )}
            </div>

            {/* 2. Included & Excluded Services Accordion */}
            <div className="accordion-card" style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', border: '1px solid #E5E7EB' }}>
              <div className="accordion-header" onClick={() => toggleAccordion('serviceDetails')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.94rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>🎒 Included & Excluded Guide Services</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.serviceDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.serviceDetails && (
                <div className="accordion-body" style={{ marginTop: '8px', fontSize: '0.82rem', color: '#374151', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#ECFDF5', padding: '8px 10px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                    <h5 style={{ color: '#065F46', fontWeight: '800', margin: '0 0 4px 0', fontSize: '0.82rem' }}>✓ What's Included:</h5>
                    <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px', color: '#047857' }}>
                      <li>Personalized Local Route Guidance</li>
                      <li>Ratargul Swamp Boat & Ticket Hire Support</li>
                      <li>Sreemangal Tea Estate Photo Spots</li>
                      <li>Seven-Layer Tea Tasting Curation</li>
                    </ul>
                  </div>

                  <div style={{ background: '#FEF2F2', padding: '8px 10px', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                    <h5 style={{ color: '#991B1B', fontWeight: '800', margin: '0 0 4px 0', fontSize: '0.82rem' }}>✕ What's Excluded:</h5>
                    <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px', color: '#B91C1C' }}>
                      <li>Personal Souvenir Shopping</li>
                      <li>Hotel & Resort Night Stay Cost</li>
                      <li>Long Distance Air or Bus Tickets</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Cancellation Policy & Safety Guarantee Accordion */}
            <div className="accordion-card" style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', border: '1px solid #E5E7EB' }}>
              <div className="accordion-header" onClick={() => toggleAccordion('cancellation')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.94rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>🛡️ Safety Guarantee & Cancellation Policy</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.cancellation ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.cancellation && (
                <div className="accordion-body" style={{ marginTop: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                  <p style={{ margin: '0 0 4px 0' }}>• <strong>Free Cancellation:</strong> Cancel up to 24 hours prior to tour start for a 100% full refund to your Tour Dibo wallet.</p>
                  <p style={{ margin: 0 }}>• <strong>Verified Guide Guarantee:</strong> Guide NID, Utility Bill, and Live Selfie are 100% verified by Tour Dibo Trust & Safety team.</p>
                </div>
              )}
            </div>

                 {/* 4. Verified Tourist Reviews Section */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    ⭐ Tourist Reviews ({guide.guideName})
                  </h3>
                  <span style={{ color: '#D97706', fontWeight: '800', fontSize: '0.85rem' }}>
                    ★ {guide.rating} ({reviewsList.length + 26} Verified Reviews)
                  </span>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  style={{
                    background: showReviewForm ? '#F1F5F9' : '#2563EB',
                    color: showReviewForm ? '#475569' : '#ffffff',
                    border: showReviewForm ? '1px solid #CBD5E1' : 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {showReviewForm ? '✕ Close' : '✏️ Write Review'}
                </button>
              </div>

              {/* Write Review Form Card (Shown on click) */}
              {showReviewForm && (
                <div style={{ background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '12px 14px', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0' }}>
                    ✏️ Leave a Review & Rating for {guide.guideName}
                  </h4>

                {reviewSubmitted && (
                  <div style={{ background: '#DCFCE7', color: '#15803D', padding: '8px 12px', borderRadius: '6px', fontSize: '0.84rem', fontWeight: '700', marginBottom: '8px' }}>
                    ✓ Thank you! Your review and rating have been submitted successfully.
                  </div>
                )}

                <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Reviewing As User Badge */}
                  <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Posting as:</span>
                    <strong style={{ color: '#0F172A', background: '#E2E8F0', padding: '2px 8px', borderRadius: '5px', fontSize: '0.85rem' }}>
                      👤 Sanjid Ibrahim
                    </strong>
                  </div>

                  {/* Rating selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>Your Rating:</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.15rem',
                            color: star <= newRating ? '#F59E0B' : '#CBD5E1',
                            padding: '0 1px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#F59E0B' }}>{newRating} / 5 Stars</span>
                  </div>

                  {/* Comment text area */}
                  <textarea
                    rows={2}
                    placeholder={`Share your tour experience with ${guide.guideName}...`}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.84rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                    required
                  />

                  {/* Submit Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      style={{
                        background: '#2563EB',
                        color: '#fff',
                        border: 'none',
                        padding: '7px 18px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(37,99,235,0.15)',
                      }}
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
              )}

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reviewsList.map((rev, rIdx) => (
                  <div key={rIdx} style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden' }}>
                          <Image src={rev.avatar} alt={rev.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>{rev.name}</strong>
                          <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{rev.date}</span>
                        </div>
                      </div>
                      <span style={{ color: '#D97706', fontSize: '0.82rem', fontWeight: '700' }}>{'★'.repeat(rev.rating)}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#475569', margin: '2px 0 0 0', lineHeight: '1.4' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Group Variety Pricing Sidebar */}
          <div className="right-sidebar-column" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Compact SRS 5-Box Parameter Language Proficiency Box */}
            <div style={{ background: '#FFFDF5', border: '1px solid #FDE68A', borderRadius: '12px', padding: '10px 12px' }}>
              <h5 style={{ fontSize: '0.72rem', fontWeight: '800', color: '#92400E', margin: '0 0 6px 0', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🌐 LANGUAGE PROFICIENCY (5 BOX PARAMETER)
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '700', color: '#451A03', marginBottom: '2px' }}>
                    <span>HINDI</span>
                    <span style={{ color: '#65A30D' }}>3 / 5</span>
                  </div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1, 2, 3].map((i) => <div key={i} style={{ flex: 1, height: '6px', background: '#65A30D', borderRadius: '2px' }} />)}
                    {[4, 5].map((i) => <div key={i} style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '2px' }} />)}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '700', color: '#451A03', marginBottom: '2px' }}>
                    <span>BENGALI</span>
                    <span style={{ color: '#65A30D' }}>5 / 5</span>
                  </div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: '6px', background: '#65A30D', borderRadius: '2px' }} />)}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '700', color: '#451A03', marginBottom: '2px' }}>
                    <span>ENGLISH</span>
                    <span style={{ color: '#65A30D' }}>4 / 5</span>
                  </div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, height: '6px', background: '#65A30D', borderRadius: '2px' }} />)}
                    {[5].map((i) => <div key={i} style={{ flex: 1, height: '6px', background: '#E5E7EB', borderRadius: '2px' }} />)}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              {/* Top Title & Calculated Price Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
                  {selectedOption.name} <span style={{ color: '#0F172A', fontWeight: '900' }}>৳{totalPrice.toLocaleString()}</span>
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ৳{totalOriginalPrice.toLocaleString()}
                </span>
              </div>

              {/* Variety Selection List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                {tierOptions.map((option) => {
                  const isSelected = selectedTier === option.tier;
                  return (
                    <div
                      key={option.tier}
                      onClick={() => setSelectedTier(option.tier)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        background: isSelected ? '#EFF6FF' : '#ffffff',
                        border: `1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontWeight: isSelected ? '700' : '600', color: isSelected ? '#1E40AF' : '#334155', fontSize: '0.85rem' }}>
                        {option.name} ({option.label})
                      </span>
                      <strong style={{ color: isSelected ? '#2563EB' : '#0F172A', fontSize: '0.88rem' }}>
                        ৳{option.rate.toLocaleString()}
                      </strong>
                    </div>
                  );
                })}
              </div>

              {/* Passes Quantity Counter Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: '800' }}>Passes:</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPassCount((prev) => Math.max(1, prev - 1))}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      background: '#fff',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', minWidth: '18px', textAlign: 'center' }}>
                    {passCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassCount((prev) => prev + 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      background: '#fff',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Book Guide Button */}
              <button
                onClick={handleBookGuide}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#2563EB',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(37,99,235,0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                Book Guide
              </button>
            </div>
          </div>
        </div>

        {/* Multiple Tour Programs Offered by This Guide */}
        <div style={{ marginTop: '20px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                🎒 Tour Programs Offered by Guide {guide.guideName}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                Explore all verified tour packages hosted and guided by {guide.guideName}.
              </p>
            </div>
            <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' }}>
              3 Active Programs
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                id: 'sylhet-1',
                title: guide.title,
                location: guide.location,
                rating: guide.rating,
                price: '৳1,500 / Person',
                duration: '3 Days / 2 Nights',
                image: guide.hero,
              },
              {
                id: 'sylhet-2',
                title: `${guide.guideName}'s Ratargul Swamp Forest Boat Cruise`,
                location: guide.location,
                rating: '4.8',
                price: '৳1,800 / Person',
                duration: '1 Day Trip',
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
              },
              {
                id: 'sylhet-3',
                title: `${guide.guideName}'s Jaflong Crystal River & Tea Garden Trek`,
                location: guide.location,
                rating: '4.9',
                price: '৳2,200 / Person',
                duration: '2 Days / 1 Night',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
              },
            ].map((program, pIdx) => (
              <div key={pIdx} style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '160px', width: '100%' }}>
                  <Image src={program.image} alt={program.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', margin: 0, lineHeight: '1.3' }}>{program.title}</h4>
                      <span style={{ background: '#FFFBEB', color: '#D97706', padding: '2px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800', border: '1px solid #FDE68A', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        ★ {program.rating}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>📍 {program.location} • 🌤️ {program.duration}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#2563EB' }}>{program.price}</strong>
                    <Link href={`/tours/${guideId}`} style={{ background: '#2563EB', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

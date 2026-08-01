'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    description: 'Cloud viewpoints, hill trails, Konglak Peak, local villages and regional food experiences guided by a mountain route specialist.',
    service: 'Trek planning, viewpoint timing, local transport coordination, food stops, photo points and safety support.',
  },
};

export default function GuideDetailPage({ params }) {
  const guide = GUIDE_DETAILS[params?.id] || GUIDE_DETAILS.dhaka;
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    serviceDetails: false,
    cancellation: true,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
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
                <Image src={thumb} alt="Guide photo" fill sizes="200px" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Guide Header Info */}
        <div className="guide-profile-header-card" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src={guide.avatar} alt={guide.guideName} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>{guide.title}</h1>
              <p style={{ color: '#4B5563', margin: '4px 0' }}>Guide Name: <strong>{guide.guideName}</strong> • {guide.location}</p>
              <div style={{ color: '#FFB800', fontWeight: 'bold' }}>★ {guide.rating} Rating</div>
            </div>
          </div>

          {/* Verification Badges */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ NID & Bill Copy Verified</span>
            <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ Selfie Verified Guide</span>
          </div>

          {/* SRS 5-Box Parameter Language Proficiency Section */}
          <div style={{ marginTop: '20px', background: '#FFFDF5', border: '1px solid #FDE68A', borderRadius: '14px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#92400E', marginBottom: '12px' }}>
              🌐 LANGUAGE PROFICIENCY (5 BOX PARAMETER)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  <span>HINDI</span>
                  <span style={{ color: '#65A30D' }}>3 / 5</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3].map((i) => <div key={i} style={{ flex: 1, height: '12px', background: '#65A30D', borderRadius: '3px' }} />)}
                  {[4, 5].map((i) => <div key={i} style={{ flex: 1, height: '12px', background: '#E5E7EB', borderRadius: '3px' }} />)}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  <span>BENGALI</span>
                  <span style={{ color: '#65A30D' }}>5 / 5</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: '12px', background: '#65A30D', borderRadius: '3px' }} />)}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  <span>ENGLISH</span>
                  <span style={{ color: '#65A30D' }}>4 / 5</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, height: '12px', background: '#65A30D', borderRadius: '3px' }} />)}
                  {[5].map((i) => <div key={i} style={{ flex: 1, height: '12px', background: '#E5E7EB', borderRadius: '3px' }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', marginTop: '24px' }}>
          <div className="left-content-column">
            <div className="accordion-card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <div className="accordion-header" onClick={() => toggleAccordion('itinerary')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Itinerary</h3>
                <span>{openAccordions.itinerary ? '▲' : '▼'}</span>
              </div>
              {openAccordions.itinerary && (
                <div className="accordion-body" style={{ marginTop: '12px', fontSize: '0.9rem', color: '#374151' }}>
                  <p>{guide.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="right-sidebar-column">
            <div style={{ background: '#fff', border: '2px solid #2563EB', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px' }}>Group Variety Pricing</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#F9FAFB', borderRadius: '8px' }}>
                  <span>1 Person Tour Rate:</span>
                  <strong>৳1,500 / Day</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#EFF6FF', borderRadius: '8px' }}>
                  <span>2 Persons Variety:</span>
                  <strong style={{ color: '#2563EB' }}>৳2,500 / Day</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#F9FAFB', borderRadius: '8px' }}>
                  <span>3 Persons Variety:</span>
                  <strong>৳3,200 / Day</strong>
                </div>
              </div>

              <Link href="/account/messages" style={{ display: 'block', background: '#2563EB', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '10px', fontWeight: 'bold', marginTop: '16px', textDecoration: 'none' }}>
                💬 Chat & Book Guide
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

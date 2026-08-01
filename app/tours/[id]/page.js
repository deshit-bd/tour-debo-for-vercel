'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';
import { generateTicketPDF } from '../../utils/pdfGenerator';

const galleryImages = [
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
];

export default function TourDetailPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('double'); // 'single', 'double', 'twin', 'extra'
  const [inWishlist, setInWishlist] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(true);

  // Accordion open/close state
  const [openAccordions, setOpenAccordions] = useState({
    itinerary: true,
    packageDetails: true,
    cancellation: false,
    questions: true,
  });

  const [reviewsList] = useState([
    {
      name: 'Courtney Henry',
      avatar: 'CH',
      rating: 5,
      time: '2 mins ago',
      text: 'An unforgettable experience! The Eiffel Tower guided tour and Seine river cruise exceeded all expectations.',
    },
    {
      name: 'Cameron Williamson',
      avatar: 'CW',
      rating: 5,
      time: '1 hour ago',
      text: 'Super smooth booking, fantastic 4-star hotel stay in Paris, and our local tour guide was super knowledgeable.',
    },
  ]);

  const bedPrices = {
    single: 120,
    double: 200,
    twin: 180,
    extra: 40,
  };

  const currentPricePerUnit = bedPrices[selectedPackage] || 200;
  const insuranceFee = includeInsurance ? 15 : 0;
  const totalPrice = (currentPricePerUnit + insuranceFee) * ticketCount;

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookNow = () => {
    router.push(`/checkout?package=${selectedPackage}&count=${ticketCount}`);
  };

  const handleDownloadVoucher = async () => {
    setDownloadingPdf(true);
    await generateTicketPDF({
      title: 'Paris : City of Love Tour',
      amount: formatPrice(totalPrice),
      date: '27 - 29 June, 2026',
      touristName: 'Hi, Tourist',
    });
    setDownloadingPdf(false);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Gallery Layout */}
        <div className="detail-gallery-grid">
          <div className="gallery-main-view" style={{ position: 'relative' }}>
            <Image
              src={galleryImages[activeImageIdx]}
              alt="Paris Experience"
              fill
              sizes="(max-width: 768px) 100vw, 78vw"
              className="detail-main-img"
              priority
              style={{ objectFit: 'cover', borderRadius: '20px' }}
            />
            <button className="gallery-arrow left-arrow" onClick={() => setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}>‹</button>
            <button className="gallery-arrow right-arrow" onClick={() => setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}>›</button>
          </div>

          <div className="gallery-thumbs-col">
            {galleryImages.slice(1, 5).map((imgUrl, i) => (
              <div key={i} className={`thumb-item ${activeImageIdx === i + 1 ? 'active-thumb' : ''}`} onClick={() => setActiveImageIdx(i + 1)} style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}>
                <Image src={imgUrl} alt={`Thumbnail ${i + 1}`} fill sizes="200px" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Header Card */}
        <div className="detail-header-card" style={{ marginTop: '24px' }}>
          <div className="detail-title-row">
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Paris : City of Love & Lights</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span style={{ color: '#FFB800', fontSize: '1.2rem' }}>★★★★★</span>
                <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>4.8</span>
                <small style={{ color: '#6B7280' }}>(52 Verified Ratings)</small>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button onClick={handleDownloadVoucher} disabled={downloadingPdf} style={{ background: '#2563EB', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                📄 {downloadingPdf ? 'Downloading...' : 'PDF Voucher'}
              </button>
              <button onClick={() => setInWishlist(!inWishlist)} style={{ background: inWishlist ? '#FFE4E6' : '#F3F4F6', color: inWishlist ? '#E11D48' : '#111827', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                {inWishlist ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          {/* SRS Danger Alert Banner */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#B45309', padding: '10px 16px', borderRadius: '12px', marginTop: '14px', fontSize: '0.86rem', fontWeight: '700' }}>
            ⚠️ Safety & Danger Alert: Route inspected today. Weather clear & flight schedules normal.
          </div>

          <div className="meta-badges-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '14px' }}>
            <span className="meta-badge location-badge">📍 Paris, France</span>
            <span className="meta-badge icons-badge">✈️ Flights 🏨 4★ Hotel 🍽️ Meals 🚌 Transport</span>
            <span className="meta-badge date-badge">📅 27 - 29 June, 2026</span>
            <span className="meta-badge visited-badge" style={{ background: '#EFF6FF', color: '#1D4ED8', fontWeight: 'bold' }}>
              🔥 12.5K Showed Interest • 3.2K Enjoyed This Tour
            </span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="detail-two-col-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', marginTop: '32px' }}>
          <div className="left-content-column">
            {/* Day-by-Day Itinerary */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('itinerary')}>
                <h3>🗺️ Detailed Day-by-Day Itinerary</h3>
                <span className="chevron">{openAccordions.itinerary ? '▲' : '▼'}</span>
              </div>
              {openAccordions.itinerary && (
                <div className="accordion-body">
                  <div style={{ padding: '14px', background: '#EFF6FF', borderRadius: '12px', marginBottom: '12px' }}>
                    <h4 style={{ color: '#1E40AF', fontWeight: 'bold' }}>Day 1 : Arrival & Seine River Cruise</h4>
                    <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>VIP Airport pickup and guided Seine River cruise with wine tasting.</p>
                  </div>
                  <div style={{ padding: '14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', marginBottom: '12px' }}>
                    <h4 style={{ fontWeight: 'bold' }}>Day 2 : Louvre Museum & Arc de Triomphe</h4>
                    <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>Skip-the-line Mona Lisa pass & sunset rooftop access.</p>
                  </div>
                  <div style={{ padding: '14px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                    <h4 style={{ fontWeight: 'bold' }}>Day 3 : Montmartre & Departure</h4>
                    <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>Sacré-Cœur Basilica visit and private airport transfer.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Questions Section (SRS Page 2) */}
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('questions')}>
                <h3>❓ Questions & Answers (Q&A)</h3>
                <span className="chevron">{openAccordions.questions ? '▲' : '▼'}</span>
              </div>
              {openAccordions.questions && (
                <div className="accordion-body" style={{ fontSize: '0.88rem', color: '#374151' }}>
                  <p><strong>Q: Is visa assistance provided?</strong><br />A: Yes, our visa concierge team helps with Schengen documentation.</p>
                </div>
              )}
            </div>

            {/* Travellers Review */}
            <div className="travellers-review-card" style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>💬 Travellers Review</h3>
              {reviewsList.map((rev, idx) => (
                <div key={idx} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '12px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{rev.name}</strong>
                    <span style={{ color: '#FFB800' }}>★★★★★</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: '4px 0 0 0' }}>{rev.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: SRS Bed Pricing Matrix & Booking */}
          <div className="right-sidebar-column">
            <div className="booking-price-card" style={{ background: '#fff', border: '2px solid #2563EB', padding: '24px', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '12px' }}>
                SRS Room & Bed Options Selection
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  { id: 'single', title: 'Single Bed', desc: '1 Person Single Room', price: 120 },
                  { id: 'double', title: 'Double Bed', desc: 'Price Per Person Double Bed', price: 200 },
                  { id: 'twin', title: 'Twin Bed', desc: 'Price Per Person Twin Bed', price: 180 },
                  { id: 'extra', title: 'Extra Bed Add Option', desc: 'Additional Extra Bed', price: 40 },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedPackage(option.id)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: selectedPackage === option.id ? '2px solid #2563EB' : '1px solid #E5E7EB',
                      background: selectedPackage === option.id ? '#EFF6FF' : '#FAFAFA',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.88rem' }}>{option.title}</strong>
                      <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>{option.desc}</div>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#2563EB' }}>{formatPrice(option.price)}</span>
                  </div>
                ))}
              </div>

              {/* Travel Insurance Checkbox (SRS Page 2) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ECFDF5', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  id="insuranceCheck"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                />
                <label htmlFor="insuranceCheck" style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#047857', cursor: 'pointer' }}>
                  Add Travel Insurance (+{formatPrice(15)} / person)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#F9FAFB', borderRadius: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>Passes:</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #D1D5DB' }}>-</button>
                  <span style={{ fontWeight: 'bold' }}>{ticketCount}</span>
                  <button onClick={() => setTicketCount(ticketCount + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #D1D5DB' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>Total Amount:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#2563EB' }}>{formatPrice(totalPrice)}</span>
              </div>

              <button onClick={handleBookNow} style={{ background: '#2563EB', color: '#fff', border: 'none', width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
                ⚡ Book Now ({formatPrice(totalPrice)})
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerAdsPage() {
  const [adPlacement, setAdPlacement] = useState('home_banner');
  const [durationDays, setDurationDays] = useState('7');
  const [submitted, setSubmitted] = useState(false);

  const adOptions = [
    { id: 'home_banner', title: 'Home Page Hero Banner', price: '৳5,000 / week', desc: 'Highest visibility on main entry hero slider.' },
    { id: 'featured_banner', title: 'Featured Tour Badge & Top Section', price: '৳3,500 / week', desc: 'Highlighted with "Featured (Paid)" tag on homepage.' },
    { id: 'search_highlight', title: 'Search Result Highlight', price: '৳2,500 / week', desc: 'Pin product to top of destination search results.' },
    { id: 'order_cart', title: 'Order Cart Highlight', price: '৳2,000 / week', desc: 'Display recommended addon package at checkout.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <div className="seller-container">
        <SellerSidebar />
        <main className="seller-main-content">
          <header className="seller-header">
            <div>
              <h1 className="seller-page-title">In-Site Advertisement Booking</h1>
              <p className="seller-page-subtitle">Promote your packages on Home Banner, Featured listings, Search highlights, or Cart popups.</p>
            </div>
          </header>

          {submitted && (
            <div style={{ background: '#DEF7EC', border: '1px solid #31C48D', color: '#03543F', padding: '14px', borderRadius: '12px', marginTop: '16px', fontWeight: '600' }}>
              ✓ Ad booking request submitted successfully! Admin will review and activate your campaign shortly.
            </div>
          )}

          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginTop: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Select Ad Placement Type</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {adOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setAdPlacement(opt.id)}
                  style={{
                    border: adPlacement === opt.id ? '2px solid #FF4D4F' : '1px solid #E5E7EB',
                    background: adPlacement === opt.id ? '#FFF5F5' : '#FAFAFA',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: '#111827' }}>{opt.title}</h3>
                    <input type="radio" name="adPlacement" checked={adPlacement === opt.id} onChange={() => {}} />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '10px' }}>{opt.desc}</p>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#FF4D4F' }}>{opt.price}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Campaign Duration (Days)</label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                >
                  <option value="7">7 Days (1 Week)</option>
                  <option value="14">14 Days (2 Weeks)</option>
                  <option value="30">30 Days (1 Month)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Select Package to Promote</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option>Tenting at Cox's Bazar - ৳12,500</option>
                  <option>Sajek Valley Luxury Resort Package - ৳8,900</option>
                  <option>Express Thailand Tourist VISA - ৳6,500</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Ad Banner Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #FF4D4F 0%, #D9363E 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '8px',
                }}
              >
                🚀 Confirm & Launch Campaign
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

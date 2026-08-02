'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

export default function AddTourGuidePage() {
  const [guideName, setGuideName] = useState('Sanjid Rahman');
  const [title, setTitle] = useState('Certified Mountain & Heritage Tour Guide');
  const [location, setLocation] = useState('Sylhet & Sajek Valley, Bangladesh');
  const [durationHours, setDurationHours] = useState('8');
  const [availableDates, setAvailableDates] = useState('2026-08-10');
  const [chatOption, setChatOption] = useState(true);

  // Variety pricing by group size
  const [price1Person, setPrice1Person] = useState('1500');
  const [price2Person, setPrice2Person] = useState('2500');
  const [price3Person, setPrice3Person] = useState('3200');

  // 5-box Parameter Language Proficiency (SRS Standard)
  const [languages, setLanguages] = useState({
    Bengali: 5, // 5 out of 5 boxes
    English: 4, // 4 out of 5 boxes
    Hindi: 3,   // 3 out of 5 boxes
  });

  const [saved, setSaved] = useState(false);

  const handleLangRating = (lang, level) => {
    setLanguages((prev) => ({ ...prev, [lang]: level }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <div className="seller-container">
        <SellerSidebar />
        <main className="seller-main-content">
          <header className="seller-header">
            <div>
              <h1 className="seller-page-title">Register & Add Tour Guide Service</h1>
              <p className="seller-page-subtitle">Configure Tour Guide details, Verification files, 5-Box Language Proficiency, & Group Variety Pricing.</p>
            </div>
          </header>

          {saved && (
            <div style={{ background: '#DEF7EC', border: '1px solid #31C48D', color: '#03543F', padding: '14px', borderRadius: '12px', marginTop: '16px', fontWeight: 'bold' }}>
              ✓ Tour Guide Service Profile Published Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>1. Guide Personal & Tour Details</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Guide Full Name *</label>
                <input type="text" value={guideName} onChange={(e) => setGuideName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Guide Professional Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Location / Service Area *</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Tour Duration (in Hours) *</label>
                <input type="number" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Available Start Date (Calendar) *</label>
                <input type="date" value={availableDates} onChange={(e) => setAvailableDates(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: '24px 0 12px 0' }}>
              2. Language Proficiency (5 Box Parameter)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '16px' }}>Select proficiency level (1 to 5 boxes) for each language.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#FFFDF5', border: '1px solid #FDE68A', padding: '18px', borderRadius: '12px', marginBottom: '24px' }}>
              {['BENGALI', 'HINDI', 'ENGLISH'].map((langKey) => {
                const titleKey = langKey === 'BENGALI' ? 'Bengali' : langKey === 'HINDI' ? 'Hindi' : 'English';
                const currentVal = languages[titleKey] || 3;
                return (
                  <div key={langKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', minWidth: '100px' }}>{langKey}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4, 5].map((boxIdx) => (
                        <div
                          key={boxIdx}
                          onClick={() => handleLangRating(titleKey, boxIdx)}
                          style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '4px',
                            background: boxIdx <= currentVal ? '#65A30D' : '#E5E7EB',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#4B5563' }}>Level {currentVal} / 5</span>
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
              3. Group Variety Pricing (1 Person / 2 Person / 3 Person)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>1 Person Price (৳)</label>
                <input type="number" value={price1Person} onChange={(e) => setPrice1Person(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>2 Person Variety Price (৳)</label>
                <input type="number" value={price2Person} onChange={(e) => setPrice2Person(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>3 Person Variety Price (৳)</label>
                <input type="number" value={price3Person} onChange={(e) => setPrice3Person(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>4. Verification Documents Upload</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>NID Card Copy Upload *</label>
                <input type="file" accept="image/*,.pdf" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Electricity Bill Upload *</label>
                <input type="file" accept="image/*,.pdf" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Selfie Verification Upload *</label>
                <input type="file" accept="image/*" style={{ width: '100%' }} />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: '#059669',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              ✓ Publish Tour Guide Profile
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}

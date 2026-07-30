'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

export default function AddPackagePage() {
  const [packageType, setPackageType] = useState('Flexible');
  const [mainProduct, setMainProduct] = useState('Travel Package');
  const [includeTransport, setIncludeTransport] = useState(true);
  const [includeFoods, setIncludeFoods] = useState(true);
  const [includeGuide, setIncludeGuide] = useState(true);
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [dangerNotification, setDangerNotification] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Add New Package / Ad</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Create a new travel package, visa processing service, or tour guide offer for tourists.
                  </p>
                </div>
                <Link href="/business-center/packages" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                  ← Back to Package List
                </Link>
              </div>

              {submitted && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>
                  ✓ Package Created Successfully! Your tour offer is now live on the marketplace.
                </div>
              )}

              <form onSubmit={handleSubmit} className="seller-form-grid">
                {/* 1. Basic Information */}
                <div className="seller-form-group full-width">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    1. Basic Package Information
                  </h3>
                </div>

                <div className="seller-form-group full-width">
                  <label>Package Title *</label>
                  <input type="text" placeholder="e.g. 3 Days Tenting & Camping at Cox's Bazar Beach" required />
                </div>

                <div className="seller-form-group">
                  <label>Package Ad Type Choose *</label>
                  <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                    <option value="Flexible">Flexible Package</option>
                    <option value="Fixed">Fixed Package</option>
                  </select>
                </div>

                <div className="seller-form-group">
                  <label>Main Product Service *</label>
                  <select value={mainProduct} onChange={(e) => setMainProduct(e.target.value)}>
                    <option>Travel Package</option>
                    <option>Visa Processing Service</option>
                    <option>Tour Guide Service</option>
                  </select>
                </div>

                {/* 2. Destination & Location */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    2. Location & Region
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>Country *</label>
                  <select>
                    <option>Bangladesh</option>
                    <option>India</option>
                    <option>Nepal</option>
                    <option>Thailand</option>
                    <option>United Arab Emirates</option>
                    <option>France</option>
                    <option>Canada</option>
                  </select>
                </div>

                <div className="seller-form-group">
                  <label>Inbound / International Region</label>
                  <select>
                    <option>Inbound (Domestic)</option>
                    <option>International (Asia)</option>
                    <option>International (Europe)</option>
                    <option>International (Middle East)</option>
                    <option>International (USA/North America)</option>
                  </select>
                </div>

                <div className="seller-form-group">
                  <label>District / City *</label>
                  <input type="text" placeholder="e.g. Cox's Bazar / Chittagong" required />
                </div>

                <div className="seller-form-group">
                  <label>Specific Spot / Place</label>
                  <input type="text" placeholder="e.g. Inani Beach & Himchari" />
                </div>

                {/* 3. Duration & Transport */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    3. Duration, Transport & Amenities
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>Duration (Days / Nights) *</label>
                  <input type="text" placeholder="e.g. 3 Days / 2 Nights" required />
                </div>

                <div className="seller-form-group">
                  <label>Transport Type Included *</label>
                  <select>
                    <option>AC Bus / Luxury Transport</option>
                    <option>Non-AC Bus</option>
                    <option>Air Flight Flight Included</option>
                    <option>Local Transport Only (Boat/Jeep/Chander Gari)</option>
                    <option>By Road (Private Sedan/Microbus)</option>
                  </select>
                </div>

                <div className="seller-form-group full-width" style={{ display: 'flex', gap: '20px', background: '#F8FAFC', padding: '14px', borderRadius: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeTransport} onChange={(e) => setIncludeTransport(e.target.checked)} />
                    <span>Include Transport</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeFoods} onChange={(e) => setIncludeFoods(e.target.checked)} />
                    <span>Include Meals / Foods</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeGuide} onChange={(e) => setIncludeGuide(e.target.checked)} />
                    <span>Include Tour Guide</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={travelInsurance} onChange={(e) => setTravelInsurance(e.target.checked)} />
                    <span>Travel Insurance Option</span>
                  </label>
                </div>

                {/* 4. Pricing & Room Variety */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    4. Pricing & Bed/Room Variance
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>Price Per Person (Single Bed) *</label>
                  <input type="text" placeholder="e.g. $250" required />
                </div>

                <div className="seller-form-group">
                  <label>Price Per Person (Double Bed / Shared)</label>
                  <input type="text" placeholder="e.g. $200" />
                </div>

                <div className="seller-form-group">
                  <label>Price Per Person (Twin Bed)</label>
                  <input type="text" placeholder="e.g. $180" />
                </div>

                <div className="seller-form-group">
                  <label>Extra Bed Add Option Price</label>
                  <input type="text" placeholder="e.g. +$50 for Extra Floor Bed" />
                </div>

                {/* 5. Discounts & Promo Codes */}
                <div className="seller-form-group">
                  <label>Discount Code / Promo</label>
                  <input type="text" placeholder="e.g. SUMMER20" />
                </div>

                <div className="seller-form-group">
                  <label>Discount Percentage (%) / Flat Amount</label>
                  <input type="text" placeholder="e.g. 20% OFF or $40 Flat" />
                </div>

                {/* Danger Notification & Details */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={dangerNotification} onChange={(e) => setDangerNotification(e.target.checked)} />
                    <span>Notification of Danger / Safety Advisory (High tide, Mountain risk, Weather warnings)</span>
                  </label>
                </div>

                <div className="seller-form-group full-width">
                  <label>Package Description & Highlights *</label>
                  <textarea rows="4" placeholder="Detailed itinerary and tour highlights (Day 1, Day 2, Day 3)..." required />
                </div>

                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn-seller-primary" style={{ justifyContent: 'center', fontSize: '1rem', padding: '14px 28px' }}>
                    Publish Package Ad
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

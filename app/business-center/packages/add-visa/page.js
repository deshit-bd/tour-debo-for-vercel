'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

export default function AddVisaPackagePage() {
  const [country, setCountry] = useState('Thailand');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [validity, setValidity] = useState('90 Days');
  const [entryType, setEntryType] = useState('Single Entry');
  const [basePrice, setBasePrice] = useState('6500');

  // Matrix Pricing
  const [matrixPrices, setMatrixPrices] = useState({
    'Tourist Visa-Single Entry': '6500',
    'Tourist Visa-Multiple Entry': '18500',
    'Business Visa-Single Entry': '12000',
    'Business Visa-Multiple Entry': '32000',
    'Medical Visa-Single Entry': '9500',
    'Medical Visa-Multiple Entry': '24000',
    'PR Visa-Multiple Entry': '85000',
  });

  const [description, setDescription] = useState('Official e-Visa and Sticker Visa processing service with express submission.');
  const [requiredDocs, setRequiredDocs] = useState('Passport (6 month validity), 2 Passport size photos (White background), Bank Statement (Last 6 months), Trade License / NOC.');
  const [conditions, setConditions] = useState('Non-refundable visa fee once submitted to embassy. Processing duration depends on embassy workload.');
  const [policy, setPolicy] = useState('Full refund of service charge if visa gets rejected due to documentation error from our side.');

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const handlePriceChange = (key, val) => {
    setMatrixPrices((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <div className="seller-container">
        <SellerSidebar />
        <main className="seller-main-content">
          <header className="seller-header">
            <div>
              <h1 className="seller-page-title">Add VISA Processing Service Product</h1>
              <p className="seller-page-subtitle">Configure VISA Country, Type, Validity, Entry options, and Combination Price Sets (SRS Standard).</p>
            </div>
          </header>

          {saved && (
            <div style={{ background: '#DEF7EC', border: '1px solid #31C48D', color: '#03543F', padding: '14px', borderRadius: '12px', marginTop: '16px', fontWeight: 'bold' }}>
              ✓ VISA Service Product Added Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>1. Basic VISA Product Info</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Destination Country *</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option value="Thailand">Thailand</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Dubai (UAE)">Dubai (UAE)</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Schengen / Europe">Schengen / Europe</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Default VISA Type Dropdown *</label>
                <select value={visaType} onChange={(e) => setVisaType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Medical Visa">Medical Visa</option>
                  <option value="Business Visa">Business Visa</option>
                  <option value="PR Visa">PR Visa (Permanent Resident)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>VISA Validity Option *</label>
                <select value={validity} onChange={(e) => setValidity(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option value="30 Days">30 Days Validity</option>
                  <option value="60 Days">60 Days Validity</option>
                  <option value="90 Days">90 Days Validity</option>
                  <option value="6 Months">6 Months Validity</option>
                  <option value="1 Year">1 Year Multiple</option>
                  <option value="5 Years">5 Years Long Term</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Default Entry Option *</label>
                <select value={entryType} onChange={(e) => setEntryType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option value="Single Entry">Single Entry</option>
                  <option value="Double Entry">Double Entry</option>
                  <option value="Multiple Entry">Multiple Entry</option>
                </select>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: '24px 0 12px 0' }}>
              2. Feature Combination Pricing Matrix (SRS Page 3-4 Standard)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '16px' }}>Set individual prices for combination of VISA Type & Entry Option.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', background: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
              {Object.keys(matrixPrices).map((key) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: '600', color: '#374151' }}>{key}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>৳</span>
                    <input
                      type="number"
                      value={matrixPrices[key]}
                      onChange={(e) => handlePriceChange(key, e.target.value)}
                      style={{ width: '90px', padding: '6px', borderRadius: '6px', border: '1px solid #D1D5DB', fontWeight: 'bold' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>3. Description & Policy Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Service Description *</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Required Documents *</label>
                <textarea rows="2" value={requiredDocs} onChange={(e) => setRequiredDocs(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Conditions as ShareTrip *</label>
                <textarea rows="2" value={conditions} onChange={(e) => setConditions(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>Cancellation & Refund Policy *</label>
                <textarea rows="2" value={policy} onChange={(e) => setPolicy(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '24px',
              }}
            >
              ✓ Publish VISA Service Product
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}

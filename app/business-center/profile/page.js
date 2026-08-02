'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';
import AddressSegment from '../../components/AddressSegment';
import { useAuth } from '../../context/AuthContext';

export default function SellerProfilePage() {
  const router = useRouter();
  const { user, switchRole } = useAuth();

  const [plannerType, setPlannerType] = useState('Company'); // 'Company' | 'Personal'
  const [companyName, setCompanyName] = useState('DeshIT - BD Tours & Travels');
  const [mobile, setMobile] = useState('+880 17 0000 0000');
  const [email, setEmail] = useState('info@deshit-bd.com');
  const [nidNumber, setNidNumber] = useState('1995269182348123');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/019481/2024');

  // Document Upload File Names
  const [nidFile, setNidFile] = useState(null);
  const [tradeFile, setTradeFile] = useState(null);

  // Bank Info
  const [bankName, setBankName] = useState('Dutch-Bangla Bank Ltd');
  const [branch, setBranch] = useState('Gulshan Branch');
  const [district, setDistrict] = useState('Dhaka');
  const [routingNo, setRoutingNo] = useState('090261421');
  const [accNo, setAccNo] = useState('115.120.948123');

  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      // Grant PLANNER / SELLER role dynamically
      switchRole('PLANNER');
      setSubmitting(false);
      setSaved(true);

      setTimeout(() => {
        router.push('/business-center');
      }, 1200);
    }, 800);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
          <div className="seller-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Seller &amp; Planner Onboarding</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>Business Center Registration &amp; KYC</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Provide company/personal details, address, NID &amp; Trade license documents to unlock your Seller Dashboard.
                </p>
              </div>
              <span className="status-pill success" style={{ padding: '6px 14px', fontSize: '0.8rem', background: '#ECFDF5', color: '#047857', borderRadius: '20px', fontWeight: '800' }}>
                {user?.role === 'PLANNER' ? '✓ Active Seller' : '📝 KYC Application'}
              </span>
            </div>

            {saved ? (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '24px', borderRadius: '16px', fontSize: '1.05rem', fontWeight: 800, textAlign: 'center' }}>
                🎉 Seller Registration &amp; KYC Approved! Redirecting to Business Center Dashboard...
              </div>
            ) : (
              <form onSubmit={handleSubmitRegistration} className="seller-form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Account Type Selector */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>Registration Type *</label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}>
                      <input
                        type="radio"
                        name="plannerType"
                        value="Company"
                        checked={plannerType === 'Company'}
                        onChange={() => setPlannerType('Company')}
                        style={{ accentColor: '#2563EB' }}
                      />
                      🏢 Company / Agency
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}>
                      <input
                        type="radio"
                        name="plannerType"
                        value="Personal"
                        checked={plannerType === 'Personal'}
                        onChange={() => setPlannerType('Personal')}
                        style={{ accentColor: '#2563EB' }}
                      />
                      👤 Personal / Independent Planner
                    </label>
                  </div>
                </div>

                {/* Section 1: Basic Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      {plannerType === 'Company' ? 'Company Name *' : 'Personal Name *'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      placeholder="e.g. DeshIT - BD Tours & Travels"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Mobile Number *</label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      placeholder="+880 1700000000"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="info@company.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Section 2: Address Segment Component */}
                <AddressSegment />

                {/* Section 3: Legal Identification Uploads */}
                <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '0 0 16px 0' }}>
                    📄 Identification &amp; Legal Verification Uploads
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>NID Card Number *</label>
                      <input
                        type="text"
                        value={nidNumber}
                        onChange={(e) => setNidNumber(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', marginBottom: '8px' }}
                      />
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#2563EB', display: 'block', marginBottom: '4px' }}>NID Card Photo / Document *</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setNidFile(e.target.files[0]?.name)}
                        style={{ fontSize: '0.82rem' }}
                      />
                      {nidFile && <small style={{ color: '#059669', display: 'block', marginTop: '4px', fontWeight: 'bold' }}>✓ {nidFile}</small>}
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Trade License Number *</label>
                      <input
                        type="text"
                        value={tradeLicense}
                        onChange={(e) => setTradeLicense(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', marginBottom: '8px' }}
                      />
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#2563EB', display: 'block', marginBottom: '4px' }}>Trade License Copy Upload *</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setTradeFile(e.target.files[0]?.name)}
                        style={{ fontSize: '0.82rem' }}
                      />
                      {tradeFile && <small style={{ color: '#059669', display: 'block', marginTop: '4px', fontWeight: 'bold' }}>✓ {tradeFile}</small>}
                    </div>
                  </div>
                </div>

                {/* Section 4: Bank Account Details for Payouts */}
                <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1.5px solid #CBD5E1' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '0 0 16px 0' }}>
                    🏦 Payout Bank Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Bank Name *</label>
                      <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Branch Name *</label>
                      <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>District *</label>
                      <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Routing Number *</label>
                      <input type="text" value={routingNo} onChange={(e) => setRoutingNo(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Bank Account Number *</label>
                      <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      background: '#2563EB',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                    }}
                  >
                    {submitting ? 'Submitting Registration & Verification...' : 'REGISTER & UNLOCK BUSINESS CENTER'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

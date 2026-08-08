'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';
import AddressSegment from '../../components/AddressSegment';
import { useAuth } from '../../context/AuthContext';

export default function SellerProfilePage() {
  const { user, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('security'); // 'company' | 'security' | 'bank' | 'kyc'

  // Company Profile State
  const [plannerType, setPlannerType] = useState('Company'); // 'Company' | 'Personal'
  const [companyName, setCompanyName] = useState('DeshIT - BD Tours & Travels');
  const [mobile, setMobile] = useState('+880 1700 000000');
  const [email, setEmail] = useState('info@deshit-bd.com');
  const [companySuccess, setCompanySuccess] = useState('');

  // Password & Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Bank Info State
  const [bankName, setBankName] = useState('Dutch-Bangla Bank Ltd');
  const [branch, setBranch] = useState('Gulshan Branch');
  const [district, setDistrict] = useState('Dhaka');
  const [routingNo, setRoutingNo] = useState('090261421');
  const [accNo, setAccNo] = useState('115.120.948123');
  const [bankSuccess, setBankSuccess] = useState('');

  // KYC Verification State
  const [nidNumber, setNidNumber] = useState('1995269182348123');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/019481/2024');
  const [nidFile, setNidFile] = useState(null);
  const [tradeFile, setTradeFile] = useState(null);
  const [kycSuccess, setKycSuccess] = useState('');

  // Tab 1: Handle Company Profile Save
  const handleSaveCompany = (e) => {
    e.preventDefault();
    setCompanySuccess('✓ Business profile details updated successfully!');
    setTimeout(() => setCompanySuccess(''), 3000);
  };

  // Tab 2: Handle Planner Password Change
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordSuccess('✓ Seller Account Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(''), 4000);
  };

  // Tab 3: Handle Bank Info Save
  const handleSaveBank = (e) => {
    e.preventDefault();
    setBankSuccess('✓ Payout bank information saved successfully!');
    setTimeout(() => setBankSuccess(''), 3000);
  };

  // Tab 4: Handle KYC Submission
  const handleSaveKYC = (e) => {
    e.preventDefault();
    setKycSuccess('✓ Trade license & verification documents submitted to Admin for review!');
    setTimeout(() => setKycSuccess(''), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div
              className="seller-card"
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Header Title */}
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Seller Profile &amp; Settings
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>
                    Business Center Profile Management
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Manage your business details, change login password, update payout bank, and legal KYC documents.
                  </p>
                </div>

                <span
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    background: '#ECFDF5',
                    color: '#047857',
                    border: '1px solid #A7F3D0',
                    borderRadius: '20px',
                    fontWeight: '800',
                  }}
                >
                  ✓ Verified Seller Account
                </span>
              </div>

              {/* Sub-Module Navigation Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  borderBottom: '2px solid #E2E8F0',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { id: 'security', label: '🔒 Password & Security', badge: '' },
                  { id: 'company', label: '🏢 Business Profile', badge: '' },
                  { id: 'bank', label: '🏦 Payout Bank Info', badge: '' },
                  { id: 'kyc', label: '📜 Trade License & KYC', badge: 'Verified' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? '#EFF6FF' : 'transparent',
                      color: activeTab === tab.id ? '#2563EB' : '#64748B',
                      border: 'none',
                      borderBottom: activeTab === tab.id ? '3px solid #2563EB' : '3px solid transparent',
                      padding: '10px 16px',
                      fontSize: '0.88rem',
                      fontWeight: activeTab === tab.id ? 800 : 600,
                      cursor: 'pointer',
                      borderRadius: '8px 8px 0 0',
                      transition: 'all 0.15s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span style={{ fontSize: '0.7rem', background: '#D1FAE5', color: '#047857', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* TAB 1: SUB-MODULE - SECURITY & PASSWORD */}
              {activeTab === 'security' && (
                <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>
                        🔒 Change Planner Login Password
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
                        Update your password anytime. Admin permission is not required for security updates.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Current Password *</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>New Password *</label>
                        <input
                          type="password"
                          placeholder="Min 6 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Confirm New Password *</label>
                        <input
                          type="password"
                          placeholder="Re-type new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {passwordError && (
                      <div style={{ color: '#DC2626', fontSize: '0.82rem', fontWeight: 700, marginTop: '12px' }}>
                        ⚠️ {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 800, marginTop: '12px', background: '#ECFDF5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                        {passwordSuccess}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      style={{
                        background: '#2563EB',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                      }}
                    >
                      UPDATE PLANNER PASSWORD
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: SUB-MODULE - BUSINESS PROFILE */}
              {activeTab === 'company' && (
                <form onSubmit={handleSaveCompany} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '0 0 16px 0' }}>
                      🏢 Agency &amp; Business Profile Information
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>Registration Type *</label>
                        <select
                          value={plannerType}
                          onChange={(e) => setPlannerType(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff' }}
                        >
                          <option value="Company">🏢 Company / Agency</option>
                          <option value="Personal">👤 Personal / Independent Planner</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>Company / Agency Name *</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>Official Mobile Number *</label>
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>Official Email Address *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    {/* Address Segment Component */}
                    <AddressSegment />
                  </div>

                  {companySuccess && (
                    <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 800, background: '#ECFDF5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                      {companySuccess}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      style={{
                        background: '#2563EB',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                      }}
                    >
                      SAVE BUSINESS PROFILE
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: SUB-MODULE - PAYOUT BANK INFO */}
              {activeTab === 'bank' && (
                <form onSubmit={handleSaveBank} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: '0 0 16px 0' }}>
                      🏦 Payout Bank Account Details
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '-10px 0 16px 0' }}>
                      Your earnings disburse directly to this bank account via EFTN / BEFTN.
                    </p>

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

                  {bankSuccess && (
                    <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 800, background: '#ECFDF5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                      {bankSuccess}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      style={{
                        background: '#2563EB',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                      }}
                    >
                      UPDATE BANK DETAILS
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: SUB-MODULE - TRADE LICENSE & KYC VERIFICATION */}
              {activeTab === 'kyc' && (
                <form onSubmit={handleSaveKYC} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>
                          📜 Legal Documents &amp; Trade License (KYC)
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
                          Upload trade license renewals or updated NID for platform verification badge.
                        </p>
                      </div>
                      <span style={{ fontSize: '0.8rem', background: '#ECFDF5', color: '#047857', padding: '4px 10px', borderRadius: '6px', fontWeight: 800 }}>
                        ✓ KYC Verified
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>NID Card Number *</label>
                        <input
                          type="text"
                          value={nidNumber}
                          onChange={(e) => setNidNumber(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', marginBottom: '8px' }}
                        />
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#2563EB', display: 'block', marginBottom: '4px' }}>NID Copy Upload</label>
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
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#2563EB', display: 'block', marginBottom: '4px' }}>Trade License Copy Upload</label>
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

                  {kycSuccess && (
                    <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 800, background: '#ECFDF5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                      {kycSuccess}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      style={{
                        background: '#2563EB',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                      }}
                    >
                      SUBMIT KYC FOR REVIEW
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

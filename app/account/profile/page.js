'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import AddressSegment from '../../components/AddressSegment';

export default function AccountProfilePage() {
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirmPass: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.current) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!passwordForm.newPass || passwordForm.newPass.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirmPass) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordError('');
    setPasswordMsg('Password changed successfully!');
    setTimeout(() => {
      setPasswordMsg('');
      setShowPasswordModal(false);
      setPasswordForm({ current: '', newPass: '', confirmPass: '' });
    }, 1500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Area: Profile Form Card */}
          <div className="account-main-area">
            <div className="account-section-card profile-details-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>My profile</h2>

              {/* Profile Grid matching PDF layout */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 30px', marginBottom: '32px' }}>
                {/* Full name */}
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full name</span>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>Sanjid Ibrahim</strong>
                </div>

                {/* Email Address */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Email Address</span>
                    <span style={{ fontSize: '0.78rem', color: '#0097B2', cursor: 'pointer', fontWeight: '600' }}>| Change</span>
                  </div>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>sanjidbd@gmail.com</strong>
                </div>

                {/* Mobile */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Mobile</span>
                    <span style={{ fontSize: '0.78rem', color: '#0097B2', cursor: 'pointer', fontWeight: '600' }}>| Change</span>
                  </div>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>🇧🇩 +880 1712***323</strong>
                </div>

                {/* Birthday */}
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Birthday</span>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>1986-03-19</strong>
                </div>

                {/* Gender* */}
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Gender*</span>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>male</strong>
                </div>

                {/* Profession */}
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Profession</span>
                  <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>Job</strong>
                </div>
              </div>



              {/* Address Segment Component */}
              <div style={{ marginBottom: '24px' }}>
                <AddressSegment />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '280px' }}>
                <Link
                  href="/account/edit"
                  style={{
                    background: '#0097B2',
                    color: '#ffffff',
                    textAlign: 'center',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontWeight: '800',
                    fontSize: '0.88rem',
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,151,178,0.2)',
                  }}
                >
                  EDIT PROFILE
                </Link>

                <button
                  onClick={() => setShowPasswordModal(true)}
                  style={{
                    background: '#0097B2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontWeight: '800',
                    fontSize: '0.88rem',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,151,178,0.2)',
                  }}
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} style={{ border: 'none', background: '#F1F5F9', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', color: '#64748B' }}>✕</button>
            </div>

            {passwordMsg && (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>
                ✓ {passwordMsg}
              </div>
            )}

            {passwordError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>
                ⚠️ {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password (min 6 chars)"
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#0097B2',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

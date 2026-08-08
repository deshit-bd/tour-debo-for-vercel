'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import AddressSegment from '../../components/AddressSegment';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'Sanjid Ibrahim',
    email: 'sanjidbd@gmail.com',
    countryCode: '+880',
    phone: '1712000323',
    dob: '1986-03-19',
    profession: 'Job',
    gender: 'male',
  });
  const [saved, setSaved] = useState(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPasswordError('');

    // If new password is entered, validate match
    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        setPasswordError('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError('New password and confirm password do not match.');
        return;
      }
    }

    setSaved(true);
    setTimeout(() => {
      router.push('/account/profile');
    }, 1200);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.78rem', color: '#0097B2', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profile Settings</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: '4px 0 0 0' }}>Edit Profile</h2>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '4px 0 0 0' }}>Update your personal information, mobile country code, and profession.</p>
              </div>

              {saved ? (
                <div style={{ color: '#059669', textAlign: 'center', padding: '40px', fontWeight: '800', fontSize: '1.1rem', background: '#ECFDF5', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                  ✓ Profile changes saved successfully! Redirecting to My Profile...
                </div>
              ) : (
                <form onSubmit={handleSave}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    {/* Mobile with Country Code Dropdown */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Mobile Number *</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          style={{ padding: '10px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', background: '#F8FAFC', cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="+880">🇧🇩 +880 (BD)</option>
                          <option value="+1">🇺🇸 +1 (US/CA)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+91">🇮🇳 +91 (IN)</option>
                          <option value="+65">🇸🇬 +65 (SG)</option>
                          <option value="+61">🇦🇺 +61 (AU)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+966">🇸🇦 +966 (KSA)</option>
                        </select>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Birthday */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Birthday</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    {/* Gender* */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                      </select>
                    </div>

                    {/* Profession Dropdown */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Profession *</label>
                      <select
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="Job">Job</option>
                        <option value="Business">Business</option>
                        <option value="Student">Student</option>
                        <option value="Home Maker">Home Maker</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  {/* Address Segment Component */}
                  <AddressSegment />

                  {/* Change Password & Security Section */}
                  <div style={{ marginTop: '32px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px', borderRadius: '16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Security</span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>Change Account Password</h3>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>Enter your current password and choose a new secure password.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {passwordError && (
                      <div style={{ color: '#DC2626', fontSize: '0.82rem', fontWeight: 700, marginTop: '10px' }}>
                        ⚠️ {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 800, marginTop: '10px', background: '#ECFDF5', padding: '8px 12px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                        ✓ Password updated successfully!
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                      type="submit"
                      style={{
                        background: '#0097B2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,151,178,0.2)',
                      }}
                    >
                      SAVE PROFILE & PASSWORD
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push('/account/profile')}
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
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

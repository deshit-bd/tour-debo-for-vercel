'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function AccountProfilePage() {
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');

  const handlePasswordChange = () => {
    setPasswordMsg('Password reset instructions sent to your email.');
    setTimeout(() => setPasswordMsg(''), 3000);
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
            <div className="account-section-card profile-details-card">
              <div className="profile-card-header">
                <div className="profile-avatar-xl">DB</div>
                <div>
                  <span className="account-eyebrow">Personal Information</span>
                  <h2>DeshIT-BD</h2>
                  <p>Keep your account details updated for bookings, vouchers, and planner communication.</p>
                </div>
                <span className="profile-status-pill">Verified Account</span>
              </div>

              <div className="profile-fields-grid">
                <div className="field-group">
                  <label>Full Name</label>
                  <div className="field-value">DeshIT-BD</div>
                </div>

                <div className="field-group">
                  <label>Email</label>
                  <div className="field-value">press.dhaka@fco.gov.uk</div>
                </div>

                <div className="field-group">
                  <label>Phone</label>
                  <div className="field-value">+880 17 0000 0000</div>
                </div>

                <div className="field-group">
                  <label>Country</label>
                  <div className="field-value">Bangladesh</div>
                </div>

                <div className="field-group">
                  <label>Birthday</label>
                  <div className="field-value">15/08/1995</div>
                </div>

                <div className="field-group">
                  <label>Gender</label>
                  <div className="field-value">Male</div>
                </div>

                <div className="field-group">
                  <label>Profession</label>
                  <div className="field-value">Software Engineer</div>
                </div>
              </div>

              <div className="newsletter-checkbox-row">
                <label className="checkbox-item bold-label">
                  <input
                    type="checkbox"
                    checked={unsubscribed}
                    onChange={(e) => setUnsubscribed(e.target.checked)}
                  />
                  Unsubscribe from our Newsletter
                </label>
              </div>

              {passwordMsg && (
                <div className="profile-success-alert">
                  ✓ {passwordMsg}
                </div>
              )}

              <div className="profile-actions-row">
                <Link href="/account/edit" className="btn-edit-profile">
                  Edit Profile
                </Link>
                <button className="btn-change-password" onClick={handlePasswordChange}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

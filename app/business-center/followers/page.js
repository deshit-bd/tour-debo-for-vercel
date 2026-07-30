'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function FollowersOfferPage() {
  const [offerTitle, setOfferTitle] = useState('Special 15% OFF for Store Followers');
  const [discountVal, setDiscountVal] = useState('15% OFF');
  const [message, setMessage] = useState('Exclusive weekend camping deal for our loyal followers! Book now to claim your discount.');

  const [sent, setSent] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
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
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Offer to Followers & Fans</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Send exclusive discount vouchers, instant tour notifications, and deals directly to your 999 Followers.
                  </p>
                </div>
              </div>

              <div className="seller-metrics-grid" style={{ marginBottom: '24px' }}>
                <div className="metric-card">
                  <span className="label">Total Shop Followers</span>
                  <span className="value" style={{ color: '#2563EB' }}>999</span>
                  <span className="subtext">Active Fan Base</span>
                </div>
                <div className="metric-card">
                  <span className="label">Offers Sent This Month</span>
                  <span className="value">4 Deals</span>
                  <span className="subtext">High Engagement</span>
                </div>
                <div className="metric-card">
                  <span className="label">Follower Conversion</span>
                  <span className="value">34.8%</span>
                  <span className="subtext">↑ +5.2% Increase</span>
                </div>
              </div>

              {sent && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>
                  📣 Broadcast Sent! Your special offer has been sent to 999 shop followers.
                </div>
              )}

              <form onSubmit={handleBroadcast} className="seller-form-grid">
                <div className="seller-form-group full-width">
                  <label>Offer / Campaign Title *</label>
                  <input type="text" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Discount Voucher Code / Percentage *</label>
                  <input type="text" value={discountVal} onChange={(e) => setDiscountVal(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Target Audience *</label>
                  <select>
                    <option>All 999 Shop Followers</option>
                    <option>Recent Booked Customers Only</option>
                    <option>Top Reviewers & Repeat Tourists</option>
                  </select>
                </div>

                <div className="seller-form-group full-width">
                  <label>Custom Notification Message to Followers *</label>
                  <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width">
                  <button type="submit" className="btn-seller-primary" style={{ justifyContent: 'center' }}>
                    Broadcast Deal to All Followers
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

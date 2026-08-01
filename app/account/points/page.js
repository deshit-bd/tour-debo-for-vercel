'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MyPointsPage() {
  const [points, setPoints] = useState(500);
  const [voucherCode, setVoucherCode] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState('');
  const [referred, setReferred] = useState(false);

  const handleRedeemVoucher = (e) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === 'TOURDIBO100') {
      setPoints((prev) => prev + 100);
      setRedeemSuccess('🎉 Voucher applied! 100 bonus points added to your balance.');
    } else if (points >= 200) {
      setPoints((prev) => prev - 200);
      setRedeemSuccess('✓ 200 Points redeemed for ৳500 Discount Voucher!');
    } else {
      setRedeemSuccess('❌ Invalid code or insufficient points balance.');
    }
    setVoucherCode('');
    setTimeout(() => setRedeemSuccess(''), 4000);
  };

  const handleReferFriend = () => {
    navigator.clipboard.writeText('https://tour-dibo.com/referral?code=REF500');
    setReferred(true);
    setTimeout(() => setReferred(false), 3000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-top-bar-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>My Points & Loyalty Rewards</h2>
          <button className="btn-refer-friend" onClick={handleReferFriend} style={{ background: '#2563EB', color: '#fff', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            {referred ? '✓ Referral Link Copied!' : '👥 Refer a Friend (+200 pts)'}
          </button>
        </div>

        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            {/* Points Summary & Total Visits Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="points-balance-card" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)', color: '#fff', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '8px' }}>Loyalty Points Balance</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🪙 {points}</span>
                  <small style={{ fontSize: '0.85rem', fontWeight: 'normal', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '12px' }}>
                    Value: ৳{(points * 2.5).toFixed(0)}
                  </small>
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '8px' }}>Earn 5% points back on every completed tour order!</p>
              </div>

              {/* SRS Total Visits Metric (Page 5 Standard) */}
              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
                  ✈️ Total Visits Summary (SRS Metric)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                  <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1D4ED8' }}>4</div>
                    <small style={{ fontSize: '0.72rem', color: '#4B5563' }}>🌊 Sea Visits</small>
                  </div>
                  <div style={{ background: '#FEF3C7', padding: '8px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#B45309' }}>2</div>
                    <small style={{ fontSize: '0.72rem', color: '#4B5563' }}>✈️ Abroad</small>
                  </div>
                  <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#047857' }}>3</div>
                    <small style={{ fontSize: '0.72rem', color: '#4B5563' }}>🏞 River/Hill</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Code Box */}
            <div className="account-section-card" style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
              <h3 className="card-title-lg">Redeem Voucher Code or Convert Points</h3>

              {redeemSuccess && (
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '10px 14px', borderRadius: '8px', fontWeight: 'bold', marginBottom: '14px', fontSize: '0.88rem' }}>
                  {redeemSuccess}
                </div>
              )}

              <form onSubmit={handleRedeemVoucher} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Enter promo / voucher code (e.g., TOURDIBO100)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
                <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Apply Voucher
                </button>
                <button type="button" onClick={handleRedeemVoucher} style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Redeem 200 Pts (৳500 OFF)
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

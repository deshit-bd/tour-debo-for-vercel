'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MyPointsPage() {
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [visits, setVisits] = useState({ sea: 0, abroad: 0, riverHill: 0 });
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState('');
  const [referred, setReferred] = useState(false);

  // Fetch backend API for points data
  useEffect(() => {
    async function fetchPointsData() {
      try {
        const res = await fetch('/api/user/points');
        const data = await res.json();
        if (data.success) {
          setPoints(data.points);
          setPointsHistory(data.history);
          setVisits(data.visits);
        }
      } catch (err) {
        console.error('Failed to fetch user points data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPointsData();
  }, []);

  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    try {
      const res = await fetch('/api/user/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPLY_VOUCHER', voucherCode }),
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        setRedeemSuccess(data.message);
        setVoucherCode('');
      } else {
        setRedeemSuccess(data.message || 'Failed to apply voucher.');
      }
    } catch (err) {
      setRedeemSuccess('❌ Server error while applying voucher.');
    }
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
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>My Points &amp; Loyalty Rewards</h2>
          <button className="btn-refer-friend" onClick={handleReferFriend} style={{ background: '#2563EB', color: '#fff', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            {referred ? '✓ Referral Link Copied!' : '👥 Refer a Friend (+200 pts)'}
          </button>
        </div>

        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            {loading ? (
              <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', color: '#64748B' }}>
                ⚡ Loading points &amp; history from backend API...
              </div>
            ) : (
              <>
                {/* 1. TOP CARDS SECTION: Total Visits & Redeem Voucher Box */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  {/* Total Visits Summary */}
                  <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
                      ✈️ Total Visits Summary
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                      <div style={{ background: '#EFF6FF', padding: '10px 8px', borderRadius: '10px' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.15rem', color: '#1D4ED8' }}>{visits.sea}</div>
                        <small style={{ fontSize: '0.72rem', color: '#4B5563', fontWeight: '600' }}>🌊 Sea Visits</small>
                      </div>
                      <div style={{ background: '#FEF3C7', padding: '10px 8px', borderRadius: '10px' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.15rem', color: '#B45309' }}>{visits.abroad}</div>
                        <small style={{ fontSize: '0.72rem', color: '#4B5563', fontWeight: '600' }}>✈️ Abroad</small>
                      </div>
                      <div style={{ background: '#ECFDF5', padding: '10px 8px', borderRadius: '10px' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.15rem', color: '#047857' }}>{visits.riverHill}</div>
                        <small style={{ fontSize: '0.72rem', color: '#4B5563', fontWeight: '600' }}>🏞 River/Hill</small>
                      </div>
                    </div>
                  </div>

                  {/* Redeem Voucher Code Box */}
                  <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Redeem Promo Voucher Code</h3>
                    {redeemSuccess && (
                      <div style={{ background: '#DEF7EC', color: '#03543F', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.82rem' }}>
                        {redeemSuccess}
                      </div>
                    )}
                    <form onSubmit={handleApplyVoucher} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Enter promo code (e.g., TOURDIBO100)"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        style={{ flex: 1, minWidth: '160px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none' }}
                      />
                      <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.88rem', cursor: 'pointer' }}>
                        Apply
                      </button>
                    </form>
                  </div>
                </div>

                {/* 2. MY POINTS BALANCE TABLE CARD (Backend Driven) */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #CBD5E1',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    marginBottom: '24px',
                  }}
                >
                  {/* Blue Header Banner Bar */}
                  <div
                    style={{
                      background: '#0000FF',
                      color: '#ffffff',
                      padding: '14px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontWeight: '800',
                      fontSize: '1.15rem',
                    }}
                  >
                    <span>My Points Balance</span>
                    <span style={{ fontSize: '1.25rem', background: 'rgba(255,255,255,0.2)', padding: '2px 14px', borderRadius: '6px' }}>
                      {points}
                    </span>
                  </div>

                  {/* Points History Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#3B82F6', color: '#ffffff', fontSize: '0.9rem', fontWeight: '800' }}>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Points</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Details</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Start Date</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Expired Date</th>
                          <th style={{ padding: '12px 18px' }}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsHistory.map((row, idx) => (
                          <tr
                            key={idx}
                            style={{
                              background: idx % 2 === 0 ? '#EFF6FF' : '#DBEAFE',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              color: '#1E293B',
                              borderBottom: '1px solid #CBD5E1',
                            }}
                          >
                            <td
                              style={{
                                padding: '12px 18px',
                                borderRight: '1px solid #CBD5E1',
                                color: row.type === 'debit' ? '#DC2626' : '#16A34A',
                                fontWeight: '800',
                              }}
                            >
                              {row.points}
                            </td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.details}</td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.startDate}</td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.expiredDate}</td>
                            <td style={{ padding: '12px 18px', fontWeight: '800' }}>{row.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

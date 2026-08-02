'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SellerSidebar from './components/SellerSidebar';
import RoleGuard from '../components/RoleGuard';
import { useAuth } from '../context/AuthContext';

export default function BusinessCenterDashboard() {
  const { user } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState('This Month');
  const [holidayMode, setHolidayMode] = useState(false);
  const [sellerBadge, setSellerBadge] = useState('Platinum'); // Platinum, Diamond, Golden, Silver, New
  const [showDisburseModal, setShowDisburseModal] = useState(false);
  const [disburseAmount, setDisburseAmount] = useState('');
  const [disburseSuccess, setDisburseSuccess] = useState('');

  const graphData = [
    { label: 'Jan', val: 45 },
    { label: 'Feb', val: 65 },
    { label: 'Mar', val: 85 },
    { label: 'Apr', val: 50 },
    { label: 'May', val: 95 },
    { label: 'Jun', val: 70 },
    { label: 'Jul', val: 100 },
  ];

  const handleDisburseSubmit = (e) => {
    e.preventDefault();
    setDisburseSuccess(`✓ Disburse Payout Request of $${disburseAmount || '1,000'} sent to Admin for Bank Transfer.`);
    setTimeout(() => {
      setDisburseSuccess('');
      setShowDisburseModal(false);
      setDisburseAmount('');
    }, 2500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <RoleGuard allowedRoles={['PLANNER']}>
        <main className="figma-main-content">
          <div className="seller-layout-grid">
            <SellerSidebar />

            <div className="seller-main-content">
              {/* Header Banner Card with Holiday Mode & Seller Badge */}
              <div className="seller-card">
                <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Business Center Dashboard</h2>
                      
                      {/* Seller Level Badge (PDF Page 1) */}
                      <span
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)',
                          color: '#ffffff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          letterSpacing: '0.5px',
                        }}
                      >
                        🏆 {sellerBadge} Seller
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
                      Welcome back, {user?.name || 'Planner Agency'}! Manage tour packages, track revenue graphs, and disburse payouts.
                    </p>
                  </div>


                </div>

                {/* Revenue Overview Metrics Grid (PDF Page 1) */}
                <div className="seller-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                  <div className="metric-card" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <span className="label">Total Sales (Total Income)</span>
                    <span className="value" style={{ color: '#1D4ED8' }}>$45,200</span>
                    <span className="subtext">↑ +14.2% from last month</span>
                  </div>
                  <div className="metric-card" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <span className="label">Hold Amount (Hold Balance)</span>
                    <span className="value" style={{ color: '#B45309' }}>$3,400</span>
                    <span className="subtext">Pending Tour Completion</span>
                  </div>
                  <div className="metric-card" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                    <span className="label">Total Disbursed</span>
                    <span className="value" style={{ color: '#047857' }}>$38,500</span>
                    <button
                      onClick={() => setShowDisburseModal(true)}
                      style={{
                        background: '#047857',
                        color: '#ffffff',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '4px',
                      }}
                    >
                      💳 Request Disburse
                    </button>
                  </div>
                  <div className="metric-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <span className="label">Admin Commission</span>
                    <span className="value" style={{ color: '#475569' }}>$3,300</span>
                    <span className="subtext">10% Platform Fee</span>
                  </div>
                  <div className="metric-card">
                    <span className="label">Seller Average Rating</span>
                    <span className="value" style={{ color: '#FF9900' }}>4.9 ★</span>
                    <span className="subtext">98% Positive Reviews</span>
                  </div>
                </div>
              </div>

              {/* Analytics & Revenue Graphs (PDF Page 1) */}
              <div className="seller-card">
                <div className="seller-card-title">
                  <span>Revenue &amp; Visitor Analytics Graph</span>
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>

                <div className="seller-graph-grid">
                  <div className="graph-box">
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px' }}>Monthly Income &amp; Sales Graph ($)</div>
                    <div className="graph-bars">
                      {graphData.map((item) => (
                        <div key={item.label} className="graph-bar-col">
                          <div className="graph-bar-fill" style={{ height: `${item.val}%` }} />
                          <span className="graph-bar-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="graph-box" style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Promotions &amp; Followers</div>
                    <div style={{ fontSize: '0.85rem' }}>
                      <strong>Follower Count:</strong> 1,240 Followers
                    </div>
                    <div style={{ fontSize: '0.85rem' }}>
                      <strong>Active Offers:</strong> 3 Promotions
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
                    <Link href="/business-center/followers" className="btn-seller-primary" style={{ padding: '10px 14px', fontSize: '0.8rem', justifyContent: 'center' }}>
                      🎁 Send Offer to Followers
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="seller-card">
                <div className="seller-card-title">
                  <span>Recent Tourist Bookings</span>
                  <Link href="/business-center/orders" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                    View All Orders →
                  </Link>
                </div>

                <table className="seller-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Package Title</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-9481</td>
                      <td>Sanjid Rahman</td>
                      <td>Tenting at Cox's Bazar</td>
                      <td>15 Feb 2026</td>
                      <td>$200</td>
                      <td><span className="status-pill success">Approved</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-9482</td>
                      <td>Anika Tabassum</td>
                      <td>Sajek Valley Helipad Tour</td>
                      <td>18 Feb 2026</td>
                      <td>$350</td>
                      <td><span className="status-pill pending">Order Placed</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-9483</td>
                      <td>Tanvir Hasan</td>
                      <td>Paris Eiffel Tower &amp; Museum</td>
                      <td>22 Feb 2026</td>
                      <td>$1,200</td>
                      <td><span className="status-pill success">Approved</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </RoleGuard>

      {/* Income Disburse Request Modal (PDF Page 1) */}
      {showDisburseModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', maxWidth: '440px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Income Disburse Request</h3>
              <button onClick={() => setShowDisburseModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {disburseSuccess ? (
              <div style={{ color: '#047857', fontWeight: 800, padding: '16px', background: '#ECFDF5', borderRadius: '10px', fontSize: '0.9rem', textAlign: 'center' }}>
                {disburseSuccess}
              </div>
            ) : (
              <form onSubmit={handleDisburseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Available Disburse Balance</label>
                  <strong style={{ fontSize: '1.3rem', color: '#047857' }}>$38,500.00</strong>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Disburse Amount ($) *</label>
                  <input
                    type="number"
                    value={disburseAmount}
                    onChange={(e) => setDisburseAmount(e.target.value)}
                    placeholder="Enter amount to disburse"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Payout Method</label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}>
                    <option>Bank Transfer (Dutch-Bangla Bank Ltd)</option>
                    <option>Online Transfer (bKash / Nagad Business)</option>
                  </select>
                </div>

                <button type="submit" className="btn-seller-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: '6px' }}>
                  Submit Disburse Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

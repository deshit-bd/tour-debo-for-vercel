'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SellerSidebar from './components/SellerSidebar';
import RoleGuard from '../components/RoleGuard';
import { useAuth } from '../context/AuthContext';

const MASTER_BOOKINGS = [
  { id: '#ORD-9492', customer: 'Raihan Ahmed', package: 'Sylhet Ratargul Swamp Forest', date: '10 Aug 2026', amount: '৳15,000', amountNum: 15000, status: 'Approved' },
  { id: '#ORD-9491', customer: 'Shahriar Kabir', package: "Saint Martin's Island Resort", date: '15 Aug 2026', amount: '৳25,000', amountNum: 25000, status: 'Approved' },
  { id: '#ORD-9490', customer: 'Nusrat Jahan', package: "Cox's Bazar Beach Tour", date: '18 Aug 2026', amount: '৳30,000', amountNum: 30000, status: 'Order Placed' },
  { id: '#ORD-9489', customer: 'Mehedi Hasan', package: 'Bandarban Chimbuk Hill', date: '21 Aug 2026', amount: '৳40,000', amountNum: 40000, status: 'Approved' },
  { id: '#ORD-9485', customer: 'Farzana Parveen', package: 'Sreemangal Tea Garden Tour', date: '02 Aug 2026', amount: '৳18,000', amountNum: 18000, status: 'Approved' },
  { id: '#ORD-9481', customer: 'Sanjid Rahman', package: "Tenting at Cox's Bazar", date: '15 Feb 2026', amount: '৳20,000', amountNum: 20000, status: 'Approved' },
  { id: '#ORD-9482', customer: 'Anika Tabassum', package: 'Sajek Valley Helipad Tour', date: '18 Feb 2026', amount: '৳35,000', amountNum: 35000, status: 'Order Placed' },
  { id: '#ORD-9483', customer: 'Tanvir Hasan', package: 'Paris Eiffel Tower & Museum', date: '22 Feb 2026', amount: '৳1,20,000', amountNum: 120000, status: 'Approved' },
  { id: '#ORD-9475', customer: 'Farhana Akter', package: 'Sundarbans Cruise Tour', date: '20 Jan 2026', amount: '৳45,000', amountNum: 45000, status: 'Approved' },
  { id: '#ORD-9460', customer: 'Mahmudul Hasan', package: 'Sylhet Ratargul & Jaflong', date: '12 Dec 2025', amount: '৳28,000', amountNum: 28000, status: 'Approved' },
  { id: '#ORD-9410', customer: 'Kamrul Islam', package: 'Bandarban Nilgiri Tour', date: '05 Nov 2025', amount: '৳32,000', amountNum: 32000, status: 'Approved' },
];

export default function BusinessCenterDashboard() {
  const { user } = useAuth();
  
  // Section 0: Dashboard Overview Metrics Date Period State
  const [overviewPeriod, setOverviewPeriod] = useState('30_days');
  const [overviewStartDate, setOverviewStartDate] = useState('2026-08-01');
  const [overviewEndDate, setOverviewEndDate] = useState('2026-08-31');

  // Section 1: Revenue & Visitor Analytics Graph Period State
  const [graphPeriod, setGraphPeriod] = useState('30_days');
  const [graphStartDate, setGraphStartDate] = useState('2026-08-10');
  const [graphEndDate, setGraphEndDate] = useState('2026-08-22');

  // Section 2: Recent Tourist Bookings Period State
  const [bookingsPeriod, setBookingsPeriod] = useState('30_days');
  const [bookingsStartDate, setBookingsStartDate] = useState('2026-08-10');
  const [bookingsEndDate, setBookingsEndDate] = useState('2026-08-22');

  const [sellerBadge, setSellerBadge] = useState('Platinum');
  const [showDisburseModal, setShowDisburseModal] = useState(false);
  const [disburseAmount, setDisburseAmount] = useState('');
  const [disburseSuccess, setDisburseSuccess] = useState('');

  const [holidayModeActive, setHolidayModeActive] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_holiday_mode');
      if (saved !== null) {
        setHolidayModeActive(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Dynamic Overview Metrics Calculation
  const overviewMetrics = useMemo(() => {
    let sales = 452000;
    let hold = 34000;
    let disbursed = 385000;
    let commission = 33000;
    let growth = '↑ +14.2% from last month';

    if (overviewPeriod === '30_days') {
      sales = 452000;
      hold = 34000;
      disbursed = 385000;
      commission = 33000;
      growth = '↑ +14.2% from last month';
    } else if (overviewPeriod === '3_months') {
      sales = 1285000;
      hold = 95000;
      disbursed = 1050000;
      commission = 98000;
      growth = '↑ +18.5% from last quarter';
    } else if (overviewPeriod === '6_months') {
      sales = 2450000;
      hold = 180000;
      disbursed = 2010000;
      commission = 190000;
      growth = '↑ +22.1% from last 6 months';
    } else if (overviewPeriod === 'custom') {
      if (overviewStartDate && overviewEndDate) {
        const start = new Date(overviewStartDate + 'T00:00:00');
        const end = new Date(overviewEndDate + 'T23:59:59');
        const inRange = MASTER_BOOKINGS.filter(b => {
          const d = new Date(b.date);
          return d >= start && d <= end;
        });
        const total = inRange.reduce((acc, curr) => acc + curr.amountNum, 0);
        if (total > 0) {
          sales = total;
          hold = Math.round(total * 0.1);
          disbursed = Math.round(total * 0.8);
          commission = Math.round(total * 0.1);
        } else {
          sales = 0;
          hold = 0;
          disbursed = 0;
          commission = 0;
        }
        growth = `${inRange.length} orders found`;
      }
    }

    return { sales, hold, disbursed, commission, growth };
  }, [overviewPeriod, overviewStartDate, overviewEndDate]);

  // Real Dynamic Filtering for Recent Tourist Bookings
  const filteredBookings = useMemo(() => {
    const refDate = new Date('2026-08-31T23:59:59');

    if (bookingsPeriod === '30_days') {
      const start = new Date('2026-08-01T00:00:00');
      return MASTER_BOOKINGS.filter(b => {
        const d = new Date(b.date);
        return d >= start && d <= refDate;
      });
    }

    if (bookingsPeriod === '3_months') {
      const start = new Date('2026-06-01T00:00:00');
      return MASTER_BOOKINGS.filter(b => {
        const d = new Date(b.date);
        return d >= start && d <= refDate;
      });
    }

    if (bookingsPeriod === '6_months') {
      const start = new Date('2026-03-01T00:00:00');
      return MASTER_BOOKINGS.filter(b => {
        const d = new Date(b.date);
        return d >= start && d <= refDate;
      });
    }

    if (bookingsPeriod === 'custom') {
      if (!bookingsStartDate || !bookingsEndDate) return MASTER_BOOKINGS;
      const start = new Date(bookingsStartDate + 'T00:00:00');
      const end = new Date(bookingsEndDate + 'T23:59:59');
      return MASTER_BOOKINGS.filter(b => {
        const d = new Date(b.date);
        return d >= start && d <= end;
      });
    }

    return MASTER_BOOKINGS;
  }, [bookingsPeriod, bookingsStartDate, bookingsEndDate]);

  // Real Dynamic Graph Bars for Section 1
  const graphBarsData = useMemo(() => {
    if (graphPeriod === '30_days') {
      return [
        { label: 'Week 1', val: 45 },
        { label: 'Week 2', val: 65 },
        { label: 'Week 3', val: 85 },
        { label: 'Week 4', val: 95 },
      ];
    }
    if (graphPeriod === '3_months') {
      return [
        { label: 'Jun 2026', val: 60 },
        { label: 'Jul 2026', val: 80 },
        { label: 'Aug 2026', val: 95 },
      ];
    }
    if (graphPeriod === '6_months') {
      return [
        { label: 'Mar 26', val: 40 },
        { label: 'Apr 26', val: 55 },
        { label: 'May 26', val: 70 },
        { label: 'Jun 26', val: 85 },
        { label: 'Jul 26', val: 90 },
        { label: 'Aug 26', val: 100 },
      ];
    }
    if (graphPeriod === 'custom') {
      if (!graphStartDate || !graphEndDate) return [{ label: 'Range', val: 50 }];
      const start = new Date(graphStartDate + 'T00:00:00');
      const end = new Date(graphEndDate + 'T23:59:59');
      const filtered = MASTER_BOOKINGS.filter(b => {
        const d = new Date(b.date);
        return d >= start && d <= end;
      });

      if (filtered.length === 0) {
        return [{ label: 'No Data', val: 5 }];
      }

      return filtered.map((b, idx) => ({
        label: b.date.split(' ').slice(0, 2).join(' '),
        val: Math.min(100, Math.max(20, Math.round((b.amountNum / 120000) * 100))),
      }));
    }
    return [
      { label: 'Week 1', val: 45 },
      { label: 'Week 2', val: 65 },
    ];
  }, [graphPeriod, graphStartDate, graphEndDate]);

  const handleDisburseSubmit = (e) => {
    e.preventDefault();
    setDisburseSuccess(`✓ Disburse Payout Request of ৳${disburseAmount || '1,000'} sent to Admin for Bank Transfer.`);
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
        <main className="figma-main-content seller-main-wrapper">
          <div className="seller-layout-grid">
            <SellerSidebar />

            <div className="seller-main-content">
              {holidayModeActive && (
                <div style={{ background: '#FEF2F2', border: '1.5px solid #FCA5A5', color: '#991B1B', padding: '14px 18px', borderRadius: '16px', marginBottom: '18px', boxShadow: '0 4px 12px rgba(239,68,68,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>🌴</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', display: 'block', color: '#991B1B' }}>Holiday Mode is Currently Active!</strong>
                      <span style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>Your store and packages are temporarily paused for new customer bookings. Toggle Holiday Mode in the left sidebar to resume your store.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Header Banner Card */}
              <div className="seller-card">
                <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Business Center Dashboard</h2>
                      
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

                  {/* Datewise Search Select Dropdown */}
                  <select
                    value={overviewPeriod}
                    onChange={(e) => setOverviewPeriod(e.target.value)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '10px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      outline: 'none',
                      background: '#FFFFFF',
                      color: '#000000',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="30_days">Last 30 Days</option>
                    <option value="3_months">Last 3 Month</option>
                    <option value="6_months">Last 6 Month</option>
                    <option value="custom">Selection Calendar</option>
                  </select>
                </div>

                {/* Inline Selection Calendar date inputs if custom selected */}
                {overviewPeriod === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', padding: '10px 14px', background: '#FAF5FF', borderRadius: '10px', border: '1px solid #E9D5FF', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7E22CE' }}>Selection Calendar Range:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>From:</label>
                      <input type="date" value={overviewStartDate} onChange={(e) => setOverviewStartDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>To:</label>
                      <input type="date" value={overviewEndDate} onChange={(e) => setOverviewEndDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                )}

                {/* Revenue Overview Metrics Grid */}
                <div className="seller-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginTop: '16px' }}>
                  <div className="metric-card" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <span className="label">Total Sales (Total Income)</span>
                    <span className="value" style={{ color: '#1D4ED8' }}>৳{overviewMetrics.sales.toLocaleString('en-IN')}</span>
                    <span className="subtext">{overviewMetrics.growth}</span>
                  </div>
                  <div className="metric-card" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <span className="label">Hold Amount (Hold Balance)</span>
                    <span className="value" style={{ color: '#B45309' }}>৳{overviewMetrics.hold.toLocaleString('en-IN')}</span>
                    <span className="subtext">Pending Tour Completion</span>
                  </div>
                  <div className="metric-card" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                    <span className="label">Total Disbursed</span>
                    <span className="value" style={{ color: '#047857' }}>৳{overviewMetrics.disbursed.toLocaleString('en-IN')}</span>
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
                    <span className="value" style={{ color: '#475569' }}>৳{overviewMetrics.commission.toLocaleString('en-IN')}</span>
                    <span className="subtext">10% Platform Fee</span>
                  </div>
                  <div className="metric-card">
                    <span className="label">Seller Average Rating</span>
                    <span className="value" style={{ color: '#FF9900' }}>4.9 ★</span>
                    <span className="subtext">98% Positive Reviews</span>
                  </div>
                </div>
              </div>

              {/* ── Section 1: Revenue & Visitor Analytics Graph ── */}
              <div className="seller-card">
                <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <span>Revenue &amp; Visitor Analytics Graph</span>
                  
                  <select
                    value={graphPeriod}
                    onChange={(e) => setGraphPeriod(e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600, outline: 'none' }}
                  >
                    <option value="30_days">Last 30 Days</option>
                    <option value="3_months">Last 3 Month</option>
                    <option value="6_months">Last 6 Month</option>
                    <option value="custom">Selection Calendar</option>
                  </select>
                </div>

                {/* Inline Selection Calendar date inputs if custom selected */}
                {graphPeriod === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '10px 14px', background: '#FAF5FF', borderRadius: '10px', border: '1px solid #E9D5FF', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7E22CE' }}>Selection Calendar Range:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>From:</label>
                      <input type="date" value={graphStartDate} onChange={(e) => setGraphStartDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>To:</label>
                      <input type="date" value={graphEndDate} onChange={(e) => setGraphEndDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                )}

                <div className="seller-graph-grid">
                  <div className="graph-box">
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px' }}>
                      Monthly Income &amp; Sales Graph (৳)
                    </div>
                    <div className="graph-bars">
                      {graphBarsData.map((item) => (
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
                    <Link href="/business-center/offers" className="btn-seller-primary" style={{ padding: '10px 14px', fontSize: '0.8rem', justifyContent: 'center' }}>
                      🎁 Manage Offers & Vouchers
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Recent Tourist Bookings ── */}
              <div className="seller-card">
                <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <span>Recent Tourist Bookings</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <select
                      value={bookingsPeriod}
                      onChange={(e) => setBookingsPeriod(e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600, outline: 'none' }}
                    >
                      <option value="30_days">Last 30 Days</option>
                      <option value="3_months">Last 3 Month</option>
                      <option value="6_months">Last 6 Month</option>
                      <option value="custom">Selection Calendar</option>
                    </select>

                    <Link href="/business-center/orders" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                      View All Orders →
                    </Link>
                  </div>
                </div>

                {/* Inline Selection Calendar date inputs if custom selected */}
                {bookingsPeriod === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '10px 14px', background: '#FAF5FF', borderRadius: '10px', border: '1px solid #E9D5FF', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7E22CE' }}>Selection Calendar Range:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>From:</label>
                      <input type="date" value={bookingsStartDate} onChange={(e) => setBookingsStartDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#64748B' }}>To:</label>
                      <input type="date" value={bookingsEndDate} onChange={(e) => setBookingsEndDate(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                )}

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
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#64748B', fontWeight: 600 }}>
                          No tourist bookings found for the selected date range.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((ord) => (
                        <tr key={ord.id}>
                          <td>{ord.id}</td>
                          <td>{ord.customer}</td>
                          <td>{ord.package}</td>
                          <td>{ord.date}</td>
                          <td>{ord.amount}</td>
                          <td><span className={`status-pill ${ord.status === 'Approved' ? 'success' : 'pending'}`}>{ord.status}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </RoleGuard>

      {/* Income Disburse Request Modal */}
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
                  <strong style={{ fontSize: '1.3rem', color: '#047857' }}>৳3,85,000.00</strong>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Disburse Amount (৳) *</label>
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

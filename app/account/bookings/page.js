'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [cancellingId, setCancellingId] = useState(null);
  const [disputeId, setDisputeId] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTab(params.get('status') || 'all');
  }, []);

  const changeTab = (status) => {
    setActiveTab(status);
    router.push(`/account/bookings?status=${status}`);
  };

  const [bookingsList, setBookingsList] = useState([
    {
      id: '8849201948102',
      date: '12 Jan 2026',
      name: 'Tenting at Cox\'s Bazar',
      qty: 3,
      status: 'Completed',
      orderType: 'Myself',
      currentStep: 6, // 0 to 6 index
      daysToTour: 0,
      steps: [
        { label: '1. Order Placed', done: true, by: 'Customer (Myself)' },
        { label: '2. Payment Completed', done: true, by: 'Customer' },
        { label: '3. Order Approved', done: true, by: 'Tour Operator' },
        { label: '4. Cancel Option (<20d Penalty)', done: false, by: 'Customer' },
        { label: '5. Tour Started', done: true, by: 'Tour Operator' },
        { label: '6. Tour Ended', done: true, by: 'Tour Operator' },
        { label: '7. Review & Dispute', done: true, by: 'Customer / Admin' },
      ],
    },
    {
      id: '8849201948103',
      date: '15 Feb 2026',
      name: 'Sajek Valley Tour',
      qty: 2,
      status: 'To Be Started',
      orderType: 'Gift for Family',
      currentStep: 2,
      daysToTour: 25,
      steps: [
        { label: '1. Order Placed', done: true, by: 'Customer (Gift)' },
        { label: '2. Payment Completed', done: true, by: 'Customer' },
        { label: '3. Order Approved', done: true, by: 'Tour Operator' },
        { label: '4. Cancel Option (<20d Penalty)', done: true, by: 'Eligible for 100% Refund' },
        { label: '5. Tour Started', done: false, by: 'Tour Operator' },
        { label: '6. Tour Ended', done: false, by: 'Tour Operator' },
        { label: '7. Review & Dispute', done: false, by: 'Customer' },
      ],
    },
    {
      id: '8849201948104',
      date: '20 Mar 2026',
      name: 'Paris City Tour',
      qty: 1,
      status: 'To Pay',
      orderType: 'Myself',
      currentStep: 0,
      daysToTour: 48,
      steps: [
        { label: '1. Order Placed', done: true, by: 'Customer' },
        { label: '2. Payment Pending', done: false, by: 'Customer' },
        { label: '3. Order Approved', done: false, by: 'Tour Operator' },
        { label: '4. Cancel Option (<20d Penalty)', done: false, by: 'Customer' },
        { label: '5. Tour Started', done: false, by: 'Tour Operator' },
        { label: '6. Tour Ended', done: false, by: 'Tour Operator' },
        { label: '7. Review & Dispute', done: false, by: 'Customer' },
      ],
    },
  ]);

  const handleCancelRequest = (bookingId, daysToTour) => {
    let msg = 'Are you sure you want to cancel this booking?';
    if (daysToTour < 20) {
      msg = '⚠️ Attention: Tour starts in under 20 days! A penalty charge of 25% will apply as per SRS rules. Proceed with cancellation?';
    } else {
      msg = '✓ You are cancelling more than 20 days prior. 100% full refund will be processed to your bank account.';
    }
    if (confirm(msg)) {
      setBookingsList((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
    }
  };

  const handleOpenDispute = (e, id) => {
    e.preventDefault();
    alert(`Dispute case #${id} submitted to Admin review panel. Admin will verify payment release or take dispute action.`);
    setDisputeId(null);
  };

  const filteredBookings = bookingsList.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'topay') return item.status === 'To Pay';
    if (activeTab === 'tostarted') return item.status === 'To Be Started';
    if (activeTab === 'completed') return item.status === 'Completed';
    if (activeTab === 'cancelled') return item.status === 'Cancelled';
    return true;
  });

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            <div className="account-section-card">
              <h3 className="card-title-lg">My Orders & Bookings (SRS Standard)</h3>

              <div className="account-sub-tabs-bar">
                <button className={`sub-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => changeTab('all')}>All</button>
                <button className={`sub-tab ${activeTab === 'topay' ? 'active' : ''}`} onClick={() => changeTab('topay')}>To Pay</button>
                <button className={`sub-tab ${activeTab === 'tostarted' ? 'active' : ''}`} onClick={() => changeTab('tostarted')}>To Be Started</button>
                <button className={`sub-tab ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => changeTab('completed')}>Completed</button>
                <button className={`sub-tab ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => changeTab('cancelled')}>Cancelled</button>
              </div>

              <div className="bookings-cards-stack" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredBookings.map((item) => (
                  <div key={item.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: '#111827' }}>{item.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                          ID #{item.id} • Booked on {item.date} • Type: <span style={{ color: '#2563EB', fontWeight: 'bold' }}>{item.orderType}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className={`booking-status-badge ${item.status === 'Completed' ? 'green-badge' : item.status === 'To Pay' ? 'topay-badge' : 'gray-badge'}`}>
                          {item.status}
                        </span>
                        {item.status === 'To Be Started' && (
                          <button
                            onClick={() => handleCancelRequest(item.id, item.daysToTour)}
                            style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            ✖ Cancel Tour (20d Rule)
                          </button>
                        )}
                        {item.status === 'Completed' && (
                          <button
                            onClick={() => setDisputeId(item.id)}
                            style={{ background: '#FFFBEB', border: '1px solid #FCD34D', color: '#B45309', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            ⚠️ File Dispute Case
                          </button>
                        )}
                      </div>
                    </div>

                    {/* SRS 7-Step Order Status Stepper */}
                    <div style={{ background: '#FAFAFA', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>
                        📊 SRS Order Process Status Stepper (Activities Checkmark):
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                        {item.steps.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              background: st.done ? '#DEF7EC' : '#F3F4F6',
                              border: st.done ? '1px solid #31C48D' : '1px solid #E5E7EB',
                              color: st.done ? '#03543F' : '#6B7280',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: '600',
                              textAlign: 'center',
                            }}
                          >
                            <div>{st.done ? '✓' : '⏳'} {st.label}</div>
                            <div style={{ fontSize: '0.68rem', opacity: 0.8, marginTop: '2px' }}>{st.by}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {disputeId === item.id && (
                      <form onSubmit={(e) => handleOpenDispute(e, item.id)} style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '14px', borderRadius: '12px', marginTop: '14px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#991B1B', marginBottom: '8px' }}>Submit Dispute to Admin Panel:</h4>
                        <textarea
                          rows="2"
                          placeholder="Describe the dispute issue (e.g., service mismatch, schedule delay)..."
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          required
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #FCA5A5', fontSize: '0.85rem' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <button type="submit" style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Submit to Admin</button>
                          <button type="button" onClick={() => setDisputeId(null)} style={{ background: '#E5E7EB', color: '#374151', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

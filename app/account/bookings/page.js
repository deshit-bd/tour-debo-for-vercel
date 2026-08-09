'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import ReviewModal from '../../components/ReviewModal';

function BookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('status') || 'all';
  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyId = (id) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const changeTab = (status) => {
    router.push(`/account/bookings?status=${status}`);
  };

  const bookingsList = [
    {
      id: '8849201948102',
      date: '12 Jan 2026',
      name: "Tenting at Cox's Bazar",
      qty: 3,
      rating: '4.8',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '8849201948103',
      date: '15 Feb 2026',
      name: 'Sajek Valley Tour',
      qty: 2,
      rating: '4.9',
      status: 'Payment Due',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '8849201948104',
      date: '20 Mar 2026',
      name: 'Paris City Tour',
      qty: 1,
      rating: '4.7',
      status: 'To Be Started',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '8849201948105',
      date: '01 Apr 2026',
      name: 'Canada Student Visa Assistance',
      qty: 1,
      rating: '4.9',
      status: 'Cancelled',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const filteredBookings = bookingsList.filter((item) => {
    if (activeTab === 'topay') return item.status === 'Payment Due' || item.status === 'To Pay';
    if (activeTab === 'tostarted') return item.status === 'To Be Started';
    if (activeTab === 'completed') return item.status === 'Completed';
    if (activeTab === 'cancelled') return item.status === 'Cancelled';
    return true;
  });

  return (
    <div className="account-main-area">
      <div className="account-section-card">
        <h3 className="card-title-lg">My Bookings</h3>

        {/* Status Filter Tabs */}
        <div className="account-sub-tabs-bar">
          <button className={`sub-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => changeTab('all')}>All</button>
          <button className={`sub-tab ${activeTab === 'topay' ? 'active' : ''}`} onClick={() => changeTab('topay')}>Payment Due</button>
          <button className={`sub-tab ${activeTab === 'tostarted' ? 'active' : ''}`} onClick={() => changeTab('tostarted')}>To Be Started</button>
          <button className={`sub-tab ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => changeTab('completed')}>Completed</button>
          <button className={`sub-tab ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => changeTab('cancelled')}>Cancelled</button>
        </div>

        {/* Premium Bookings Table */}
        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94A3B8', background: '#ffffff', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>No bookings found for this category.</p>
          </div>
        ) : (
          <div className="premium-table-card">
            <div className="premium-table-scroll">
              <table className="premium-bookings-table">
                <thead>
                  <tr>
                    <th style={{ width: '44%', textAlign: 'left' }}>Package &amp; Booking Info</th>
                    <th style={{ width: '15%', textAlign: 'center' }}>Quantity</th>
                    <th style={{ width: '17%', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '24%', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((item, idx) => (
                    <tr key={item.id || idx} className="premium-table-row">
                      {/* Column 1: Package Info */}
                      <td>
                        <div className="package-cell-flex">
                          <div className="booking-thumb-box">
                            <Image src={item.image} alt={item.name} fill className="thumb-img" />
                          </div>
                          <div className="package-meta-box">
                            <span className="booking-item-name">{item.name}</span>
                            <div className="package-sub-meta">
                              <span className="rating-pill">★ {item.rating} Rating</span>
                              <span className="dot-sep">•</span>
                              <span
                                className="booking-id-tag"
                                onClick={() => handleCopyId(item.id)}
                                title="Click to copy Booking ID"
                              >
                                ID: #{item.id}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={copiedId === item.id ? '#16A34A' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  {copiedId === item.id ? (
                                    <polyline points="20 6 9 17 4 12" />
                                  ) : (
                                    <>
                                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </>
                                  )}
                                </svg>
                                {copiedId === item.id && <span className="copy-feedback-text">Copied!</span>}
                              </span>
                              <span className="dot-sep">•</span>
                              <span className="date-tag">{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Quantity */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="qty-value-badge">Quantity - {item.qty}</span>
                      </td>

                      {/* Column 3: Status */}
                      <td style={{ textAlign: 'center' }}>
                        <span className={`booking-status-badge ${
                          item.status === 'Completed' ? 'green-badge' :
                          item.status === 'Payment Due' || item.status === 'To Pay' ? 'topay-badge' :
                          item.status === 'Cancelled' ? 'red-badge' : 'gray-badge'
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Column 4: Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <div className="actions-flex-group">
                          {item.status === 'Completed' && (
                            <button
                              onClick={() => setReviewModalItem(item)}
                              className="btn-action-review"
                            >
                              Review
                            </button>
                          )}
                          <Link href={`/account/bookings/${item.id}`} className="btn-action-details">
                            Details &amp; Receipt
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal Window */}
      {reviewModalItem && (
        <ReviewModal
          item={reviewModalItem}
          onClose={() => setReviewModalItem(null)}
          onSubmitSuccess={() => router.push('/account/reviews?tab=history')}
        />
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />
          <Suspense fallback={<div style={{ padding: '24px', background: '#fff', borderRadius: '16px' }}>Loading bookings...</div>}>
            <BookingsContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

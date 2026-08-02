'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import ReviewModal from '../../components/ReviewModal';

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [reviewModalItem, setReviewModalItem] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTab(params.get('status') || 'all');
  }, []);

  const changeTab = (status) => {
    setActiveTab(status);
    router.push(`/account/bookings?status=${status}`);
  };

  const bookingsList = [
    {
      id: '8849201948102',
      date: '12 Jan 2026',
      name: 'Tenting at Cox\'s Bazar',
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
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

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

              {/* Booking List Cards */}
              <div className="bookings-cards-stack">
                {filteredBookings.map((item, idx) => (
                  <div key={idx} className="booking-card-row-figma">
                    <div className="booking-row-header">
                      <small className="booking-id-text">ID #{item.id}</small>
                      <small className="booking-date-text">Booking Date : {item.date}</small>
                    </div>

                    <div className="booking-row-body">
                      <div className="booking-item-cell" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="booking-thumb-box">
                          <Image src={item.image} alt={item.name} fill className="thumb-img" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span className="booking-item-name">{item.name}</span>
                          <span style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            ★ {item.rating} Rating
                          </span>
                        </div>
                      </div>

                      <div className="booking-qty">Quantity - {item.qty}</div>

                      <div className={`booking-status-badge ${item.status === 'Completed' ? 'green-badge' : item.status === 'Payment Due' || item.status === 'To Pay' ? 'topay-badge' : 'gray-badge'}`}>
                        {item.status}
                      </div>

                      {/* Action buttons: Review for Completed orders, or Details link */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {item.status === 'Completed' && (
                          <button
                            onClick={() => setReviewModalItem(item)}
                            style={{
                              background: '#FF6B00',
                              color: '#fff',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontSize: '0.82rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Review
                          </button>
                        )}
                        <Link href="/tours/paris" className="link-details-btn">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal Window (PDF Page 7) */}
      {reviewModalItem && (
        <ReviewModal
          item={reviewModalItem}
          onClose={() => setReviewModalItem(null)}
          onSubmitSuccess={() => router.push('/account/reviews?tab=history')}
        />
      )}

      <Footer />
    </div>
  );
}

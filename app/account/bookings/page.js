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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTab(params.get('status') || 'all');
  }, []);

  const changeTab = (status) => {
    setActiveTab(status);
    router.push(`/account/bookings?status=${status}`);
  };

  const bookingsList = [
    { id: '8849201948102', date: '12 Jan 2026', name: 'Tenting at Cox\'s Bazar', qty: 3, status: 'Completed' },
    { id: '8849201948103', date: '15 Feb 2026', name: 'Sajek Valley Tour', qty: 2, status: 'To Pay' },
    { id: '8849201948104', date: '20 Mar 2026', name: 'Paris City Tour', qty: 1, status: 'To Be Started' },
    { id: '8849201948105', date: '01 Apr 2026', name: 'Canada Student Visa Assistance', qty: 1, status: 'Cancelled' },
  ];

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
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Area: My Bookings Card */}
          <div className="account-main-area">
            <div className="account-section-card">
              <h3 className="card-title-lg">My Bookings</h3>

              {/* Status Filter Tabs */}
              <div className="account-sub-tabs-bar">
                <button className={`sub-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => changeTab('all')}>All</button>
                <button className={`sub-tab ${activeTab === 'topay' ? 'active' : ''}`} onClick={() => changeTab('topay')}>To Pay</button>
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
                      <div className="booking-item-cell">
                        <div className="booking-thumb-box">
                          <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" alt="Tour" fill className="thumb-img" />
                        </div>
                        <span className="booking-item-name">{item.name}</span>
                      </div>

                      <div className="booking-qty">Quantity - {item.qty}</div>

                      <div className={`booking-status-badge ${item.status === 'Completed' ? 'green-badge' : item.status === 'To Pay' ? 'topay-badge' : 'gray-badge'}`}>
                        {item.status}
                      </div>

                      <Link href="/tours/paris" className="link-details-btn">Details</Link>
                    </div>
                  </div>
                ))}
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

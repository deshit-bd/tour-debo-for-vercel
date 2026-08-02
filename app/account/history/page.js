'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState('topay');

  const topayList = [
    { id: '8849201948102', date: '12 Jan 2026', name: 'Tenting at Cox\'s Bazar', qty: 3, status: 'To Pay' },
    { id: '8849201948103', date: '15 Feb 2026', name: 'Sajek Valley Tour', qty: 2, status: 'To Pay' },
    { id: '8849201948104', date: '20 Mar 2026', name: 'Paris City Tour', qty: 1, status: 'To Pay' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card">
              <h3 className="card-title-lg">My Bookings</h3>

              {/* Status Filter Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/bookings" className="sub-tab">All</Link>
                <button className={`sub-tab ${activeTab === 'topay' ? 'active' : ''}`} onClick={() => setActiveTab('topay')}>Payment Due</button>
                <Link href="/account/bookings" className="sub-tab">To Be Started</Link>
                <Link href="/account/bookings" className="sub-tab">Completed</Link>
                <Link href="/account/bookings" className="sub-tab">Cancelled</Link>
              </div>

              {/* Booking List Cards */}
              <div className="bookings-cards-stack">
                {topayList.map((item, idx) => (
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

                      <div className="booking-status-badge topay-badge">{item.status}</div>

                      <Link href="/checkout" className="link-details-btn">Pay Now</Link>
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

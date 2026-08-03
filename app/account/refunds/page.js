'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MyRefundsPage() {
  const refundsList = [
    { id: '8849201948102', date: '12 Jan 2026', name: 'Tenting at Cox\'s Bazar', qty: 3, status: 'Full Refunded' },
    { id: '8849201948103', date: '15 Feb 2026', name: 'Sajek Valley Tour', qty: 2, status: 'In Review' },
    { id: '8849201948104', date: '20 Mar 2026', name: 'Paris City Tour', qty: 1, status: 'Partial Refunded' },
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
              <div className="card-header-flex">
                <h3 className="card-title-lg">My Appeal & Refunds</h3>
                <Link href="/account/dispute" className="btn-open-dispute">+ Open Dispute</Link>
              </div>

              {/* Status Filter Tabs */}
              <div className="account-sub-tabs-bar">
                <button className="sub-tab active">All Appeals</button>
              </div>

              {/* Refund Cards List */}
              <div className="bookings-cards-stack">
                {refundsList.map((item, idx) => (
                  <div key={idx} className="booking-card-row-figma">
                    <div className="booking-row-header">
                      <small className="booking-id-text">Booking Id : #{item.id}</small>
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

                      <div className="booking-status-badge green-badge">{item.status}</div>

                      <Link href="/account/dispute" className="link-details-btn">Details</Link>
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

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function HelpSuggestionsPage() {
  const [intention, setIntention] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Left Sidebar Navigation Card */}
          <aside className="account-sidebar-card">
            <div className="sidebar-menu-item">
              <Link href="/account">Overview</Link>
            </div>

            <div className="sidebar-menu-group">
              <h4>Manage My Account</h4>
              <ul>
                <li><Link href="/account/profile">My Profile</Link></li>
                <li><Link href="/account/bookings">My Bookings</Link></li>
                <li><Link href="/account/points">My Points</Link></li>
                <li><Link href="/account/refunds">My Appeal & Refunds</Link></li>
              </ul>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account/vouchers">Payment Options & Vouchers</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4>My Booking History</h4>
              <ul>
                <li><Link href="/account/bookings">All Booking</Link></li>
                <li><Link href="/account/bookings">To Pay</Link></li>
                <li><Link href="/account/bookings">To Be Started</Link></li>
                <li><Link href="/account/bookings">Cancelled Bookings</Link></li>
              </ul>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account/messages">Message Center</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account/favorites">Favorites & Followed Tour Planners</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4>My Reviews</h4>
              <ul>
                <li><Link href="/account">To Review</Link></li>
                <li><Link href="/account">History</Link></li>
              </ul>
            </div>

            <div className="sidebar-menu-group">
              <h4 className="active"><Link href="/account/help">Help Center</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account">Earn With Us</Link></h4>
            </div>
          </aside>

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card">
              <h3 className="card-title-lg">Help Center</h3>

              {/* Sub Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/help" className="sub-tab">Customer Service</Link>
                <Link href="/account/help/suggestions" className="sub-tab active">Suggestions</Link>
              </div>

              {/* Suggestions Form */}
              <div className="dispute-form-grid">
                <div className="proposal-reason-row">
                  <div className="field-block">
                    <label className="field-title">Please let us know what you would like to do :</label>
                    <input
                      type="text"
                      className="suggestion-text-input"
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                    />
                  </div>

                  <div className="field-block">
                    <label className="field-title">E-mail</label>
                    <input
                      type="email"
                      className="suggestion-text-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-block">
                  <label className="field-title">feedback</label>
                  <textarea
                    rows={6}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="dispute-textarea"
                  ></textarea>
                </div>

                <div className="field-block">
                  <label className="field-title">Provide a Photo</label>
                  <div className="evidence-upload-box">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                </div>

                <div className="dispute-submit-row">
                  <button className="btn-submit-blue">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <div className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </div>

      <Footer />
    </div>
  );
}

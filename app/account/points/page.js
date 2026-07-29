'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MyPointsPage() {
  const [referred, setReferred] = useState(false);

  const handleReferFriend = () => {
    navigator.clipboard.writeText('https://tour-dibo.com/referral?code=REF500');
    setReferred(true);
    setTimeout(() => setReferred(false), 3000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-top-bar-flex">
          <h2>Profile</h2>
          <button className="btn-refer-friend" onClick={handleReferFriend}>
            {referred ? '✓ Link Copied!' : '+ Refer a Friend'}
          </button>
        </div>

        <div className="account-layout-grid">
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Card: Points Balance */}
            <div className="points-balance-card">
              <h3>My Points Balance</h3>
              <div className="points-score-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9 9h6M9 15h6" />
                </svg>
                <span className="big-points-number">500</span>
              </div>
            </div>

            {/* Bottom Card: Vouchers Table */}
            <div className="account-section-card">
              <h3 className="card-title-lg">Vouchers</h3>
              <div className="recent-table-wrap">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Points</th>
                      <th>Details</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Valid till</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>500 Points</strong></td>
                      <td>Welcome Bonus Voucher</td>
                      <td>2026-01-01</td>
                      <td>2026-12-31</td>
                      <td>2026-12-31</td>
                      <td><Link href="/account/vouchers" className="link-details">$29.00 OFF</Link></td>
                    </tr>
                    <tr>
                      <td><strong>200 Points</strong></td>
                      <td>Referral Reward</td>
                      <td>2026-02-01</td>
                      <td>2026-12-31</td>
                      <td>2026-12-31</td>
                      <td><Link href="/account/vouchers" className="link-details">$15.00 OFF</Link></td>
                    </tr>
                    <tr>
                      <td><strong>100 Points</strong></td>
                      <td>Tour Review Reward</td>
                      <td>2026-03-01</td>
                      <td>2026-12-31</td>
                      <td>2026-12-31</td>
                      <td><Link href="/account/vouchers" className="link-details">$10.00 OFF</Link></td>
                    </tr>
                  </tbody>
                </table>
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

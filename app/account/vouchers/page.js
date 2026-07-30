'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function PaymentVouchersPage() {
  const [activeTab, setActiveTab] = useState('vouchers');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('REF2026TOUR');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Card: My Voucher */}
            <div className="my-voucher-top-card">
              <div className="voucher-hero-copy">
                <span className="account-eyebrow">Referral Reward</span>
                <h2>My Voucher</h2>
                <p>Share your referral code and redeem available discounts on your next trip.</p>
              </div>
              <div className="voucher-header-flex">
                <div className="voucher-code-wrap">
                  <span className="code-text">REF2026TOUR</span>
                  <button className="copy-icon-btn" onClick={handleCopyCode} aria-label="Copy Code">
                    {copied ? '✓ Copied' : '📋'}
                  </button>
                </div>
                <Link href="/checkout" className="btn-redeem-link">Redeem</Link>
              </div>
              <p className="voucher-referral-text">
                Refer with your Friends & Enjoy $29 Discount <span className="tc-badge">T & C</span>
              </p>
            </div>

            {/* Bottom Card: Payment Options & Vouchers */}
            <div className="account-section-card payment-options-card">
              <div className="account-sub-tabs-bar">
                <Link href="/account/payments" prefetch={false} className={`sub-tab ${activeTab === 'payments' ? 'active' : ''}`}>Payment Options</Link>
                <button className={`sub-tab ${activeTab === 'vouchers' ? 'active' : ''}`} onClick={() => setActiveTab('vouchers')}>Vouchers</button>
              </div>

              <div className="recent-table-wrap">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Valid From</th>
                      <th>Valid till</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Percentage</strong></td>
                      <td>DESH2026</td>
                      <td>20% OFF</td>
                      <td>01 Jan 2026</td>
                      <td>31 Dec 2026</td>
                      <td><Link href="/checkout" className="link-details">Redeem</Link></td>
                    </tr>
                    <tr>
                      <td><strong>Flat Amount</strong></td>
                      <td>SUMMER29</td>
                      <td>$29.00</td>
                      <td>01 Jun 2026</td>
                      <td>31 Aug 2026</td>
                      <td><Link href="/checkout" className="link-details">Redeem</Link></td>
                    </tr>
                    <tr>
                      <td><strong>Special Offer</strong></td>
                      <td>VISA10</td>
                      <td>$10.00</td>
                      <td>15 Feb 2026</td>
                      <td>15 Mar 2026</td>
                      <td><Link href="/visa/canada" className="link-details">Redeem</Link></td>
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

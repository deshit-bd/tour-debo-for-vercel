import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export const metadata = {
  title: 'Payment Options | Tour Dibo',
  description: 'Manage bKash and payment methods from Figma Design Image 16',
};

export default function PaymentOptionsPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card payment-options-card">
              <div className="payment-page-header">
                <div>
                  <span className="account-eyebrow">Wallet & Offers</span>
                  <h2>Payment Options</h2>
                  <p>Manage saved payment methods and apply vouchers during checkout.</p>
                </div>
              </div>

              <div className="account-sub-tabs-bar">
                <span className="sub-tab active">Payment Options</span>
                <Link href="/account/vouchers" prefetch={false} className="sub-tab">Vouchers</Link>
              </div>

              {/* bKash Payment Row */}
              <div className="payment-row-card">
                <div className="payment-brand-cell">
                  <span className="bkash-pink-logo">bK</span>
                  <div>
                    <strong>bKash</strong>
                    <small>Mobile financial service</small>
                  </div>
                </div>
                <div className="payment-account-number">
                  <small>Account Number</small>
                  <strong>12345678901</strong>
                </div>
                <div className="payment-action-cell">
                  <button className="btn-change-payment">Change</button>
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

import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';

export const metadata = {
  title: 'Message Center - Promotions | Tour Dibo',
  description: 'Promotions view from Figma Design Image 21',
};

export default function MessageCenterPromotionsPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Main Tabs Bar */}
            <div className="account-sub-tabs-bar">
              <Link href="/account/messages" className="sub-tab">Seller Chat</Link>
              <Link href="/account/messages/alerts" className="sub-tab">Alerts</Link>
              <Link href="/account/messages/promotions" className="sub-tab active">Promotions</Link>
            </div>

            {/* Promotions Container Cards */}
            <div className="promotions-stack">
              <div className="promo-box-card"></div>
              <div className="promo-box-card"></div>
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

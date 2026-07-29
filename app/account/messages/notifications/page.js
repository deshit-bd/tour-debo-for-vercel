import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Message Center - Notifications | Tour Dibo',
  description: 'Notifications view from Figma Design Image 20',
};

export default function NotificationsPage() {
  const alertsList = [
    { id: 1, text: 'DeshIT-BD Just Posted an Update' },
    { id: 2, text: 'DeshIT-BD Just Posted an Update' },
    { id: 3, text: 'DeshIT-BD Just Posted an Update' },
  ];

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
              <h4 className="active"><Link href="/account/messages">Message Center</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account">Favorites & Followed Tour Planners</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4>My Reviews</h4>
              <ul>
                <li><Link href="/account">To Review</Link></li>
                <li><Link href="/account">History</Link></li>
              </ul>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account">Help Center</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account">Earn With Us</Link></h4>
            </div>
          </aside>

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Main Tabs Bar */}
            <div className="account-sub-tabs-bar">
              <Link href="/account/messages" className="sub-tab">Seller Chat</Link>
              <Link href="/account/messages/alerts" className="sub-tab active">Alerts</Link>
              <Link href="/account/messages/notifications" className="sub-tab">Promotions</Link>
            </div>

            {/* Notifications Card */}
            <div className="account-section-card">
              <div className="alerts-stack">
                {alertsList.map((item) => (
                  <div key={item.id} className="alert-row-figma">
                    <span className="bell-icon">🔔</span>
                    <span className="alert-text-body">{item.text}</span>
                    <Link href="/tours/paris" className="link-view-alert">View</Link>
                  </div>
                ))}
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

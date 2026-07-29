import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountSidebar from '../components/AccountSidebar';

export const metadata = {
  title: 'User Account Profile Overview | Tour Dibo',
  description: 'User dashboard overview from Figma Design Image 8',
};

export default function AccountOverviewPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Dashboard Area */}
          <div className="account-main-area">
            {/* Top Stat Row (4 Cards) */}
            <div className="stat-widgets-row">
              <Link href="/account/favorites" className="stat-widget-card">
                <div className="widget-icon">♡</div>
                <span>Wishlist</span>
              </Link>
              <Link href="/account/favorites/planners" className="stat-widget-card">
                <div className="widget-icon">👥</div>
                <span>Following</span>
              </Link>
              <Link href="/account/bookings" className="stat-widget-card">
                <div className="widget-icon">👁</div>
                <span>Viewed</span>
              </Link>
              <Link href="/account/vouchers" className="stat-widget-card">
                <div className="widget-icon">🎟</div>
                <span>Vouchers</span>
              </Link>
            </div>

            {/* My Bookings Section */}
            <div className="account-section-card">
              <div className="card-header-flex">
                <h3>My Bookings</h3>
                <Link href="/account/bookings" className="link-view-all">View all &gt;</Link>
              </div>

              <div className="status-shortcuts-grid">
                <Link href="/account/bookings" className="status-box">
                  <div className="box-icon-blue">📅</div>
                  <span>All Bookings</span>
                </Link>
                <Link href="/account/history" className="status-box">
                  <div className="box-icon-blue">💳</div>
                  <span>To Pay</span>
                </Link>
                <Link href="/account/bookings" className="status-box">
                  <div className="box-icon-blue">⏳</div>
                  <span>To Be Started</span>
                </Link>
                <Link href="/account/bookings" className="status-box">
                  <div className="box-icon-blue">✔</div>
                  <span>Completed</span>
                </Link>
              </div>
            </div>

            {/* Recent Bookings Table Section */}
            <div className="account-section-card">
              <div className="card-header-flex">
                <h3>Recent Bookings</h3>
                <Link href="/account/bookings" className="link-view-all">View All &gt;</Link>
              </div>

              <div className="recent-table-wrap">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Booking Date</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx}>
                        <td>#884920{idx + 1}</td>
                        <td>2026-07-15</td>
                        <td>
                          <div className="table-item-cell">
                            <div className="item-thumb">
                              <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" alt="Tour" fill className="thumb-img" />
                            </div>
                            <span>Tenting at Cox's Bazar</span>
                          </div>
                        </td>
                        <td><strong>$200.00</strong></td>
                        <td>
                          <Link href="/tours/paris" className="link-details">Details</Link>
                        </td>
                      </tr>
                    ))}
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

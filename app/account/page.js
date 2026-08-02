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
                  <span>Payment Due</span>
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
                    {[
                      { id: '#8849201', date: '2026-07-15', name: "Tenting at Cox's Bazar", price: '$200.00', rating: '4.8', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80' },
                      { id: '#8849202', date: '2026-07-18', name: 'Sajek Valley Tour', price: '$250.00', rating: '4.9', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80' },
                      { id: '#8849203', date: '2026-07-22', name: 'Paris City Tour', price: '$1,200.00', rating: '4.7', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80' },
                      { id: '#8849204', date: '2026-08-01', name: 'Canada Student Visa Assistance', price: '$350.00', rating: '4.9', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=150&q=80' },
                    ].map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>
                          <div className="table-item-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="item-thumb">
                              <Image src={item.image} alt={item.name} fill className="thumb-img" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontWeight: '700', color: '#0F172A' }}>{item.name}</span>
                              <span style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                ★ {item.rating} Rating
                              </span>
                            </div>
                          </div>
                        </td>
                        <td><strong>{item.price}</strong></td>
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

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'My Reviews - To Review | Tour Dibo',
  description: 'Pending reviews from Figma Design Image 24',
};

export default function ToReviewPage() {
  const pendingReviews = [
    { id: 'xxxxxxxxxxxxxxxxxxxx', date: '12 Jan 2024', name: 'Cox\'s Bazar Beach Tour', qty: 3, status: 'Completed' },
    { id: 'xxxxxxxxxxxxxxxxxxxx', date: '12 Jan 2024', name: 'Sajek Valley Experience', qty: 3, status: 'Completed' },
    { id: 'xxxxxxxxxxxxxxxxxxxx', date: '12 Jan 2024', name: 'Paris City Tour', qty: 3, status: 'Completed' },
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
              <h4><Link href="/account/messages">Message Center</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4><Link href="/account/favorites">Favorites & Followed Tour Planners</Link></h4>
            </div>

            <div className="sidebar-menu-group">
              <h4 className="active"><Link href="/account/reviews">My Reviews</Link></h4>
              <ul>
                <li className="active"><Link href="/account/reviews">To Review</Link></li>
                <li><Link href="/account/reviews/history">History</Link></li>
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
            <div className="account-section-card">
              <h3 className="card-title-lg">My Reviews</h3>

              {/* Sub Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/reviews" className="sub-tab active">To Review</Link>
                <Link href="/account/reviews/history" className="sub-tab">History</Link>
              </div>

              {/* Items to Review */}
              <div className="bookings-cards-stack">
                {pendingReviews.map((item, idx) => (
                  <div key={idx} className="booking-card-row-figma">
                    <div className="booking-row-header">
                      <small className="booking-id-text">ID {item.id}</small>
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

                      <Link href="/tours/paris" className="link-details-btn">Details</Link>
                    </div>
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

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export const metadata = {
  title: 'My Reviews | Tour Dibo',
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
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card">
              <h3 className="card-title-lg">My Reviews</h3>

              {/* Sub Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/reviews" className="sub-tab active">My Reviews</Link>
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

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export const metadata = {
  title: 'Followed Tours | Tour Dibo',
  description: 'Favorites & followed tours from Figma Design Image 22',
};

export default function FollowedToursPage() {
  const followedTours = [
    { id: 'xxxxxxxxxxxxxxxxxxxx', name: 'Cox\'s Bazar Beach Tour', price: '$500', duration: '3 Days' },
    { id: 'xxxxxxxxxxxxxxxxxxxx', name: 'Sajek Valley Experience', price: '$500', duration: '5 Days' },
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
              <h3 className="card-title-lg">Favourites & Followed Tour Planners</h3>

              {/* Sub Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/favorites" className="sub-tab active">Followed Tours</Link>
                <Link href="/account/favorites/planners" className="sub-tab">Followed Planners</Link>
              </div>

              {/* Followed Tours Cards List */}
              <div className="bookings-cards-stack">
                {followedTours.map((item, idx) => (
                  <div key={idx} className="booking-card-row-figma">
                    <div className="booking-row-header">
                      <small className="booking-id-text">ID {item.id}</small>
                    </div>

                    <div className="booking-row-body">
                      <div className="booking-item-cell">
                        <div className="booking-thumb-box">
                          <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" alt="Tour" fill className="thumb-img" />
                        </div>
                        <span className="booking-item-name">{item.name}</span>
                      </div>

                      <div className="fav-tour-price">{item.price}</div>

                      <div className="days-pill-badge">{item.duration}</div>

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

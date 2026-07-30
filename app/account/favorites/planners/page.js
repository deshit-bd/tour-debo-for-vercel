import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';

export const metadata = {
  title: 'Followed Planners | Tour Dibo',
  description: 'Favorites & followed planners from Figma Design Image 23',
};

export default function FollowedPlannersPage() {
  const plannersList = [
    { id: 1, name: 'DeshIT-BD Planners', activeTours: '12 active tours', badge: 'Bronze Planner' },
    { id: 2, name: 'Travelers Hub BD', activeTours: '12 active tours', badge: 'Bronze Planner' },
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
                <Link href="/account/favorites" className="sub-tab">Followed Tours</Link>
                <Link href="/account/favorites/planners" className="sub-tab active">Followed Planners</Link>
              </div>

              {/* Followed Planners List */}
              <div className="bookings-cards-stack">
                {plannersList.map((item) => (
                  <div key={item.id} className="booking-card-row-figma">
                    <div className="booking-row-body">
                      <div className="booking-item-cell">
                        <div className="booking-thumb-box">
                          <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" alt="Planner" fill className="thumb-img" />
                        </div>
                        <span className="booking-item-name">{item.name}</span>
                      </div>

                      <div className="active-tours-count">{item.activeTours}</div>

                      <div className="planner-badge-cell">
                        <span className="check-icon-dark">✔</span> {item.badge}
                      </div>

                      <Link href="/guides/dhaka" className="link-details-btn">Details</Link>
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

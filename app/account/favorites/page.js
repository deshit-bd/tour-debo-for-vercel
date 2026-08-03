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
    {
      id: '8849201948102',
      name: 'Cox\'s Bazar Beach Tour',
      price: '$500',
      duration: '3 Days',
      rating: '4.8',
      reviews: '124',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '8849201948103',
      name: 'Sajek Valley Experience',
      price: '$500',
      duration: '5 Days',
      rating: '4.9',
      reviews: '98',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
    },
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
                      <small className="booking-id-text">Booking Id : #{item.id}</small>
                    </div>

                    <div className="booking-row-body">
                      <div className="booking-item-cell" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="booking-thumb-box">
                          <Image src={item.image} alt={item.name} fill className="thumb-img" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span className="booking-item-name">{item.name}</span>
                          <span style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            ★ {item.rating} ({item.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="fav-tour-price" style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>{item.price}</div>

                      <div className="days-pill-badge" style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>{item.duration}</div>

                      <Link href="/tours/paris" className="link-details-btn">Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

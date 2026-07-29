import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const contacts = [
  { icon: '📍', label: 'Lalmatia, Dhaka' },
  { icon: '💬', label: 'Chat Now' },
  { icon: '✉️', label: 'travel@gmail.com' },
  { icon: '📞', label: 'xxxxxxx' },
];

export default function HelpPage() {
  return (
    <main className="dashboard-shell">
      <Navbar />
      <div className="dashboard-layout">
        <aside className="dashboard-menu">
          <p className="menu-title">Profile</p>
          <p className="menu-link">Overview</p>
          <p className="menu-link">Manage My Account</p>
          <p className="menu-link">Payment Options & Vouchers</p>
          <p className="menu-link">My Booking History</p>
          <p className="menu-link">Message Center</p>
          <p className="menu-link">Favorites & Followed Tour Planners</p>
          <p className="menu-link">My Reviews</p>
          <p className="menu-link">Help Center</p>
          <p className="menu-link">Earn With Us</p>
        </aside>

        <section className="dashboard-panel">
          <div className="help-card">
            <h3>Help Center</h3>
            <div className="help-grid">
              {contacts.map((item) => (
                <div key={item.label} className="help-item">
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

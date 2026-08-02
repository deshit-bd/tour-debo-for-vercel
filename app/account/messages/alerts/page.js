import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';

export const metadata = {
  title: 'Message Center - Alerts | Tour Dibo',
  description: 'Alert notifications from Figma Design',
};

export default function MessageCenterAlertsPage() {
  const alertsList = [
    { id: 1, title: 'DeshIT-BD Just Posted an Update', time: '10 mins ago', bg: '#EFF6FF', border: '#BFDBFE', badgeBg: '#2563EB', badgeText: '#fff', icon: '📣' },
    { id: 2, title: 'Special Discount Voucher Available for Sajek Tour', time: '2 hours ago', bg: '#ECFDF5', border: '#A7F3D0', badgeBg: '#10B981', badgeText: '#fff', icon: '🎁' },
    { id: 3, title: 'Weather & Flight Update for Paris Package', time: '1 day ago', bg: '#FFFBEB', border: '#FDE68A', badgeBg: '#F59E0B', badgeText: '#fff', icon: '☀️' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Main Tabs Bar */}
            <div className="account-sub-tabs-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <Link
                href="/account/messages"
                style={{
                  padding: '10px 24px', borderRadius: '999px', border: '1px solid #E2E8F0',
                  background: '#ffffff', color: '#0F172A', fontWeight: '600', fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Seller Chat
              </Link>
              <Link
                href="/account/messages/alerts"
                style={{
                  padding: '10px 24px', borderRadius: '999px', border: 'none',
                  background: '#2563EB', color: '#ffffff', fontWeight: '700', fontSize: '0.9rem',
                  textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
                }}
              >
                Alerts
              </Link>
              <Link
                href="/account/messages/notifications"
                style={{
                  padding: '10px 24px', borderRadius: '999px', border: '1px solid #E2E8F0',
                  background: '#ffffff', color: '#0F172A', fontWeight: '600', fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Promotions
              </Link>
            </div>

            {/* Alerts Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {alertsList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: item.bg,
                    border: `1.5px solid ${item.border}`,
                    borderRadius: '16px',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  {/* Left Content (Icon + Text Stack) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                    <span
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: item.badgeBg,
                        color: item.badgeText,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.05rem',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                      <strong
                        style={{
                          fontSize: '0.88rem',
                          color: '#1E293B',
                          fontWeight: '700',
                          lineHeight: '1.3',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.time}</span>
                    </div>
                  </div>

                  {/* Compact Right-Aligned "View Details" Button */}
                  <Link
                    href="/tours/paris"
                    style={{
                      background: '#ffffff',
                      border: `1px solid ${item.border}`,
                      color: '#0F172A',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease',
                      marginLeft: 'auto',
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

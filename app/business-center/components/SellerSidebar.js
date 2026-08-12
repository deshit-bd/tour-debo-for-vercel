'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function SellerSidebar() {
  const pathname = usePathname();
  const [holidayMode, setHolidayMode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_holiday_mode');
      if (saved !== null) {
        setHolidayMode(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load holiday mode:', e);
    }
  }, []);

  const handleToggleHoliday = () => {
    const nextState = !holidayMode;
    setHolidayMode(nextState);
    try {
      localStorage.setItem('planner_holiday_mode', JSON.stringify(nextState));
    } catch (e) {
      console.error('Failed to save holiday mode:', e);
    }
  };

  const menuGroups = [
    {
      groupTitle: 'Core Dashboard',
      items: [
        {
          href: '/business-center',
          label: 'Dashboard Overview',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          ),
        },
        {
          href: '/business-center/reviews',
          label: 'Customer Reviews',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
        },
        {
          href: '/business-center/notice',
          label: 'Notice Board',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: 'Packages & Visa Services',
      items: [
        {
          href: '/business-center/packages',
          label: 'Manage Packages',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
        },
        {
          href: '/business-center/packages/add',
          label: 'Add New Package',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          ),
        },
        {
          href: '/business-center/packages/manage-visa',
          label: 'Manage Visa',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
        },
        {
          href: '/business-center/packages/add-visa',
          label: 'Add Visa Service',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="15" y1="8" x2="19" y2="8" />
              <line x1="15" y1="12" x2="19" y2="12" />
            </svg>
          ),
        },
        {
          href: '/business-center/offers',
          label: 'Marketing & Discount',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          ),
        },
        {
          href: '/business-center/messages',
          label: 'Customer Messages & Chat',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: 'Tour Guide Profiles',
      items: [
        {
          href: '/business-center/packages/manage-guide',
          label: 'Manage Tour Guides',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
        {
          href: '/business-center/packages/add-guide',
          label: 'Add Tour Guide',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: 'Orders & Financials',
      items: [
        {
          href: '/business-center/orders',
          label: 'Orders & Bookings',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          ),
        },
        {
          href: '/business-center/revenue',
          label: 'Revenue & Payouts',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          ),
        },

        {
          href: '/business-center/disputes',
          label: 'Dispute Cases',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: 'Settings & Help',
      items: [
        {
          href: '/business-center/profile',
          label: 'Profile & Verification',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ),
        },
        {
          href: '/business-center/chat-settings',
          label: 'Chat Settings',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="10" x2="15" y2="10" />
            </svg>
          ),
        },
        {
          href: '/business-center/help',
          label: 'Help Center & Tickets',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ),
        },
        {
          href: '/business-center/policies',
          label: 'Business Policies',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <aside className="seller-sidebar">
      {/* Seller Rank & Level Badge */}
      <div className="seller-badge-box">
        <div className="seller-badge-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div className="seller-badge-info">
          <h4>{user?.name || 'Green Bengal Tours'}</h4>
          <span className="seller-level-pill">
            {user?.role === 'PLANNER' ? 'Platinum Seller' : 'Tourist Mode'}
          </span>
        </div>
      </div>

      {/* Verified Business Account Badge */}
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '10px 14px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', color: '#15803D', fontWeight: 'bold' }}>
          ✓ Verified Seller Account
        </div>
      </div>

      {/* Holiday Mode Toggle */}
      <div
        onClick={handleToggleHoliday}
        style={{
          background: holidayMode ? '#FEF2F2' : '#F8FAFC',
          border: `1.5px solid ${holidayMode ? '#FCA5A5' : '#CBD5E1'}`,
          padding: '12px 14px',
          borderRadius: '14px',
          cursor: 'pointer',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          userSelect: 'none',
        }}
        title={holidayMode ? "Disable Holiday Mode (Resume Store)" : "Enable Holiday Mode (Pause Store)"}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.86rem', color: holidayMode ? '#DC2626' : '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌴</span>
            <span>Holiday Mode</span>
          </div>
          <span style={{ display: 'block', color: holidayMode ? '#EF4444' : '#64748B', fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>
            {holidayMode ? 'Store Paused (No Bookings)' : 'Store Active & Open'}
          </span>
        </div>

        {/* Visual Switch */}
        <div style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: holidayMode ? '#EF4444' : '#CBD5E1',
          padding: '2px',
          transition: 'all 0.2s ease',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#FFFFFF',
            transform: holidayMode ? 'translateX(20px)' : 'translateX(0px)',
            transition: 'transform 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }} />
        </div>
      </div>

      {/* Categorized Premium Navigation Menu */}
      <nav className="seller-nav-menu">
        {menuGroups.map((group) => (
          <div key={group.groupTitle} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="seller-nav-group-title">{group.groupTitle}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`seller-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '../../context/AuthContext';

export default function SellerSidebar() {
  const pathname = usePathname();
  const [holidayMode, setHolidayMode] = useState(false);
  const { user, switchRole } = useAuth();

  const menuItems = [
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
      href: '/business-center/followers',
      label: 'Offer to Followers',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
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
          <h4>DeshIT - BD</h4>
          <span className="seller-level-pill">
            {user?.role === 'PLANNER' ? 'Platinum Seller' : 'Tourist Mode'}
          </span>
        </div>
      </div>

      {/* Role Switcher Box */}
      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', color: '#1E40AF', fontWeight: 'bold', marginBottom: '6px' }}>
          Active Role: {user?.role === 'PLANNER' ? '⚡ Planner / Seller' : '👤 Tourist'}
        </div>
        <button
          type="button"
          onClick={() => switchRole(user?.role === 'PLANNER' ? 'USER' : 'PLANNER')}
          style={{ background: '#2563EB', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
        >
          🔄 Switch to {user?.role === 'PLANNER' ? 'Tourist' : 'Planner'}
        </button>
      </div>

      {/* Holiday Mode Toggle */}
      <div className="seller-holiday-toggle">
        <span>Holiday Mode</span>
        <div
          className={`toggle-switch ${holidayMode ? 'active' : ''}`}
          onClick={() => setHolidayMode(!holidayMode)}
          title="Toggle Holiday Mode"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="seller-nav-menu">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`seller-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="icon" style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

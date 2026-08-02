'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function SidebarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navProps = { prefetch: false };

  const isBookingsPage = pathname === '/account/bookings';
  const hasStatusParam = searchParams.has('status');
  const rawStatus = searchParams.get('status');
  const fromParam = searchParams.get('from');

  // Exact single-active item conditions
  const isMyBookingsActive = isBookingsPage && !hasStatusParam;
  const isHistoryHeaderActive = pathname === '/account/history';

  const isAllBookingActive = isBookingsPage && hasStatusParam && rawStatus === 'all';
  const isPaymentDueActive = isBookingsPage && rawStatus === 'topay';
  const isToBeStartedActive = isBookingsPage && rawStatus === 'tostarted';
  const isCancelledActive = isBookingsPage && rawStatus === 'cancelled';

  const isMyPointsActive = pathname === '/account/points' && fromParam !== 'earn';
  const isEarnWithUsActive = pathname === '/account/points' && fromParam === 'earn';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'sticky', top: '16px', zIndex: 10, width: '100%', maxWidth: '270px', flexShrink: 0 }}>
      {/* Top Header Label */}
      <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', paddingLeft: '6px' }}>
        Profile
      </span>

      {/* Main Sidebar Card */}
      <aside className="account-sidebar-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '18px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: 'calc(100vh - 60px)', overflowY: 'auto', scrollbarWidth: 'thin' }}>
        
        {/* 1. Overview */}
        <div style={{ padding: '6px 10px', borderRadius: '8px', background: pathname === '/account' ? '#EFF6FF' : 'transparent' }}>
          <Link href="/account" {...navProps} style={{ textDecoration: 'none', fontSize: '1.05rem', fontWeight: '800', color: pathname === '/account' ? '#2563EB' : '#1E293B', display: 'block' }}>
            Overview
          </Link>
        </div>

        {/* 2. Manage My Account */}
        <div className="sidebar-menu-group" style={{ marginTop: '4px' }}>
          <Link href="/account/edit" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname === '/account/edit' ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Manage My Account
          </Link>
          <ul style={{ listStyle: 'none', paddingLeft: '22px', margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <li>
              <Link href="/account/profile" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: pathname === '/account/profile' ? '700' : '500', color: pathname === '/account/profile' ? '#2563EB' : '#64748B' }}>
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/account/bookings" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isMyBookingsActive ? '700' : '500', color: isMyBookingsActive ? '#2563EB' : '#64748B' }}>
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/account/points" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isMyPointsActive ? '700' : '500', color: isMyPointsActive ? '#2563EB' : '#64748B' }}>
                My Points
              </Link>
            </li>
            <li>
              <Link href="/account/refunds" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: pathname === '/account/refunds' ? '700' : '500', color: pathname === '/account/refunds' ? '#2563EB' : '#64748B' }}>
                My Appeal & Refunds
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Payment Options & Vouchers */}
        <div className="sidebar-menu-group">
          <Link href="/account/vouchers" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname.startsWith('/account/vouchers') || pathname.startsWith('/account/payments') ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Payment Options & Vouchers
          </Link>
        </div>

        {/* 4. My Booking History */}
        <div className="sidebar-menu-group">
          <Link href="/account/bookings?status=all" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: isHistoryHeaderActive ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            My Booking History
          </Link>
          <ul style={{ listStyle: 'none', paddingLeft: '22px', margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <li>
              <Link href="/account/bookings?status=all" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isAllBookingActive ? '700' : '500', color: isAllBookingActive ? '#2563EB' : '#64748B' }}>
                All Booking
              </Link>
            </li>
            <li>
              <Link href="/account/bookings?status=topay" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isPaymentDueActive ? '700' : '500', color: isPaymentDueActive ? '#2563EB' : '#64748B' }}>
                Payment Due
              </Link>
            </li>
            <li>
              <Link href="/account/bookings?status=tostarted" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isToBeStartedActive ? '700' : '500', color: isToBeStartedActive ? '#2563EB' : '#64748B' }}>
                To Be Started
              </Link>
            </li>
            <li>
              <Link href="/account/bookings?status=cancelled" {...navProps} style={{ textDecoration: 'none', fontSize: '0.82rem', fontWeight: isCancelledActive ? '700' : '500', color: isCancelledActive ? '#2563EB' : '#64748B' }}>
                Cancelled Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* 5. Message Center */}
        <div className="sidebar-menu-group">
          <Link href="/account/messages" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname.startsWith('/account/messages') ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Message Center
          </Link>
        </div>

        {/* 6. Favorites & Followed Tour Planners */}
        <div className="sidebar-menu-group">
          <Link href="/account/favorites" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname.startsWith('/account/favorites') ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Favorites & Followed Tour Planners
          </Link>
        </div>

        {/* 7. My Reviews */}
        <div className="sidebar-menu-group">
          <Link href="/account/reviews" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname.startsWith('/account/reviews') ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            My Reviews
          </Link>
        </div>

        {/* 8. Help Center */}
        <div className="sidebar-menu-group">
          <Link href="/account/help" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: pathname.startsWith('/account/help') ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Help Center
          </Link>
        </div>

        {/* 9. Earn With Us */}
        <div className="sidebar-menu-group">
          <Link href="/account/points?from=earn" {...navProps} style={{ textDecoration: 'none', fontSize: '0.92rem', fontWeight: '800', color: isEarnWithUsActive ? '#2563EB' : '#1E293B', display: 'block', padding: '4px 10px' }}>
            Earn With Us
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default function AccountSidebar() {
  return (
    <Suspense fallback={<div style={{ padding: '16px', background: '#fff', borderRadius: '16px' }}>Loading sidebar...</div>}>
      <SidebarInner />
    </Suspense>
  );
}

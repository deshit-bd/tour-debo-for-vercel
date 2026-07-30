'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountSidebar() {
  const pathname = usePathname();
  const isBookings = pathname === '/account/bookings';
  const navProps = { prefetch: false };

  return (
    <aside className="account-sidebar-card">
      <div className={`sidebar-menu-item ${pathname === '/account' ? 'active' : ''}`}>
        <Link href="/account" {...navProps}>Overview</Link>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname === '/account/edit' ? 'active' : ''}>
          <Link href="/account/edit" {...navProps}>Manage My Account</Link>
        </h4>
        <ul>
          <li className={pathname === '/account/profile' ? 'active' : ''}>
            <Link href="/account/profile" {...navProps}>My Profile</Link>
          </li>
          <li className={isBookings ? 'active' : ''}>
            <Link href="/account/bookings" {...navProps}>My Bookings</Link>
          </li>
          <li className={pathname === '/account/points' ? 'active' : ''}>
            <Link href="/account/points" {...navProps}>My Points</Link>
          </li>
          <li className={pathname === '/account/refunds' ? 'active' : ''}>
            <Link href="/account/refunds" {...navProps}>My Appeal & Refunds</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname === '/account/vouchers' || pathname === '/account/payments' ? 'active' : ''}>
          <Link href="/account/payments" {...navProps}>Payment Options & Vouchers</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <ul>
          <li>
            <Link href="/account/bookings?status=topay" {...navProps}>To Pay</Link>
          </li>
          <li>
            <Link href="/account/bookings?status=tostarted" {...navProps}>To Be Started</Link>
          </li>
          <li>
            <Link href="/account/bookings?status=cancelled" {...navProps}>Cancelled Bookings</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/messages') ? 'active' : ''}>
          <Link href="/account/messages" {...navProps}>Message Center</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/favorites') ? 'active' : ''}>
          <Link href="/account/favorites" {...navProps}>Favorites & Followed Tour Planners</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname === '/account/reviews' ? 'active' : ''}>
          <Link href="/account/reviews" {...navProps}>My Reviews</Link>
        </h4>
        <ul>
          <li className={pathname === '/account/reviews/history' ? 'active' : ''}>
            <Link href="/account/reviews/history" {...navProps}>History</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/help') ? 'active' : ''}>
          <Link href="/account/help" {...navProps}>Help Center</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4><Link href="/account/points" {...navProps}>Earn With Us</Link></h4>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="account-sidebar-card">
      <div className={`sidebar-menu-item ${pathname === '/account' ? 'active' : ''}`}>
        <Link href="/account">Overview</Link>
      </div>

      <div className="sidebar-menu-group">
        <h4>Manage My Account</h4>
        <ul>
          <li className={pathname === '/account/profile' ? 'active' : ''}>
            <Link href="/account/profile">My Profile</Link>
          </li>
          <li className={pathname === '/account/bookings' ? 'active' : ''}>
            <Link href="/account/bookings">My Bookings</Link>
          </li>
          <li className={pathname === '/account/points' ? 'active' : ''}>
            <Link href="/account/points">My Points</Link>
          </li>
          <li className={pathname === '/account/refunds' ? 'active' : ''}>
            <Link href="/account/refunds">My Appeal & Refunds</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname === '/account/vouchers' || pathname === '/account/payments' ? 'active' : ''}>
          <Link href="/account/vouchers">Payment Options & Vouchers</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4>My Booking History</h4>
        <ul>
          <li className={pathname === '/account/bookings' ? 'active' : ''}>
            <Link href="/account/bookings">All Booking</Link>
          </li>
          <li className={pathname === '/account/history' ? 'active' : ''}>
            <Link href="/account/history">To Pay</Link>
          </li>
          <li className={pathname === '/account/bookings' ? 'active' : ''}>
            <Link href="/account/bookings">To Be Started</Link>
          </li>
          <li className={pathname === '/account/bookings' ? 'active' : ''}>
            <Link href="/account/bookings">Cancelled Bookings</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/messages') ? 'active' : ''}>
          <Link href="/account/messages">Message Center</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/favorites') ? 'active' : ''}>
          <Link href="/account/favorites">Favorites & Followed Tour Planners</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4>My Reviews</h4>
        <ul>
          <li className={pathname === '/account/reviews' ? 'active' : ''}>
            <Link href="/account/reviews">To Review</Link>
          </li>
          <li className={pathname === '/account/reviews/history' ? 'active' : ''}>
            <Link href="/account/reviews/history">History</Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-menu-group">
        <h4 className={pathname.startsWith('/account/help') ? 'active' : ''}>
          <Link href="/account/help">Help Center</Link>
        </h4>
      </div>

      <div className="sidebar-menu-group">
        <h4><Link href="/account/points">Earn With Us</Link></h4>
      </div>
    </aside>
  );
}

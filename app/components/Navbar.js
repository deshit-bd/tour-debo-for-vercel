'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const pagesBarRef = useRef(null);

  const { currency, setCurrency, rates } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { user, login, logout, switchRole } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Auth System States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authRole, setAuthRole] = useState('USER'); // 'USER' or 'PLANNER'
  const [authName, setAuthName] = useState('DeshIT-BD');
  const [authEmail, setAuthEmail] = useState('user@deshit-bd.com');
  const [authMobile, setAuthMobile] = useState('+880 17 0000 0000');
  const [authNid, setAuthNid] = useState('1995269182348123');
  const [plannerType, setPlannerType] = useState('Company'); // 'Personal' or 'Company'
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/019481/2024');

  const designLinks = [
    ['/', '1. Home'],
    ['/tours', '2. Tours'],
    ['/tours/paris', '3. Tour Detail'],
    ['/guides', '4. Guides'],
    ['/guides/dhaka', '5. Guide Detail'],
    ['/visa', '6. Visa'],
    ['/visa/canada', '7. Visa Detail'],
    ['/account', '8. Overview'],
    ['/account/profile', '9. Profile'],
    ['/account/edit', '10. Edit Dark'],
    ['/account/bookings', '11. Bookings'],
    ['/account/points', '12. Points'],
    ['/account/refunds', '13. Refunds'],
    ['/account/dispute', '14. Dispute'],
    ['/account/vouchers', '15. Vouchers'],
    ['/account/payments', '16. Payments'],
    ['/account/history', '17. History'],
    ['/account/messages', '18. Chat'],
    ['/account/messages/alerts', '19. Alerts'],
    ['/account/messages/promotions', '21. Promo'],
    ['/account/favorites', '22. Fav Tours'],
    ['/account/favorites/planners', '23. Fav Planners'],
    ['/account/reviews', '24. To Review'],
    ['/account/reviews/history', '25. Review Hist'],
    ['/account/help', '26. Help'],
    ['/account/help/suggestions', '27. Suggestions'],
    ['/planner/deshit', '28. Store Home'],
    ['/planner/deshit/products', '29. Store Products'],
    ['/planner/deshit/home2', '30. Store Home 2'],
    ['/planner/deshit/home3', '31. Store Home 3'],
    ['/checkout', '32. Checkout'],
    ['/visa/canada/reviews', '33. Visa Reviews'],
    ['/business-center', '34. Seller Center'],
  ];

  const accountLinks = [
    ['/account/profile', 'My Profile'],
    ['/account/bookings', 'My Bookings'],
    ['/account/points', 'My Points'],
    ['/account/refunds', 'Appeals & Refunds'],
    ['/account/vouchers', 'Vouchers & Payments'],
    ['/account/messages', 'Message Center'],
  ];

  // Dynamic real-time date calculation function
  const getTodayFormatted = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  };

  const [selectedDate, setSelectedDate] = useState('17 FEB');

  // Automatically set current date on component mount
  useEffect(() => {
    setSelectedDate(getTodayFormatted());
  }, []);

  useEffect(() => {
    setShowMobileDrawer(false);
    setShowAccountMenu(false);
    setShowCurrencyDropdown(false);
  }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tours?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/tours');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  const scrollPagesBar = (direction) => {
    if (pagesBarRef.current) {
      pagesBarRef.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth',
      });
    }
  };

  const handleNativeDateChange = (e) => {
    if (e.target.value) {
      const parsed = new Date(e.target.value);
      const day = parsed.getDate();
      const month = parsed.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      setSelectedDate(`${day} ${month}`);
      setShowDatePicker(false);
    }
  };

  const activeRateObj = rates[currency] || rates.BDT;

  return (
    <header className="figma-navbar" style={{ position: 'relative' }}>
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-text">LOGO</span>
          <svg className="grid-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </Link>

        {/* Center: Search Capsule Form */}
        <form onSubmit={handleSearchSubmit} className="navbar-search-capsule" style={{ position: 'relative' }}>
          <div className="search-input-field">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Interactive Date Picker Pill */}
          <div
            className="search-date-pill"
            onClick={() => setShowDatePicker(!showDatePicker)}
            style={{ cursor: 'pointer', position: 'relative' }}
            title="Click to change travel date"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{selectedDate}</span>
          </div>

          {/* Dynamic Date Picker Popover */}
          {showDatePicker && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                right: '50px',
                background: '#ffffff',
                color: '#0F172A',
                padding: '18px',
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                zIndex: 100,
                width: '240px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800' }}>Select Travel Date</h4>
                <button type="button" onClick={() => setShowDatePicker(false)} style={{ fontSize: '0.9rem', fontWeight: '800' }}>✕</button>
              </div>

              {/* Native Date Input */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Choose Date:</label>
                <input
                  type="date"
                  onChange={handleNativeDateChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Quick Select Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(getTodayFormatted());
                    setShowDatePicker(false);
                  }}
                  style={{
                    padding: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: 'var(--primary-blue)',
                    color: '#ffffff',
                    borderRadius: '8px',
                  }}
                >
                  Today ({getTodayFormatted()})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const day = tomorrow.getDate();
                    const month = tomorrow.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                    setSelectedDate(`${day} ${month}`);
                    setShowDatePicker(false);
                  }}
                  style={{
                    padding: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: '#F1F5F9',
                    color: '#334155',
                    borderRadius: '8px',
                  }}
                >
                  Tomorrow
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="search-submit-btn" aria-label="Search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* Right: Actions */}
        <div className="navbar-actions">
          {/* Dark Mode Toggle Button (🌙 / ☀️) */}
          <button
            onClick={toggleTheme}
            className="nav-currency-select"
            title="Click to toggle Dark Mode"
            style={{ fontSize: '1rem', padding: '6px 10px' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Account & Auth Section */}
          {user?.isLoggedIn === false ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                🔑 Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                style={{
                  background: '#ffffff',
                  color: '#2563EB',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                ✨ Sign Up
              </button>
            </div>
          ) : (
            <div className="nav-action-item user-account" style={{ position: 'relative' }}>
              <div
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="user-text">
                  <span className="user-sub">
                    Hi, {user?.name || 'User'} ({user?.role === 'PLANNER' ? 'Planner' : 'Tourist'})
                  </span>
                  <span className="user-main">{t('account')} <small>▼</small></span>
                </div>
              </div>

            {/* Account Popover Menu & Click Anywhere Outside Backdrop */}
            {showAccountMenu && (
              <>
                <div
                  onClick={() => setShowAccountMenu(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'transparent', cursor: 'default' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    background: '#ffffff',
                    color: '#0F172A',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                    padding: '12px',
                    width: '220px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', background: '#F1F5F9', borderRadius: '8px', color: '#475569', fontWeight: 'bold' }}>
                  Role: {user?.role === 'PLANNER' ? '⚡ Planner / Seller' : '👤 Tourist / Customer'}
                </div>

                {user?.role === 'PLANNER' ? (
                  <Link
                    href="/business-center"
                    onClick={() => setShowAccountMenu(false)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      borderRadius: '8px',
                      background: '#EFF6FF',
                      color: '#2563EB',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    🏢 Go to Seller Business Center
                  </Link>
                ) : (
                  <Link
                    href="/business-center/profile"
                    onClick={() => setShowAccountMenu(false)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      borderRadius: '8px',
                      background: '#FEF3C7',
                      color: '#B45309',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    📝 Apply for Seller Account (KYC)
                  </Link>
                )}

                <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '4px 0' }} />

                <Link href="/account/profile" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  👤 My Profile
                </Link>
                <Link href="/account/bookings" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  🎟️ My Bookings
                </Link>
                <Link href="/account/points" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  🎁 My Points
                </Link>
                <Link href="/account/refunds" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  🔄 Appeals & Refunds
                </Link>
                <Link href="/account/vouchers" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  💳 Vouchers & Payments
                </Link>
                <Link href="/account/messages" onClick={() => setShowAccountMenu(false)} style={{ padding: '8px 12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '8px', display: 'block' }}>
                  💬 Message Center
                </Link>

                <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '4px 0' }} />

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setShowAccountMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    borderRadius: '8px',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  🚪 Logout Account
                </button>
              </div>
              </>
            )}
            </div>
          )}

          {/* Wishlist Link */}
          <Link href="/account/favorites" className="nav-action-item wishlist-item">
            <div className="icon-badge-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="badge-count">2</span>
            </div>
            <span className="action-label">{t('wishlist')}</span>
          </Link>

          {/* Download Mobile App Button */}
          <div
            className="nav-action-item mobile-app-item"
            onClick={() => setShowAppModal(true)}
            style={{ cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <div className="app-text">
              <span>Download our</span>
              <strong>Mobile App</strong>
            </div>
          </div>

          {/* Global Currency Switcher Popover */}
          <div className="nav-currency-select" style={{ position: 'relative' }}>
            <div
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              title="Click to switch project currency"
            >
              <span className="flag-icon">{activeRateObj.flag}</span>
              <span>{currency}</span>
              <small>▼</small>
            </div>

            {showCurrencyDropdown && (
              <>
                <div
                  onClick={() => setShowCurrencyDropdown(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'transparent', cursor: 'default' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '42px',
                    right: 0,
                    background: '#ffffff',
                    color: '#0F172A',
                    borderRadius: '14px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    padding: '8px',
                    width: '140px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  {Object.keys(rates).map((currKey) => {
                    const item = rates[currKey];
                    return (
                      <button
                        key={currKey}
                        type="button"
                        onClick={() => {
                          setCurrency(currKey);
                          setShowCurrencyDropdown(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          borderRadius: '8px',
                          background: currency === currKey ? 'var(--primary-blue)' : '#ffffff',
                          color: currency === currKey ? '#ffffff' : '#1E293B',
                        }}
                      >
                        <span>{item.flag} {currKey}</span>
                        <span>({item.symbol})</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Become a Planner / Seller Business Center Button */}
          {user?.role === 'PLANNER' ? (
            <Link href="/business-center" className="btn-become-planner">
              Seller Business Center
            </Link>
          ) : (
            <Link
              href="/business-center/profile"
              className="btn-become-planner"
              style={{ textDecoration: 'none' }}
            >
              Become a Seller
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon (Right side on small devices) */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setShowMobileDrawer(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile App Download Modal */}
      {showAppModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 99999,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              color: '#0F172A',
              padding: '32px',
              borderRadius: '24px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowAppModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '1.2rem', fontWeight: '800' }}
            >
              ✕
            </button>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📱</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>Download Tour Dibo App</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
              Book tours on the go, track instant visa updates, and chat directly with verified tour planners.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowAppModal(false)}
                style={{ background: '#000000', color: '#ffffff', padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700' }}
              >
                 App Store
              </button>
              <button
                onClick={() => setShowAppModal(false)}
                style={{ background: '#000000', color: '#ffffff', padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700' }}
              >
                ▶ Google Play
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal (Login / Sign Up) */}
      {showAuthModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 999999,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              color: '#0F172A',
              padding: '32px',
              borderRadius: '24px',
              maxWidth: '460px',
              width: '90%',
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowAuthModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '1.2rem', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', textAlign: 'center' }}>
              {authMode === 'login' ? '🔑 Welcome Back' : '✨ Create Account'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', textAlign: 'center', marginBottom: '20px' }}>
              {authMode === 'login' ? 'Select your role and login to Tour Dibo' : 'Register a new account on Tour Dibo'}
            </p>

            {/* Role Choice Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', background: '#F1F5F9', padding: '4px', borderRadius: '12px' }}>
              <button
                type="button"
                onClick={() => setAuthRole('USER')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  background: authRole === 'USER' ? '#2563EB' : 'transparent',
                  color: authRole === 'USER' ? '#ffffff' : '#475569',
                }}
              >
                👤 Tourist Mode
              </button>
              <button
                type="button"
                onClick={() => setAuthRole('PLANNER')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  background: authRole === 'PLANNER' ? '#2563EB' : 'transparent',
                  color: authRole === 'PLANNER' ? '#ffffff' : '#475569',
                }}
              >
                ⚡ Planner Mode
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(authRole, authEmail, authMode === 'register' ? authName : '');
                setShowAuthModal(false);
                if (authRole === 'PLANNER') {
                  router.push('/business-center');
                } else {
                  router.push('/account/profile');
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {authMode === 'register' && (
                <>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      {authRole === 'PLANNER' ? 'Agency / Company / Planner Name *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                      required
                    />
                  </div>

                  {/* Special Required Fields for Planner Registration Only */}
                  {authRole === 'PLANNER' && (
                    <>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          Mobile Number *
                        </label>
                        <input
                          type="text"
                          value={authMobile}
                          onChange={(e) => setAuthMobile(e.target.value)}
                          placeholder="+880 1700 000000"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          National ID (NID) Number *
                        </label>
                        <input
                          type="text"
                          value={authNid}
                          onChange={(e) => setAuthNid(e.target.value)}
                          placeholder="e.g. 1995269182348123"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                          required
                        />
                      </div>

                      {/* NID Image Uploads */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                            NID Front Part Image *
                          </label>
                          <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                            NID Back Part Image *
                          </label>
                          <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          Planner Account Category *
                        </label>
                        <select
                          value={plannerType}
                          onChange={(e) => setPlannerType(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem', fontWeight: '600' }}
                        >
                          <option value="Personal">Personal Planner</option>
                          <option value="Company">Company / Registered Agency</option>
                        </select>
                      </div>

                      {/* Trade License Fields - Required if Company / Agency Registration */}
                      {plannerType === 'Company' && (
                        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1E40AF', display: 'block', marginBottom: '4px' }}>
                              Trade License Number *
                            </label>
                            <input
                              type="text"
                              value={tradeLicense}
                              onChange={(e) => setTradeLicense(e.target.value)}
                              placeholder="e.g. TRAD/DNCC/019481/2024"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #93C5FD', outline: 'none', fontSize: '0.9rem', background: '#ffffff' }}
                              required
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#1E40AF', display: 'block', marginBottom: '4px' }}>
                              Trade License Document Image Upload *
                            </label>
                            <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%', background: '#ffffff', padding: '6px', borderRadius: '8px' }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#2563EB',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                {authMode === 'login' ? `Login as ${authRole === 'PLANNER' ? 'Planner' : 'Tourist'}` : 'Register Account'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                {authMode === 'login' ? "Don't have an account? " : 'Already registered? '}
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  style={{ color: '#2563EB', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  {authMode === 'login' ? 'Register Now' : 'Login Here'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {showMobileDrawer && (
        <div className="mobile-drawer-layer" role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="mobile-drawer-backdrop"
            onClick={() => setShowMobileDrawer(false)}
            aria-label="Close menu"
            style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', border: 'none', width: '100%', height: '100%', cursor: 'pointer', zIndex: 99999 }}
          />

          <aside className="mobile-nav-drawer" style={{ position: 'fixed', top: 0, right: 0, zIndex: 100000, width: '85%', maxWidth: '360px', height: '100vh', height: '100dvh', background: 'var(--bg-card, #ffffff)', color: 'var(--text-dark, #0F172A)', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 35px rgba(0, 0, 0, 0.3)', animation: 'drawerSlideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)', overflow: 'hidden' }}>
            {/* Drawer Header */}
            <div className="mobile-drawer-header" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" className="navbar-logo" onClick={() => setShowMobileDrawer(false)}>
                <span className="logo-text">LOGO</span>
                <svg className="grid-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </Link>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setShowMobileDrawer(false)}
                aria-label="Close menu"
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="mobile-drawer-body" style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>

              {/* Main Navigation List */}
              <div className="mobile-drawer-section">
                <span className="mobile-drawer-title" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px', display: 'block' }}>Menu</span>
                <nav className="mobile-link-list">
                  {/* Dark Mode Toggle */}
                  <button type="button" onClick={toggleTheme} className="mobile-drawer-list-item" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '12px 0', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        {theme === 'dark' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                          </svg>
                        )}
                      </span>
                      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </button>

                  {/* Account */}
                  <Link href="/account" className={`mobile-drawer-list-item ${pathname === '/account' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <span>{t('account')}</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* My Bookings */}
                  <Link href="/account/bookings" className={`mobile-drawer-list-item ${pathname === '/account/bookings' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                      <span>My Bookings</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* Wishlist */}
                  <Link href="/account/favorites" className={`mobile-drawer-list-item ${pathname === '/account/favorites' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </span>
                      <span>{t('wishlist')}</span>
                    </span>
                    <span className="drawer-badge-inline" style={{ background: '#EF4444', color: '#ffffff', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem' }}>2</span>
                  </Link>

                  {/* My Points */}
                  <Link href="/account/points" className={`mobile-drawer-list-item ${pathname === '/account/points' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="7" />
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                      </span>
                      <span>My Points</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* Appeals & Refunds */}
                  <Link href="/account/refunds" className={`mobile-drawer-list-item ${pathname === '/account/refunds' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1 4 1 10 7 10" />
                          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                      </span>
                      <span>Appeals & Refunds</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* Vouchers & Payments */}
                  <Link href="/account/vouchers" className={`mobile-drawer-list-item ${pathname === '/account/vouchers' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                      </span>
                      <span>Vouchers & Payments</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* Message Center */}
                  <Link href="/account/messages" className={`mobile-drawer-list-item ${pathname === '/account/messages' ? 'active' : ''}`} onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: 'inherit' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>
                      <span>Message Center</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>

                  {/* Download Mobile App */}
                  <button type="button" className="mobile-drawer-list-item" onClick={() => { setShowMobileDrawer(false); setShowAppModal(true); }} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '12px 0', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </span>
                      <span>Download Mobile App</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </button>

                  {/* Become a Planner */}
                  <Link href="/planner/deshit" className="mobile-drawer-list-item planner-highlight-item" onClick={() => setShowMobileDrawer(false)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', textDecoration: 'none', color: '#2563EB', fontWeight: 'bold' }}>
                    <span className="drawer-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="drawer-item-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                      <span>{t('becomePlanner')}</span>
                    </span>
                    <span className="link-arrow">›</span>
                  </Link>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Quick Navigation Tabs for all 33 Figma Views with Left/Right Scroll Arrows */}
      <div className="desktop-pages-nav" style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.15)', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <button
          onClick={() => scrollPagesBar('left')}
          style={{ color: '#ffffff', padding: '6px 10px', fontSize: '0.9rem', zIndex: 2, background: 'rgba(0,0,0,0.2)' }}
          title="Scroll Left"
        >
          ◄
        </button>

        <nav className="figma-pages-bar" ref={pagesBarRef} style={{ borderTop: 'none', background: 'transparent', flex: 1, margin: 0 }}>
          <span className="pages-bar-title">Design Views:</span>
          <Link href="/" className={`page-tab ${pathname === '/' ? 'active' : ''}`}>1. Home</Link>
          <Link href="/tours" className={`page-tab ${pathname === '/tours' ? 'active' : ''}`}>2. Tours</Link>
          <Link href="/tours/paris" className={`page-tab ${pathname === '/tours/paris' ? 'active' : ''}`}>3. Tour Detail</Link>
          <Link href="/guides" className={`page-tab ${pathname === '/guides' ? 'active' : ''}`}>4. Guides</Link>
          <Link href="/guides/dhaka" className={`page-tab ${pathname === '/guides/dhaka' ? 'active' : ''}`}>5. Guide Detail</Link>
          <Link href="/visa" className={`page-tab ${pathname === '/visa' ? 'active' : ''}`}>6. Visa</Link>
          <Link href="/visa/canada" className={`page-tab ${pathname === '/visa/canada' ? 'active' : ''}`}>7. Visa Detail</Link>
          <Link href="/account" className={`page-tab ${pathname === '/account' ? 'active' : ''}`}>8. Overview</Link>
          <Link href="/account/profile" className={`page-tab ${pathname === '/account/profile' ? 'active' : ''}`}>9. Profile</Link>
          <Link href="/account/edit" className={`page-tab ${pathname === '/account/edit' ? 'active' : ''}`}>10. Edit Dark</Link>
          <Link href="/account/bookings" className={`page-tab ${pathname === '/account/bookings' ? 'active' : ''}`}>11. Bookings</Link>
          <Link href="/account/points" className={`page-tab ${pathname === '/account/points' ? 'active' : ''}`}>12. Points</Link>
          <Link href="/account/refunds" className={`page-tab ${pathname === '/account/refunds' ? 'active' : ''}`}>13. Refunds</Link>
          <Link href="/account/dispute" className={`page-tab ${pathname === '/account/dispute' ? 'active' : ''}`}>14. Dispute</Link>
          <Link href="/account/vouchers" className={`page-tab ${pathname === '/account/vouchers' ? 'active' : ''}`}>15. Vouchers</Link>
          <Link href="/account/payments" className={`page-tab ${pathname === '/account/payments' ? 'active' : ''}`}>16. Payments</Link>
          <Link href="/account/history" className={`page-tab ${pathname === '/account/history' ? 'active' : ''}`}>17. History</Link>
          <Link href="/account/messages" className={`page-tab ${pathname === '/account/messages' ? 'active' : ''}`}>18. Chat</Link>
          <Link href="/account/messages/alerts" className={`page-tab ${pathname === '/account/messages/alerts' ? 'active' : ''}`}>19. Alerts</Link>
          <Link href="/account/messages/promotions" className={`page-tab ${pathname === '/account/messages/promotions' ? 'active' : ''}`}>21. Promo</Link>
          <Link href="/account/favorites" className={`page-tab ${pathname === '/account/favorites' ? 'active' : ''}`}>22. Fav Tours</Link>
          <Link href="/account/favorites/planners" className={`page-tab ${pathname === '/account/favorites/planners' ? 'active' : ''}`}>23. Fav Planners</Link>
          <Link href="/account/reviews" className={`page-tab ${pathname === '/account/reviews' ? 'active' : ''}`}>24. To Review</Link>
          <Link href="/account/reviews/history" className={`page-tab ${pathname === '/account/reviews/history' ? 'active' : ''}`}>25. Review Hist</Link>
          <Link href="/account/help" className={`page-tab ${pathname === '/account/help' ? 'active' : ''}`}>26. Help</Link>
          <Link href="/account/help/suggestions" className={`page-tab ${pathname === '/account/help/suggestions' ? 'active' : ''}`}>27. Suggestions</Link>
          <Link href="/planner/deshit" className={`page-tab ${pathname === '/planner/deshit' ? 'active' : ''}`}>28. Store Home</Link>
          <Link href="/planner/deshit/products" className={`page-tab ${pathname === '/planner/deshit/products' ? 'active' : ''}`}>29. Store Products</Link>
          <Link href="/planner/deshit/home2" className={`page-tab ${pathname === '/planner/deshit/home2' ? 'active' : ''}`}>30. Store Home 2</Link>
          <Link href="/planner/deshit/home3" className={`page-tab ${pathname === '/planner/deshit/home3' ? 'active' : ''}`}>31. Store Home 3</Link>
          <Link href="/checkout" className={`page-tab ${pathname === '/checkout' ? 'active' : ''}`}>32. Checkout</Link>
          <Link href="/visa/canada/reviews" className={`page-tab ${pathname === '/visa/canada/reviews' ? 'active' : ''}`}>33. Visa Reviews</Link>
          <Link href="/business-center" className={`page-tab ${pathname.startsWith('/business-center') ? 'active' : ''}`}>34. Seller Center</Link>
        </nav>

        <button
          onClick={() => scrollPagesBar('right')}
          style={{ color: '#ffffff', padding: '6px 10px', fontSize: '0.9rem', zIndex: 2, background: 'rgba(0,0,0,0.2)' }}
          title="Scroll Right"
        >
          ►
        </button>
      </div>
    </header>
  );
}

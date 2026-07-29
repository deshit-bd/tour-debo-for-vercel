'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const pagesBarRef = useRef(null);

  const { currency, setCurrency, rates } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

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
          {/* Multilingual Switcher Button (EN vs BN) */}
          <button
            onClick={toggleLanguage}
            className="nav-currency-select"
            title="Click to toggle language (EN / বাংলা)"
            style={{ fontWeight: '800' }}
          >
            <span>🌐 {language === 'EN' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Dark Mode Toggle Button (🌙 / ☀️) */}
          <button
            onClick={toggleTheme}
            className="nav-currency-select"
            title="Click to toggle Dark Mode"
            style={{ fontSize: '1rem', padding: '6px 10px' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Account Dropdown Toggle */}
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
                <span className="user-sub">Hi, Username</span>
                <span className="user-main">{t('account')} <small>▼</small></span>
              </div>
            </div>

            {/* Account Popover Menu */}
            {showAccountMenu && (
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
                  width: '200px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
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
              </div>
            )}
          </div>

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
            )}
          </div>

          {/* Become a Planner Button */}
          <Link href="/planner/deshit" className="btn-become-planner">
            {t('becomePlanner')}
          </Link>
        </div>
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
            zIndex: 999,
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

      {/* Quick Navigation Tabs for all 33 Figma Views with Left/Right Scroll Arrows */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.15)', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
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

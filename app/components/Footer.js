import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="figma-footer">
      <div className="footer-top-grid">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <h2>LOGO</h2>
          </div>
          <p className="footer-slogan">
            Book your trip in minute, get full<br />Control for much longer.
          </p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/account/profile">About</Link></li>
            <li><Link href="/guides">Careers</Link></li>
            <li><Link href="/planner/deshit">Mobile</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><Link href="/account/help">Help/FAQ</Link></li>
            <li><Link href="/account/messages/alerts">Press</Link></li>
            <li><Link href="/account/points">Affiliates</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>More</h4>
          <ul>
            <li><Link href="/tours">Tour Packages</Link></li>
            <li><Link href="/visa">Visa</Link></li>
            <li><Link href="/guides">Tour Guide</Link></li>
          </ul>
        </div>

        <div className="footer-col social-app-col">
          <div className="social-icons-row">
            <Link href="/" className="social-circle" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </Link>
            <Link href="/" className="social-circle" aria-label="Instagram">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </Link>
            <Link href="/" className="social-circle" aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </Link>
          </div>

          <div className="app-download-box">
            <span>Discover our app</span>
            <div className="store-buttons">
              <Link href="/planner/deshit" className="store-btn google-play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17l14.5 8.5L3 20.5z" />
                </svg>
                <div className="store-btn-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </Link>

              <Link href="/planner/deshit" className="store-btn app-store">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.3c.69-.83 1.15-1.99 1.02-3.15-1 .04-2.21.67-2.92 1.5-.64.74-1.2 1.93-1.05 3.07 1.12.09 2.26-.59 2.95-1.42z"/>
                </svg>
                <div className="store-btn-text">
                  <small>Available on the</small>
                  <strong>Apple Store</strong>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

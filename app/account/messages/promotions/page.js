'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';

const DEFAULT_PROMOS = [
  {
    id: 'CMP-881',
    title: 'Special 15% OFF for Store Followers',
    code: 'FOLLOWER15',
    seller: 'Green Bengal Tours & Travels',
    sentDate: '02 Aug 2026',
    message: 'Exclusive weekend camping deal for our loyal followers! Book any tour package this week and get 15% instant discount.',
  },
  {
    id: 'CMP-742',
    title: 'Eiffel Tower Tour Promo Code',
    code: 'PARIS20',
    seller: 'Green Bengal Tours & Travels',
    sentDate: '20 Jul 2026',
    message: 'Exclusive 20% discount on Paris guided tours for our VIP platinum members.',
  },
];

export default function MessageCenterPromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_follower_offers');
      if (saved) {
        setPromotions(JSON.parse(saved));
      } else {
        setPromotions(DEFAULT_PROMOS);
      }
    } catch (e) {
      console.error('Failed to load promotions:', e);
      setPromotions(DEFAULT_PROMOS);
    }
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Main Tabs Bar */}
            <div className="account-sub-tabs-bar" style={{ marginBottom: '20px' }}>
              <Link href="/account/messages" className="sub-tab">Seller Chat</Link>
              <Link href="/account/messages/alerts" className="sub-tab">Alerts</Link>
              <Link href="/account/messages/promotions" className="sub-tab active">Promotions ({promotions.length})</Link>
            </div>

            {/* Promotions Container Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {promotions.length === 0 ? (
                <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <p style={{ color: '#64748B', fontSize: '0.95rem' }}>No active promotions or follower offers available right now.</p>
                </div>
              ) : (
                promotions.map((promo) => (
                  <div
                    key={promo.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      padding: '20px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                          STORE PROMO
                        </span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {promo.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{promo.sentDate}</span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                      {promo.message}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px dashed #CBD5E1' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Voucher Code:</span>
                        <strong style={{ fontSize: '0.92rem', color: '#2563EB', fontFamily: 'monospace' }}>
                          {promo.code}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleCopyCode(promo.code)}
                          style={{ background: '#fff', color: '#334155', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          {copiedCode === promo.code ? '✓ Copied' : 'Copy Code'}
                        </button>
                        <Link
                          href="/checkout"
                          style={{ background: '#2563EB', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
                        >
                          Redeem in Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerNoticePage() {
  const [notices] = useState([
    {
      id: 1,
      title: 'Platform Policy Update: Contact Sharing Prohibition',
      date: '2026-08-01',
      category: 'Policy',
      urgent: true,
      content: 'Please ensure that no mobile numbers, email addresses, or personal contact details are shared in the chat. System automated filters will restrict accounts violating this rule as per SRS guidelines.',
    },
    {
      id: 2,
      title: 'Holiday Mode & Payout Schedule Announcement',
      date: '2026-07-28',
      category: 'Operations',
      urgent: false,
      content: 'Sellers can now toggle Holiday Mode directly from the sidebar. All bank disbursement requests placed before Thursday 5 PM will be processed by Sunday.',
    },
    {
      id: 3,
      title: 'Feature Update: VISA & Tour Guide Custom Pricing Matrix',
      date: '2026-07-20',
      category: 'Feature',
      urgent: false,
      content: 'You can now set custom pricing based on entry types (Single/Double/Multiple) for VISA products and language parameters for Tour Guides.',
    },
  ]);

  return (
    <div className="figma-page-shell">
      <Navbar />
      <div className="seller-container">
        <SellerSidebar />
        <main className="seller-main-content">
          <header className="seller-header">
            <div>
              <h1 className="seller-page-title">Seller Notice Board</h1>
              <p className="seller-page-subtitle">Official announcements, platform policy updates, and operational notices.</p>
            </div>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            {notices.map((notice) => (
              <div
                key={notice.id}
                style={{
                  background: notice.urgent ? '#FEF2F2' : '#ffffff',
                  border: notice.urgent ? '1px solid #FECACA' : '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: notice.urgent ? '#DC2626' : '#2563EB',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {notice.category}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                      {notice.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>{notice.date}</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

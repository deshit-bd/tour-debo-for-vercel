'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import ReviewModal from '../../components/ReviewModal';

function ReviewContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('toreview'); // 'toreview' | 'history'
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'history') {
      setActiveTab('history');
    }
  }, [searchParams]);

  // Items pending review (PDF Page 6)
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: '8849201948101',
      date: '07 Feb 2024',
      name: 'Cox\'s Bazar Beach & Resort Camping Package',
      qty: 1,
      variant: 'Color: 10 PCS / Deluxe Tent',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '8849201948102',
      date: '12 Jan 2024',
      name: 'Sajek Valley Helipad Sunrise Tour',
      qty: 2,
      variant: 'Color: black / VIP Cottage',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '8849201948103',
      date: '24 Dec 2023',
      name: 'Paris Eiffel Tower & Seine River Cruise',
      qty: 1,
      variant: 'Color: C1plus Black',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '8849201948104',
      date: '18 Nov 2023',
      name: 'Sylhet Ratargul & Jaflong Day Adventure',
      qty: 3,
      variant: 'Color: white',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  // Reviewed items history (PDF Page 9)
  const [reviewHistory, setReviewHistory] = useState([
    {
      id: '8849201948001',
      date: '21 Apr 2023',
      name: 'Sundarbans Mangrove Forest Wildlife Safari',
      qty: 1,
      overallRating: 5,
      guideRating: 5,
      comment: 'Awesome tour experience! The tour guide was super friendly and punctuality was 100%. Highly recommended for family trips.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=300&q=80',
      helpfulUp: 12,
      helpfulDown: 1,
      user: 'Sanjid Ibrahim',
    },
    {
      id: '8849201948002',
      date: '15 Mar 2023',
      name: 'Saint Martin Coral Island Overnight Package',
      qty: 2,
      overallRating: 4,
      guideRating: 4,
      comment: 'Beautiful scenic views. Resort arrangements were good, but dinner menu could have more options.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
      helpfulUp: 8,
      helpfulDown: 0,
      user: 'Sanjid Ibrahim',
    },
  ]);

  const handleReviewSubmitSuccess = (reviewedItem) => {
    setPendingReviews((prev) => prev.filter((item) => item.id !== reviewedItem.id));
    setReviewHistory((prev) => [reviewedItem, ...prev]);
    setActiveTab('history');
  };

  return (
    <div className="account-section-card">
      <h3 className="card-title-lg">My Reviews</h3>

      {/* Sub Tabs Bar */}
      <div className="account-sub-tabs-bar" style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('toreview')}
          className={`sub-tab ${activeTab === 'toreview' ? 'active' : ''}`}
          style={{
            padding: '10px 18px',
            fontWeight: '800',
            fontSize: '0.92rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: activeTab === 'toreview' ? '#FF6B00' : '#64748B',
            borderBottom: activeTab === 'toreview' ? '3px solid #FF6B00' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          To Review
          <span style={{ background: '#FF6B00', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
            {pendingReviews.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`sub-tab ${activeTab === 'history' ? 'active' : ''}`}
          style={{
            padding: '10px 18px',
            fontWeight: '800',
            fontSize: '0.92rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: activeTab === 'history' ? '#FF6B00' : '#64748B',
            borderBottom: activeTab === 'history' ? '3px solid #FF6B00' : '3px solid transparent',
          }}
        >
          History ({reviewHistory.length})
        </button>
      </div>

      {/* TAB 1: TO REVIEW SEGMENT */}
      {activeTab === 'toreview' && (
        <div>
          {pendingReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1E293B', margin: '0 0 4px 0' }}>All Caught Up!</h4>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>You have no pending reviews at the moment.</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#475569', marginBottom: '16px' }}>
                Tour &amp; Service Provider (Purchased Items)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pendingReviews.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ width: '72px', height: '72px', position: 'relative', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700' }}>
                        Booking ID : #{item.id}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.3 }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '0.76rem', color: '#64748B' }}>Purchased on {item.date}</span>
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{item.variant}</span>
                    </div>

                    <button
                      onClick={() => setActiveModalItem(item)}
                      style={{
                        background: '#FF6B00',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)',
                        flexShrink: 0,
                      }}
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HISTORY SEGMENT */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reviewHistory.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '50px', height: '50px', position: 'relative', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', display: 'block' }}>Booking ID : #{item.id}</span>
                    <strong style={{ fontSize: '0.98rem', color: '#0F172A', display: 'block' }}>{item.name}</strong>
                    <small style={{ fontSize: '0.78rem', color: '#64748B' }}>Purchased on {item.date}</small>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalItem(item)}
                  style={{
                    background: '#F1F5F9',
                    color: '#334155',
                    border: '1px solid #CBD5E1',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Edit
                </button>
              </div>

              {/* Stars Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: star <= item.overallRating ? '#FF9900' : '#CBD5E1', fontSize: '1.2rem' }}>
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FF9900' }}>{item.overallRating}.0 / 5.0</span>
              </div>

              {/* Comment */}
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: '0 0 12px 0', lineHeight: 1.5, background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #FF6B00' }}>
                "{item.comment}"
              </p>

              {/* Helpful Counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#64748B' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  👍 {item.helpfulUp || 0}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  👎 {item.helpfulDown || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal Window */}
      {activeModalItem && (
        <ReviewModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onSubmitSuccess={handleReviewSubmitSuccess}
        />
      )}
    </div>
  );
}

export default function ToReviewPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            <Suspense fallback={<div style={{ padding: '24px', background: '#fff', borderRadius: '16px' }}>Loading reviews...</div>}>
              <ReviewContent />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

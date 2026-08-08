'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

const DEFAULT_REVIEWS = [
  {
    id: 'REV-901',
    customer: 'Sanjid Rahman',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    packageTitle: 'Sajek Valley Tour Package',
    category: 'Tour Package',
    rating: 5,
    date: '04 Aug 2026',
    comment: 'Amazing experience with Green Bengal Tours! The resort in Sajek was top notch, guide was very helpful, and transport was comfortable. Highly recommended!',
    likes: 12,
    userReacted: false,
    sellerReply: 'Thank you Sanjid bhai for your wonderful feedback! It was our pleasure hosting you at Sajek Valley. Looking forward to your next trip with us! 🙏',
    replyDate: '05 Aug 2026',
  },
  {
    id: 'REV-892',
    customer: 'Anika Tabassum',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    packageTitle: 'Canada Tourist Visa Processing',
    category: 'Visa Processing',
    rating: 5,
    date: '28 Jul 2026',
    comment: 'Got my Canada multi-entry visa approved within 15 days! The documentation team guided me step by step. Truly professional team.',
    likes: 8,
    userReacted: false,
    sellerReply: '',
    replyDate: '',
  },
  {
    id: 'REV-754',
    customer: 'Tanvir Hasan',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    packageTitle: 'Tenting at Cox’s Bazar Beach',
    category: 'Tour Package',
    rating: 4,
    date: '15 Jul 2026',
    comment: 'Great beach camping arrangement and campfire BBQ. Only minor issue was the evening tide delay, but overall an unforgettable experience!',
    likes: 5,
    userReacted: false,
    sellerReply: 'Thank you Tanvir! We appreciate your honest feedback regarding the evening tide schedule. We have updated our beach timing guidelines for future groups.',
    replyDate: '16 Jul 2026',
  },
  {
    id: 'REV-610',
    customer: 'Farhana Akter',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    packageTitle: 'Paris Eiffel Tower Guided Excursion',
    category: 'Tour Package',
    rating: 5,
    date: '02 Jun 2026',
    comment: 'Exceptional trip! Everything from airport transfer to hotel and local English speaking guide in Paris was perfectly organized.',
    likes: 19,
    userReacted: false,
    sellerReply: '',
    replyDate: '',
  },
];

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for actively replying to a review
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyInputText, setReplyInputText] = useState('');

  // Load reviews from localStorage or set defaults
  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_customer_reviews');
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem('planner_customer_reviews', JSON.stringify(DEFAULT_REVIEWS));
      }
    } catch (e) {
      console.error('Failed to load reviews:', e);
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const saveReviewsToStorage = (updatedList) => {
    setReviews(updatedList);
    try {
      localStorage.setItem('planner_customer_reviews', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save reviews:', e);
    }
  };

  const handleSelectReaction = (id, emojiSymbol) => {
    const updated = reviews.map(rev => {
      if (rev.id === id) {
        const isSame = rev.selectedReaction === emojiSymbol;
        const newReaction = isSame ? null : emojiSymbol;
        const countDiff = isSame ? -1 : (rev.selectedReaction ? 0 : 1);
        return {
          ...rev,
          selectedReaction: newReaction,
          likes: Math.max(0, rev.likes + countDiff),
          userReacted: !isSame,
        };
      }
      return rev;
    });
    saveReviewsToStorage(updated);
  };

  const handleOpenReplyBox = (rev) => {
    setActiveReplyId(rev.id);
    setReplyInputText(rev.sellerReply || '');
  };

  const handleSendReply = (id) => {
    if (!replyInputText.trim()) return;

    const todayDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const updated = reviews.map(rev => {
      if (rev.id === id) {
        return {
          ...rev,
          sellerReply: replyInputText,
          replyDate: todayDate,
        };
      }
      return rev;
    });

    saveReviewsToStorage(updated);
    setActiveReplyId(null);
    setReplyInputText('');
  };

  const filteredReviews = reviews.filter(rev => {
    const matchRating = filterRating === 'All' || 
      (filterRating === '5 Stars' && rev.rating === 5) ||
      (filterRating === '4 Stars' && rev.rating === 4) ||
      (filterRating === 'Below 4 Stars' && rev.rating < 4);

    const matchCategory = filterCategory === 'All' || rev.category === filterCategory;

    const matchSearch = rev.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rev.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rev.comment.toLowerCase().includes(searchTerm.toLowerCase());

    return matchRating && matchCategory && matchSearch;
  });

  const pendingRepliesCount = reviews.filter(r => !r.sellerReply).length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            {/* Header & Metrics */}
            <div className="seller-card">
              <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Customer Reviews & Ratings</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Monitor tourist feedback across all your packages, react to reviews, and post official seller responses.
                  </p>
                </div>

                <button
                  onClick={() => saveReviewsToStorage(DEFAULT_REVIEWS)}
                  style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Reset Sample Reviews
                </button>
              </div>

              {/* Top Stats Cards */}
              <div className="seller-metrics-grid" style={{ marginBottom: '24px' }}>
                <div className="metric-card">
                  <span className="label">Average Rating</span>
                  <span className="value" style={{ color: '#F59E0B' }}>{avgRating} ★</span>
                  <span className="subtext">Out of 5.0 Overall</span>
                </div>
                <div className="metric-card">
                  <span className="label">Total Reviews</span>
                  <span className="value" style={{ color: '#2563EB' }}>{reviews.length}</span>
                  <span className="subtext">Verified Tourists</span>
                </div>
                <div className="metric-card">
                  <span className="label">Awaiting Response</span>
                  <span className="value" style={{ color: pendingRepliesCount > 0 ? '#DC2626' : '#10B981' }}>
                    {pendingRepliesCount} Pending
                  </span>
                  <span className="subtext">{pendingRepliesCount > 0 ? 'Requires Reply' : 'All Replied'}</span>
                </div>
                <div className="metric-card">
                  <span className="label">Positive Sentiment</span>
                  <span className="value" style={{ color: '#10B981' }}>98%</span>
                  <span className="subtext">5 & 4 Star Reviews</span>
                </div>
              </div>

              {/* Filters & Search Row */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search by customer name, package title, or review text..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, minWidth: '240px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none' }}
                />

                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', background: '#fff', outline: 'none' }}
                >
                  <option value="All">All Ratings</option>
                  <option value="5 Stars">5 Stars Only</option>
                  <option value="4 Stars">4 Stars Only</option>
                  <option value="Below 4 Stars">Below 4 Stars</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', background: '#fff', outline: 'none' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Tour Package">Tour Packages</option>
                  <option value="Visa Processing">Visa Processing</option>
                </select>
              </div>

              {/* Review Cards Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredReviews.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
                    No customer reviews found matching your filter criteria.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      }}
                    >
                      {/* Top Bar: Customer Avatar & Package */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={rev.avatar}
                            alt={rev.customer}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0' }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0F172A' }}>{rev.customer}</div>
                            <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 700 }}>
                              Booked: {rev.packageTitle}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: '#F59E0B', fontSize: '1rem', fontWeight: 800 }}>
                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                            <span style={{ fontSize: '0.85rem', color: '#475569', marginLeft: '6px' }}>({rev.rating}.0)</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>{rev.date}</div>
                        </div>
                      </div>

                      {/* Comment Body with WhatsApp/Messenger Style Bubble & Floating Reactions */}
                      <div style={{ position: 'relative', marginBottom: '16px' }}>
                        <div
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '16px',
                            padding: '14px 18px',
                            fontSize: '0.92rem',
                            color: '#1E293B',
                            lineHeight: '1.5',
                            position: 'relative',
                          }}
                        >
                          "{rev.comment}"

                          {/* Messenger Floating Selected Reaction Badge */}
                          {rev.selectedReaction && (
                            <div
                              style={{
                                position: 'absolute',
                                right: '14px',
                                bottom: '-12px',
                                background: '#ffffff',
                                border: '1px solid #CBD5E1',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                borderRadius: '999px',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#1E40AF',
                              }}
                            >
                              <span>{rev.selectedReaction}</span>
                              <span>({rev.likes})</span>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp / Messenger Quick Floating React Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748B' }}>React to Review:</span>
                          {[
                            { emoji: '❤️', label: 'Love' },
                            { emoji: '👍', label: 'Helpful' },
                            { emoji: '🙏', label: 'Thanks' },
                            { emoji: '😊', label: 'Happy' },
                            { emoji: '🔥', label: 'Awesome' },
                            { emoji: '💯', label: 'Top' },
                          ].map((item) => {
                            const isSelected = rev.selectedReaction === item.emoji;
                            return (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSelectReaction(rev.id, item.emoji)}
                                title={`React ${item.label}`}
                                style={{
                                  background: isSelected ? '#EFF6FF' : '#ffffff',
                                  border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                                  borderRadius: '999px',
                                  padding: '3px 10px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                  boxShadow: isSelected ? '0 2px 6px rgba(37,99,235,0.15)' : 'none',
                                }}
                              >
                                <span>{item.emoji}</span>
                              </button>
                            );
                          })}

                          <button
                            onClick={() => handleOpenReplyBox(rev)}
                            style={{
                              marginLeft: 'auto',
                              background: rev.sellerReply ? '#ECFDF5' : '#2563EB',
                              color: rev.sellerReply ? '#047857' : '#ffffff',
                              border: rev.sellerReply ? '1px solid #A7F3D0' : 'none',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {rev.sellerReply ? 'Edit Reply' : 'Reply'}
                          </button>
                        </div>
                      </div>

                      {/* Reply Input Box Form with Quick Emoji Keyboard Picker */}
                      {activeReplyId === rev.id && (
                        <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #CBD5E1', marginTop: '14px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E293B' }}>
                              Official Response from {rev.category === 'Visa Processing' ? 'Visa Team' : 'Tour Operator'}:
                            </label>
                            
                            {/* WhatsApp Style Quick Emoji Keyboard */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>Add Emoji:</span>
                              {['🙏', '❤️', '😊', '👍', '🌟', '🎉', '👏', '💐', '⭐', '🙌', '✨'].map((em) => (
                                <button
                                  key={em}
                                  type="button"
                                  onClick={() => setReplyInputText(prev => prev + ' ' + em)}
                                  title={`Insert ${em}`}
                                  style={{
                                    background: '#ffffff',
                                    border: '1px solid #CBD5E1',
                                    borderRadius: '6px',
                                    padding: '2px 6px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s ease',
                                  }}
                                >
                                  {em}
                                </button>
                              ))}
                            </div>
                          </div>

                          <textarea
                            rows="3"
                            value={replyInputText}
                            onChange={(e) => setReplyInputText(e.target.value)}
                            placeholder="Write a polite, professional reply to the customer..."
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', marginBottom: '12px' }}
                          />

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              onClick={() => setActiveReplyId(null)}
                              style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSendReply(rev.id)}
                              style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Post Official Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Display Existing Seller Reply Card */}
                      {rev.sellerReply && activeReplyId !== rev.id && (
                        <div style={{ background: '#F0FDF4', borderLeft: '4px solid #10B981', padding: '12px 16px', borderRadius: '0 12px 12px 0', marginTop: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                              Official Seller Response
                            </span>
                            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>{rev.replyDate}</span>
                          </div>
                          <p style={{ fontSize: '0.86rem', color: '#166534', margin: 0, lineHeight: '1.4' }}>
                            {rev.sellerReply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

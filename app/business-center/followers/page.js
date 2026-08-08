'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

const PRESET_TEMPLATES = [
  {
    title: 'Special 15% OFF for Store Followers',
    code: 'FOLLOWER15',
    audience: 'All 999 Shop Followers',
    message: 'Exclusive weekend camping deal for our loyal followers! Book any tour package this week and get 15% instant discount.',
  },
  {
    title: 'Free Airport Transfer Voucher',
    code: 'FREEAIRPORT',
    audience: 'Repeat Tourists (120 Users)',
    message: 'Thank you for travelling with us! Claim a free private airport pickup on your next international tour booking.',
  },
  {
    title: 'Early Bird Summer Flash Sale',
    code: 'SUMMER2026',
    audience: 'All 999 Shop Followers',
    message: 'Summer season is coming! Reserve your Sajek & Cox’s Bazar spots early with code SUMMER2026 for $50 OFF per booking.',
  },
];

const INITIAL_CAMPAIGNS = [
  {
    id: 'CMP-881',
    title: 'Weekend Sajek Retreat Special',
    code: 'SAJEK10',
    audience: 'All 999 Shop Followers',
    sentDate: '02 Aug 2026',
    recipients: 999,
    conversions: '42 Bookings (4.2%)',
    status: 'Active',
    message: 'Get 10% discount on Sajek Valley 3 Days / 2 Nights cloud retreats.',
  },
  {
    id: 'CMP-742',
    title: 'Eiffel Tower Tour Promo Code',
    code: 'PARIS20',
    audience: 'VIP Platinum Buyers (45 Users)',
    sentDate: '20 Jul 2026',
    recipients: 45,
    conversions: '18 Bookings (40.0%)',
    status: 'Delivered',
    message: 'Exclusive 20% discount on Paris guided tours for our VIP platinum members.',
  },
  {
    id: 'CMP-619',
    title: 'Eid Holiday Early Bird Offer',
    code: 'EIDSPECIAL',
    audience: 'All 999 Shop Followers',
    sentDate: '15 Jun 2026',
    recipients: 999,
    conversions: '89 Bookings (8.9%)',
    status: 'Expired',
    message: 'Book Eid tour packages early and get complimentary meals and photo sessions.',
  },
];

export default function FollowersOfferPage() {
  const [offerTitle, setOfferTitle] = useState(PRESET_TEMPLATES[0].title);
  const [discountVal, setDiscountVal] = useState(PRESET_TEMPLATES[0].code);
  const [targetAudience, setTargetAudience] = useState(PRESET_TEMPLATES[0].audience);
  const [message, setMessage] = useState(PRESET_TEMPLATES[0].message);

  const [campaigns, setCampaigns] = useState([]);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedViewingCampaign, setSelectedViewingCampaign] = useState(null);

  // Load from localStorage or initialize
  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_follower_offers');
      if (saved) {
        setCampaigns(JSON.parse(saved));
      } else {
        setCampaigns(INITIAL_CAMPAIGNS);
        localStorage.setItem('planner_follower_offers', JSON.stringify(INITIAL_CAMPAIGNS));
      }
    } catch (e) {
      console.error('Error loading follower offers:', e);
      setCampaigns(INITIAL_CAMPAIGNS);
    }
  }, []);

  const handleApplyTemplate = (tpl) => {
    setOfferTitle(tpl.title);
    setDiscountVal(tpl.code);
    setTargetAudience(tpl.audience);
    setMessage(tpl.message);
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();

    const recipientCount = targetAudience.includes('VIP') ? 45 : targetAudience.includes('Repeat') ? 120 : 999;
    const newCampaign = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      title: offerTitle,
      code: discountVal,
      audience: targetAudience,
      sentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      recipients: recipientCount,
      conversions: '0 Bookings (0.0%)',
      status: 'Active',
      message: message,
    };

    const updated = [newCampaign, ...campaigns];
    setCampaigns(updated);
    try {
      localStorage.setItem('planner_follower_offers', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving new campaign:', err);
    }

    setSentSuccess(true);
    setPreviewModalOpen(false);
    setTimeout(() => setSentSuccess(false), 5000);
  };

  const handleToggleStatus = (id) => {
    const updated = campaigns.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Deactivated' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setCampaigns(updated);
    localStorage.setItem('planner_follower_offers', JSON.stringify(updated));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            {/* Header & Overview Card */}
            <div className="seller-card">
              <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Offer to Followers & Fans</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Send exclusive discount vouchers, tour notifications, and targeted deals directly to your shop followers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCampaigns(INITIAL_CAMPAIGNS);
                    localStorage.setItem('planner_follower_offers', JSON.stringify(INITIAL_CAMPAIGNS));
                  }}
                  style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Reset Sample Campaigns
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="seller-metrics-grid" style={{ marginBottom: '24px' }}>
                <div className="metric-card">
                  <span className="label">Total Shop Followers</span>
                  <span className="value" style={{ color: '#2563EB' }}>999</span>
                  <span className="subtext">Active Fan Base</span>
                </div>
                <div className="metric-card">
                  <span className="label">Broadcast Campaigns</span>
                  <span className="value">{campaigns.length} Deals</span>
                  <span className="subtext" style={{ color: '#10B981' }}>High Conversion</span>
                </div>
                <div className="metric-card">
                  <span className="label">Average Engagement Rate</span>
                  <span className="value">34.8%</span>
                  <span className="subtext" style={{ color: '#10B981' }}>+5.2% Growth</span>
                </div>
              </div>

              {sentSuccess && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '14px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>
                  Broadcast Campaign Sent Successfully! Your offer has been dispatched via push notification and in-app message.
                </div>
              )}

              {/* Quick Preset Templates Bar */}
              <div style={{ marginBottom: '24px', background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '10px' }}>
                  Quick Preset Campaign Templates:
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {PRESET_TEMPLATES.map((tpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      style={{ background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600, color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    >
                      {tpl.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campaign Creation Form */}
              <form onSubmit={handleBroadcastSubmit} className="seller-form-grid">
                <div className="seller-form-group full-width">
                  <label>Offer / Campaign Title *</label>
                  <input
                    type="text"
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    required
                    placeholder="e.g. Special 15% OFF for Store Followers"
                  />
                </div>

                <div className="seller-form-group">
                  <label>Discount Voucher Code / Percentage *</label>
                  <input
                    type="text"
                    value={discountVal}
                    onChange={(e) => setDiscountVal(e.target.value)}
                    required
                    placeholder="e.g. FOLLOWER15 or 15% OFF"
                  />
                </div>

                <div className="seller-form-group">
                  <label>Target Audience Segment *</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    style={{ background: '#fff' }}
                  >
                    <option value="All 999 Shop Followers">All 999 Shop Followers</option>
                    <option value="Repeat Tourists (120 Users)">Repeat Tourists (120 Users)</option>
                    <option value="VIP Platinum Buyers (45 Users)">VIP Platinum Buyers (45 Users)</option>
                    <option value="Inactive Followers (350 Users)">Inactive Followers (350 Users)</option>
                  </select>
                </div>

                <div className="seller-form-group full-width">
                  <label>Custom Notification Message to Followers *</label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Write a compelling message for your followers..."
                  />
                </div>

                <div className="seller-form-group full-width" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="submit" className="btn-seller-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    Broadcast Deal to Followers
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewModalOpen(true)}
                    style={{ background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    Preview Notification Card
                  </button>
                </div>
              </form>
            </div>

            {/* Broadcast Campaigns History Table */}
            <div className="seller-card" style={{ marginTop: '24px' }}>
              <div className="seller-card-title">
                <span>Sent Broadcast Campaigns ({campaigns.length})</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="seller-table">
                  <thead>
                    <tr>
                      <th style={{ whiteSpace: 'nowrap' }}>Campaign ID</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Title & Voucher</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Target Audience</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Sent Date</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Conversions</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Status</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#64748B' }}>
                          No broadcast campaigns created yet.
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((cmp) => (
                        <tr key={cmp.id}>
                          <td style={{ fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap' }}>{cmp.id}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.85rem' }}>{cmp.title}</div>
                            <div style={{ fontSize: '0.74rem', color: '#2563EB', fontWeight: 700 }}>Code: {cmp.code}</div>
                          </td>
                          <td style={{ whiteSpace: 'nowrap', color: '#475569' }}>{cmp.audience}</td>
                          <td style={{ whiteSpace: 'nowrap', color: '#64748B' }}>{cmp.sentDate}</td>
                          <td style={{ whiteSpace: 'nowrap', fontWeight: 700, color: '#059669' }}>{cmp.conversions}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <span className={`status-pill ${cmp.status === 'Active' ? 'success' : 'warning'}`}>
                              {cmp.status}
                            </span>
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                onClick={() => handleToggleStatus(cmp.id)}
                                style={{
                                  background: cmp.status === 'Active' ? '#FEF2F2' : '#EFF6FF',
                                  color: cmp.status === 'Active' ? '#DC2626' : '#2563EB',
                                  border: 'none',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {cmp.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => setSelectedViewingCampaign(cmp)}
                                style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                View Campaign
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Notification Preview Modal ── */}
      {previewModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <div style={{ background: '#0F172A', color: '#fff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Mobile App Notification Preview</div>
              <button onClick={() => setPreviewModalOpen(false)} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
            </div>

            <div style={{ padding: '20px', background: '#F8FAFC' }}>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>Tour Dibo • Store Update</span>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Just Now</span>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>{offerTitle}</div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.4', margin: '0 0 12px 0' }}>{message}</p>

                <div style={{ background: '#FEF3C7', border: '1px dashed #F59E0B', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>Voucher Code:</span>
                  <strong style={{ fontSize: '0.88rem', color: '#B45309', fontFamily: 'monospace' }}>{discountVal}</strong>
                </div>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#64748B', textAlign: 'center' }}>
                This is how <strong>{targetAudience}</strong> will see this notification on their mobile devices and inbox.
              </div>
            </div>

            <div style={{ padding: '14px 20px', borderTop: '1px solid #E2E8F0', background: '#fff', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setPreviewModalOpen(false)} style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Close</button>
              <button onClick={handleBroadcastSubmit} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Confirm Broadcast</button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Sent Campaign Details Modal ── */}
      {selectedViewingCampaign && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <div style={{ background: '#0F172A', color: '#fff', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Campaign Performance Details</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '2px 0 0 0' }}>{selectedViewingCampaign.id} — {selectedViewingCampaign.title}</h3>
              </div>
              <button onClick={() => setSelectedViewingCampaign(null)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem', display: 'grid', placeItems: 'center' }}>✕</button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Performance Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: 700, textTransform: 'uppercase' }}>Target Audience</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B', marginTop: '2px' }}>{selectedViewingCampaign.audience}</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Sent Date: {selectedViewingCampaign.sentDate}</div>
                </div>

                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>Bookings & Conversions</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065F46', marginTop: '2px' }}>{selectedViewingCampaign.conversions}</div>
                  <div style={{ fontSize: '0.76rem', color: '#047857', marginTop: '2px' }}>Status: {selectedViewingCampaign.status}</div>
                </div>
              </div>

              {/* Notification Message Box */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '14px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Sent Message Content</div>
                <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5', margin: '0 0 12px 0' }}>{selectedViewingCampaign.message}</p>
                <div style={{ background: '#fff', border: '1px dashed #2563EB', padding: '8px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Voucher Code:</span>
                  <strong style={{ fontSize: '0.92rem', color: '#2563EB', fontFamily: 'monospace' }}>{selectedViewingCampaign.code}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    handleApplyTemplate({
                      title: selectedViewingCampaign.title,
                      code: selectedViewingCampaign.code,
                      audience: selectedViewingCampaign.audience,
                      message: selectedViewingCampaign.message
                    });
                    setSelectedViewingCampaign(null);
                  }}
                  style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Duplicate as New Campaign
                </button>

                <button
                  onClick={() => setSelectedViewingCampaign(null)}
                  style={{ background: '#F1F5F9', color: '#334155', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

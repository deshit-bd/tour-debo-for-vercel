'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import { useCurrency } from '../../context/CurrencyContext';

export default function MyPointsPage() {
  const { formatPrice } = useCurrency();
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [visits, setVisits] = useState({ sea: 0, abroad: 0, riverHill: 0 });
  const [referral, setReferral] = useState({
    referralCode: 'TOUR-SANJID-9921',
    referralLink: 'https://tour-dibo.com/referral?code=TOUR-SANJID-9921',
    totalInvited: 12,
    successfulReferrals: 9,
    pendingSignups: 3,
    totalPointsEarned: 1800,
    totalCouponsEarned: 9,
    totalDiscountValue: 4500,
    activeRewardCoupons: [
      { code: 'REF-REWARD-500', amount: '৳500 OFF', title: 'Referral Winner Reward Voucher', validTill: '31 Dec 2026', minSpend: 'Min Spend ৳2,000' },
      { code: 'REF-FRIEND-500', amount: '৳500 OFF', title: 'Friend Welcome Referral Voucher', validTill: '31 Dec 2026', minSpend: 'Min Spend ৳2,000' }
    ],
    milestones: [],
    friendsList: []
  });

  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState('');
  const [friendEmailInput, setFriendEmailInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch API for Points and Referral data
  const loadData = async () => {
    try {
      const res = await fetch('/api/user/points');
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        setVisits(data.visits);
        if (data.referral) setReferral(data.referral);
      }
    } catch (err) {
      console.error('Failed to load points data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referral.referralLink || 'https://tour-dibo.com/referral?code=TOUR-SANJID-9921');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!friendEmailInput.trim()) return;

    try {
      const res = await fetch('/api/user/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SEND_REFERRAL_INVITE',
          friendEmail: friendEmailInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        if (data.referral) setReferral(data.referral);
        setStatusMsg(data.message || '🎉 Success! Sent ৳500 Coupon + Bonus Points!');
        setFriendEmailInput('');
      } else {
        setStatusMsg(data.message || '❌ Failed to send invitation.');
      }
    } catch (err) {
      setStatusMsg('❌ Error sending invitation.');
    }
    setTimeout(() => setStatusMsg(''), 5000);
  };

  const handleClaimMilestone = async (tierId) => {
    try {
      const res = await fetch('/api/user/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CLAIM_MILESTONE', tierId }),
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        if (data.referral) setReferral(data.referral);
        setStatusMsg(data.message || '🏆 Milestone claimed!');
      } else {
        setStatusMsg(data.message || '❌ Cannot claim milestone.');
      }
    } catch (err) {
      setStatusMsg('❌ Error claiming milestone.');
    }
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    try {
      const res = await fetch('/api/user/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPLY_VOUCHER', voucherCode }),
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        setStatusMsg(data.message);
        setVoucherCode('');
      } else {
        setStatusMsg(data.message || 'Failed to apply voucher.');
      }
    } catch (err) {
      setStatusMsg('❌ Server error while applying voucher.');
    }
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleRedeemPoints = async () => {
    try {
      const res = await fetch('/api/user/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REDEEM_POINTS' }),
      });
      const data = await res.json();
      if (data.success) {
        setPoints(data.points);
        setPointsHistory(data.history);
        setStatusMsg(data.message);
      } else {
        setStatusMsg(data.message || '❌ Cannot redeem points.');
      }
    } catch (err) {
      setStatusMsg('❌ Error redeeming points.');
    }
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
              Referral Rewards &amp; Points Wallet
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0 }}>
              Invite friends: Both get direct <strong>৳500 Discount Coupons</strong> + <strong>Bonus Loyalty Points</strong>!
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)', color: '#FFFFFF', padding: '8px 18px', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡ Total Balance:</span>
              <span style={{ fontSize: '1.15rem', color: '#FDE047' }}>{points} Pts</span>
            </div>
          </div>
        </div>

        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            {/* Status Alert Banner */}
            {statusMsg && (
              <div style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC', padding: '12px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {statusMsg}
              </div>
            )}

            {loading ? (
              <div style={{ padding: '50px', background: '#FFFFFF', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', color: '#64748B' }}>
                ⚡ Loading Referral &amp; Points Data...
              </div>
            ) : (
              <>
                {/* ── 1. VIP DUAL REFERRAL HERO BANNER ── */}
                <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)', borderRadius: '20px', padding: '24px', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(37,99,235,0.25)', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: '#FDE047', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '10px' }}>
                      🎁 DOUBLE REWARD REFERRAL SYSTEM
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                      Give ৳500 Coupon + 100 Pts ➔ Get ৳500 Coupon + 200 Pts!
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#DBEAFE', margin: '0 0 20px 0', maxWidth: '650px', lineHeight: 1.5 }}>
                      When your friend opens an account using your referral link, they receive a <strong>৳500 Welcome Discount Coupon</strong> instantly. You get a <strong>৳500 Reward Coupon + 200 Bonus Points</strong> credited directly to your account!
                    </p>

                    {/* 4 Metric Counter Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 14px', borderRadius: '14px' }}>
                        <small style={{ fontSize: '0.72rem', color: '#93C5FD', fontWeight: 700, display: 'block', marginBottom: '2px' }}>FRIENDS INVITED</small>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF' }}>{referral.totalInvited || 12}</span>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 14px', borderRadius: '14px' }}>
                        <small style={{ fontSize: '0.72rem', color: '#86EFAC', fontWeight: 700, display: 'block', marginBottom: '2px' }}>COUPONS EARNED</small>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#86EFAC' }}>{referral.totalCouponsEarned || 9} Coupons</span>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 14px', borderRadius: '14px' }}>
                        <small style={{ fontSize: '0.72rem', color: '#FDE047', fontWeight: 700, display: 'block', marginBottom: '2px' }}>COUPON DISCOUNTS</small>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FDE047' }}>{formatPrice(referral.totalDiscountValue || 4500)}</span>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 14px', borderRadius: '14px' }}>
                        <small style={{ fontSize: '0.72rem', color: '#F472B6', fontWeight: 700, display: 'block', marginBottom: '2px' }}>BONUS POINTS</small>
                        <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF' }}>+{referral.totalPointsEarned || 1800} Pts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── 2. SHARE LINK & EMAIL INVITE CARDS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  {/* Unique Referral Link & Social Share */}
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔗</span> Your Unique Referral Link
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 14px 0' }}>
                      Copy link or share to unlock <strong>৳500 Coupons + Points</strong> for both of you.
                    </p>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                      <input
                        type="text"
                        readOnly
                        value={referral.referralLink}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600, color: '#1E40AF', background: '#F8FAFC', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
                      >
                        {copiedLink ? '✓ Copied!' : '📋 Copy Link'}
                      </button>
                    </div>

                    {/* Social Share Shortcuts */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Join Tour Dibo using my referral code ${referral.referralCode} and get ৳500 Discount Coupon on your first travel booking! ${referral.referralLink}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 1, textAlign: 'center', background: '#25D366', color: '#FFFFFF', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>💬</span> WhatsApp
                      </a>

                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referral.referralLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 1, textAlign: 'center', background: '#1877F2', color: '#FFFFFF', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>📘</span> Facebook
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          const subject = encodeURIComponent('Join Tour Dibo & Get ৳500 Travel Bonus!');
                          const body = encodeURIComponent(`Hi!\n\nI am inviting you to join Tour Dibo. Use my referral link to get ৳500 discount coupon on your first tour or visa booking:\n\n${referral.referralLink}\n\nHappy travels!`);
                          window.location.href = `mailto:?subject=${subject}&body=${body}`;
                        }}
                        style={{ flex: 1, background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', padding: '8px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>✉️</span> Email Share
                      </button>
                    </div>
                  </div>

                  {/* Direct Email Invitation Form */}
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✉️</span> Direct Email Invitation
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 14px 0' }}>
                      Send ৳500 Welcome Coupon directly to your friend's inbox.
                    </p>

                    <form onSubmit={handleSendInvite} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="email"
                        placeholder="Friend's Email (e.g. friend@example.com)"
                        value={friendEmailInput}
                        onChange={(e) => setFriendEmailInput(e.target.value)}
                        required
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, outline: 'none' }}
                      />

                      <button
                        type="submit"
                        style={{ background: '#10B981', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>🚀</span> Send ৳500 Coupon + Earn 200 Pts
                      </button>
                    </form>
                  </div>
                </div>

                {/* ── 3. YOUR EARNED REFERRAL DISCOUNT COUPONS ── */}
                <div style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', border: '1.5px solid #6EE7B7', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 14px rgba(16,185,129,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#065F46', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🎟</span> Active Referral Reward Vouchers ({referral.activeRewardCoupons?.length || 2})
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#047857', margin: 0 }}>
                        These vouchers are saved to your account. Click <strong>Use at Checkout</strong> to get instant ৳500 OFF!
                      </p>
                    </div>

                    <Link href="/account/vouchers" style={{ background: '#059669', color: '#FFFFFF', textDecoration: 'none', padding: '8px 14px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800, boxShadow: '0 2px 8px rgba(5,150,105,0.2)' }}>
                      View All Vouchers Wallet ➔
                    </Link>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                    {referral.activeRewardCoupons?.map((c, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', border: '1px dashed #10B981', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ background: '#DEF7EC', color: '#03543F', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '4px' }}>
                            {c.amount}
                          </span>
                          <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>{c.title}</h5>
                          <code style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563EB', background: '#EFF6FF', padding: '2px 6px', borderRadius: '4px' }}>{c.code}</code>
                        </div>

                        <Link href="/tours" style={{ background: '#10B981', color: '#FFFFFF', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
                          Use Coupon
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── 4. REFERRAL AMBASSADOR MILESTONES ── */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🏆</span> Referral Ambassador Milestones
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                        Unlock higher tier rewards and badges as you invite more friends.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    {referral.milestones.map((m) => {
                      const isReached = (referral.successfulReferrals || 9) >= m.target;
                      const pct = Math.min(100, Math.round(((referral.successfulReferrals || 9) / m.target) * 100));

                      return (
                        <div
                          key={m.tier}
                          style={{
                            background: isReached ? '#F0FDF4' : '#F8FAFC',
                            border: `1.5px solid ${isReached ? '#86EFAC' : '#E2E8F0'}`,
                            borderRadius: '14px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isReached ? '#166534' : '#475569', background: isReached ? '#DCFCE7' : '#E2E8F0', padding: '3px 8px', borderRadius: '6px' }}>
                                Tier {m.tier}: {m.title}
                              </span>
                              {m.claimed ? (
                                <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 800 }}>✓ Claimed</span>
                              ) : isReached ? (
                                <button
                                  type="button"
                                  onClick={() => handleClaimMilestone(m.tier)}
                                  style={{ background: '#16A34A', color: '#FFFFFF', border: 'none', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}
                                >
                                  Claim Bonus
                                </button>
                              ) : (
                                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>{pct}% Complete</span>
                              )}
                            </div>

                            <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                              Invite {m.target} Friends
                            </strong>
                            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 12px 0' }}>
                              {m.reward}
                            </p>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                              <span>Progress</span>
                              <span>{referral.successfulReferrals || 9} / {m.target}</span>
                            </div>
                            <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: isReached ? '#10B981' : '#2563EB', transition: 'width 0.3s ease' }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── 5. INVITED FRIENDS ACTIVITY LOG TABLE ── */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📋</span> Invited Friends &amp; Reward Status
                  </h4>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                          <th style={{ padding: '10px 14px' }}>Friend</th>
                          <th style={{ padding: '10px 14px' }}>Email</th>
                          <th style={{ padding: '10px 14px' }}>Date Joined</th>
                          <th style={{ padding: '10px 14px' }}>Status</th>
                          <th style={{ padding: '10px 14px', textAlign: 'right' }}>Reward Unlocked</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referral.friendsList.map((friend) => (
                          <tr key={friend.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.86rem' }}>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                                  <Image src={friend.avatar} alt={friend.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <span>{friend.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#475569' }}>{friend.email}</td>
                            <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '0.8rem' }}>{friend.date}</td>
                            <td style={{ padding: '12px 14px' }}>
                              {friend.status === 'COMPLETED' ? (
                                <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                                  ✓ Rewarded (৳500 Coupon + Pts)
                                </span>
                              ) : (
                                <span style={{ background: '#FEF3C7', color: '#B45309', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                                  ⏳ Pending First Booking
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#16A34A' }}>
                              {friend.reward}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── 6. MY POINTS BALANCE & TRANSACTION HISTORY TABLE ── */}
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #CBD5E1', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}>
                  <div style={{ background: '#0000FF', color: '#ffffff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '800', fontSize: '1.15rem' }}>
                    <span>My Points Transaction History</span>
                    <span style={{ fontSize: '1.1rem', background: 'rgba(255,255,255,0.2)', padding: '2px 14px', borderRadius: '6px' }}>
                      {points} Pts Total
                    </span>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#3B82F6', color: '#ffffff', fontSize: '0.9rem', fontWeight: '800' }}>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Points</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Details</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Start Date</th>
                          <th style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Expired Date</th>
                          <th style={{ padding: '12px 18px' }}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsHistory.map((row, idx) => (
                          <tr key={idx} style={{ background: idx % 2 === 0 ? '#EFF6FF' : '#DBEAFE', fontSize: '0.9rem', fontWeight: '700', color: '#1E293B', borderBottom: '1px solid #CBD5E1' }}>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1', color: row.type === 'debit' ? '#DC2626' : '#16A34A', fontWeight: '800' }}>
                              {row.points}
                            </td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.details}</td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.startDate}</td>
                            <td style={{ padding: '12px 18px', borderRight: '1px solid #CBD5E1' }}>{row.expiredDate}</td>
                            <td style={{ padding: '12px 18px', fontWeight: '800' }}>{row.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── 7. PROMO VOUCHER REDEEM & DISCOUNT CONVERSION ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {/* Apply Promo Code Card */}
                  <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#111827', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🎟</span> Redeem Promo Voucher Code
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '0 0 16px 0' }}>
                      Enter gift cards or promo codes (e.g. <strong>TOURDIBO100</strong> or <strong>VIP200</strong>) to claim instant bonus points.
                    </p>

                    <form onSubmit={handleApplyVoucher} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Enter promo code (e.g. TOURDIBO100)"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #D1D5DB', fontSize: '0.9rem', outline: 'none' }}
                      />
                      <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
                        Apply Promo Voucher
                      </button>
                    </form>
                    <small style={{ display: 'block', marginTop: '10px', fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                      💡 Try code: <strong>TOURDIBO100</strong> (+100 Pts) or <strong>VIP200</strong> (+200 Pts)
                    </small>
                  </div>

                  {/* Convert Points to Discount Voucher */}
                  <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', borderRadius: '16px', padding: '24px', border: '1px solid #FCD34D', boxShadow: '0 2px 10px rgba(217,119,6,0.05)' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#92400E', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>💰</span> Redeem Points for Booking Discount
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#78350F', margin: '0 0 16px 0' }}>
                      Convert 200 loyalty points directly into a <strong>{formatPrice(500)} Discount Voucher</strong> for your next booking!
                    </p>

                    <button
                      type="button"
                      onClick={handleRedeemPoints}
                      disabled={points < 200}
                      style={{
                        width: '100%',
                        background: points >= 200 ? '#D97706' : '#CBD5E1',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '12px 18px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        cursor: points >= 200 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {points >= 200 ? `Redeem 200 Pts ➔ ${formatPrice(500)} Voucher` : 'Requires Minimum 200 Points'}
                    </button>
                    <small style={{ display: 'block', marginTop: '10px', fontSize: '0.75rem', color: '#92400E', fontWeight: 600 }}>
                      ✓ Generated discount code will automatically save to your Vouchers Wallet!
                    </small>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

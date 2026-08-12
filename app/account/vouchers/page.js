'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';
import { useCurrency } from '../../context/CurrencyContext';

export default function CustomerVouchersPage() {
  const { formatPrice } = useCurrency();
  const [collectedCodes, setCollectedCodes] = useState(['EID2026', 'FLASH2000', 'REF-REWARD-500', 'REF-FRIEND-500']);
  const [usedCodes, setUsedCodes] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const [claimNotice, setClaimNotice] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  // Customer Vouchers List
  const vouchersData = [
    {
      id: 1,
      code: 'EID2026',
      title: 'Eid Special Festival Tour Voucher',
      discountVal: 0,
      discount: '15% OFF',
      minSpendVal: 5000,
      validTill: '31 Aug 2026',
      validUntilDate: '2026-08-31T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'percentage',
      status: 'Active'
    },
    {
      id: 2,
      code: 'FLASH2000',
      title: 'Thailand Sticker Visa Flash Deal',
      discountVal: 2000,
      discount: '2,000 OFF',
      minSpendVal: 10000,
      validTill: '15 Sep 2026',
      validUntilDate: '2026-09-15T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'fixed',
      status: 'Active'
    },
    {
      id: 3,
      code: 'REF-REWARD-500',
      title: 'Referral Winner Reward Voucher',
      discountVal: 500,
      discount: '500 OFF',
      minSpendVal: 2000,
      validTill: '31 Dec 2026',
      validUntilDate: '2026-12-31T23:59:59',
      seller: 'Tour Dibo Referral Program',
      type: 'fixed',
      status: 'Active'
    },
    {
      id: 4,
      code: 'REF-FRIEND-500',
      title: 'Friend Welcome Referral Voucher',
      discountVal: 500,
      discount: '500 OFF',
      minSpendVal: 2000,
      validTill: '31 Dec 2026',
      validUntilDate: '2026-12-31T23:59:59',
      seller: 'Tour Dibo Referral Program',
      type: 'fixed',
      status: 'Active'
    },
    {
      id: 5,
      code: 'SAJEK10',
      title: 'Sajek Valley Monsoon Voucher',
      discountVal: 0,
      discount: '10% OFF',
      minSpend: 'Min. Spend ৳4,000',
      validTill: '25 Aug 2026',
      validUntilDate: '2026-08-25T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'percentage',
      status: 'Active'
    },
    {
      id: 6,
      code: 'SUMMER2025',
      title: 'Summer Early Bird Voucher (Expired)',
      discount: '৳500 OFF',
      minSpend: 'Min. Spend ৳3,000',
      validTill: '01 Aug 2025',
      validUntilDate: '2025-08-01T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'fixed',
      status: 'Expired'
    }
  ];

  const currentDate = new Date();

  // FILTER ONLY COLLECTED + NOT USED + NOT EXPIRED VOUCHERS
  const activeCollectedVouchers = vouchersData.filter(v => {
    const isCollected = collectedCodes.includes(v.code);
    const isUsed = usedCodes.includes(v.code);
    const isExpired = v.validUntilDate ? new Date(v.validUntilDate) < currentDate : false;
    return isCollected && !isUsed && !isExpired;
  });

  const handleClaimCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const cleanCode = inputCode.trim().toUpperCase();

    const foundVoucher = vouchersData.find(v => v.code === cleanCode);

    if (foundVoucher && foundVoucher.validUntilDate && new Date(foundVoucher.validUntilDate) < currentDate) {
      setClaimNotice(`❌ Coupon code "${cleanCode}" is EXPIRED and cannot be collected!`);
      setInputCode('');
      setTimeout(() => setClaimNotice(''), 3500);
      return;
    }

    if (collectedCodes.includes(cleanCode)) {
      setClaimNotice('You have already claimed this voucher code!');
    } else {
      setCollectedCodes(prev => [...prev, cleanCode]);
      setClaimNotice(`✓ Voucher code "${cleanCode}" successfully claimed!`);
    }
    setInputCode('');
    setTimeout(() => setClaimNotice(''), 3500);
  };

  const handleUseVoucher = (code) => {
    setUsedCodes(prev => [...prev, code]);
    setClaimNotice(`✓ Voucher "${code}" applied to booking & removed from active list!`);
    setTimeout(() => setClaimNotice(''), 3500);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">

            {/* Premium Savings Banner */}
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)',
                color: '#FFFFFF',
                padding: '28px',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(37,99,235,0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '12px', letterSpacing: '0.05em' }}>
                  <i className="fa-solid fa-tags" style={{ color: '#FDE047', marginRight: '6px' }}></i>
                  Customer Savings Hub
                </span>
                
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '10px 0 6px 0' }}>
                  My Collected Vouchers
                </h1>
                <p style={{ fontSize: '0.88rem', opacity: 0.9, margin: 0, maxWidth: '520px' }}>
                  Your active collected coupons and seller discounts. Used or expired vouchers are automatically removed!
                </p>
              </div>
            </div>

            {/* ── COLLECTED VOUCHERS LIST ── */}
            <div>
              {activeCollectedVouchers.length === 0 ? (
                <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '48px 24px', textAlign: 'center', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🎟️</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
                    No Active Collected Vouchers
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '0 0 20px 0', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
                    You currently have no collected active vouchers. Collect vouchers from tour packages or enter a valid coupon code above!
                  </p>
                  <Link
                    href="/tours"
                    style={{
                      background: '#2563EB',
                      color: '#FFFFFF',
                      padding: '10px 22px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    Browse Tour Packages →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
                  {activeCollectedVouchers.map((v) => (
                    <div
                      key={v.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        border: '2px solid #F97316',
                        padding: '18px',
                        boxShadow: '0 4px 16px rgba(249, 115, 22, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Top Right Orange Ribbon Badge with Checkmark */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '28px',
                        height: '28px',
                        background: '#F97316',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                        display: 'flex',
                        alignItems: 'top',
                        justifyContent: 'right'
                      }}>
                        <span style={{ color: '#FFF', fontSize: '0.65rem', fontWeight: 900, marginRight: '4px', marginTop: '2px' }}>✓</span>
                      </div>

                      <div>
                        {/* Title Header */}
                        <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#475569', margin: '0 0 12px 0' }}>
                          {v.title}
                        </h3>

                        {/* Ticket Stub Graphic Container */}
                        <div style={{
                          background: '#FFF1F2',
                          borderRadius: '12px',
                          padding: '14px',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          border: '1px solid #FFE4E6',
                          overflow: 'hidden',
                          marginBottom: '12px'
                        }}>
                          {/* Top & Bottom Notches */}
                          <div style={{ position: 'absolute', top: '-8px', left: '80px', width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF', borderBottom: '1px solid #FFE4E6' }}></div>
                          <div style={{ position: 'absolute', bottom: '-8px', left: '80px', width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF', borderTop: '1px solid #FFE4E6' }}></div>

                          {/* Left Side: Shop Logo & Name */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70px', flexShrink: 0, borderRight: '1.5px dashed #FDA4AF', paddingRight: '10px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 800, fontSize: '0.8rem', marginBottom: '4px' }}>
                              🛍️
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F43F5E', textAlign: 'center', lineHeight: '1.1' }}>
                              {v.seller || 'Tour Dibo'}
                            </span>
                          </div>

                          {/* Right Side: Discount % / Value, Min Spend & Start-End Date Range */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F43F5E', lineHeight: '1' }}>
                              {v.type === 'fixed' && v.discountVal ? `${formatPrice(v.discountVal)} OFF` : v.discount}
                            </div>
                            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F43F5E' }}>
                              {v.minSpendVal ? `Min. Spend ${formatPrice(v.minSpendVal)}` : (v.minSpend || 'No Min. Spend')}
                            </div>
                            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#F43F5E', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <span>Aug 9th 26 - Sep 23rd 26</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button: Copy Coupon Code */}
                      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                        <button
                          type="button"
                          onClick={() => handleCopy(v.code)}
                          style={{
                            width: '100%',
                            background: copiedCode === v.code ? '#DCFCE7' : '#2563EB',
                            color: copiedCode === v.code ? '#15803D' : '#FFFFFF',
                            border: copiedCode === v.code ? '1px solid #86EFAC' : 'none',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            fontSize: '0.86rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: copiedCode === v.code ? 'none' : '0 2px 8px rgba(37,99,235,0.25)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <i className={copiedCode === v.code ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                          {copiedCode === v.code ? '✓ Coupon Code Copied!' : 'Copy Coupon Code'}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

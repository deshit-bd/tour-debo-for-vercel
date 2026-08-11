'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function CustomerVouchersPage() {
  const [collectedCodes, setCollectedCodes] = useState(['EID2026', 'FLASH2000']);
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
      discount: '15% OFF',
      minSpend: 'Min. Spend ৳5,000',
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
      discount: '৳2,000 OFF',
      minSpend: 'Min. Spend ৳10,000',
      validTill: '15 Sep 2026',
      validUntilDate: '2026-09-15T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'fixed',
      status: 'Active'
    },
    {
      id: 3,
      code: 'SAJEK10',
      title: 'Sajek Valley Monsoon Voucher',
      discount: '10% OFF',
      minSpend: 'Min. Spend ৳4,000',
      validTill: '25 Aug 2026',
      validUntilDate: '2026-08-25T23:59:59',
      seller: 'DeshIT-BD Planner',
      type: 'percentage',
      status: 'Active'
    },
    {
      id: 4,
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
                <p style={{ fontSize: '0.88rem', opacity: 0.9, margin: '0 0 20px 0', maxWidth: '520px' }}>
                  Your active collected coupons and seller discounts. Used or expired vouchers are automatically removed!
                </p>

                {/* Redeem Promo Code Bar */}
                <form onSubmit={handleClaimCode} style={{ display: 'flex', gap: '10px', maxWidth: '440px' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. EID2026)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      outline: 'none',
                      color: '#0F172A',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#FDE047',
                      color: '#0F172A',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(253,224,71,0.3)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Claim Voucher
                  </button>
                </form>

                {claimNotice && (
                  <div style={{ marginTop: '10px', fontSize: '0.84rem', fontWeight: 700, color: claimNotice.includes('✓') ? '#86EFAC' : '#FCA5A5' }}>
                    {claimNotice}
                  </div>
                )}
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
                  {activeCollectedVouchers.map((v) => (
                    <div
                      key={v.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '18px',
                        border: '2px dashed #2563EB',
                        padding: '22px',
                        boxShadow: '0 4px 16px rgba(37,99,235,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                      }}
                    >
                      {/* Top Code Badge & Status */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '8px', fontFamily: 'monospace' }}>
                            <i className="fa-solid fa-ticket" style={{ marginRight: '6px' }}></i>
                            {v.code}
                          </span>

                          <span style={{ fontSize: '0.72rem', fontWeight: 800, background: '#DCFCE7', color: '#15803D', padding: '3px 10px', borderRadius: '12px' }}>
                            ✓ Collected &amp; Ready
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                          {v.title}
                        </h3>

                        {/* Huge Discount Amount Display */}
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #F1F5F9', marginBottom: '10px' }}>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563EB' }}>
                            {v.discount}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
                            {v.minSpend}
                          </div>
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa-regular fa-clock" style={{ color: '#94A3B8' }}></i>
                          <span>Valid till {v.validTill}</span>
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

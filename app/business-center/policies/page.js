'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerBusinessPoliciesPage() {
  const [activeTab, setActiveTab] = useState('payout'); // 'payout' | 'commission' | 'dispute' | 'cancellation'

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper" style={{ background: '#F8FAFC', paddingBottom: '60px' }}>
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">
            
            {/* Clean Minimalist Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Business Policies &amp; Guidelines
              </h1>
              <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '4px 0 0 0' }}>
                Official terms for payouts, commissions, dispute handling, and cancellations.
              </p>
            </div>

            {/* Clean Tab Switcher */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('payout')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'payout' ? '#2563EB' : 'transparent',
                  color: activeTab === 'payout' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                💳 Payout Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('commission')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'commission' ? '#2563EB' : 'transparent',
                  color: activeTab === 'commission' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                📊 Commission Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('dispute')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'dispute' ? '#2563EB' : 'transparent',
                  color: activeTab === 'dispute' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                ⚖️ Dispute Policy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cancellation')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'cancellation' ? '#2563EB' : 'transparent',
                  color: activeTab === 'cancellation' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                🚫 Cancellation Policy
              </button>
            </div>

            {/* POLICY CARDS */}

            {/* 1. PAYOUT POLICY */}
            {activeTab === 'payout' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '680px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                  💳 Payout &amp; Disbursal Rules
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                  <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ color: '#0F172A' }}>1. 3-Day Hold Period:</strong> Customer payment is placed in Hold Balance until 3 days after tour completion.
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ color: '#0F172A' }}>2. Minimum Withdrawal:</strong> Withdrawals can be requested once your balance reaches <strong>৳1,000 BDT</strong>.
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ color: '#0F172A' }}>3. Processing Time:</strong> Bank (NPSB) transfer takes 1-2 days; Mobile wallet (bKash/Nagad) takes within 24 hours.
                  </div>
                </div>
              </div>
            )}

            {/* 2. COMMISSION POLICY */}
            {activeTab === 'commission' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '680px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                  📊 Commission Rates Table
                </h3>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Service Type</th>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Commission Rate</th>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Seller Keep</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>Tour Packages</td>
                      <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 700, fontSize: '0.88rem' }}>10%</td>
                      <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700, fontSize: '0.88rem' }}>90%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>Express Visas</td>
                      <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 700, fontSize: '0.88rem' }}>8%</td>
                      <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700, fontSize: '0.88rem' }}>92%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>Tour Guide Service</td>
                      <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 700, fontSize: '0.88rem' }}>5%</td>
                      <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700, fontSize: '0.88rem' }}>95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. DISPUTE POLICY */}
            {activeTab === 'dispute' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '680px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                  ⚖️ Dispute Resolution Policy
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                  <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ color: '#0F172A' }}>1. Response SLA:</strong> Sellers must respond with evidence within <strong>48 hours</strong> of a customer dispute ticket.
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ color: '#0F172A' }}>2. Evidence:</strong> Upload hotel vouchers, bus tickets, or chat logs as proof of service delivery.
                  </div>
                </div>
              </div>
            )}

            {/* 4. CANCELLATION POLICY */}
            {activeTab === 'cancellation' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '680px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                  🚫 Cancellation &amp; Refund Policy
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#334155' }}>
                  <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <strong>• 7+ Days Prior:</strong> 100% full refund to customer.
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <strong>• 3-6 Days Prior:</strong> 50% refund to customer (50% paid to seller).
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <strong>• Under 24 Hours:</strong> Non-refundable (100% paid to seller).
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

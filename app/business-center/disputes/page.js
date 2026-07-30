'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function DisputesPage() {
  const disputesList = [
    { id: 'DSP-102', orderId: '#ORD-8821', customer: 'Imran Kabir', issue: 'Cancellation Refund Request (20 days before tour)', amount: '$300', status: 'Under Review by Admin', date: '20 Jan 2026' },
    { id: 'DSP-098', orderId: '#ORD-7412', customer: 'Nusrat Jahan', issue: 'Bus AC Breakdown Complaint', amount: '$50 Penalty', status: 'Resolved (Partial Refund)', date: '05 Jan 2026' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Dispute Cases & Claims</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Review customer claims, submit evidence, and manage dispute resolution with platform admin.
                  </p>
                </div>
              </div>

              {/* PDF Policy Rule Alert Box */}
              <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400E', marginBottom: '4px' }}>
                  ⚠️ PDF Dispute & Refund Rule:
                </div>
                <p style={{ fontSize: '0.8rem', color: '#78350F', margin: 0 }}>
                  Tour Cancel Option before 20 days incurs a penalty charge. If not disputed, payment release is handled automatically by Admin.
                </p>
              </div>

              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Dispute ID</th>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Issue Claimed</th>
                    <th>Claimed Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {disputesList.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 800 }}>{item.id}</td>
                      <td>{item.orderId}</td>
                      <td>{item.customer}</td>
                      <td>{item.issue}</td>
                      <td style={{ color: '#DC2626', fontWeight: 800 }}>{item.amount}</td>
                      <td><span className="status-pill warning">{item.status}</span></td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

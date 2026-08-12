'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';
import { useCurrency } from '../../context/CurrencyContext';

export default function RevenuePage() {
  const { formatPrice } = useCurrency();
  const [amount, setAmount] = useState('3400');
  const [bankName, setBankName] = useState('Dutch-Bangla Bank Ltd');
  const [branch, setBranch] = useState('Gulshan Branch, Dhaka');
  const [accNo, setAccNo] = useState('115.120.948123');
  const [routingNo, setRoutingNo] = useState('090261421');

  const [requested, setRequested] = useState(false);

  const handleDisburseRequest = (e) => {
    e.preventDefault();
    setRequested(true);
    setTimeout(() => setRequested(false), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            {/* Revenue Overview */}
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Revenue & Income Disbursement</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Track your total earnings, admin commission breakdown, and request online bank payouts.
                  </p>
                </div>
              </div>

              <div className="seller-metrics-grid">
                <div className="metric-card">
                  <span className="label">Total Earned Income</span>
                  <span className="value">{formatPrice(452000)}</span>
                  <span className="subtext">Gross Revenue</span>
                </div>
                <div className="metric-card">
                  <span className="label">Hold Amount (Available)</span>
                  <span className="value" style={{ color: '#2563EB' }}>{formatPrice(34000)}</span>
                  <span className="subtext" style={{ color: '#10B981' }}>Ready for Payout</span>
                </div>
                <div className="metric-card">
                  <span className="label">Total Disbursed</span>
                  <span className="value">{formatPrice(385000)}</span>
                  <span className="subtext">Paid via Bank Transfer</span>
                </div>
                <div className="metric-card">
                  <span className="label">Admin Commission</span>
                  <span className="value" style={{ color: '#DC2626' }}>{formatPrice(33000)}</span>
                  <span className="subtext">10% Platform Fee</span>
                </div>
              </div>
            </div>

            {/* Bank Transfer Disburse Request Form */}
            <div className="seller-card">
              <div className="seller-card-title">
                <span>Request Online Bank Payout / Disburse</span>
              </div>

              {requested && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>
                  ✓ Disburse Request Submitted! ৳34,000 will be transferred to your bank account within 24-48 hours.
                </div>
              )}

              <form onSubmit={handleDisburseRequest} className="seller-form-grid">
                <div className="seller-form-group">
                  <label>Payout Amount (৳) *</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Disbursement Method *</label>
                  <select>
                    <option>Bank Transfer (EFTN / BEFTN)</option>
                    <option>Online Payout Gateway</option>
                  </select>
                </div>

                <div className="seller-form-group">
                  <label>Bank Name *</label>
                  <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Branch & District *</label>
                  <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Account Number *</label>
                  <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Routing Number *</label>
                  <input type="text" value={routingNo} onChange={(e) => setRoutingNo(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width">
                  <button type="submit" className="btn-seller-primary" style={{ justifyContent: 'center' }}>
                    Submit Income Disburse Request
                  </button>
                </div>
              </form>
            </div>

            {/* Payout History */}
            <div className="seller-card">
              <div className="seller-card-title">
                <span>Disbursement History</span>
              </div>

              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Payout ID</th>
                    <th>Date</th>
                    <th>Bank / Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#PAY-771</td>
                    <td>10 Jan 2026</td>
                    <td>Dutch-Bangla Bank (115.120.***)</td>
                    <td>৳1,25,000</td>
                    <td><span className="status-pill success">Disbursed</span></td>
                  </tr>
                  <tr>
                    <td>#PAY-642</td>
                    <td>15 Dec 2025</td>
                    <td>City Bank Ltd (210.144.***)</td>
                    <td>৳1,80,000</td>
                    <td><span className="status-pill success">Disbursed</span></td>
                  </tr>
                  <tr>
                    <td>#PAY-519</td>
                    <td>01 Nov 2025</td>
                    <td>Brac Bank (150.110.***)</td>
                    <td>৳80,000</td>
                    <td><span className="status-pill success">Disbursed</span></td>
                  </tr>
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function OpenDisputePage() {
  const router = useRouter();
  const [proposal, setProposal] = useState('full');
  const [disputeReason, setDisputeReason] = useState('Trip Cancelled by Provider');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/account/refunds');
    }, 1500);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Reusable Account Sidebar */}
          <AccountSidebar />

          {/* Right Main Area: Open Dispute Form Card */}
          <div className="account-main-area">
            <div className="account-section-card dispute-card">
              <div className="dispute-card-header">
                <div>
                  <span className="account-eyebrow">Refund Support</span>
                  <h3 className="card-title-lg">Open Dispute</h3>
                  <p className="subtext-muted">Fill out the form below and attach evidence for faster review.</p>
                </div>
              </div>

              {submitted ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#10B981', fontWeight: '800' }}>
                  ✓ Dispute submitted successfully! Redirecting to Appeals & Refunds...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="dispute-form-grid">
                  {/* Proposal Radios & Dispute Reason Dropdown (PDF Page 21 Multi-option) */}
                  <div className="proposal-reason-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="field-block">
                      <label className="field-title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Your Proposal</label>
                      <div className="radios-group" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <label className="radio-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="proposal"
                            value="full"
                            checked={proposal === 'full'}
                            onChange={() => setProposal('full')}
                          />
                          Full Refund
                        </label>
                        <label className="radio-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="proposal"
                            value="partial"
                            checked={proposal === 'partial'}
                            onChange={() => setProposal('partial')}
                          />
                          Partial Refund
                        </label>
                      </div>
                    </div>

                    <div className="field-block">
                      <label className="field-title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Dispute Reason</label>
                      <div className="select-wrapper" style={{ position: 'relative' }}>
                        <select
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem', appearance: 'none', background: '#fff' }}
                        >
                          <option value="Trip Cancelled by Provider">Trip Cancelled by Provider</option>
                          <option value="Services Not Provided as Promised">Services Not Provided as Promised</option>
                          <option value="Billing & Payment Issue">Billing & Payment Issue</option>
                          <option value="Tour Guide Unprofessional / Absent">Tour Guide Unprofessional / Absent</option>
                          <option value="Itinerary & Hotel Quality Changed">Itinerary & Hotel Quality Changed</option>
                          <option value="Safety & Danger Concerns">Safety & Danger Concerns</option>
                          <option value="Others">Others (Please Specify Details Below)</option>
                        </select>
                        <small className="chevron-icon" style={{ position: 'absolute', right: '14px', top: '12px', pointerEvents: 'none', color: '#6B7280' }}>▼</small>
                      </div>
                    </div>
                  </div>

                  {/* Specify Reason Textarea */}
                  <div className="field-block" style={{ marginBottom: '20px' }}>
                    <label className="field-title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Please Specify The Reason Of Your Dispute</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your dispute details..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                      required
                    ></textarea>
                  </div>

                  {/* Upload Evidence Box */}
                  <div className="field-block" style={{ marginBottom: '20px' }}>
                    <label className="field-title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Please Upload Evidence</label>
                    <div className="evidence-upload-box" style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '24px', textAlign: 'center', background: '#F8FAFC', cursor: 'pointer' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '6px' }}>Click or drag files to upload screenshot evidence</div>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="dispute-submit-row">
                    <button type="submit" className="btn-submit-blue" style={{ background: '#2563EB', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                      Submit Dispute Case
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

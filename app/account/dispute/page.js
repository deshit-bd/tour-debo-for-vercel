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
            <div className="account-section-card">
              <h3 className="card-title-lg">Open Dispute</h3>
              <p className="subtext-muted">Fill Out These Form Below*</p>

              {submitted ? (
                <div style={{ padding: '40px', textCenter: 'center', color: '#10B981', fontWeight: '800' }}>
                  ✓ Dispute submitted successfully! Redirecting to Appeals & Refunds...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="dispute-form-grid">
                  {/* Proposal Radios & Dispute Reason Dropdown */}
                  <div className="proposal-reason-row">
                    <div className="field-block">
                      <label className="field-title">Your Proposal</label>
                      <div className="radios-group">
                        <label className="radio-item">
                          <input
                            type="radio"
                            name="proposal"
                            value="full"
                            checked={proposal === 'full'}
                            onChange={() => setProposal('full')}
                          />
                          Full Refund
                        </label>
                        <label className="radio-item">
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
                      <label className="field-title">Dispute Reason</label>
                      <div className="select-wrapper">
                        <select
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                        >
                          <option>Trip Cancelled by Provider</option>
                          <option>Services Not Provided as Promised</option>
                          <option>Billing Issue</option>
                        </select>
                        <small className="chevron-icon">▼</small>
                      </div>
                    </div>
                  </div>

                  {/* Specify Reason Textarea */}
                  <div className="field-block">
                    <label className="field-title">Please Specify The Reason Of Your Dispute</label>
                    <textarea
                      rows={6}
                      placeholder="Describe your dispute details..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="dispute-textarea"
                      required
                    ></textarea>
                  </div>

                  {/* Upload Evidence Box */}
                  <div className="field-block">
                    <label className="field-title">Please Upload Evidence</label>
                    <div className="evidence-upload-box">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="dispute-submit-row">
                    <button type="submit" className="btn-submit-blue">
                      Submit
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

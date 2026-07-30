'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';

export default function HelpSuggestionsPage() {
  const [intention, setIntention] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoName, setPhotoName] = useState('');

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);
    setPhotoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card help-suggestions-card">
              <div className="help-form-header">
                <span className="account-eyebrow">Customer Voice</span>
                <h3 className="card-title-lg">Help Center</h3>
                <p>Tell us what needs improvement. Our support team will review your suggestion.</p>
              </div>

              {/* Sub Tabs */}
              <div className="account-sub-tabs-bar">
                <Link href="/account/help" className="sub-tab">Customer Service</Link>
                <Link href="/account/help/suggestions" className="sub-tab active">Suggestions</Link>
              </div>

              {/* Suggestions Form */}
              <div className="dispute-form-grid">
                <div className="proposal-reason-row">
                  <div className="field-block">
                    <label className="field-title">Please let us know what you would like to do :</label>
                    <input
                      type="text"
                      className="suggestion-text-input"
                      placeholder="e.g. Improve booking confirmation flow"
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                    />
                  </div>

                  <div className="field-block">
                    <label className="field-title">E-mail</label>
                    <input
                      type="email"
                      className="suggestion-text-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-block">
                  <label className="field-title">Feedback</label>
                  <textarea
                    rows={6}
                    placeholder="Write your feedback in detail..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="dispute-textarea"
                  ></textarea>
                </div>

                <div className="field-block">
                  <label className="field-title">Provide a Photo</label>
                  <label className={`evidence-upload-box ${photoPreview ? 'has-preview' : ''}`}>
                    <input
                      type="file"
                      accept="image/*"
                      className="upload-file-input"
                      onChange={handlePhotoChange}
                    />
                    {photoPreview ? (
                      <img src={photoPreview} alt="Selected evidence preview" className="upload-preview-img" />
                    ) : (
                      <span className="upload-empty-state">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Click to upload photo</span>
                        <small>PNG, JPG or WEBP</small>
                      </span>
                    )}
                  </label>
                  {photoName && <small className="upload-file-name">{photoName}</small>}
                </div>

                <div className="dispute-submit-row">
                  <button className="btn-submit-blue">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Messages Button */}
      <div className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </div>

      <Footer />
    </div>
  );
}

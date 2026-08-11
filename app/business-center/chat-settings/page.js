'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function ChatSettingsPage() {
  const [activeTab, setActiveTab] = useState('quick_reply'); // 'quick_reply' or 'auto_reply'

  // ── QUICK REPLY STATE (FULLY CUSTOM TIMES & DELAY) ──
  const [quickReplyScheduleMode, setQuickReplyScheduleMode] = useState('custom'); // 'custom', 'always'
  const [quickReplyStartTime, setQuickReplyStartTime] = useState('09:00');
  const [quickReplyEndTime, setQuickReplyEndTime] = useState('22:00');
  const [quickReplyDelay, setQuickReplyDelay] = useState('0'); // custom number input in seconds
  const [quickSavedNotice, setQuickSavedNotice] = useState(false);

  const [newQuickLabel, setNewQuickLabel] = useState('');
  const [newQuickText, setNewQuickText] = useState('');
  const [quickReplyTemplates, setQuickReplyTemplates] = useState([
    { id: 1, label: 'Package Inclusions', text: 'Hi! All our packages include AC bus transport, 3-star hotel accommodation, daily breakfast & guided sightseeing tours.' },
    { id: 2, label: 'Visa Required Docs', text: 'For visa processing, we require: 07 Months Valid Passport, 2 White BG Photos, 6-Month Bank Statement & Solvency Certificate.' },
    { id: 3, label: 'Booking Confirmation', text: 'Your booking request has been received! Please allow 15-30 minutes for ticket & voucher generation.' },
    { id: 4, label: 'Payment Methods', text: 'We accept bKash, Nagad, Visa, Mastercard, AMEX & direct bank transfer options.' }
  ]);

  // ── AUTO REPLY STATE (FULLY CUSTOM TIMES) ──
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [autoReplyScheduleMode, setAutoReplyScheduleMode] = useState('custom'); // 'custom', 'holiday'
  const [autoReplyStartTime, setAutoReplyStartTime] = useState('22:00');
  const [autoReplyEndTime, setAutoReplyEndTime] = useState('08:00');
  const [autoReplyText, setAutoReplyText] = useState(
    'Hi! Thank you for reaching out to DeshIT-BD. We are currently offline. We will reply to your message first thing in the morning!'
  );
  const [autoSavedNotice, setAutoSavedNotice] = useState(false);

  const handleAddQuickTemplate = () => {
    if (!newQuickLabel.trim() || !newQuickText.trim()) return;
    setQuickReplyTemplates(prev => [
      ...prev,
      { id: Date.now(), label: newQuickLabel.trim(), text: newQuickText.trim() }
    ]);
    setNewQuickLabel('');
    setNewQuickText('');
  };

  const handleDeleteQuickTemplate = (id) => {
    setQuickReplyTemplates(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">

            {/* Clean Header */}
            <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Chat Settings
                </h1>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Manage Quick Reply templates, Auto-Reply time schedules, and message triggers.
                </p>
              </div>

              <Link
                href="/business-center/messages"
                style={{
                  background: '#F1F5F9',
                  color: '#2563EB',
                  border: '1px solid #CBD5E1',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fa-solid fa-comments"></i>
                <span>Back to Live Chat</span>
              </Link>
            </header>

            {/* ── CLEAN HORIZONTAL TABS BAR ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #E2E8F0', marginBottom: '24px', paddingBottom: '0' }}>
              
              <button
                type="button"
                onClick={() => setActiveTab('quick_reply')}
                style={{
                  padding: '12px 24px',
                  background: activeTab === 'quick_reply' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'quick_reply' ? '#2563EB' : '#64748B',
                  fontWeight: activeTab === 'quick_reply' ? 800 : 600,
                  fontSize: '0.94rem',
                  border: 'none',
                  borderBottom: activeTab === 'quick_reply' ? '3px solid #2563EB' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '-2px'
                }}
              >
                <i className="fa-solid fa-bolt" style={{ color: activeTab === 'quick_reply' ? '#2563EB' : '#94A3B8' }}></i>
                <span>Quick Reply</span>
                <span style={{ background: activeTab === 'quick_reply' ? '#DBEAFE' : '#F1F5F9', color: activeTab === 'quick_reply' ? '#1D4ED8' : '#64748B', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {quickReplyTemplates.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('auto_reply')}
                style={{
                  padding: '12px 24px',
                  background: activeTab === 'auto_reply' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'auto_reply' ? '#166534' : '#64748B',
                  fontWeight: activeTab === 'auto_reply' ? 800 : 600,
                  fontSize: '0.94rem',
                  border: 'none',
                  borderBottom: activeTab === 'auto_reply' ? '3px solid #166534' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '-2px'
                }}
              >
                <i className="fa-solid fa-robot" style={{ color: activeTab === 'auto_reply' ? '#166534' : '#94A3B8' }}></i>
                <span>Auto Reply</span>
                <span style={{ background: autoReplyEnabled ? '#DCFCE7' : '#FEE2E2', color: autoReplyEnabled ? '#15803D' : '#DC2626', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {autoReplyEnabled ? 'ON' : 'OFF'}
                </span>
              </button>

            </div>

            {/* ── TAB 1: QUICK REPLY SETTINGS (CUSTOM TIME PICKERS) ── */}
            {activeTab === 'quick_reply' && (
              <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', maxWidth: '820px' }}>
                
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-bolt" style={{ color: '#2563EB' }}></i>
                  <span>Quick Reply Preset Templates</span>
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '0 0 24px 0' }}>
                  Create and manage 1-click preset response templates to quickly send to customers during live chat sessions.
                </p>

                {/* Templates List */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-list-check" style={{ color: '#2563EB' }}></i>
                    <span>Saved Quick Reply Templates ({quickReplyTemplates.length})</span>
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {quickReplyTemplates.map((t) => (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                        <div style={{ minWidth: 0, flex: 1, paddingRight: '12px' }}>
                          <strong style={{ fontSize: '0.88rem', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                            <i className="fa-solid fa-bolt" style={{ fontSize: '0.78rem' }}></i>
                            <span>{t.label}</span>
                          </strong>
                          <span style={{ fontSize: '0.82rem', color: '#475569' }}>{t.text}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuickTemplate(t.id)}
                          style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Template Form */}
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '20px', borderRadius: '14px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1E40AF', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-circle-plus"></i>
                    <span>Create New Quick Reply Template</span>
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E40AF', display: 'block', marginBottom: '4px' }}>Short Label Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Refund Policy / Hotel Details"
                        value={newQuickLabel}
                        onChange={(e) => setNewQuickLabel(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFFFFF' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E40AF', display: 'block', marginBottom: '4px' }}>Message Response Text *</label>
                      <textarea
                        rows={2}
                        placeholder="Type full reply content to send to customers..."
                        value={newQuickText}
                        onChange={(e) => setNewQuickText(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddQuickTemplate}
                      style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '0.86rem', fontWeight: 800, cursor: 'pointer', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <i className="fa-solid fa-plus"></i>
                      <span>Add Quick Reply Template</span>
                    </button>
                  </div>
                </div>

                {quickSavedNotice && (
                  <div style={{ background: '#DCFCE7', color: '#15803D', padding: '12px 16px', borderRadius: '10px', fontSize: '0.86rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Quick Reply Settings &amp; Custom Schedule Saved Successfully!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setQuickSavedNotice(true);
                    setTimeout(() => setQuickSavedNotice(false), 2500);
                  }}
                  style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  <span>Save Quick Reply Settings</span>
                </button>

              </div>
            )}

            {/* ── TAB 2: AUTO REPLY SETTINGS (CUSTOM TIME PICKERS) ── */}
            {activeTab === 'auto_reply' && (
              <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', maxWidth: '820px' }}>
                
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-robot" style={{ color: '#166534' }}></i>
                  <span>Auto Reply Settings &amp; Custom Time Window</span>
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '0 0 24px 0' }}>
                  Set custom offline start time &amp; end time for automatic responses when you are away.
                </p>

                {/* Enable Switch Card */}
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px 20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: '#166534', display: 'block' }}>Automated Offline Response</strong>
                    <span style={{ fontSize: '0.78rem', color: '#15803D' }}>Automatically reply to customer queries during offline window</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
                    style={{
                      background: autoReplyEnabled ? '#22C55E' : '#CBD5E1',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <i className={autoReplyEnabled ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'}></i>
                    <span>{autoReplyEnabled ? 'ENABLED ON' : 'DISABLED OFF'}</span>
                  </button>
                </div>

                {/* Custom Time Trigger Schedule System */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                    <i className="fa-solid fa-clock" style={{ color: '#166534' }}></i>
                    <span>Auto-Reply Active Schedule Mode:</span>
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    {/* Custom Schedule Radio Option */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 18px', borderRadius: '12px', border: autoReplyScheduleMode === 'custom' ? '2px solid #22C55E' : '1px solid #E2E8F0', background: autoReplyScheduleMode === 'custom' ? '#F0FDF4' : '#F8FAFC', cursor: 'pointer' }}>
                      <input type="radio" name="autoScheduleTab" checked={autoReplyScheduleMode === 'custom'} onChange={() => setAutoReplyScheduleMode('custom')} />
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa-solid fa-moon" style={{ color: '#6366F1' }}></i>
                          <span>Custom Offline Schedule (Set Your Own Start &amp; End Time)</span>
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Set exact start and end times for automated responses</span>
                      </div>
                    </label>

                    {/* Holiday Mode Radio Option */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 18px', borderRadius: '12px', border: autoReplyScheduleMode === 'holiday' ? '2px solid #22C55E' : '1px solid #E2E8F0', background: autoReplyScheduleMode === 'holiday' ? '#F0FDF4' : '#F8FAFC', cursor: 'pointer' }}>
                      <input type="radio" name="autoScheduleTab" checked={autoReplyScheduleMode === 'holiday'} onChange={() => setAutoReplyScheduleMode('holiday')} />
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa-solid fa-plane-departure" style={{ color: '#0EA5E9' }}></i>
                          <span>Holiday / Away Mode (24 Hours Continuous Active)</span>
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Continuous auto reply during vacation or office holidays</span>
                      </div>
                    </label>

                  </div>

                  {/* Custom Start & End Time Input Boxes */}
                  {autoReplyScheduleMode === 'custom' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px', background: '#F8FAFC', padding: '18px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Auto Reply Start Time (Offline Starts):
                        </label>
                        <input
                          type="time"
                          value={autoReplyStartTime}
                          onChange={(e) => setAutoReplyStartTime(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 600, background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                          Auto Reply End Time (Offline Ends):
                        </label>
                        <input
                          type="time"
                          value={autoReplyEndTime}
                          onChange={(e) => setAutoReplyEndTime(e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 600, background: '#FFFFFF' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Auto Reply Content Text Area */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                    <i className="fa-solid fa-pen-to-square" style={{ color: '#166534' }}></i>
                    <span>Auto-Reply Text Message Content:</span>
                  </label>
                  <textarea
                    rows={3}
                    value={autoReplyText}
                    onChange={(e) => setAutoReplyText(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }}
                  />
                </div>

                {autoSavedNotice && (
                  <div style={{ background: '#DCFCE7', color: '#15803D', padding: '12px 16px', borderRadius: '10px', fontSize: '0.86rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Auto Reply Schedule &amp; Custom Time Window Saved Successfully!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setAutoSavedNotice(true);
                    setTimeout(() => setAutoSavedNotice(false), 2500);
                  }}
                  style={{ background: '#166534', color: '#FFFFFF', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  <span>Save Auto Reply Settings</span>
                </button>

              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

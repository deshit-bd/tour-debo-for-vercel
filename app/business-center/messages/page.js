'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  // ── 🤖 AUTO REPLY SETTINGS STATE ──
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [autoReplySchedule, setAutoReplySchedule] = useState('outside_hours'); // 'outside_hours', 'holiday', 'custom'
  const [autoReplyStartTime, setAutoReplyStartTime] = useState('22:00');
  const [autoReplyEndTime, setAutoReplyEndTime] = useState('08:00');
  const [autoReplyText, setAutoReplyText] = useState(
    'Hi! Thank you for reaching out to DeshIT-BD. We are currently offline (Our operating hours are 9:00 AM to 10:00 PM). We have received your query and will reply first thing in the morning!'
  );
  const [showAutoReplyModal, setShowAutoReplyModal] = useState(false);
  const [autoReplySavedNotice, setAutoReplySavedNotice] = useState(false);

  // ── ⚡ QUICK REPLY SETTINGS STATE ──
  const [quickReplySchedule, setQuickReplySchedule] = useState('office_hours'); // 'always', 'office_hours'
  const [quickReplyDelay, setQuickReplyDelay] = useState('0'); // '0', '15', '30' seconds
  const [showQuickReplyModal, setShowQuickReplyModal] = useState(false);
  const [quickReplySavedNotice, setQuickReplySavedNotice] = useState(false);

  const [newQuickLabel, setNewQuickLabel] = useState('');
  const [newQuickText, setNewQuickText] = useState('');

  const [quickReplyTemplates, setQuickReplyTemplates] = useState([
    { id: 1, label: 'Package Inclusions', text: 'Hi! All our packages include AC bus transport, 3-star hotel accommodation, daily breakfast & guided sightseeing tours.' },
    { id: 2, label: 'Visa Required Docs', text: 'For visa processing, we require: 07 Months Valid Passport, 2 White BG Photos, 6-Month Bank Statement & Solvency Certificate.' },
    { id: 3, label: 'Booking Confirmation', text: 'Your booking request has been received! Please allow 15-30 minutes for ticket & voucher generation.' },
    { id: 4, label: 'Payment Methods', text: 'We accept bKash, Nagad, Visa, Mastercard, AMEX & direct bank transfer options.' }
  ]);

  const [chatThreads, setChatThreads] = useState([
    {
      id: 1,
      customerName: 'DeshIT-BD Planner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      statusText: 'Active Now',
      messages: [
        { id: 101, sender: 'customer', senderLabel: 'OP', text: "Hello! I have a question about the Cox's Bazar tour package itinerary.", time: '8:00 PM' },
        { id: 102, sender: 'seller', text: 'Hi! Sure, I would be happy to help you with all the details.', time: '8:01 PM' },
        { id: 103, sender: 'customer', senderLabel: 'OP', text: "Is transportation included from Dhaka to Cox's Bazar?", time: '8:02 PM' },
        { id: 104, sender: 'seller', text: 'Yes, AC bus transportation is fully included in the package rate.', time: '8:03 PM' },
        { id: 105, sender: 'customer', senderLabel: 'OP', text: 'Great! What about hotel accommodation details?', time: '8:05 PM' },
        { id: 106, sender: 'seller', text: '3-Star Deluxe Beach View Hotel with daily breakfast is provided.', time: '8:06 PM' }
      ]
    },
    {
      id: 2,
      customerName: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      statusText: '5 mins ago',
      messages: [
        { id: 201, sender: 'customer', senderLabel: 'OP', text: 'Hi, is Sajek Valley 3-day package available for August 15?', time: '7:40 PM' },
        { id: 202, sender: 'seller', text: 'Yes Tanvir, slots are vacant for 15th August!', time: '7:42 PM' }
      ]
    },
    {
      id: 3,
      customerName: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      statusText: '12 mins ago',
      messages: [
        { id: 301, sender: 'customer', senderLabel: 'OP', text: 'What documents are required for Thailand Express Visa?', time: '6:15 PM' },
        { id: 302, sender: 'seller', text: 'Passport copy, 2 photos, and 6-month bank statement.', time: '6:20 PM' }
      ]
    },
    {
      id: 4,
      customerName: 'Sajid Ibrahim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      statusText: '1 hour ago',
      messages: [
        { id: 401, sender: 'customer', senderLabel: 'OP', text: 'Can we book a private boat for Ratargul Swamp Forest?', time: '5:10 PM' }
      ]
    },
    {
      id: 5,
      customerName: 'Anika Tabassum',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      statusText: '2 hours ago',
      messages: [
        { id: 501, sender: 'customer', senderLabel: 'OP', text: 'Do you offer student discounts on Sylhet tour?', time: '4:05 PM' }
      ]
    }
  ]);

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread.messages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'seller',
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setMessageInput('');
  };

  const sendQuickReplyText = (text) => {
    const newMsg = {
      id: Date.now(),
      sender: 'seller',
      isQuickReply: true,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
  };

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

  // ── ⚡ WHATSAPP-STYLE SLASH (/) COMMAND QUICK REPLY POPUP ──
  const isSlashCommandActive = messageInput.startsWith('/');
  const slashQuery = isSlashCommandActive ? messageInput.slice(1).toLowerCase().trim() : '';

  const filteredSlashTemplates = quickReplyTemplates.filter(t =>
    t.label.toLowerCase().includes(slashQuery) || t.text.toLowerCase().includes(slashQuery)
  );

  const selectSlashTemplate = (text) => {
    setMessageInput(text);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">
            
            {/* Main Chat Grid with Fixed Height & Independent Dual Scrolling */}
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Left Column: Messages Contacts Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: '620px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', margin: '0 0 14px 0', flexShrink: 0 }}>
                  Messages
                </h2>

                {/* Independent Scrollable Contacts List Window */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto', maxHeight: '540px', paddingRight: '4px', scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 transparent' }}>
                  {chatThreads.map((thread) => {
                    const isSelected = activeThreadId === thread.id;
                    return (
                      <div
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: '16px',
                          background: isSelected ? '#EBF3FF' : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          flexShrink: 0
                        }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={thread.avatar} alt={thread.customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {thread.customerName}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '3px' }}>
                            {thread.statusText}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Chat Window Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: '620px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Header Row: Customer Info + Quick & Auto Reply Config Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9', flexShrink: 0, flexWrap: 'wrap', gap: '10px' }}>
                  
                  {/* Left: Customer Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={activeThread.avatar} alt={activeThread.customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                        {activeThread.customerName}
                      </h3>
                      <small style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>● Online</small>
                    </div>
                  </div>

                  {/* Right: AI Protection Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '5px 10px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '700' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB', display: 'inline-block' }}></span>
                      AI Contact Protection
                    </div>

                  </div>

                </div>

                {/* Chat Messages Body (Independently Scrollable Window) */}
                <div style={{ flex: 1, padding: '16px 8px 16px 0', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '380px', scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 transparent' }}>
                  {activeThread.messages.map((m) => {
                    const isSeller = m.sender === 'seller';

                    if (!isSeller) {
                      // OP (Customer) Incoming Bubble
                      return (
                        <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '75%' }}>
                          <div style={{ background: '#F4F6F9', color: '#1E293B', padding: '14px 18px', borderRadius: '16px', borderTopLeftRadius: '4px' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94A3B8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              {m.senderLabel || 'OP'}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, fontWeight: '500' }}>
                              {m.text}
                            </p>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
                              {m.time}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Seller (Blue) Outgoing Bubble
                    return (
                      <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'flex-end', maxWidth: '75%' }}>
                        <div style={{ background: '#1665D8', color: '#FFFFFF', padding: '14px 18px', borderRadius: '16px', borderTopRightRadius: '4px', boxShadow: '0 4px 12px rgba(22,101,216,0.15)' }}>
                          {m.isQuickReply && (
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#DBEAFE', color: '#1D4ED8', padding: '2px 8px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                              <i className="fa-solid fa-bolt" style={{ fontSize: '0.64rem' }}></i>
                              <span>Quick Replied</span>
                            </span>
                          )}
                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, fontWeight: '500' }}>
                            {m.text}
                          </p>
                          <div style={{ fontSize: '0.72rem', color: '#DBEAFE', marginTop: '6px', textAlign: 'left' }}>
                            {m.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>



                {/* ── ⚡ WHATSAPP-STYLE SLASH (/) QUICK REPLY POPUP MENU ── */}
                {isSlashCommandActive && (
                  <div
                    style={{
                      background: '#0F172A',
                      color: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      marginBottom: '8px',
                      boxShadow: '0 12px 32px rgba(15, 23, 42, 0.4)',
                      border: '1.5px solid #334155',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      scrollbarWidth: 'thin'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.04em' }}>
                      <i className="fa-solid fa-bolt" style={{ color: '#60A5FA' }}></i>
                      <span>Quick Reply Slash Commands (Type or Select)</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {filteredSlashTemplates.map((t) => {
                        const slug = '/' + t.label.toLowerCase().replace(/[^a-z0-9]/g, '');
                        return (
                          <div
                            key={t.id}
                            onClick={() => selectSlashTemplate(t.text)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              background: '#1E293B',
                              border: '1px solid #334155',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.borderColor = '#334155'; }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#60A5FA', fontFamily: 'monospace' }}>
                                {slug}
                              </span>
                              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#F8FAFC' }}>
                                {t.label}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.76rem', color: '#CBD5E1', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {t.text}
                            </span>
                          </div>
                        );
                      })}

                      {filteredSlashTemplates.length === 0 && (
                        <div style={{ fontSize: '0.82rem', color: '#94A3B8', padding: '8px 4px' }}>
                          No matching Quick Reply command found for &quot;{slashQuery}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Input Area (Fixed) */}
                <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <input
                    type="text"
                    placeholder="Type / for Quick Replies or write a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: '#F1F5F9',
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: '16px',
                      fontSize: '0.9rem',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />

                  {/* Attachment Icon Button */}
                  <button
                    type="button"
                    title="Attach file"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#64748B',
                      flexShrink: 0
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>

                  {/* Circular Blue Send Button */}
                  <button
                    type="submit"
                    title="Send message"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#1665D8',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(22,101,216,0.3)',
                      flexShrink: 0
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </form>

              </div>

            </div>

          </div>
        </div>
      </main>

      {/* ── 🤖 AUTO REPLY SETTINGS & SCHEDULE MODAL ── */}
      {showAutoReplyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(3px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '560px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #CBD5E1' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                🤖 Auto Reply &amp; Time Schedule Settings
              </h3>
              <button onClick={() => setShowAutoReplyModal(false)} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            {/* Toggle Switch */}
            <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>Enable Automated Offline Response</strong>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Automatically answer customer inquiries when offline</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
                style={{
                  background: autoReplyEnabled ? '#22C55E' : '#CBD5E1',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {autoReplyEnabled ? 'ENABLED ON ✓' : 'DISABLED OFF'}
              </button>
            </div>

            {/* Time Schedule Selector System */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>
                ⏰ Select Auto-Reply Active Schedule / Trigger Time:
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: autoReplySchedule === 'outside_hours' ? '2px solid #2563EB' : '1px solid #CBD5E1', background: autoReplySchedule === 'outside_hours' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer' }}>
                  <input type="radio" name="schedule" checked={autoReplySchedule === 'outside_hours'} onChange={() => setAutoReplySchedule('outside_hours')} />
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>🌙 Outside Working Hours (10:00 PM – 8:00 AM)</strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Sends auto reply automatically during night &amp; non-business hours</span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: autoReplySchedule === 'holiday' ? '2px solid #2563EB' : '1px solid #CBD5E1', background: autoReplySchedule === 'holiday' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer' }}>
                  <input type="radio" name="schedule" checked={autoReplySchedule === 'holiday'} onChange={() => setAutoReplySchedule('holiday')} />
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>✈️ Holiday / Away Mode (24 Hours Active)</strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Continuous auto reply during vacation or office holidays</span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: autoReplySchedule === 'custom' ? '2px solid #2563EB' : '1px solid #CBD5E1', background: autoReplySchedule === 'custom' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer' }}>
                  <input type="radio" name="schedule" checked={autoReplySchedule === 'custom'} onChange={() => setAutoReplySchedule('custom')} />
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>⏱️ Custom Daily Time Window</strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Set custom start and end time for automated replies</span>
                  </div>
                </label>
              </div>

              {/* Custom Time Range Picker */}
              {autoReplySchedule === 'custom' && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Start Time:</label>
                    <input type="time" value={autoReplyStartTime} onChange={(e) => setAutoReplyStartTime(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>End Time:</label>
                    <input type="time" value={autoReplyEndTime} onChange={(e) => setAutoReplyEndTime(e.target.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Auto Reply Text Content Box */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                📝 Auto-Reply Text Message Content:
              </label>
              <textarea
                rows={3}
                value={autoReplyText}
                onChange={(e) => setAutoReplyText(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {autoReplySavedNotice && (
              <div style={{ background: '#DCFCE7', color: '#15803D', padding: '8px 12px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px' }}>
                ✓ Auto Reply Schedule &amp; Time Settings Saved Successfully!
              </div>
            )}

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowAutoReplyModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setAutoReplySavedNotice(true);
                  setTimeout(() => { setAutoReplySavedNotice(false); setShowAutoReplyModal(false); }, 1200);
                }}
                style={{ padding: '8px 22px', borderRadius: '8px', border: 'none', background: '#2563EB', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}
              >
                Save Auto Reply Rules ✓
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── ⚡ QUICK REPLY SETTINGS & TEMPLATES MODAL ── */}
      {showQuickReplyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(3px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '620px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #CBD5E1', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚡ Quick Reply Presets &amp; Trigger Timing
              </h3>
              <button onClick={() => setShowQuickReplyModal(false)} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            {/* Quick Reply Time & Trigger Rules */}
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '18px' }}>
              <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block', marginBottom: '10px' }}>
                ⏱️ Quick Reply Active Time &amp; Trigger Rules:
              </strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Active Schedule Window:</label>
                  <select value={quickReplySchedule} onChange={(e) => setQuickReplySchedule(e.target.value)} style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}>
                    <option value="office_hours">During Office Hours (9 AM - 10 PM)</option>
                    <option value="always">Always Active (24/7)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Auto-Trigger Delay:</label>
                  <select value={quickReplyDelay} onChange={(e) => setQuickReplyDelay(e.target.value)} style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}>
                    <option value="0">Instant One-Click</option>
                    <option value="15">Auto-suggest in 15 sec</option>
                    <option value="30">Auto-suggest in 30 sec</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Existing Quick Reply Presets List */}
            <div style={{ marginBottom: '18px' }}>
              <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                📋 Quick Reply Preset Templates List ({quickReplyTemplates.length}):
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {quickReplyTemplates.map((t) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: '#7E22CE', display: 'block' }}>⚡ {t.label}</strong>
                      <span style={{ fontSize: '0.76rem', color: '#475569' }}>{t.text}</span>
                    </div>
                    <button type="button" onClick={() => handleDeleteQuickTemplate(t.id)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Quick Reply Template Form */}
            <div style={{ background: '#F1F5F9', padding: '14px', borderRadius: '12px', marginBottom: '18px' }}>
              <strong style={{ fontSize: '0.84rem', color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                ➕ Create New Quick Reply Template:
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" placeholder="Short Label (e.g. Refund Policy)" value={newQuickLabel} onChange={(e) => setNewQuickLabel(e.target.value)} style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }} />
                <textarea rows={2} placeholder="Full Message Response Text..." value={newQuickText} onChange={(e) => setNewQuickText(e.target.value)} style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }} />
                <button type="button" onClick={handleAddQuickTemplate} style={{ background: '#7E22CE', color: '#FFFFFF', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-end' }}>
                  + Add Template
                </button>
              </div>
            </div>

            {quickReplySavedNotice && (
              <div style={{ background: '#DCFCE7', color: '#15803D', padding: '8px 12px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px' }}>
                ✓ Quick Reply Rules &amp; Templates Saved Successfully!
              </div>
            )}

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowQuickReplyModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setQuickReplySavedNotice(true);
                  setTimeout(() => { setQuickReplySavedNotice(false); setShowQuickReplyModal(false); }, 1200);
                }}
                style={{ padding: '8px 22px', borderRadius: '8px', border: 'none', background: '#2563EB', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}
              >
                Save Quick Reply Settings ✓
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

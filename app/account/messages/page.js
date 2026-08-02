'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

function MessageCenterContent() {
  const searchParams = useSearchParams();
  const guideParam = searchParams.get('guide');
  const packageParam = searchParams.get('package');
  const personsParam = searchParams.get('persons');
  const priceParam = searchParams.get('price');
  const tabParam = searchParams.get('tab');

  // Default active tab to 'chat' (Seller Chat)
  const [activeTab, setActiveTab] = useState(tabParam || 'chat');

  const [chatMessage, setChatMessage] = useState('');
  const [warningMsg, setWarningMsg] = useState('');

  // Default chat messages list
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    if (guideParam) {
      setActiveTab('chat');
      setMessagesList([
        {
          id: 1,
          sender: guideParam,
          text: `Hi! I am ${guideParam}, your verified guide for "${packageParam || 'tour package'}". How can I assist you with your booking?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'left',
        },
        {
          id: 2,
          sender: 'Me',
          text: `Hello ${guideParam}! I would like to book the "${packageParam || 'tour package'}" for ${personsParam || 'my group'} (Rate: ৳${priceParam || '1,500'}/day). Please confirm availability!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'right',
        },
      ]);
    } else {
      setMessagesList([
        { id: 1, sender: 'OP', text: "Hello! I have a question about the Cox's Bazar tour package itinerary.", time: '8:00 PM', type: 'left' },
        { id: 2, sender: 'Me', text: 'Hi! Sure, I would be happy to help you with all the details.', time: '8:01 PM', type: 'right' },
        { id: 3, sender: 'OP', text: 'Is transportation included from Dhaka to Cox’s Bazar?', time: '8:02 PM', type: 'left' },
        { id: 4, sender: 'Me', text: 'Yes, AC bus transportation is fully included in the package rate.', time: '8:03 PM', type: 'right' },
      ]);
    }
  }, [guideParam, packageParam, personsParam, priceParam]);

  const alertsList = [
    {
      id: 1,
      title: 'DeshIT-BD Just Posted an Update',
      desc: 'New customized itineraries and verified guide options are now available for Sajek & Sylhet tours.',
      time: '10 mins ago',
      icon: '📣',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      iconBg: '#2563EB',
      btnLabel: 'View Details',
      btnColor: '#2563EB',
    },
    {
      id: 2,
      title: 'Special Discount Voucher Available for Sajek Tour',
      desc: 'Use promo code SAJEK2026 at checkout to enjoy an instant ৳1,500 discount on family group packages.',
      time: '2 hours ago',
      icon: '🎁',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      iconBg: '#10B981',
      btnLabel: 'Claim Voucher',
      btnColor: '#059669',
    },
    {
      id: 3,
      title: 'Weather & Schedule Update for Paris Package',
      desc: 'Clear sunny skies forecasted for the Louvre Museum walking tour. Departure time remains 09:00 AM sharp.',
      time: '1 day ago',
      icon: '☀️',
      bg: '#FFFBEB',
      border: '#FDE68A',
      iconBg: '#F59E0B',
      btnLabel: 'Check Schedule',
      btnColor: '#D97706',
    },
    {
      id: 4,
      title: 'Booking Payment Received & Confirmed',
      desc: 'Payment for Order #8849201948102 has been verified by admin. Your travel voucher PDF is ready.',
      time: '2 days ago',
      icon: '🎉',
      bg: '#F3E8FF',
      border: '#E9D5FF',
      iconBg: '#9333EA',
      btnLabel: 'View Receipt',
      btnColor: '#7E22CE',
    },
  ];

  const promotionsList = [
    { id: 1, title: '🎉 Eid Special Visa Offer', desc: 'Get 15% OFF on all European Student Visa processing fees this month!', code: 'EIDVISA15' },
    { id: 2, title: '🏖️ Cox’s Bazar Weekend Flash Sale', desc: 'Book 3 Days / 2 Nights tour package and get complimentary breakfast for 2.', code: 'BEACH2026' },
  ];

  // Contact info check rule
  const containsContactInfo = (text) => {
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const bdMobileRegex = /(01[3-9]\d{8}|\+?8801[3-9]\d{8})/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const digitSequenceRegex = /(\d[\s.-]*){6,}/;

    return (
      phoneRegex.test(text) ||
      bdMobileRegex.test(text) ||
      emailRegex.test(text) ||
      digitSequenceRegex.test(text)
    );
  };

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileObj = {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type,
        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      };
      setSelectedFile(fileObj);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setWarningMsg('');

    if (containsContactInfo(chatMessage)) {
      setWarningMsg('⚠️ Safety Notice: Contact information (phone numbers, emails, or digit sequences) cannot be shared in chat.');
      return;
    }

    if (chatMessage.trim() || selectedFile) {
      const newMsg = {
        id: messagesList.length + 1,
        sender: 'Me',
        text: chatMessage.trim(),
        file: selectedFile,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'right',
      };
      setMessagesList([...messagesList, newMsg]);
      setChatMessage('');
      setSelectedFile(null);
    }
  };

  return (
    <div className="account-main-area">
      {/* Top Pill Navigation Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('chat')}
          style={{
            padding: '10px 24px',
            borderRadius: '999px',
            border: activeTab === 'chat' ? 'none' : '1px solid #E2E8F0',
            background: activeTab === 'chat' ? '#2563EB' : '#ffffff',
            color: activeTab === 'chat' ? '#ffffff' : '#0F172A',
            fontWeight: activeTab === 'chat' ? '700' : '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'chat' ? '0 4px 14px rgba(37,99,235,0.25)' : 'none',
          }}
        >
          Seller Chat {guideParam ? `(${guideParam})` : ''}
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            padding: '10px 24px',
            borderRadius: '999px',
            border: activeTab === 'alerts' ? 'none' : '1px solid #E2E8F0',
            background: activeTab === 'alerts' ? '#2563EB' : '#ffffff',
            color: activeTab === 'alerts' ? '#ffffff' : '#0F172A',
            fontWeight: activeTab === 'alerts' ? '700' : '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'alerts' ? '0 4px 14px rgba(37,99,235,0.25)' : 'none',
          }}
        >
          Alerts
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          style={{
            padding: '10px 24px',
            borderRadius: '999px',
            border: activeTab === 'promotions' ? 'none' : '1px solid #E2E8F0',
            background: activeTab === 'promotions' ? '#2563EB' : '#ffffff',
            color: activeTab === 'promotions' ? '#ffffff' : '#0F172A',
            fontWeight: activeTab === 'promotions' ? '700' : '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'promotions' ? '0 4px 14px rgba(37,99,235,0.25)' : 'none',
          }}
        >
          Promotions
        </button>
      </div>

      {/* TAB 1: SELLER CHAT */}
      {activeTab === 'chat' && (
        <div className="chat-two-col-layout">
          <div className="conversations-list-card">
            <div className="conv-header">
              <h4>Messages</h4>
            </div>
            <div className="conv-item active">
              <div className="conv-avatar">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Guide" fill className="avatar-img" />
                <span className="online-dot"></span>
              </div>
              <div className="conv-info">
                <strong>{guideParam ? `Guide ${guideParam}` : 'DeshIT-BD Planner'}</strong>
                <small>Active Now</small>
              </div>
            </div>
          </div>

          <div className="chat-window-card">
            <div className="chat-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="chat-user-avatar">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Guide" fill className="avatar-img" />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>{guideParam ? `Guide ${guideParam}` : 'DeshIT-BD Planner'}</strong>
                  {packageParam && <small style={{ color: '#64748B', fontSize: '0.75rem' }}>Package: {packageParam}</small>}
                </div>
              </div>
              <span style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                🛡️ AI Contact Protection Active
              </span>
            </div>

            <div className="chat-messages-thread">
              {messagesList.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.type === 'left' ? 'left-bubble' : 'right-bubble'}`}>
                  {msg.type === 'left' && <span className="sender-badge">{msg.sender}</span>}
                  {msg.text && <p>{msg.text}</p>}
                  
                  {msg.file && (
                    <div style={{ marginTop: '6px' }}>
                      {msg.file.url ? (
                        <div style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '200px', border: '1px solid rgba(255,255,255,0.3)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={msg.file.url} alt="Attachment" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          <small style={{ display: 'block', padding: '4px 8px', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.7rem' }}>📷 {msg.file.name}</small>
                        </div>
                      ) : (
                        <div style={{ background: msg.type === 'right' ? 'rgba(255,255,255,0.2)' : '#F1F5F9', color: msg.type === 'right' ? '#fff' : '#0F172A', padding: '8px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,0,0,0.1)' }}>
                          <span>📄 {msg.file.name}</span>
                          <small style={{ opacity: 0.8 }}>({msg.file.size})</small>
                        </div>
                      )}
                    </div>
                  )}

                  <small className="chat-time">{msg.time}</small>
                </div>
              ))}
            </div>

            {warningMsg && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', margin: '0 16px 10px 16px' }}>
                {warningMsg}
              </div>
            )}

            {/* Selected File Preview Badge */}
            {selectedFile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', padding: '8px 14px', borderRadius: '10px', margin: '0 16px 10px 16px', fontSize: '0.82rem', fontWeight: '600' }}>
                <span>📎 Attached: <strong>{selectedFile.name}</strong> ({selectedFile.size})</span>
                <button type="button" onClick={() => setSelectedFile(null)} style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', marginLeft: 'auto' }} title="Remove File">
                  ✕
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
            />

            <form onSubmit={handleSendMessage} className="chat-input-footer">
              <input
                type="text"
                placeholder="Type your message or attach a file..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <div className="chat-actions-group">
                <button
                  type="button"
                  className="btn-icon-chat"
                  aria-label="Attach File"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach Image or Document"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: selectedFile ? '#EFF6FF' : '#F1F5F9',
                    border: selectedFile ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedFile ? '#2563EB' : '#475569'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>

                <button type="submit" className="btn-send-chat" aria-label="Send">
                  ▶
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: ALERTS */}
      {activeTab === 'alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alertsList.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: alert.bg,
                border: `1.5px solid ${alert.border}`,
                borderRadius: '18px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '260px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: alert.iconBg,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }}
                >
                  {alert.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>{alert.title}</h4>
                    <span style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.7)', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: '600', border: '1px solid rgba(0,0,0,0.05)' }}>
                      🕒 {alert.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '6px 0 0 0', lineHeight: '1.4' }}>{alert.desc}</p>
                </div>
              </div>

              <button
                style={{
                  background: '#ffffff',
                  border: `1.5px solid ${alert.btnColor}`,
                  borderRadius: '10px',
                  padding: '8px 18px',
                  fontSize: '0.84rem',
                  fontWeight: '800',
                  color: alert.btnColor,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {alert.btnLabel}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PROMOTIONS */}
      {activeTab === 'promotions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {promotionsList.map((promo) => (
            <div key={promo.id} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>{promo.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: '8px 0 16px 0' }}>{promo.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px stroke #E2E8F0' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Promo Code:</span>
                <strong style={{ color: '#2563EB', fontSize: '0.9rem' }}>{promo.code}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MessageCenterChatPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />
          <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading message center...</div>}>
            <MessageCenterContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

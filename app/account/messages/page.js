'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MessageCenterChatPage() {
  const [chatMessage, setChatMessage] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [messagesList, setMessagesList] = useState([
    { id: 1, sender: 'OP', text: "Hello! I have a question about the Cox's Bazar tour package itinerary.", time: '8:00 PM', type: 'left' },
    { id: 2, sender: 'Me', text: 'Hi! Sure, I would be happy to help you with all the details.', time: '8:01 PM', type: 'right' },
    { id: 3, sender: 'OP', text: 'Is transportation included from Dhaka to Cox’s Bazar?', time: '8:02 PM', type: 'left' },
    { id: 4, sender: 'Me', text: 'Yes, AC bus transportation is fully included in the package rate.', time: '8:03 PM', type: 'right' },
  ]);

  // SRS Rule Check: Regex & AI filter for phone numbers, emails, and digit sequences
  const containsContactInfo = (text) => {
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const bdMobileRegex = /(01[3-9]\d{8}|\+?8801[3-9]\d{8})/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const digitSequenceRegex = /(\d[\s.-]*){6,}/; // 6 or more digits separated by spaces/dots

    return (
      phoneRegex.test(text) ||
      bdMobileRegex.test(text) ||
      emailRegex.test(text) ||
      digitSequenceRegex.test(text)
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setWarningMsg('');

    if (containsContactInfo(chatMessage)) {
      setWarningMsg('⚠️ SRS Safety Block: Contact information (phone numbers, emails, or digit sequences) cannot be shared in chat. Violations are logged.');
      return;
    }

    if (chatMessage.trim()) {
      const newMsg = {
        id: messagesList.length + 1,
        sender: 'Me',
        text: chatMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'right',
      };
      setMessagesList([...messagesList, newMsg]);
      setChatMessage('');
    }
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            <div className="account-sub-tabs-bar">
              <Link href="/account/messages" className="sub-tab active">Tour Planner Chat</Link>
              <Link href="/account/messages/alerts" className="sub-tab">Alerts</Link>
              <Link href="/account/messages/notifications" className="sub-tab">Notifications</Link>
              <Link href="/account/messages/promotions" className="sub-tab">Promotions</Link>
            </div>

            <div className="chat-two-col-layout">
              <div className="conversations-list-card">
                <div className="conv-header">
                  <h4>Messages</h4>
                </div>
                <div className="conv-item active">
                  <div className="conv-avatar">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="DeshIT" fill className="avatar-img" />
                    <span className="online-dot"></span>
                  </div>
                  <div className="conv-info">
                    <strong>DeshIT</strong>
                    <small>Active Now</small>
                  </div>
                </div>
              </div>

              <div className="chat-window-card">
                <div className="chat-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="chat-user-avatar">
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="DeshIT" fill className="avatar-img" />
                    </div>
                    <strong>DeshIT Planner</strong>
                  </div>
                  <span style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                    🛡️ AI Contact Protection Active
                  </span>
                </div>

                <div className="chat-messages-thread">
                  {messagesList.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.type === 'left' ? 'left-bubble' : 'right-bubble'}`}>
                      {msg.type === 'left' && <span className="sender-badge">{msg.sender}</span>}
                      <p>{msg.text}</p>
                      <small className="chat-time">{msg.time}</small>
                    </div>
                  ))}
                </div>

                {warningMsg && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 'bold', margin: '0 16px 10px 16px' }}>
                    {warningMsg}
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="chat-input-footer">
                  <input
                    type="text"
                    placeholder="Type your message (Phone & contact sharing is restricted)..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <div className="chat-actions-group">
                    <button type="submit" className="btn-send-chat" aria-label="Send">
                      ▶
                    </button>
                    <button type="button" className="btn-icon-chat" aria-label="Attach">📎</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function MessageCenterChatPage() {
  const [chatMessage, setChatMessage] = useState('');
  const [messagesList, setMessagesList] = useState([
    { id: 1, sender: 'OP', text: "Hello! I have a question about the Cox's Bazar tour package itinerary.", time: '8:00 PM', type: 'left' },
    { id: 2, sender: 'Me', text: 'Hi! Sure, I would be happy to help you with all the details.', time: '8:01 PM', type: 'right' },
    { id: 3, sender: 'OP', text: 'Is transportation included from Dhaka to Cox’s Bazar?', time: '8:02 PM', type: 'left' },
    { id: 4, sender: 'Me', text: 'Yes, AC bus transportation is fully included in the package rate.', time: '8:03 PM', type: 'right' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
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

          {/* Right Main Area */}
          <div className="account-main-area">
            {/* Top Main Tabs Bar */}
            <div className="account-sub-tabs-bar">
              <Link href="/account/messages" className="sub-tab active">Tour Planner Chat</Link>
              <Link href="/account/messages/alerts" className="sub-tab">Alerts</Link>
              <Link href="/account/messages/notifications" className="sub-tab">Notifications</Link>
              <Link href="/account/messages/promotions" className="sub-tab">Promotions</Link>
            </div>

            {/* 2-Column Chat Layout */}
            <div className="chat-two-col-layout">
              {/* Left Column: Conversations List */}
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

              {/* Right Column: Chat Window */}
              <div className="chat-window-card">
                <div className="chat-header-bar">
                  <div className="chat-user-avatar">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="DeshIT" fill className="avatar-img" />
                  </div>
                  <strong>DeshIT Planner</strong>
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

                {/* Bottom Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="chat-input-footer">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <div className="chat-actions-group">
                    <button type="submit" className="btn-send-chat" aria-label="Send">
                      ▶
                    </button>
                    <button type="button" className="btn-icon-chat" aria-label="Attach">📎</button>
                    <span className="check-double-icon">✔✔</span>
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

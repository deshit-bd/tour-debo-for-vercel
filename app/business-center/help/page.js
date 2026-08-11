'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerHelpCenterPage() {
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'raise' | 'chat'
  
  // Ticket Form State
  const [category, setCategory] = useState('Payout & Disbursement');
  const [priority, setPriority] = useState('Medium');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sample Tickets State
  const [tickets, setTickets] = useState([
    {
      id: 'TICK-9021',
      subject: 'Payout disbursal delay for order #ORD-9492',
      category: 'Payout & Disbursement',
      priority: 'High',
      status: 'In Progress',
      date: '10 Aug 2026',
      replies: [
        { sender: 'You', text: 'Payout requested on 8th Aug for order #ORD-9492 is still pending.', time: '10 Aug 10:00 AM' },
        { sender: 'Support Agent (Sabbir)', text: 'Hello! Accounts team is verifying bank details for NPSB transfer. Will resolve today.', time: '10 Aug 02:15 PM' }
      ]
    },
    {
      id: 'TICK-8845',
      subject: 'Correction in Thailand Visa fee listing',
      category: 'Visa Listing',
      priority: 'Low',
      status: 'Resolved',
      date: '05 Aug 2026',
      replies: [
        { sender: 'You', text: 'Please update Thailand Express Visa fee to ৳2,400.', time: '05 Aug 04:00 PM' },
        { sender: 'Support Agent (Farhan)', text: 'Listing fee has been updated successfully on live portal.', time: '06 Aug 11:30 AM' }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMsg, setReplyMsg] = useState('');

  // Live Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { id: 1, sender: 'support', text: '👋 Hello! Tour Dibo Seller Support Officer is here. How can we help you?', time: '10:00 AM' }
  ]);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: subject.trim(),
      category,
      priority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      replies: [
        { sender: 'You', text: description.trim(), time: 'Just now' }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setSuccessMsg(`Ticket #${newTicket.id} created successfully! Response within 2 hours.`);
    setSubject('');
    setDescription('');
    setActiveTab('tickets');

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMsg.trim() || !selectedTicket) return;

    const newReply = {
      sender: 'You',
      text: replyMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = {
      ...selectedTicket,
      replies: [...selectedTicket.replies, newReply]
    };

    setSelectedTicket(updated);
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setReplyMsg('');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'seller',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLogs(prev => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatLogs(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'support',
          text: 'Thank you for your message! Support officer will reply shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const getStatusTag = (status) => {
    if (status === 'Open') return { bg: '#FEF3C7', color: '#D97706' };
    if (status === 'In Progress') return { bg: '#EFF6FF', color: '#2563EB' };
    return { bg: '#F0FDF4', color: '#16A34A' };
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper" style={{ background: '#F8FAFC', paddingBottom: '60px' }}>
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">
            
            {/* Clean Minimalist Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Seller Help Center &amp; Support
                </h1>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Get assistance with payouts, package listings, and customer disputes.
                </p>
              </div>

              <Link
                href="/business-center/policies"
                style={{ background: '#FFFFFF', color: '#2563EB', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}
              >
                📜 View Business Policies ➔
              </Link>
            </div>

            {successMsg && (
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', padding: '12px 16px', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', marginBottom: '20px' }}>
                ✓ {successMsg}
              </div>
            )}

            {/* Clean 3-Tab Switcher */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('tickets'); setSelectedTicket(null); }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'tickets' ? '#2563EB' : 'transparent',
                  color: activeTab === 'tickets' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                📋 Support Tickets ({tickets.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('raise')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'raise' ? '#2563EB' : 'transparent',
                  color: activeTab === 'raise' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                ➕ Raise Ticket
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'chat' ? '#2563EB' : 'transparent',
                  color: activeTab === 'chat' ? '#FFFFFF' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                💬 Live Support Chat
              </button>
            </div>

            {/* TAB 1: SUPPORT TICKETS LIST & DETAILS VIEW */}
            {activeTab === 'tickets' && (
              <div>
                {!selectedTicket ? (
                  /* Clean Tickets Table */
                  <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                          <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Ticket ID</th>
                          <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Subject</th>
                          <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Category</th>
                          <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Priority</th>
                          <th style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
                          <th style={{ padding: '14px 18px', textAlign: 'center', fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.map((t) => {
                          const tag = getStatusTag(t.status);
                          return (
                            <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '14px 18px', fontWeight: 700, color: '#2563EB', fontSize: '0.86rem' }}>#{t.id}</td>
                              <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>{t.subject}</td>
                              <td style={{ padding: '14px 18px', color: '#475569', fontSize: '0.84rem' }}>{t.category}</td>
                              <td style={{ padding: '14px 18px', color: t.priority === 'High' ? '#DC2626' : '#475569', fontWeight: 700, fontSize: '0.84rem' }}>{t.priority}</td>
                              <td style={{ padding: '14px 18px' }}>
                                <span style={{ background: tag.bg, color: tag.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 800 }}>
                                  {t.status}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedTicket(t)}
                                  style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  View Details ➔
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* Clean Ticket Detail Panel */
                  <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '720px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(null)}
                      style={{ background: '#F1F5F9', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', cursor: 'pointer', marginBottom: '16px' }}
                    >
                      ← Back to All Tickets
                    </button>

                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#2563EB' }}>Ticket #{selectedTicket.id}</span>
                        <span style={{ background: getStatusTag(selectedTicket.status).bg, color: getStatusTag(selectedTicket.status).color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 800 }}>
                          {selectedTicket.status}
                        </span>
                      </div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px 0' }}>{selectedTicket.subject}</h2>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Category: {selectedTicket.category} • Created: {selectedTicket.date}</span>
                    </div>

                    {/* Messages List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      {selectedTicket.replies.map((r, idx) => {
                        const isYou = r.sender === 'You';
                        return (
                          <div key={idx} style={{ background: isYou ? '#EFF6FF' : '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: isYou ? '#2563EB' : '#0F172A', marginBottom: '4px' }}>
                              <span>{r.sender}</span>
                              <span style={{ color: '#94A3B8', fontWeight: 500 }}>{r.time}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.45 }}>{r.text}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Send Update */}
                    <form onSubmit={handleSendReply} style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Write a response..."
                        value={replyMsg}
                        onChange={(e) => setReplyMsg(e.target.value)}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.88rem' }}
                      />
                      <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                        Send ➔
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RAISE TICKET FORM */}
            {activeTab === 'raise' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', maxWidth: '560px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                  Submit a Support Ticket
                </h3>

                <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Category *</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none' }}>
                      <option value="Payout & Disbursement">Payout &amp; Disbursement</option>
                      <option value="Visa Listing">Visa Listing</option>
                      <option value="Package Approval">Package Approval</option>
                      <option value="Dispute & Refund">Dispute &amp; Refund</option>
                      <option value="Technical Issue">Technical Issue</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Priority *</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none' }}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Subject *</label>
                    <input type="text" required placeholder="Brief description of your issue" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Description *</label>
                    <textarea rows={4} required placeholder="Explain your problem in detail..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }} />
                  </div>

                  <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                    Submit Ticket ➔
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: LIVE CHAT */}
            {activeTab === 'chat' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', maxWidth: '560px', height: '480px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '14px' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>🎧 Seller Live Support</strong>
                  <small style={{ display: 'block', color: '#16A34A', fontWeight: 700 }}>● Officer Online</small>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  {chatLogs.map((c) => (
                    <div key={c.id} style={{ alignSelf: c.sender === 'seller' ? 'flex-end' : 'flex-start', maxWidth: '80%', background: c.sender === 'seller' ? '#2563EB' : '#F1F5F9', color: c.sender === 'seller' ? '#fff' : '#0F172A', padding: '10px 14px', borderRadius: '12px' }}>
                      <p style={{ margin: 0, fontSize: '0.86rem' }}>{c.text}</p>
                      <span style={{ fontSize: '0.68rem', opacity: 0.8, display: 'block', marginTop: '4px', textAlign: c.sender === 'seller' ? 'right' : 'left' }}>{c.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder="Type a message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.88rem' }} />
                  <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Send</button>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

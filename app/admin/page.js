'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoleGuard from '../components/RoleGuard';

export default function AdminControlCenterPage() {
  const [activeTab, setActiveTab] = useState('analytics');

  // Broadcast Message State
  const [broadcastMsg, setBroadcastMsg] = useState('Hey Sanjid, welcome to Tour Dibo platform!');
  const [sentNotice, setSentNotice] = useState(false);

  // Filters
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterDevice, setFilterDevice] = useState('All');

  // Dispute Cases
  const [disputes, setDisputes] = useState([
    { id: 'DSP-8849', customer: 'Sanjid Rahman', seller: 'DeshIT-BD Travels', item: 'Tenting at Cox\'s Bazar', amount: '৳12,500', status: 'Pending Review', reason: 'Schedule delayed by 4 hours without notice.' },
    { id: 'DSP-8850', customer: 'Jane Cooper', seller: 'Sylhet Tour Operators', item: 'Ratargul Swamp Boat Tour', amount: '৳4,500', status: 'Resolved (Payment Released)', reason: 'Customer requested refund after full service completed.' },
  ]);

  const handleResolveDispute = (id, action) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: action === 'release' ? 'Payment Released to Seller' : 'Refund Issued to Customer' } : d))
    );
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <RoleGuard allowedRoles={['ADMIN', 'PLANNER']}>
        <main className="figma-main-content" style={{ padding: '24px 0' }}>
        <header style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#fff', padding: '24px 32px', borderRadius: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ background: '#EF4444', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                🛡️ Super Admin System Control
              </span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '8px 0 0 0' }}>Tour Dibo Executive Admin Dashboard</h1>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setActiveTab('analytics')} style={{ background: activeTab === 'analytics' ? '#2563EB' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                📊 Analytics & Reports
              </button>
              <button onClick={() => setActiveTab('disputes')} style={{ background: activeTab === 'disputes' ? '#2563EB' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                ⚖️ Dispute Cases (Payment Release)
              </button>
              <button onClick={() => setActiveTab('broadcast')} style={{ background: activeTab === 'broadcast' ? '#2563EB' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                📣 Broadcast Messages
              </button>
            </div>
          </div>
        </header>

        {activeTab === 'analytics' && (
          <div>
            {/* Attributes Filter Bar (SRS Page 8 Standard) */}
            <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E5E7EB', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#374151' }}>Filter Attributes:</span>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block' }}>Country</label>
                <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}>
                  <option value="All">All Countries</option>
                  <option value="BD">Bangladesh</option>
                  <option value="TH">Thailand</option>
                  <option value="MY">Malaysia</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block' }}>Device</label>
                <select value={filterDevice} onChange={(e) => setFilterDevice(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}>
                  <option value="All">All Devices</option>
                  <option value="Mobile">Mobile App / Browser</option>
                  <option value="Desktop">Desktop PC</option>
                </select>
              </div>
            </div>

            {/* SRS KPI Stats Cards Grid (SRS Page 8 Standard) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '18px' }}>
                <small style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 'bold' }}>CURRENT ONLINE USERS</small>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#2563EB', marginTop: '4px' }}>1,482</div>
                <small style={{ color: '#10B981', fontWeight: 'bold' }}>● Live tracking active</small>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '18px' }}>
                <small style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 'bold' }}>TOTAL SOLD (GROSS)</small>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#059669', marginTop: '4px' }}>৳4,850,200</div>
                <small style={{ color: '#6B7280' }}>Month to Date</small>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '18px' }}>
                <small style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 'bold' }}>TOTAL VISITORS</small>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>94,200</div>
                <small style={{ color: '#6B7280' }}>Per User Visit / Sold: 3.4%</small>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '18px' }}>
                <small style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 'bold' }}>INBOUND VS LOCAL SOLD</small>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#7C3AED', marginTop: '4px' }}>
                  Inbound: 35% | Local: 65%
                </div>
                <small style={{ color: '#6B7280' }}>Regional Breakdown</small>
              </div>
            </div>

            {/* Additional Reports Table (SRS Page 8 Standard) */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px' }}>Detailed Operations Report</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Report Metric</th>
                    <th style={{ padding: '12px' }}>Value</th>
                    <th style={{ padding: '12px' }}>Frequency / Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>No Visit / Frequency Rate</td>
                    <td style={{ padding: '12px' }}>12.4% bounce rate</td>
                    <td style={{ padding: '12px', color: '#D97706' }}>Medium Risk</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>No Buy / Abandoned Carts</td>
                    <td style={{ padding: '12px' }}>340 cart drop-offs</td>
                    <td style={{ padding: '12px', color: '#2563EB' }}>Targeted via Discount Banner</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>New Members Registered Today</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 'bold' }}>+128 New Tourist Accounts</td>
                    <td style={{ padding: '12px' }}>High Growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Dispute Resolution & Payment Release Center</h2>
            <p style={{ fontSize: '0.86rem', color: '#6B7280', marginBottom: '20px' }}>
              Rule: If order is NOT disputed, payment is released to seller. If disputed, Admin reviews logs and takes action.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {disputes.map((dsp) => (
                <div key={dsp.id} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: '1rem' }}>{dsp.id} - {dsp.item}</strong>
                      <span style={{ marginLeft: '12px', fontSize: '0.8rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                        {dsp.status}
                      </span>
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#059669' }}>{dsp.amount}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: '4px 0 12px 0' }}>
                    <strong>Customer:</strong> {dsp.customer} | <strong>Seller:</strong> {dsp.seller} <br />
                    <strong>Issue Reason:</strong> {dsp.reason}
                  </p>

                  {dsp.status === 'Pending Review' && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleResolveDispute(dsp.id, 'release')} style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.84rem' }}>
                        ✓ Release Payment to Seller (No Dispute Fault)
                      </button>
                      <button onClick={() => handleResolveDispute(dsp.id, 'refund')} style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.84rem' }}>
                        ✖ Issue Full Refund to Customer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'broadcast' && (
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Send Customized Message (SRS Page 8 Standard)</h2>
            <p style={{ fontSize: '0.86rem', color: '#6B7280', marginBottom: '20px' }}>Send personalized notifications (e.g. &quot;Hey Sanjid...&quot;) to users or product viewers.</p>

            {sentNotice && (
              <div style={{ background: '#DEF7EC', color: '#03543F', padding: '12px', borderRadius: '8px', fontWeight: 'bold', marginBottom: '16px' }}>
                ✓ Broadcast message dispatched successfully to target users!
              </div>
            )}

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '6px' }}>Target User Group</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                  <option>All Product Viewers (&quot;Hey Sanjid...&quot; template)</option>
                  <option>New Registered Members</option>
                  <option>Active Sellers / Tour Operators</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '6px' }}>Message Text</label>
                <textarea
                  rows="3"
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start' }}>
                🚀 Send Broadcast Message Now
              </button>
            </form>
          </div>
        )}
      </main>
      </RoleGuard>

      <Footer />
    </div>
  );
}

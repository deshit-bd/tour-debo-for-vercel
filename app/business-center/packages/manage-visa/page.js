'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

const SAMPLE_VISAS = [
  { id: 'visa-usa-001', country: 'United States', capital: 'Washington, D.C.', visaType: 'Tourist Visa', validity: '90 Days', entryType: 'Single Entry', processingTime: '5-7 Working Days', visaFee: '2,400', processingFee: '36,000', applications: 210, rating: '4.9', status: 'Active', isCustom: false },
  { id: 'visa-uk-001', country: 'United Kingdom', capital: 'London', visaType: 'Student Visa', validity: '6 Months', entryType: 'Multiple Entry', processingTime: '10-15 Working Days', visaFee: '1,800', processingFee: '31,200', applications: 144, rating: '4.8', status: 'Active', isCustom: false },
  { id: 'visa-canada-001', country: 'Canada', capital: 'Ottawa', visaType: 'Tourist Visa', validity: '30 Days', entryType: 'Single Entry', processingTime: '5-7 Working Days', visaFee: '1,800', processingFee: '24,000', applications: 89, rating: '4.7', status: 'Active', isCustom: false },
  { id: 'visa-dubai-001', country: 'UAE (Dubai)', capital: 'Abu Dhabi', visaType: 'Tourist Visa', validity: '30 Days', entryType: 'Multiple Entry', processingTime: '3-5 Working Days', visaFee: '1,800', processingFee: '23,400', applications: 320, rating: '4.8', status: 'Active', isCustom: false },
  { id: 'visa-malaysia-001', country: 'Malaysia', capital: 'Kuala Lumpur', visaType: 'Tourist Visa', validity: '30 Days', entryType: 'Single Entry', processingTime: '3-5 Working Days', visaFee: '960', processingFee: '21,600', applications: 198, rating: '4.7', status: 'Active', isCustom: false },
  { id: 'visa-australia-001', country: 'Australia', capital: 'Canberra', visaType: 'Student Visa', validity: '6 Months', entryType: 'Single Entry', processingTime: '15-30 Working Days', visaFee: '1,440', processingFee: '28,800', applications: 76, rating: '4.6', status: 'Paused', isCustom: false },
  { id: 'visa-japan-001', country: 'Japan', capital: 'Tokyo', visaType: 'Tourist Visa', validity: '30 Days', entryType: 'Single Entry', processingTime: '5-7 Working Days', visaFee: '1,200', processingFee: '22,800', applications: 165, rating: '4.8', status: 'Active', isCustom: false },
  { id: 'visa-germany-001', country: 'Germany', capital: 'Berlin', visaType: 'Student Visa', validity: '6 Months', entryType: 'Multiple Entry', processingTime: '15-30 Working Days', visaFee: '1,200', processingFee: '25,200', applications: 92, rating: '4.5', status: 'Active', isCustom: false },
];

const TYPE_COLORS = {
  'Tourist Visa':  { bg: '#EFF6FF', color: '#2563EB' },
  'Student Visa':  { bg: '#F0FDF4', color: '#16A34A' },
  'Medical Visa':  { bg: '#FFF7ED', color: '#EA580C' },
  'Business Visa': { bg: '#F5F3FF', color: '#7C3AED' },
  'PR Visa':       { bg: '#FFF1F2', color: '#E11D48' },
  'Transit Visa':  { bg: '#F8FAFC', color: '#475569' },
};

export default function ManageVisaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [visas, setVisas] = useState(SAMPLE_VISAS);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_visa_services');
      if (saved) {
        const custom = JSON.parse(saved).map(item => ({
          id: item.id, country: item.country, capital: item.capital || '',
          visaType: item.visaType || 'Tourist Visa', validity: item.validity || '30 Days',
          entryType: item.entryType || 'Single Entry', processingTime: item.processingTime || '5-7 Working Days',
          visaFee: item.visaFee || '0', processingFee: item.processingFee || '0',
          applications: 0, rating: item.rating || '5.0', status: 'Active', isCustom: true,
        }));
        setVisas([...custom, ...SAMPLE_VISAS]);
      }
    } catch (e) { console.error(e); }
  }, []);

  const handleDelete = (id, isCustom) => {
    setVisas(prev => prev.filter(v => v.id !== id));
    setDeleteConfirmId(null);
    if (isCustom) {
      try {
        const saved = JSON.parse(localStorage.getItem('planner_visa_services') || '[]');
        localStorage.setItem('planner_visa_services', JSON.stringify(saved.filter(v => v.id !== id)));
      } catch (e) { console.error(e); }
    }
  };

  const handleToggleStatus = (id) => {
    setVisas(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Paused' : 'Active' } : v));
  };

  const filtered = visas.filter(v => {
    const matchSearch = v.country.toLowerCase().includes(searchTerm.toLowerCase()) || v.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'All' || v.visaType === filterType;
    const matchStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const totalApplications = visas.reduce((sum, v) => sum + (v.applications || 0), 0);
  const activeCount = visas.filter(v => v.status === 'Active').length;
  const pausedCount = visas.filter(v => v.status === 'Paused').length;

  const thStyle = {
    padding: '12px 16px', fontSize: '0.78rem', fontWeight: '700', color: '#64748B',
    textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em',
    whiteSpace: 'nowrap', background: '#F8FAFC', borderBottom: '2px solid #E2E8F0',
  };
  const tdStyle = {
    padding: '14px 16px', fontSize: '0.87rem', color: '#1E293B',
    verticalAlign: 'middle', borderBottom: '1px solid #F1F5F9',
  };

  const stats = [
    { label: 'Total Visa Products', value: visas.length, color: '#2563EB', bg: '#EFF6FF', emoji: 'Visa' },
    { label: 'Active Listings', value: activeCount, color: '#16A34A', bg: '#F0FDF4', emoji: 'Active' },
    { label: 'Paused Listings', value: pausedCount, color: '#D97706', bg: '#FFFBEB', emoji: 'Paused' },
    { label: 'Total Applications', value: totalApplications.toLocaleString(), color: '#7C3AED', bg: '#F5F3FF', emoji: 'Apps' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Manage Visa Services</h1>
                <p style={{ fontSize: '0.87rem', color: '#64748B', marginTop: '6px' }}>View, edit, pause or delete all your VISA service listings.</p>
              </div>
              <Link href="/business-center/packages/add-visa" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '0.87rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                + Add New Visa Service
              </Link>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {stats.map((s) => (
                <div key={s.label} style={{ background: s.bg, border: '1.5px solid', borderColor: s.color + '33', borderRadius: '14px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: s.color, background: s.color + '22', display: 'inline-block', padding: '3px 8px', borderRadius: '6px', marginBottom: '8px' }}>{s.emoji}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters and Search */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center', background: '#fff', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <input
                type="text"
                placeholder="Search by country or visa type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, minWidth: '200px', padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #E2E8F0', fontSize: '0.88rem', outline: 'none' }}
              />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #E2E8F0', fontSize: '0.88rem', background: '#fff', cursor: 'pointer', outline: 'none' }}>
                <option value="All">All Types</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Medical Visa">Medical Visa</option>
                <option value="Business Visa">Business Visa</option>
                <option value="PR Visa">PR Visa</option>
                <option value="Transit Visa">Transit Visa</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #E2E8F0', fontSize: '0.88rem', background: '#fff', cursor: 'pointer', outline: 'none' }}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
              <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, whiteSpace: 'nowrap' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>&#127760;</div>
                  <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>No visa services found</h3>
                  <p style={{ fontSize: '0.88rem' }}>Try changing your search or filter, or add a new visa service.</p>
                  <Link href="/business-center/packages/add-visa" style={{ display: 'inline-block', marginTop: '16px', background: '#2563EB', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem' }}>
                    + Add New Visa Service
                  </Link>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Visa ID</th>
                        <th style={thStyle}>Country</th>
                        <th style={thStyle}>Visa Type</th>
                        <th style={thStyle}>Validity</th>
                        <th style={thStyle}>Entry</th>
                        <th style={thStyle}>Processing</th>
                        <th style={thStyle}>Visa Fee</th>
                        <th style={thStyle}>Applications</th>
                        <th style={thStyle}>Rating</th>
                        <th style={thStyle}>Status</th>
                        <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((v, idx) => {
                        const typeColor = TYPE_COLORS[v.visaType] || { bg: '#F8FAFC', color: '#475569' };
                        const visaIdCode = v.visaCode || `#VISA-${101 + idx}`;
                        return (
                          <tr key={v.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FAFBFF' }}>
                            <td style={{ ...tdStyle, color: '#2563EB', fontWeight: 700, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                              {visaIdCode}
                            </td>
                            <td style={tdStyle}>
                              <div style={{ fontWeight: '700', color: '#0F172A' }}>{v.country}</div>
                              <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>{v.capital}</div>
                              {v.isCustom && <span style={{ fontSize: '0.65rem', background: '#FEF9C3', color: '#854D0E', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>Custom</span>}
                            </td>
                            <td style={tdStyle}>
                              <span style={{ background: typeColor.bg, color: typeColor.color, padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
                                {v.visaType}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{v.validity}</td>
                            <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                              <span style={{ background: v.entryType === 'Multiple Entry' ? '#F0FDF4' : '#F8FAFC', color: v.entryType === 'Multiple Entry' ? '#16A34A' : '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 600 }}>
                                {v.entryType}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, whiteSpace: 'nowrap', fontSize: '0.82rem', color: '#64748B' }}>{v.processingTime}</td>
                            <td style={tdStyle}>
                              <div style={{ fontWeight: '700', color: '#0F172A' }}>&#2547;{v.visaFee}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>+&#2547;{v.processingFee} fee</div>
                            </td>
                            <td style={{ ...tdStyle, fontWeight: '700', color: '#2563EB' }}>{(v.applications || 0).toLocaleString()}</td>
                            <td style={{ ...tdStyle, color: '#F59E0B', fontWeight: '700' }}>&#9733; {v.rating}</td>
                            <td style={tdStyle}>
                              <button
                                onClick={() => handleToggleStatus(v.id)}
                                style={{
                                  background: v.status === 'Active' ? '#F0FDF4' : '#FFF7ED',
                                  color: v.status === 'Active' ? '#16A34A' : '#D97706',
                                  border: v.status === 'Active' ? '1.5px solid #BBF7D0' : '1.5px solid #FDE68A',
                                  padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem',
                                  fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
                                }}
                                title={v.status === 'Active' ? 'Click to pause' : 'Click to activate'}
                              >
                                {v.status === 'Active' ? 'Active' : 'Paused'}
                              </button>
                            </td>
                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                <Link
                                  href={'/business-center/packages/add-visa?edit=' + v.id}
                                  style={{ background: '#EFF6FF', color: '#2563EB', border: '1.5px solid #BFDBFE', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap' }}
                                  title="Edit this visa"
                                >
                                  Edit
                                </Link>
                                {deleteConfirmId === v.id ? (
                                  <div style={{ display: 'flex', gap: '4px' }}>
                                    <button onClick={() => handleDelete(v.id, v.isCustom)} style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}>Yes</button>
                                    <button onClick={() => setDeleteConfirmId(null)} style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}>No</button>
                                  </div>
                                ) : (
                                  <button onClick={() => setDeleteConfirmId(v.id)} style={{ background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA', padding: '6px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }} title="Delete this visa">
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '14px', textAlign: 'center' }}>
              Click <strong>Active / Paused</strong> status button to toggle. Click <strong>Edit</strong> to modify a visa listing.
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
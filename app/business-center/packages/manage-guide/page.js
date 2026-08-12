'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';
import { useCurrency } from '../../../context/CurrencyContext';

const SAMPLE_GUIDES = [
  { id: 'dhaka', guideId: '#GUD-101', guideName: 'Kaalam Rahman', title: 'Explore Dhaka Heritage & Street Food Guide', location: 'Dhaka, Bangladesh', languages: 'English, Bengali', price1Person: '1500', price2Person: '2500', price3Person: '3200', rating: '4.7', status: 'Active', isCustom: false },
  { id: 'sajek', guideId: '#GUD-102', guideName: 'Robin Chakma', title: 'Sajek Mountain Trekking Guide', location: 'Sajek Valley, Bangladesh', languages: 'English, Bengali, Chakma', price1Person: '1800', price2Person: '2800', price3Person: '3500', rating: '4.9', status: 'Active', isCustom: false },
  { id: 'cox-bazar', guideId: '#GUD-103', guideName: 'Tanvir Ahmed', title: "Cox's Bazar Beach & Marine Drive Guide", location: "Cox's Bazar, Bangladesh", languages: 'English, Bengali', price1Person: '2200', price2Person: '3200', price3Person: '4200', rating: '4.8', status: 'Active', isCustom: false },
  { id: 'sylhet', guideId: '#GUD-104', guideName: 'Hasan Chowdhury', title: 'Sylhet Tea Estate Escapade Guide', location: 'Sylhet, Bangladesh', languages: 'English, Bengali, Sylheti', price1Person: '1500', price2Person: '2500', price3Person: '3200', rating: '4.6', status: 'Active', isCustom: false },
];

export default function ManageTourGuidesPage() {
  const { formatPrice } = useCurrency();
  const [guides, setGuides] = useState(SAMPLE_GUIDES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('planner_tour_guides') || '[]');
      if (saved.length > 0) {
        const savedMap = new Map(saved.map((item, idx) => [item.id, { ...item, guideId: item.guideId || `#GUD-10${idx + 5}` }]));
        const merged = [
          ...saved.map((item, idx) => ({ ...item, guideId: item.guideId || `#GUD-10${idx + 5}` })),
          ...SAMPLE_GUIDES.filter(sg => !savedMap.has(sg.id))
        ];
        setGuides(merged);
      }
    } catch (e) {
      console.error('Error reading saved tour guides:', e);
    }
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this Tour Guide profile?')) {
      const updated = guides.filter(g => g.id !== id);
      setGuides(updated);
      const customOnly = updated.filter(g => g.isCustom);
      localStorage.setItem('planner_tour_guides', JSON.stringify(customOnly));
    }
  };

  const filteredGuides = guides.filter(g => {
    const matchSearch = (g.guideId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (g.guideName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (g.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (g.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || (g.status || 'Active') === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content" style={{ minWidth: 0, width: '100%' }}>
            <header className="seller-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 className="seller-page-title">Manage Tour Guides</h1>
                <p className="seller-page-subtitle">View, edit, or manage registered tour guide profiles and variety pricing.</p>
              </div>
              <Link
                href="/business-center/packages/add-guide"
                style={{
                  background: '#059669',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                + Add Tour Guide
              </Link>
            </header>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginTop: '20px', minWidth: 0, width: '100%' }}>
              {/* Search and Filters */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search guide ID (#GUD-101), name, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, minWidth: '240px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', background: '#fff' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              {/* Table with Forced Horizontal Scroll */}
              <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
                      <th style={{ padding: '12px 16px', minWidth: '110px' }}>Guide ID</th>
                      <th style={{ padding: '12px 16px', minWidth: '220px' }}>Guide Info</th>
                      <th style={{ padding: '12px 16px', minWidth: '160px' }}>Location</th>
                      <th style={{ padding: '12px 16px', minWidth: '180px' }}>Capacity &amp; Vacancy</th>
                      <th style={{ padding: '12px 16px', minWidth: '200px' }}>Pricing Tiers (1P / 2P / 3P)</th>
                      <th style={{ padding: '12px 16px', minWidth: '90px' }}>Rating</th>
                      <th style={{ padding: '12px 16px', minWidth: '120px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGuides.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#64748B' }}>No tour guides found matching your search.</td>
                      </tr>
                    ) : (
                      filteredGuides.map((guide) => (
                        <tr key={guide.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563EB', fontSize: '0.85rem' }}>
                            {guide.guideId || '#GUD-101'}
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 'bold', color: '#0F172A' }}>{guide.guideName}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{guide.title}</div>
                          </td>
                          <td style={{ padding: '14px 16px', color: '#334155' }}>📍 {guide.location}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#0F172A' }}>👥 Max {guide.maxGuests || 10} Guests</div>
                            <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: '600', marginTop: '2px' }}>📅 Slot Vacancy Managed</div>
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: '700', color: '#059669' }}>
                            {formatPrice(guide.price1Person || 1500)} / {formatPrice(guide.price2Person || 2500)} / {formatPrice(guide.price3Person || 3200)}
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: 700 }}>⭐ {guide.rating || '5.0'}</td>
                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <Link
                                href={`/guides/${guide.id}`}
                                target="_blank"
                                title="View Guide Profile"
                                style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <i className="fa-solid fa-eye" style={{ fontSize: '0.85rem' }}></i>
                              </Link>
                              <Link
                                href={`/business-center/packages/add-guide?edit=${guide.id}`}
                                title="Edit Guide"
                                style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.85rem' }}></i>
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDelete(guide.id)}
                                title="Delete Guide"
                                style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <i className="fa-solid fa-trash-can" style={{ fontSize: '0.85rem' }}></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

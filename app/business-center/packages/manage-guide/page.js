'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

const SAMPLE_GUIDES = [
  { id: 'dhaka', guideName: 'Kaalam Rahman', title: 'Explore Dhaka Heritage & Street Food Guide', location: 'Dhaka, Bangladesh', languages: 'English, Bengali', price1Person: '1500', price2Person: '2500', price3Person: '3200', rating: '4.7', status: 'Active', isCustom: false },
  { id: 'sajek', guideName: 'Robin Chakma', title: 'Sajek Mountain Trekking Guide', location: 'Sajek Valley, Bangladesh', languages: 'English, Bengali, Chakma', price1Person: '1800', price2Person: '2800', price3Person: '3500', rating: '4.9', status: 'Active', isCustom: false },
  { id: 'cox-bazar', guideName: 'Tanvir Ahmed', title: "Cox's Bazar Beach & Marine Drive Guide", location: "Cox's Bazar, Bangladesh", languages: 'English, Bengali', price1Person: '2200', price2Person: '3200', price3Person: '4200', rating: '4.8', status: 'Active', isCustom: false },
  { id: 'sylhet', guideName: 'Hasan Chowdhury', title: 'Sylhet Tea Estate Escapade Guide', location: 'Sylhet, Bangladesh', languages: 'English, Bengali, Sylheti', price1Person: '1500', price2Person: '2500', price3Person: '3200', rating: '4.6', status: 'Active', isCustom: false },
];

export default function ManageTourGuidesPage() {
  const [guides, setGuides] = useState(SAMPLE_GUIDES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('planner_tour_guides') || '[]');
      if (saved.length > 0) {
        const savedMap = new Map(saved.map(item => [item.id, item]));
        const merged = [
          ...saved,
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
    const matchSearch = (g.guideName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <div className="seller-main-content">
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

          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginTop: '20px' }}>
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search guide name, location or title..."
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

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                    <th style={{ padding: '12px' }}>Guide Info</th>
                    <th style={{ padding: '12px' }}>Location</th>
                    <th style={{ padding: '12px' }}>Capacity &amp; Vacancy</th>
                    <th style={{ padding: '12px' }}>Pricing Tiers (1P / 2P / 3P)</th>
                    <th style={{ padding: '12px' }}>Rating</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuides.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#64748B' }}>No tour guides found matching your search.</td>
                    </tr>
                  ) : (
                    filteredGuides.map((guide) => (
                      <tr key={guide.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 'bold', color: '#0F172A' }}>{guide.guideName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{guide.title}</div>
                        </td>
                        <td style={{ padding: '12px', color: '#334155' }}>📍 {guide.location}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#0F172A' }}>👥 Max {guide.maxGuests || 10} Guests</div>
                          <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: '600', marginTop: '2px' }}>📅 Slot Vacancy Managed</div>
                        </td>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#059669' }}>
                          ৳{guide.price1Person || '1500'} / ৳{guide.price2Person || '2500'} / ৳{guide.price3Person || '3200'}
                        </td>
                        <td style={{ padding: '12px' }}>⭐ {guide.rating || '5.0'}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link
                              href={`/business-center/packages/add-guide?edit=${guide.id}`}
                              style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }}
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/guides/${guide.id}`}
                              style={{ background: '#F0FDF4', color: '#166534', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }}
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDelete(guide.id)}
                              style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                            >
                              Delete
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

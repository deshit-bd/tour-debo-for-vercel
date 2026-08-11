'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function ManagePackagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const samplePackages = [
    {
      id: 'parasailing',
      pkgId: '#PKG-9481',
      title: "Cox's Bazar : Parasailing Adventure",
      type: "Travel Package",
      mode: "Flexible",
      regularPrice: "৳24,000",
      discountPrice: "৳21,600",
      sales: 144,
      rating: "4.7 ★",
      status: "Active",
    },
    {
      id: 'sajek',
      pkgId: '#PKG-9482',
      title: "Sajek Valley Resort & Helipad Tour",
      type: "Travel Package",
      mode: "Fixed Date",
      regularPrice: "৳20,000",
      discountPrice: "৳18,000",
      sales: 89,
      rating: "4.9 ★",
      status: "Active",
    },
    {
      id: 'paris',
      pkgId: '#PKG-9483',
      title: "Paris : City of Love Excursion",
      type: "Travel Package",
      mode: "Fixed Date",
      regularPrice: "৳4,500,000",
      discountPrice: "৳4,176,000",
      sales: 210,
      rating: "5.0 ★",
      status: "Active",
    },
    {
      id: 'sundarbans',
      pkgId: '#PKG-9484',
      title: "Sundarbans Mangrove Forest Cruise",
      type: "Travel Package",
      mode: "Flexible",
      regularPrice: "৳28,000",
      discountPrice: "৳24,000",
      sales: 112,
      rating: "4.8 ★",
      status: "Active",
    },
  ];

  const [packages, setPackages] = useState(samplePackages);

  // Load custom packages from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tour_dibo_custom_packages');
      if (saved) {
        const customItems = JSON.parse(saved);
        const formattedCustom = customItems.map((item, idx) => ({
          id: item.id,
          pkgId: `#PKG-949${idx + 1}`,
          title: item.title,
          type: item.type || 'Travel Package',
          mode: item.mode || 'Fixed Date',
          regularPrice: item.prices?.regular ? `৳${Number(item.prices.regular).toLocaleString()}` : (item.price ? `৳${Math.round(Number(item.price) * 1.15).toLocaleString()}` : '৳25,000'),
          discountPrice: item.prices?.single ? `৳${Number(item.prices.single).toLocaleString()}` : (item.price ? `৳${Number(item.price).toLocaleString()}` : '৳21,500'),
          sales: item.sales || 0,
          rating: '5.0 ★ (New)',
          status: item.status || 'Active',
          isCustom: true,
        }));
        setPackages([...formattedCustom, ...samplePackages]);
      }
    } catch (e) {
      console.error('Error loading custom packages from localStorage:', e);
    }
  }, []);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || (pkg.pkgId && pkg.pkgId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || pkg.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id, isCustom) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);

    if (isCustom) {
      try {
        const saved = JSON.parse(localStorage.getItem('tour_dibo_custom_packages') || '[]');
        const filteredSaved = saved.filter(p => p.id !== id);
        localStorage.setItem('tour_dibo_custom_packages', JSON.stringify(filteredSaved));
      } catch (err) {
        console.error('Failed to update localStorage after deletion:', err);
      }
    }
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Manage Tour Packages</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    View, search, preview, or publish your tour packages.
                  </p>
                </div>
                <Link href="/business-center/packages/add" className="btn-seller-primary" style={{ fontWeight: 600 }}>
                  + Create New Package
                </Link>
              </div>

              {/* Filters & Search */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search packages by title or ID (#PKG-9481)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', outline: 'none', fontWeight: 400 }}
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', outline: 'none', fontWeight: 600 }}
                >
                  <option value="All">All Categories</option>
                  <option value="Travel Package">Travel Packages</option>
                  <option value="Visa Processing Service">Visa Processing Services</option>
                  <option value="Tour Guide Service">Tour Guide Services</option>
                </select>
              </div>

              {/* Package Table */}
              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Package ID</th>
                    <th>Package Title</th>
                    <th>Category</th>
                    <th>Booking Type</th>
                    <th>Regular Price</th>
                    <th>Discount Price</th>
                    <th>Sales</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map(pkg => (
                    <tr key={pkg.id}>
                      <td style={{ fontWeight: 700, color: '#64748B', fontSize: '0.85rem' }}>
                        {pkg.pkgId}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        <div>{pkg.title}</div>
                        {pkg.isCustom && (
                          <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 600, display: 'inline-block', marginTop: '2px' }}>
                            Published Package
                          </span>
                        )}
                      </td>
                      <td>{pkg.type}</td>
                      <td><span className="status-pill pending">{pkg.mode}</span></td>
                      <td style={{ color: '#64748B', textDecoration: 'line-through', fontSize: '0.85rem', fontWeight: 500 }}>{pkg.regularPrice}</td>
                      <td style={{ color: '#16A34A', fontWeight: 700 }}>{pkg.discountPrice}</td>
                      <td>{pkg.sales} Bookings</td>
                      <td>{pkg.rating}</td>
                      <td><span className="status-pill success">{pkg.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Link
                            href={`/business-center/packages/add?edit=${pkg.id}`}
                            style={{ background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem', textDecoration: 'none' }}
                          >
                            Edit ✏️
                          </Link>
                          <Link
                            href={`/tours/${pkg.id}`}
                            target="_blank"
                            style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem', textDecoration: 'none' }}
                          >
                            View Live
                          </Link>
                          <button
                            onClick={() => handleDelete(pkg.id, pkg.isCustom)}
                            style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

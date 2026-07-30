'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function ManagePackagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const initialPackages = [
    { id: 1, title: "Tenting at Cox's Bazar Beach", type: "Travel Package", mode: "Flexible", price: "$200", sales: 144, rating: "4.7 ★", status: "Active" },
    { id: 2, title: "Sajek Valley Resort & Helipad Tour", type: "Travel Package", mode: "Fixed", price: "$350", sales: 89, rating: "4.9 ★", status: "Active" },
    { id: 3, title: "Canada Express Tourist Visa Service", type: "Visa Processing", mode: "Fixed", price: "$450", sales: 210, rating: "4.8 ★", status: "Active" },
    { id: 4, title: "Paris Eiffel Tower Guided Excursion", type: "Tour Guide Service", mode: "Flexible", price: "$120/hr", sales: 65, rating: "5.0 ★", status: "Active" },
    { id: 5, title: "Sylhet Ratargul & Jaflong Monsoon Trip", type: "Travel Package", mode: "Flexible", price: "$150", sales: 112, rating: "4.6 ★", status: "Active" },
  ];

  const [packages, setPackages] = useState(initialPackages);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || pkg.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Package Ads</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    View, search, edit, or update your published tour packages and services.
                  </p>
                </div>
                <Link href="/business-center/packages/add" className="btn-seller-primary">
                  Create New Package
                </Link>
              </div>

              {/* Filters & Search */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search packages by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', outline: 'none', fontWeight: 600 }}
                >
                  <option value="All">All Categories</option>
                  <option value="Travel Package">Travel Packages</option>
                  <option value="Visa Processing">Visa Processing</option>
                  <option value="Tour Guide Service">Tour Guide Services</option>
                </select>
              </div>

              {/* Package Table */}
              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Package Title</th>
                    <th>Category</th>
                    <th>Ad Type</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map(pkg => (
                    <tr key={pkg.id}>
                      <td style={{ fontWeight: 800 }}>{pkg.title}</td>
                      <td>{pkg.type}</td>
                      <td><span className="status-pill pending">{pkg.mode}</span></td>
                      <td style={{ color: '#2563EB', fontWeight: 800 }}>{pkg.price}</td>
                      <td>{pkg.sales} Bookings</td>
                      <td>{pkg.rating}</td>
                      <td><span className="status-pill success">{pkg.status}</span></td>
                      <td>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Delete
                        </button>
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

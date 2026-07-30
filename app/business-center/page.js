'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SellerSidebar from './components/SellerSidebar';
import RoleGuard from '../components/RoleGuard';

export default function BusinessCenterDashboard() {
  const [filterPeriod, setFilterPeriod] = useState('This Month');

  const graphData = [
    { label: 'Jan', val: 45 },
    { label: 'Feb', val: 65 },
    { label: 'Mar', val: 85 },
    { label: 'Apr', val: 50 },
    { label: 'May', val: 95 },
    { label: 'Jun', val: 70 },
    { label: 'Jul', val: 100 },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <RoleGuard allowedRoles={['PLANNER']}>
        <main className="figma-main-content">
          <div className="seller-layout-grid">
            <SellerSidebar />

          <div className="seller-main-content">
            {/* Header Banner Card */}
            <div className="seller-card">
              <div className="seller-card-title">
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Business Center Dashboard</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Welcome back, DeshIT - BD! Manage your tour packages, track revenue, and monitor sales.
                  </p>
                </div>
                <Link href="/business-center/packages/add" className="btn-seller-primary">
                  Add New Package
                </Link>
              </div>

              {/* Metrics Grid */}
              <div className="seller-metrics-grid">
                <div className="metric-card">
                  <span className="label">Total Sales</span>
                  <span className="value">$45,200</span>
                  <span className="subtext">↑ +14.2% from last month</span>
                </div>
                <div className="metric-card">
                  <span className="label">Hold Amount</span>
                  <span className="value">$3,400</span>
                  <span className="subtext" style={{ color: '#F59E0B' }}>Pending Tour Completion</span>
                </div>
                <div className="metric-card">
                  <span className="label">Total Disbursed</span>
                  <span className="value">$38,500</span>
                  <span className="subtext">Bank Transfer Complete</span>
                </div>
                <div className="metric-card">
                  <span className="label">Admin Commission</span>
                  <span className="value">$3,300</span>
                  <span className="subtext" style={{ color: '#64748B' }}>10% Platform Fee</span>
                </div>
                <div className="metric-card">
                  <span className="label">Tourists Served</span>
                  <span className="value">1,450+</span>
                  <span className="subtext">Happy Customers</span>
                </div>
                <div className="metric-card">
                  <span className="label">Seller Rating</span>
                  <span className="value">4.9 ★</span>
                  <span className="subtext">98% Positive Reviews</span>
                </div>
              </div>
            </div>

            {/* Analytics & Graphs */}
            <div className="seller-card">
              <div className="seller-card-title">
                <span>Revenue & Visitor Analytics</span>
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>

              <div className="seller-graph-grid">
                <div className="graph-box">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px' }}>Monthly Revenue Growth ($)</div>
                  <div className="graph-bars">
                    {graphData.map((item) => (
                      <div key={item.label} className="graph-bar-col">
                        <div className="graph-bar-fill" style={{ height: `${item.val}%` }} />
                        <span className="graph-bar-label">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="graph-box" style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Quick Stats</div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Direct Searches:</strong> 64%
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Featured Banners:</strong> 24%
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Follower Offers:</strong> 12%
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
                  <Link href="/business-center/followers" className="btn-seller-primary" style={{ padding: '10px 14px', fontSize: '0.8rem', justifyContent: 'center' }}>
                    Send Offer to Followers
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="seller-card">
              <div className="seller-card-title">
                <span>Recent Tourist Orders</span>
                <Link href="/business-center/orders" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                  View All Orders →
                </Link>
              </div>

              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Package Title</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD-9481</td>
                    <td>Sanjid Rahman</td>
                    <td>Tenting at Cox's Bazar</td>
                    <td>15 Feb 2026</td>
                    <td>$200</td>
                    <td><span className="status-pill success">Approved</span></td>
                  </tr>
                  <tr>
                    <td>#ORD-9482</td>
                    <td>Anika Tabassum</td>
                    <td>Sajek Valley Helipad Tour</td>
                    <td>18 Feb 2026</td>
                    <td>$350</td>
                    <td><span className="status-pill pending">Order Placed</span></td>
                  </tr>
                  <tr>
                    <td>#ORD-9483</td>
                    <td>Tanvir Hasan</td>
                    <td>Paris Eiffel Tower & Museum</td>
                    <td>22 Feb 2026</td>
                    <td>$1,200</td>
                    <td><span className="status-pill success">Approved</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      </RoleGuard>

      <Footer />
    </div>
  );
}

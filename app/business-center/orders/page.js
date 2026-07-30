'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function OrdersPage() {
  const initialOrders = [
    { id: 'ORD-9481', customer: 'Sanjid Rahman', package: "Tenting at Cox's Bazar", date: '15 Feb 2026', amount: '$200', status: 'Approved', step: '3/6' },
    { id: 'ORD-9482', customer: 'Anika Tabassum', package: 'Sajek Valley Tour', date: '18 Feb 2026', amount: '$350', status: 'Payment Received', step: '2/6' },
    { id: 'ORD-9483', customer: 'Tanvir Hasan', package: 'Paris Eiffel Tower Excursion', date: '22 Feb 2026', amount: '$1,200', status: 'Tour Started', step: '5/6' },
    { id: 'ORD-9484', customer: 'Farhana Akter', package: 'Canada Visa Processing', date: '25 Feb 2026', amount: '$450', status: 'Tour Ended', step: '6/6' },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const updateOrderStatus = (id, newStatus, newStep) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus, step: newStep } : o));
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
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Orders & Booking Operations</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Process tourist orders, approve bookings, and update tour execution progress.
                  </p>
                </div>
              </div>

              {/* Order Workflow Info Box */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E40AF', marginBottom: '6px' }}>
                  📌 PDF Standard Order Process Steps:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <span>1️⃣ Order Placed</span> ➔
                  <span>2️⃣ Payment Received</span> ➔
                  <span>3️⃣ Operator Approved</span> ➔
                  <span>4️⃣ Tour Starts</span> ➔
                  <span>5️⃣ Tour End</span> ➔
                  <span>6️⃣ Review & Dispute Window</span>
                </div>
              </div>

              {/* Orders Table */}
              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Package Booked</th>
                    <th>Travel Date</th>
                    <th>Amount</th>
                    <th>Progress Step</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 800 }}>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.package}</td>
                      <td>{order.date}</td>
                      <td style={{ color: '#2563EB', fontWeight: 800 }}>{order.amount}</td>
                      <td><span className="status-pill pending">{order.step}</span></td>
                      <td>
                        <span className={`status-pill ${order.status === 'Tour Ended' ? 'success' : 'warning'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Approved', '3/6')}
                            style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Tour Started', '5/6')}
                            style={{ background: '#10B981', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Start Tour
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

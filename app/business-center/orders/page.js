'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

const DEFAULT_ORDERS = [
  {
    id: 'ORD-9481',
    customer: 'Sanjid Rahman',
    email: 'sanjid@example.com',
    phone: '+880 1711-001122',
    package: "Tenting at Cox's Bazar",
    date: '15 Feb 2026',
    bookingDate: '10 Feb 2026',
    amount: '৳20,000',
    status: 'Operator Approved',
    step: '3/6',
    guests: '2 Persons',
    paymentMethod: 'bKash Merchant Payment',
    trxId: 'BKASH-89481230',
    paymentVerified: true,
  },
  {
    id: 'ORD-9482',
    customer: 'Anika Tabassum',
    email: 'anika@example.com',
    phone: '+880 1812-998877',
    package: 'Sajek Valley Tour',
    date: '18 Feb 2026',
    bookingDate: '12 Feb 2026',
    amount: '৳35,000',
    status: 'Payment Received',
    step: '2/6',
    guests: '4 Persons (Family)',
    paymentMethod: 'Credit Card (Visa)',
    trxId: 'TXN-VISA-9948271',
    paymentVerified: true,
  },
  {
    id: 'ORD-9483',
    customer: 'Tanvir Hasan',
    email: 'tanvir@example.com',
    phone: '+880 1913-445566',
    package: 'Paris Eiffel Tower Excursion',
    date: '22 Feb 2026',
    bookingDate: '05 Feb 2026',
    amount: '৳1,20,000',
    status: 'Tour Started',
    step: '4/6',
    guests: '1 Person (Solo)',
    paymentMethod: 'Bank Wire Transfer',
    trxId: 'EFTN-BANK-009483',
    paymentVerified: true,
  },
  {
    id: 'ORD-9484',
    customer: 'Farhana Akter',
    email: 'farhana@example.com',
    phone: '+880 1614-778899',
    package: 'Canada Visa Processing',
    date: '25 Feb 2026',
    bookingDate: '01 Feb 2026',
    amount: '৳45,000',
    status: 'Tour Ended',
    step: '5/6',
    guests: '1 Applicant',
    paymentMethod: 'Nagad Online Payment',
    trxId: 'NAGAD-77491029',
    paymentVerified: true,
  },
];

const STEPS_LIST = [
  { num: '1', title: 'Order Placed', statusKey: 'Order Placed' },
  { num: '2', title: 'Payment Received', statusKey: 'Payment Received' },
  { num: '3', title: 'Operator Approved', statusKey: 'Operator Approved' },
  { num: '4', title: 'Tour Starts', statusKey: 'Tour Started' },
  { num: '5', title: 'Tour End', statusKey: 'Tour Ended' },
  { num: '6', title: 'Review & Dispute', statusKey: 'Review & Dispute Window' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load from localStorage or initialize with ৳ Currency Sanitization
  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_orders');
      if (saved) {
        const parsed = JSON.parse(saved).map(o => ({
          ...o,
          amount: (o.amount || '').replace('$', '৳')
        }));
        setOrders(parsed);
        localStorage.setItem('planner_orders', JSON.stringify(parsed));
      } else {
        setOrders(DEFAULT_ORDERS);
        localStorage.setItem('planner_orders', JSON.stringify(DEFAULT_ORDERS));
      }
    } catch (e) {
      console.error('Failed to load planner orders:', e);
      setOrders(DEFAULT_ORDERS);
    }
  }, []);

  const updateOrderStatus = (id, newStatus, newStep) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus, step: newStep } : o);
    setOrders(updated);
    try {
      localStorage.setItem('planner_orders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist order status:', e);
    }

    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus, step: newStep }));
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = (o.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (o.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (o.package || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStepIndex = (stepStr) => {
    if (!stepStr) return 1;
    const num = parseInt(stepStr.split('/')[0], 10);
    return isNaN(num) ? 1 : num;
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />

          <div className="seller-main-content">
            <div className="seller-card">
              <div className="seller-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Orders & Booking Operations</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Process tourist orders, approve bookings, and update tour execution progress in real-time.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setOrders(DEFAULT_ORDERS);
                      localStorage.setItem('planner_orders', JSON.stringify(DEFAULT_ORDERS));
                    }}
                    style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Reset Sample Orders
                  </button>
                </div>
              </div>

              {/* Order Workflow Info Box */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E40AF', marginBottom: '6px' }}>
                  PDF Standard Order Process Steps:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                  {STEPS_LIST.map((st, idx) => (
                    <span key={st.num} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <strong style={{ color: '#2563EB' }}>{st.num}. {st.title}</strong>
                      {idx < STEPS_LIST.length - 1 && <span style={{ color: '#94A3B8', margin: '0 4px' }}>➔</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Filters & Search Row */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, or Package..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, minWidth: '240px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', outline: 'none' }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', background: '#fff', outline: 'none' }}
                >
                  <option value="All">All Statuses ({orders.length})</option>
                  <option value="Payment Received">Payment Received</option>
                  <option value="Operator Approved">Operator Approved</option>
                  <option value="Tour Started">Tour Started</option>
                  <option value="Tour Ended">Tour Ended</option>
                  <option value="Review & Dispute Window">Review & Dispute Window</option>
                </select>
              </div>

              {/* Orders Table */}
              <div style={{ overflowX: 'auto' }}>
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
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                          No orders found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td style={{ fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap' }}>{order.id}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.82rem' }}>{order.customer}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{order.email}</div>
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontWeight: 600, color: '#334155' }}>{order.package}</td>
                          <td style={{ whiteSpace: 'nowrap', color: '#475569' }}>{order.date}</td>
                          <td style={{ color: '#2563EB', fontWeight: 800, whiteSpace: 'nowrap' }}>{(order.amount || '').replace('$', '৳')}</td>
                          <td style={{ whiteSpace: 'nowrap' }}><span className="status-pill pending">{order.step}</span></td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <span className={`status-pill ${order.status === 'Review & Dispute Window' ? 'success' : 'warning'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                              {order.status === 'Payment Received' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'Operator Approved', '3/6')}
                                  style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  Approve Booking
                                </button>
                              )}

                              {(order.status === 'Operator Approved' || order.status === 'Approved') && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'Tour Started', '4/6')}
                                  style={{ background: '#10B981', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  Start Tour
                                </button>
                              )}

                              {order.status === 'Tour Started' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'Tour Ended', '5/6')}
                                  style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  End Tour
                                </button>
                              )}

                              {order.status === 'Tour Ended' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'Review & Dispute Window', '6/6')}
                                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  Close & Review
                                </button>
                              )}

                              {order.status === 'Review & Dispute Window' && (
                                <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '4px 8px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                  Review Window
                                </span>
                              )}

                              <button
                                onClick={() => setSelectedOrder(order)}
                                title="View Full Order Details Modal"
                                style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                              >
                                Details
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

      {/* ── Interactive Order Details Modal ── */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '640px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            {/* Modal Header */}
            <div style={{ background: '#0F172A', color: '#fff', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>Booking Operation Details</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0' }}>{selectedOrder.id} — {selectedOrder.package}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem', display: 'grid', placeItems: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
              {/* Progress Timeline */}
              <div style={{ marginBottom: '24px', background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
                  Progress Status: Step {selectedOrder.step} ({selectedOrder.status})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                  {STEPS_LIST.map((st) => {
                    const currentIdx = getStepIndex(selectedOrder.step);
                    const stIdx = parseInt(st.num, 10);
                    const isDone = stIdx <= currentIdx;
                    return (
                      <div key={st.num} style={{ textAlign: 'center' }}>
                        <div style={{ height: '6px', borderRadius: '999px', background: isDone ? '#2563EB' : '#E2E8F0', marginBottom: '6px' }} />
                        <div style={{ fontSize: '0.7rem', fontWeight: isDone ? 'bold' : 'normal', color: isDone ? '#1E40AF' : '#94A3B8' }}>
                          {st.num}. {st.title.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#FAF5FF', border: '1px solid #F3E8FF', padding: '14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7E22CE', textTransform: 'uppercase' }}>Customer Details</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginTop: '4px' }}>{selectedOrder.customer}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>Email: {selectedOrder.email}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>Phone: {selectedOrder.phone}</div>
                </div>

                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase' }}>Booking Details</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginTop: '4px' }}>{selectedOrder.amount} (Paid)</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>Travel Date: {selectedOrder.date}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>Group: {selectedOrder.guests}</div>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.85rem', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Booking Created Date:</span>
                  <strong style={{ color: '#334155' }}>{selectedOrder.bookingDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Payment Gateway:</span>
                  <strong style={{ color: '#059669' }}>{selectedOrder.paymentMethod}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Transaction ID (TrxID):</span>
                  <strong style={{ color: '#2563EB', fontFamily: 'monospace' }}>{selectedOrder.trxId || 'TXN-9481200'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #CBD5E1' }}>
                  <span style={{ color: '#64748B' }}>Payment Verification:</span>
                  <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                    ✓ Verified & Secured by Escrow
                  </span>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <div>
                  {selectedOrder.status === 'Payment Received' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'Operator Approved', '3/6')}
                      style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Approve Booking
                    </button>
                  )}
                  {(selectedOrder.status === 'Operator Approved' || selectedOrder.status === 'Approved') && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'Tour Started', '4/6')}
                      style={{ background: '#10B981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Start Tour Now
                    </button>
                  )}
                  {selectedOrder.status === 'Tour Started' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'Tour Ended', '5/6')}
                      style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Mark Tour Ended
                    </button>
                  )}
                  {selectedOrder.status === 'Tour Ended' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'Review & Dispute Window', '6/6')}
                      style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Complete & Open Review
                    </button>
                  )}
                  {selectedOrder.status === 'Review & Dispute Window' && (
                    <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '6px 14px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 800 }}>
                      Review Window Active
                    </span>
                  )}
                </div>

                <button
                  onClick={() => alert(`Printing Invoice Summary for Order ${selectedOrder.id}...`)}
                  style={{ background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

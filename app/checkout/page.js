'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCurrency } from '../context/CurrencyContext';
import { generateTicketPDF } from '../utils/pdfGenerator';

export default function CheckoutPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'bada boom - Paris Tour',
      price: 74.99,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Yellow in bloom - Sajek Tour',
      price: 89.99,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'quinoa dreams - Sundarbans Tour',
      price: 109.99,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [voucher, setVoucher] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxes = 8.20;
  const grandTotal = totalAmount + taxes;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  const handleDownloadPDF = () => {
    generateTicketPDF({
      title: 'Paris & Sajek Combined Tour Package',
      refNo: 'TD-' + Math.floor(100000 + Math.random() * 900000),
      date: '27 - 30 June, 2026',
      amount: formatPrice(grandTotal),
      touristName: cardName || 'Hi, Username',
    });
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        {paymentSuccess ? (
          /* Payment Success & PDF Ticket Download Screen */
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '40px auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '8px' }}>
              Payment Successful!
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '24px' }}>
              Thank you for booking with Tour Dibo! Your travel ticket and e-voucher reference have been generated.
            </p>

            <div
              style={{
                background: '#F8FAFC',
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '28px',
                textAlign: 'left',
                border: '1px solid #E2E8F0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Booking Reference:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--primary-blue)' }}>TD-849201</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Total Amount Paid:</span>
                <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{formatPrice(grandTotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Status:</span>
                <strong style={{ fontSize: '0.85rem', color: '#10B981' }}>✔ CONFIRMED</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadPDF}
                style={{
                  background: 'var(--primary-blue)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  boxShadow: '0 6px 20px rgba(11, 87, 208, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📄 Download PDF Ticket / Voucher
              </button>

              <button
                onClick={() => router.push('/account/bookings')}
                style={{
                  background: '#F1F5F9',
                  color: '#334155',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                }}
              >
                View My Bookings
              </button>
            </div>
          </div>
        ) : (
          /* Normal Checkout Screen */
          <div className="checkout-two-col-layout">
            {/* Left Column: Cart Items List */}
            <div className="cart-items-column">
              <div className="cart-items-card">
                {items.map((item, index) => (
                  <div key={item.id} className={`cart-item-row ${index < items.length - 1 ? 'has-divider' : ''}`}>
                    <div className="checkout-item-thumb">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="110px"
                        className="checkout-item-img"
                      />
                    </div>

                    <div className="item-title-qty">
                      <h3>{item.name}</h3>
                      <div className="qty-control-row">
                        <span>quantity:</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    </div>

                    <div className="item-price-tag">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary & Payment Form */}
            <div className="checkout-summary-column">
              {/* Amount Summary Card */}
              <div className="summary-breakdown-card">
                <div className="summary-line">
                  <span>Total Amount:</span>
                  <strong>{formatPrice(totalAmount)}</strong>
                </div>
                <div className="summary-line">
                  <span>Platform Fee:</span>
                  <strong>NIL</strong>
                </div>
                <div className="summary-line">
                  <span>Taxes:</span>
                  <strong>{formatPrice(taxes)}</strong>
                </div>

                <div className="summary-total-banner">
                  <span>TOTAL :</span>
                  <strong>{formatPrice(grandTotal)}</strong>
                </div>
              </div>

              {/* Apply Voucher Block */}
              <div className="voucher-input-block">
                <label className="field-title">Apply Voucher</label>
                <div className="voucher-field-capsule">
                  <span className="voucher-percent-icon">%</span>
                  <input
                    type="text"
                    placeholder="Enter Voucher here (e.g. DESH2026)"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                </div>
              </div>

              {/* Select Payment Method Card */}
              <div className="payment-method-card">
                <label className="field-title">Select Payment Method</label>

                <div className="payment-radios-flex">
                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="card-icons-wrap">
                      💳 Credit Card
                    </div>
                  </label>

                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymethod"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                    />
                    <span className="bkash-logo-text">bKash</span>
                  </label>
                </div>

                {/* Payment Details Inputs */}
                <div className="payment-details-form">
                  <h4 className="details-form-title">Payment Details</h4>

                  <div className="checkout-field-line">
                    <input
                      type="text"
                      placeholder="Enter Name Card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div className="checkout-field-line with-visa">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <span className="visa-badge-text">VISA</span>
                  </div>

                  <div className="checkout-row-2col">
                    <input
                      type="text"
                      placeholder="Expiration (MM/YY)"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CVV Code"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>

                  <p className="checkout-terms-note">
                    By Clicking "Pay"* I agree to company terms of services
                  </p>
                </div>
              </div>

              {/* Pay Button */}
              <button className="btn-pay-blue" onClick={handlePay} disabled={processing}>
                {processing ? 'Processing Payment...' : `Pay ${formatPrice(grandTotal)}`}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Messages Button */}
      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

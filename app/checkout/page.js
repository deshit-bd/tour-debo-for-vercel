'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCurrency } from '../context/CurrencyContext';
import { generateTicketPDF } from '../utils/pdfGenerator';

const TOURS_DATA_MAP = {
  'paris': {
    name: 'Paris : City of Love Tour',
    prices: { single: 120, couple: 216 },
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
  },
  'sylhet': {
    name: 'Sylhet : Ratargul & Jaflong Escaped Tour',
    prices: { single: 144, couple: 240 },
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
  },
  'parasailing': {
    name: 'Cox\'s Bazar : Parasailing Adventure!',
    prices: { single: 216, couple: 360 },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  'sajek': {
    name: 'Sajek Valley : Cloud & Helipad Retreat',
    prices: { single: 180, couple: 300 },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  'saintmartin': {
    name: 'Saint Martin : Coral Island Beach Camp',
    prices: { single: 165, couple: 280 },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const tourId = searchParams?.get('tourId') || 'paris';
  const pkgType = searchParams?.get('package') || 'single';
  const initialCount = parseInt(searchParams?.get('count') || '1', 10);

  const guideName = searchParams?.get('guide');
  const guideTitle = searchParams?.get('title');
  const guideVariety = searchParams?.get('variety');
  const guidePasses = parseInt(searchParams?.get('passes') || '1', 10);
  const guidePrice = parseFloat(searchParams?.get('price') || '2500');

  const selectedTour = TOURS_DATA_MAP[tourId.toLowerCase()] || TOURS_DATA_MAP['paris'];
  const unitPrice = selectedTour.prices[pkgType] || selectedTour.prices.single;
  const pkgLabel = pkgType === 'couple' ? 'Couple Package' : 'Single Package';

  const [items, setItems] = useState([
    {
      id: 1,
      name: `${selectedTour.name} (${pkgLabel})`,
      price: unitPrice,
      qty: Math.max(1, initialCount),
      image: selectedTour.image,
    },
  ]);

  const isGuideBooking = Boolean(guideName || guideTitle);

  useEffect(() => {
    if (guideName || guideTitle) {
      // guidePrice is passed in BDT from guide page (e.g. ৳3,200). Convert to base USD for CurrencyContext.
      const baseUsdPrice = guidePrice / 120;
      setItems([
        {
          id: 'guide-booking-item',
          name: `${guideTitle || 'Tour Guide Service'} (${guideVariety || 'Couple'}) - Guide: ${guideName || 'Verified Guide'}`,
          price: baseUsdPrice / Math.max(1, guidePasses),
          qty: Math.max(1, guidePasses),
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        },
      ]);
    }
  }, [guideName, guideTitle, guideVariety, guidePasses, guidePrice]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [voucher, setVoucher] = useState('');
  const [useCoins, setUseCoins] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankTxnRef, setBankTxnRef] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const sellerDiscount = isGuideBooking ? 0 : 15;
  const voucherDiscount = voucher.toUpperCase() === 'DESH2026' ? (isGuideBooking ? 100 / 120 : 20) : 0;
  const coinsDiscount = useCoins ? (isGuideBooking ? 50 / 120 : 50 / 120) : 0;
  const bankCashback = paymentMethod === 'bank' ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
  const partnerDiscount = isGuideBooking ? 0 : (paymentMethod === 'card' ? 10 : (paymentMethod === 'bkash' ? 5 : 0));
  const taxes = 0;
  const grandTotal = Math.max(0, subtotal - sellerDiscount - voucherDiscount - partnerDiscount - coinsDiscount - bankCashback);

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
          /* Payment Success Screen */
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
                  border: 'none',
                  cursor: 'pointer',
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
                  border: 'none',
                  cursor: 'pointer',
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
              {/* Discount Banner (PDF Page 14 Feedback) */}
              <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', color: '#92400E', fontSize: '0.82rem', fontWeight: 'bold' }}>
                <div>Applicable Discount Breakdown:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '700' }}>
                    Seller Discount: - {formatPrice(sellerDiscount)}
                  </span>
                  <span style={{ background: voucherDiscount > 0 ? '#DCFCE7' : '#F1F5F9', color: voucherDiscount > 0 ? '#166534' : '#64748B', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '700' }}>
                    Voucher Discount: {voucherDiscount > 0 ? `- ${formatPrice(voucherDiscount)}` : 'None'}
                  </span>
                  {useCoins && (
                    <span style={{ background: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '700' }}>
                      Coins Discount (Redeem TK.50): - {formatPrice(coinsDiscount)}
                    </span>
                  )}
                  {paymentMethod === 'bank' && (
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '700' }}>
                      Bank Transfer Cash Back (5%): - {formatPrice(bankCashback)}
                    </span>
                  )}
                  <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '700' }}>
                    Payment Partner Discount: - {formatPrice(partnerDiscount)}
                  </span>
                </div>
              </div>

              {/* Amount Summary Card */}
              <div className="summary-breakdown-card">
                <div className="summary-line">
                  <span>Subtotal Amount:</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="summary-line">
                  <span>Seller Discount:</span>
                  <strong>- {formatPrice(sellerDiscount)}</strong>
                </div>
                {voucherDiscount > 0 && (
                  <div className="summary-line">
                    <span>Voucher Discount ({voucher.toUpperCase()}):</span>
                    <strong>- {formatPrice(voucherDiscount)}</strong>
                  </div>
                )}
                {useCoins && (
                  <div className="summary-line">
                    <span>Coins Discount (Redeem TK.50):</span>
                    <strong style={{ color: '#059669' }}>- {formatPrice(coinsDiscount)}</strong>
                  </div>
                )}
                {paymentMethod === 'bank' && (
                  <div className="summary-line">
                    <span>Bank Transfer 5% Cash Back Offer:</span>
                    <strong style={{ color: '#059669' }}>- {formatPrice(bankCashback)}</strong>
                  </div>
                )}
                <div className="summary-line">
                  <span>Payment Partner Discount:</span>
                  <strong>- {formatPrice(partnerDiscount)}</strong>
                </div>
                <div className="summary-line">
                  <span>Platform Fee:</span>
                  <strong>{formatPrice(0)}</strong>
                </div>

                <div className="summary-total-banner">
                  <span>TOTAL :</span>
                  <strong>{formatPrice(grandTotal)}</strong>
                </div>
              </div>

              {/* Apply Voucher & Coins Block */}
              <div className="voucher-input-block">
                <label className="field-title">Voucher &amp; Code / Coins</label>
                <div className="voucher-field-capsule">
                  <span className="voucher-percent-icon">%</span>
                  <input
                    type="text"
                    placeholder="Enter Voucher here (e.g. DESH2026)"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                  <button onClick={() => setVoucher('DESH2026')} style={{ background: 'var(--primary-blue)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Apply
                  </button>
                </div>

                {/* Coins Redeem Toggle Switch (Feedback Reference) */}
                <div style={{ background: useCoins ? '#ECFDF5' : '#F8FAFC', border: `1.5px solid ${useCoins ? '#10B981' : '#CBD5E1'}`, borderRadius: '12px', padding: '12px 16px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease' }}>
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>Coins (Redeem Option by Toggle)</strong>
                    <span style={{ fontSize: '0.74rem', color: useCoins ? '#047857' : '#64748B', fontWeight: '600' }}>
                      {useCoins ? '✓ Ex. Redeem TK.50 Applied!' : 'Ex. Redeem TK.50 (Toggle ON)'}
                    </span>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={useCoins}
                      onChange={(e) => setUseCoins(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: useCoins ? '#10B981' : '#CBD5E1', borderRadius: '24px', transition: '0.3s'
                    }}>
                      <span style={{
                        position: 'absolute', height: '18px', width: '18px', left: useCoins ? '24px' : '3px', bottom: '3px',
                        backgroundColor: 'white', borderRadius: '50%', transition: '0.3s'
                      }} />
                    </span>
                  </label>
                </div>
              </div>

              {/* Select Payment Method Card */}
              <div className="payment-method-card">
                <label className="field-title">Select Payment Method</label>

                <div className="payment-radios-flex" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  <label className="payment-radio-label" style={{ border: paymentMethod === 'card' ? '2px solid #2563EB' : '1px solid #E2E8F0', background: paymentMethod === 'card' ? '#EFF6FF' : '#fff' }}>
                    <input
                      type="radio"
                      name="paymethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="card-icons-wrap">
                      Credit Card
                    </div>
                  </label>

                  <label className="payment-radio-label" style={{ border: paymentMethod === 'bkash' ? '2px solid #2563EB' : '1px solid #E2E8F0', background: paymentMethod === 'bkash' ? '#EFF6FF' : '#fff' }}>
                    <input
                      type="radio"
                      name="paymethod"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                    />
                    <span className="bkash-logo-text">bKash</span>
                  </label>

                  <label className="payment-radio-label" style={{ border: paymentMethod === 'bank' ? '2px solid #2563EB' : '1px solid #E2E8F0', background: paymentMethod === 'bank' ? '#EFF6FF' : '#fff' }}>
                    <input
                      type="radio"
                      name="paymethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '0.8rem', color: '#1E40AF' }}>
                      Bank Transfer
                      <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.66rem', padding: '1px 5px', borderRadius: '4px', border: '1px solid #86EFAC' }}>
                        Cash Back Offer
                      </span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank' && (
                  <div style={{ background: '#F0F9FF', border: '1.5px dashed #0284C7', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', color: '#0369A1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#0C4A6E' }}>Bank Transfer Details &amp; Cash Back Offer:</strong>
                      <span style={{ background: '#10B981', color: '#fff', fontSize: '0.72rem', fontWeight: '800', padding: '2px 8px', borderRadius: '10px' }}>
                        Instant 5% Cash Back Applied
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', lineHeight: '1.6', color: '#334155' }}>
                      <div><strong>Bank Name:</strong> City Bank PLC / Eastern Bank PLC</div>
                      <div><strong>Account Name:</strong> Tour Dibo Online Ltd</div>
                      <div><strong>Account No:</strong> 1502948102001</div>
                      <div><strong>Routing No:</strong> 225272810 (Dhaka Branch)</div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        placeholder="Enter Bank Deposit Slip No / Txn Reference ID *"
                        value={bankTxnRef}
                        onChange={(e) => setBankTxnRef(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #BAE6FD', fontSize: '0.82rem', background: '#ffffff', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {/* Profile Completion Verification for Booking Confirmation */}
                <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      Booking Confirmation Profile Info
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 14px 0' }}>
                    Required for official ticket issuance &amp; insurance coverage:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Passenger Full Name *"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="NID or Passport Number *"
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Mobile Phone *"
                        style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                      <input
                        type="text"
                        placeholder="Emergency Contact *"
                        style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
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

                  {/* Full-width Pay Button inside card */}
                  <button
                    className="btn-pay-blue"
                    onClick={handlePay}
                    disabled={processing}
                    style={{ width: '100%', marginTop: '16px', border: 'none', cursor: 'pointer' }}
                  >
                    {processing ? 'Processing Payment...' : `Pay ${formatPrice(grandTotal)}`}
                  </button>

                  <p style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'center', lineHeight: '1.4', margin: '12px 0 0 0' }}>
                    Upon clicking 'Place Order', I confirm I have read and acknowledged <Link href="/help" style={{ color: '#2563EB', textDecoration: 'underline' }}>all terms and policies</Link>.
                  </p>
                </div>
              </div>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', fontWeight: 'bold' }}>Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

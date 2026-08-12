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
    prices: { single: 120, couple: 216, child: 60 },
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
  },
  'sylhet': {
    name: 'Sylhet : Ratargul & Jaflong Escaped Tour',
    prices: { single: 144, couple: 240, child: 72 },
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
  },
  'parasailing': {
    name: 'Cox\'s Bazar : Parasailing Adventure!',
    prices: { single: 216, couple: 360, child: 108 },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  'sajek': {
    name: 'Sajek Valley : Cloud & Helipad Retreat',
    prices: { single: 180, couple: 300, child: 90 },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  'saintmartin': {
    name: 'Saint Martin : Coral Island Beach Camp',
    prices: { single: 165, couple: 280, child: 82.5 },
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
  const childrenCount = parseInt(searchParams?.get('children') || '0', 10);

  const guideName = searchParams?.get('guide');
  const guideTitle = searchParams?.get('title');
  const guideVariety = searchParams?.get('variety');
  const guidePasses = parseInt(searchParams?.get('passes') || '1', 10);
  const guidePrice = parseFloat(searchParams?.get('price') || '2500');

  const selectedTour = TOURS_DATA_MAP[tourId.toLowerCase()] || TOURS_DATA_MAP['paris'];
  const unitPrice = selectedTour.prices[pkgType] || selectedTour.prices.single;
  const childUnitPrice = selectedTour.prices.child || Math.round(selectedTour.prices.single * 0.5);
  const pkgLabel = pkgType === 'couple' ? 'Couple Package' : 'Single Package';

  const initialItemsList = [
    {
      id: 1,
      name: `${selectedTour.name} (${pkgLabel})`,
      price: unitPrice,
      qty: Math.max(1, initialCount),
      image: selectedTour.image,
    },
  ];

  if (childrenCount > 0) {
    initialItemsList.push({
      id: 2,
      name: `${selectedTour.name} (Child Pass - Age 2-11 yrs)`,
      price: childUnitPrice,
      qty: childrenCount,
      image: selectedTour.image,
    });
  }

  const [items, setItems] = useState(initialItemsList);

  const isGuideBooking = Boolean(guideName || guideTitle);
  const bookingType = searchParams?.get('type') || '';
  const isVisaBooking = bookingType === 'visa' || (searchParams?.get('tourId') && ['canada', 'uk', 'australia', 'usa', 'germany', 'malaysia', 'japan', 'singapore', 'dubai', 'france', 'turkey', 'newzealand'].includes((searchParams.get('tourId') || '').toLowerCase()));

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
    } else if (isVisaBooking) {
      const rawPrice = parseFloat(searchParams?.get('price') || '25200');
      const basePriceUsd = rawPrice > 0 ? rawPrice / 120 : 210;
      const countryTitle = (tourId.charAt(0).toUpperCase() + tourId.slice(1)) + ' Visa Processing Service';
      setItems([
        {
          id: 'visa-booking-item',
          name: `${countryTitle} (${pkgType})`,
          price: basePriceUsd / Math.max(1, initialCount),
          qty: Math.max(1, initialCount),
          image: selectedTour.image || 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=400&q=80',
        },
      ]);
    }
  }, [guideName, guideTitle, guideVariety, guidePasses, guidePrice, isVisaBooking, tourId, pkgType, initialCount]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [voucher, setVoucher] = useState('');
  const [useCoins, setUseCoins] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankTxnRef, setBankTxnRef] = useState('');
  const [bankSlipFile, setBankSlipFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Visa Applicant Details Modal & Form State
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [visaSubmitted, setVisaSubmitted] = useState(false);
  const [passengersData, setPassengersData] = useState([]);

  const createInitialPassengers = (totalCount) => {
    const list = [];
    const numAdults = parseInt(searchParams?.get('adults') || String(totalCount), 10);
    const numChildren = parseInt(searchParams?.get('children') || '0', 10);

    for (let i = 0; i < totalCount; i++) {
      const isChild = i >= numAdults;
      list.push({
        id: i + 1,
        savedSearch: '',
        firstName: i === 0 ? 'Md' : (i === 1 ? 'Sanjid' : (isChild ? 'Baby' : '')),
        lastName: i === 0 ? 'Monjurul Islam' : (i === 1 ? 'Ibrahim' : (isChild ? 'Rahman' : '')),
        type: isChild ? 'Child' : 'Adult',
        gender: 'Male',
        dob: isChild ? '2018-06-10' : (i === 0 ? '1995-05-15' : '1998-08-20'),
        nationality: 'Bangladesh',
        passportNumber: i === 0 ? 'A09876543' : (i === 1 ? 'B01234567' : (isChild ? 'C0998877' : '')),
        passportExpiry: '2030-12-31',
        expanded: true,
      });
    }
    return list;
  };

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const sellerDiscount = isGuideBooking ? 0 : 15;
  const voucherUpper = voucher.trim().toUpperCase();
  const voucherDiscount = voucherUpper === 'DESH2026' ? (isGuideBooking ? 100 : 20) : (
    voucherUpper === 'REF-REWARD-500' || voucherUpper === 'REF-FRIEND-500' || voucherUpper.startsWith('DISC500') ? 500 : 0
  );
  const coinsDiscount = useCoins ? (isGuideBooking ? 50 : 50) : 0;
  const bankCashback = paymentMethod === 'bank' ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
  const partnerDiscount = isGuideBooking ? 0 : (paymentMethod === 'card' ? 10 : (paymentMethod === 'bkash' ? 5 : 0));
  const taxes = 0;
  const grandTotal = Math.max(0, subtotal - sellerDiscount - voucherDiscount - partnerDiscount - coinsDiscount - bankCashback);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if (isVisaBooking && !visaSubmitted) {
        setPassengersData(createInitialPassengers(Math.max(1, initialCount)));
        setShowVisaModal(true);
      } else {
        setPaymentSuccess(true);
      }
    }, 1200);
  };

  const handleSubmitVisaForm = (e) => {
    if (e) e.preventDefault();
    setShowVisaModal(false);
    setVisaSubmitted(true);
    setPaymentSuccess(true);
  };

  const handleDownloadPDF = () => {
    generateTicketPDF({
      title: isVisaBooking ? `${tourId.toUpperCase()} Visa Processing Service` : 'Paris & Sajek Combined Tour Package',
      refNo: isVisaBooking ? 'TD-VISA-' + Math.floor(100000 + Math.random() * 900000) : 'TD-' + Math.floor(100000 + Math.random() * 900000),
      date: '27 - 30 June, 2026',
      amount: formatPrice(grandTotal),
      touristName: cardName || (passengersData[0] ? `${passengersData[0].firstName} ${passengersData[0].lastName}` : 'Md Monjurul Islam'),
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
              maxWidth: '680px',
              margin: '40px auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '8px' }}>
              {isVisaBooking ? 'Visa Application Request Submitted!' : 'Payment Successful!'}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '24px' }}>
              {isVisaBooking
                ? `Thank you! Payment received and applicant passport details recorded for ${passengersData.length || initialCount} person(s).`
                : 'Thank you for booking with Tour Dibo! Your travel ticket and e-voucher reference have been generated.'}
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
                <strong style={{ fontSize: '0.85rem', color: 'var(--primary-blue)' }}>
                  {isVisaBooking ? 'TD-VISA-849201' : 'TD-849201'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Total Amount Paid:</span>
                <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{formatPrice(grandTotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: isVisaBooking ? '12px' : '0' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Payment &amp; Processing Status:</span>
                <strong style={{ fontSize: '0.85rem', color: '#10B981' }}>✔ CONFIRMED &amp; SUBMITTED</strong>
              </div>

              {/* Visa Passengers List Summary */}
              {isVisaBooking && passengersData.length > 0 && (
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                    📋 Registered Applicant(s) Information:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {passengersData.map((p) => (
                      <div key={p.id} style={{ background: '#ffffff', border: '1px solid #CBD5E1', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <span>👤 <strong>Passenger {p.id}:</strong> {p.firstName} {p.lastName} ({p.type})</span>
                        <span style={{ color: '#2563EB', fontWeight: 'bold' }}>Passport: {p.passportNumber || 'N/A'} ({p.nationality})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                📄 Download Visa Receipt / Voucher
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
                    Voucher Discount: {voucherDiscount > 0 ? `- ${formatPrice(voucherDiscount)}` : formatPrice(0)}
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

              {/* Booking Summary Card */}
              <div className="summary-breakdown-card">
                <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: '0 0 12px 0', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                  Booking Summary
                </h4>
                
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <div className="summary-line">
                  <span>Seller Discount:</span>
                  <strong style={{ color: '#DC2626' }}>- {formatPrice(sellerDiscount)}</strong>
                </div>

                <div className="summary-line">
                  <span>Voucher &amp; Code:</span>
                  <strong style={{ color: voucherDiscount > 0 ? '#166534' : '#64748B' }}>
                    {voucherDiscount > 0 ? `- ${formatPrice(voucherDiscount)}` : formatPrice(0)}
                  </strong>
                </div>

                <div className="summary-line">
                  <span>Coins (Redeem TK. 50):</span>
                  <strong style={{ color: useCoins ? '#166534' : '#64748B' }}>
                    {useCoins ? `- ${formatPrice(coinsDiscount)}` : formatPrice(0)}
                  </strong>
                </div>

                {paymentMethod === 'bank' && (
                  <div className="summary-line">
                    <span>Bank Transfer 5% Cash Back Offer:</span>
                    <strong style={{ color: '#166534' }}>- {formatPrice(bankCashback)}</strong>
                  </div>
                )}

                <div className="summary-line">
                  <span>Payment Partner Discount:</span>
                  <strong style={{ color: '#DC2626' }}>- {formatPrice(partnerDiscount)}</strong>
                </div>

                <div className="summary-line">
                  <span>Platform Fees:</span>
                  <strong>{formatPrice(0)}</strong>
                </div>

                <div className="summary-total-banner">
                  <span>Total :</span>
                  <strong>{formatPrice(grandTotal)}</strong>
                </div>
              </div>

              {/* Apply Voucher & Coins Interactive Block */}
              <div className="voucher-input-block" style={{ marginTop: '16px' }}>
                <label className="field-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#334155' }}>Voucher &amp; Code / Coins</label>
                <div className="voucher-field-capsule" style={{ display: 'flex', background: '#ffffff', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', padding: '4px' }}>
                  <span className="voucher-percent-icon" style={{ padding: '6px 10px', color: '#64748B', fontWeight: 'bold' }}>%</span>
                  <input
                    type="text"
                    placeholder="Enter Voucher here (e.g. DESH2026)"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '6px', fontSize: '0.82rem', outline: 'none' }}
                  />
                  <button onClick={() => setVoucher('DESH2026')} style={{ background: 'var(--primary-blue)', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Apply
                  </button>
                </div>

                {/* Coins Redeem Toggle Switch */}
                <div style={{ background: useCoins ? '#ECFDF5' : '#F8FAFC', border: `1.5px solid ${useCoins ? '#10B981' : '#CBD5E1'}`, borderRadius: '12px', padding: '12px 16px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease' }}>
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: '#0F172A', display: 'block' }}>Coins (Redeem TK. 50)</strong>
                    <span style={{ fontSize: '0.74rem', color: useCoins ? '#047857' : '#64748B', fontWeight: '600' }}>
                      {useCoins ? `✓ Applied: - ${formatPrice(coinsDiscount)}` : 'Redeem TK. 50 (Toggle ON)'}
                    </span>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '22px', cursor: 'pointer', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={useCoins}
                      onChange={(e) => setUseCoins(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: useCoins ? '#10B981' : '#CBD5E1', borderRadius: '22px', transition: '0.3s'
                    }}>
                      <span style={{
                        position: 'absolute', height: '16px', width: '16px', left: useCoins ? '23px' : '3px', bottom: '3px',
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
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter Bank Deposit Slip No / Txn Reference ID *"
                        value={bankTxnRef}
                        onChange={(e) => setBankTxnRef(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #BAE6FD', fontSize: '0.82rem', background: '#ffffff', outline: 'none' }}
                      />

                      {/* Deposit Slip File / Image Attachment Uploader */}
                      <label
                        htmlFor="bankSlipUpload"
                        style={{
                          display: 'block',
                          background: '#ffffff',
                          border: '1.5px dashed #0284C7',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '600', color: '#0369A1' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                          <span>{bankSlipFile ? `Attached: ${bankSlipFile.name}` : 'Attach Deposit Slip / Receipt (Image or PDF) *'}</span>
                        </div>
                        <input
                          id="bankSlipUpload"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setBankSlipFile(e.target.files[0]);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                        {bankSlipFile && (
                          <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #BAE6FD', fontSize: '0.74rem', color: '#15803D', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>✓ {bankSlipFile.name} ({(bankSlipFile.size / 1024).toFixed(1)} KB)</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setBankSlipFile(null);
                              }}
                              style={{ background: 'transparent', border: 'none', color: '#DC2626', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.72rem' }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </label>
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

                  <p style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'left', lineHeight: '1.4', margin: '12px 0 0 0' }}>
                    Upon clicking 'Place Order', I confirm I have read and acknowledged <Link href="/help" style={{ color: '#2563EB', textDecoration: 'underline' }}>all terms and policies</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* VISA APPLICANT INFORMATION POPUP SHEET MODAL */}
      {showVisaModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '760px', height: '92vh', maxHeight: '820px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📄 Visa Passenger / Applicant Information
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px', display: 'block' }}>
                  Please fill traveler passport &amp; identity details for {passengersData.length} applicant(s)
                </span>
              </div>
              <button 
                onClick={() => setShowVisaModal(false)} 
                style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Explicit Vertical Scrollable Container) */}
            <div style={{ padding: '16px 20px 40px 24px', overflowY: 'auto', flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: '20px', scrollbarWidth: 'thin', scrollbarColor: '#94A3B8 #F1F5F9' }}>
              {passengersData.map((p, idx) => (
                <div key={p.id} style={{ border: '1.5px solid #CBD5E1', borderRadius: '14px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', flexShrink: 0 }}>
                  
                  {/* Passenger Card Header */}
                  <div 
                    onClick={() => {
                      const updated = [...passengersData];
                      updated[idx].expanded = !updated[idx].expanded;
                      setPassengersData(updated);
                    }}
                    style={{ background: '#F8FAFC', padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: p.expanded ? '1px solid #E2E8F0' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        👤 Passenger {p.id}
                      </span>
                      <span style={{ background: p.type === 'Child' ? '#DCFCE7' : '#DBEAFE', color: p.type === 'Child' ? '#15803D' : '#1D4ED8', border: p.type === 'Child' ? '1px solid #86EFAC' : '1px solid #93C5FD', fontSize: '0.74rem', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>
                        {p.type}
                      </span>
                    </div>
                    <span style={{ transform: p.expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#64748B', fontWeight: 'bold', fontSize: '0.85rem' }}>▼</span>
                  </div>

                  {/* Passenger Card Body - 2 Column Grid */}
                  {p.expanded && (
                    <div style={{ padding: '16px 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 16px', boxSizing: 'border-box', background: '#FFFFFF' }}>
                      
                      {/* SEARCH SAVED TRAVELLER (Spans 2 columns) */}
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          🔍 SEARCH SAVED TRAVELLER
                        </label>
                        <input
                          type="text"
                          placeholder="Type name to search saved travellers..."
                          value={p.savedSearch || ''}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].savedSearch = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FAFAFA', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* FIRST NAME */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          FIRST NAME <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mohammad"
                          value={p.firstName}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].firstName = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* LAST NAME */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          LAST NAME <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahman"
                          value={p.lastName}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].lastName = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* TYPE */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          TYPE <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                          value={p.type}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].type = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', cursor: 'pointer', boxSizing: 'border-box' }}
                        >
                          <option value="Adult">Adult</option>
                          <option value="Child">Child</option>
                          <option value="Infant">Infant</option>
                        </select>
                      </div>

                      {/* GENDER */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          GENDER <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                          value={p.gender}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].gender = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', cursor: 'pointer', boxSizing: 'border-box' }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* DATE OF BIRTH */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          DATE OF BIRTH <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={p.dob}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].dob = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* NATIONALITY */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          NATIONALITY <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                          value={p.nationality}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].nationality = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', cursor: 'pointer', boxSizing: 'border-box' }}
                        >
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>

                      {/* PASSPORT NUMBER */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          PASSPORT NUMBER
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. AB1234567"
                          value={p.passportNumber}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].passportNumber = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* PASSPORT EXPIRY */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 4px 0' }}>
                          PASSPORT EXPIRY
                        </label>
                        <input
                          type="date"
                          value={p.passportExpiry}
                          onChange={(e) => {
                            const updated = [...passengersData];
                            updated[idx].passportExpiry = e.target.value;
                            setPassengersData(updated);
                          }}
                          style={{ width: '100%', height: '38px', padding: '0 12px', margin: 0, borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', color: '#0F172A', boxSizing: 'border-box' }}
                        />
                      </div>

                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setShowVisaModal(false)}
                style={{ padding: '11px 22px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.15s ease' }}
              >
                Back to Checkout
              </button>
              <button
                type="button"
                onClick={handleSubmitVisaForm}
                style={{ padding: '12px 28px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#FFFFFF', fontWeight: '800', fontSize: '0.92rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.35)', transition: 'all 0.15s ease' }}
              >
                Submit Visa Application ✓
              </button>
            </div>

          </div>
        </div>
      )}

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

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AccountSidebar from '../../../components/AccountSidebar';
import { generateTicketPDF } from '../../../utils/pdfGenerator';

const SAMPLE_BOOKINGS = {
  '8849201948102': {
    id: '8849201948102',
    orderRef: 'ORD-9481',
    name: "Tenting at Cox's Bazar",
    route: "Dhaka - Cox's Bazar - Dhaka",
    date: '15 Feb 2026',
    bookingDate: '12 Jan 2026',
    qty: 3,
    guests: '3 Persons (Couple + Extra Bed)',
    rating: '4.8',
    status: 'Completed',
    stepIndex: 6,
    amount: '৳21,600',
    paymentMethod: 'bKash Merchant Payment',
    trxId: 'BKASH-89481230',
    plannerName: 'Green Bengal Tours & Travels',
    plannerPhone: '+880 1711-001122',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    passenger: {
      fullName: 'Sanjid Rahman',
      nid: '199226918239102',
      phone: '+880 1711-001122',
      emergencyPhone: '+880 1812-998877',
    },
  },
  '8849201948103': {
    id: '8849201948103',
    orderRef: 'ORD-9482',
    name: 'Sajek Valley Tour',
    route: 'Dhaka - Sajek - Dhaka',
    date: '18 Feb 2026',
    bookingDate: '15 Feb 2026',
    qty: 2,
    guests: '2 Persons (Couple Cottage)',
    rating: '4.9',
    status: 'Payment Due',
    stepIndex: 1,
    amount: '৳18,000',
    paymentMethod: 'Credit Card (Visa)',
    trxId: 'VISA-44910238',
    plannerName: 'Aronno Travel Agency',
    plannerPhone: '+880 1812-998877',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    passenger: {
      fullName: 'Anika Tabassum',
      nid: '199526918239555',
      phone: '+880 1812-998877',
      emergencyPhone: '+880 1711-001122',
    },
  },
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.id || '8849201948102';

  const booking = SAMPLE_BOOKINGS[bookingId] || SAMPLE_BOOKINGS['8849201948102'];
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloadingPdf(true);
    await generateTicketPDF({
      title: booking.name,
      amount: booking.amount,
      date: booking.date,
      touristName: booking.passenger.fullName,
      refNo: booking.orderRef,
    });
    setDownloadingPdf(false);
  };

  const steps = [
    { title: '1. Order Placed', desc: 'Booking received' },
    { title: '2. Payment Verified', desc: 'Payment confirmed' },
    { title: '3. Operator Approved', desc: 'Planner accepted' },
    { title: '4. Tour Started', desc: 'Journey active' },
    { title: '5. Tour Ended', desc: 'Returned home' },
    { title: '6. Review & Complete', desc: 'Finished' },
  ];

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="account-layout-grid">
          {/* Left Sidebar */}
          <AccountSidebar />

          {/* Right Main Area */}
          <div className="account-main-area">
            <div className="account-section-card" style={{ padding: '24px' }}>
              {/* Back Button & Title Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link href="/account/bookings" style={{ background: '#F1F5F9', color: '#475569', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #CBD5E1' }}>
                    ← Back to Bookings
                  </Link>
                  <div>
                    <h3 className="card-title-lg" style={{ margin: 0, fontSize: '1.25rem' }}>
                      Booking Details ({booking.orderRef})
                    </h3>
                    <small style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 600 }}>Booked on {booking.bookingDate}</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloadingPdf}
                    style={{
                      background: '#2563EB',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
                    }}
                  >
                    📄 {downloadingPdf ? 'Generating...' : 'Download E-Ticket'}
                  </button>

                  {/* Prominent Report / Dispute Action Button */}
                  <Link
                    href={`/account/dispute?orderId=${booking.orderRef}`}
                    style={{
                      background: '#FEE2E2',
                      color: '#DC2626',
                      border: '1.5px solid #FCA5A5',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    🚨 Report / File Dispute Case
                  </Link>
                </div>
              </div>

              {/* Ultra-Premium Hero Banner (Royal Blue & Cyan Gradient) */}
              <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #0284C7 100%)', color: '#ffffff', padding: '24px 28px', borderRadius: '20px', marginBottom: '24px', display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: '20px', alignItems: 'center', boxShadow: '0 10px 30px rgba(37,99,235,0.2)' }}>
                <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>
                  <Image src={booking.image} alt={booking.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#93C5FD', fontWeight: 700, letterSpacing: '0.4px' }}>BOOKING #{booking.orderRef} • {booking.bookingDate}</div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 8px 0', color: '#ffffff' }}>{booking.name}</h2>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', color: '#FEF08A', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', padding: '3px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 800 }}>
                      🚍 Route: {booking.route}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#E0F2FE', fontWeight: 600 }}>📅 Date: {booking.date}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>{booking.amount}</div>
                  <span style={{ background: booking.status === 'Completed' ? '#10B981' : '#F59E0B', color: '#ffffff', padding: '4px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 800, display: 'inline-block', marginTop: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    ✓ {booking.status}
                  </span>
                </div>
              </div>

              {/* 6-Step Order Processing Timeline */}
              <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '18px', padding: '20px 24px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>
                  Order Processing Status Timeline
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', textAlign: 'center' }}>
                  {steps.map((step, idx) => {
                    const isPassed = idx + 1 <= booking.stepIndex;
                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: isPassed ? '#2563EB' : '#E2E8F0', color: isPassed ? '#ffffff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', boxShadow: isPassed ? '0 4px 10px rgba(37,99,235,0.3)' : 'none' }}>
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isPassed ? '#1E293B' : '#94A3B8' }}>{step.title}</div>
                        <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>{step.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Passenger & Payment Details 2-Column Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Passenger Info Card */}
                <div style={{ background: '#ffffff', border: '1.5px solid #E2E8F0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    👤 Verified Passenger Details
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>Full Name:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.passenger.fullName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>NID / Passport:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.passenger.nid}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>Primary Mobile:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.passenger.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Emergency Contact:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.passenger.emergencyPhone}</strong>
                    </div>
                  </div>
                </div>

                {/* Payment & Operator Card */}
                <div style={{ background: '#ffffff', border: '1.5px solid #E2E8F0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💳 Payment &amp; Operator Details
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>Tour Operator:</span>
                      <strong style={{ color: '#2563EB' }}>{booking.plannerName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>Operator Helpline:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.plannerPhone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B' }}>Payment Method:</span>
                      <strong style={{ color: '#0F172A' }}>{booking.paymentMethod}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Transaction Ref:</span>
                      <strong style={{ color: '#10B981' }}>{booking.trxId}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Support & File Dispute Banner */}
              <div style={{ background: '#FEF2F2', border: '1.5px solid #FCA5A5', borderRadius: '18px', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', color: '#991B1B', fontWeight: 800 }}>
                    Have issues or need refund assistance for this booking?
                  </h5>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#B91C1C' }}>
                    Our customer safety team is available 24/7. You can file an official dispute case to request a refund or operator review.
                  </p>
                </div>
                <Link
                  href={`/account/dispute?orderId=${booking.orderRef}`}
                  style={{ background: '#DC2626', color: '#ffffff', padding: '11px 22px', borderRadius: '10px', fontWeight: 800, fontSize: '0.86rem', textDecoration: 'none', boxShadow: '0 4px 12px rgba(220,38,38,0.25)' }}
                >
                  File Dispute Case
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

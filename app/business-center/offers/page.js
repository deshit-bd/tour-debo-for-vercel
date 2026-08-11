'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SpecialOffersPage() {
  const [activeTab, setActiveTab] = useState('voucher'); // 'voucher' or 'discount'
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalMode, setModalMode] = useState('edit'); // 'view', 'edit', 'create'

  // Vouchers List (Tour Dibo Theme + Core E-Commerce Logic)
  const [vouchersList, setVouchersList] = useState([
    {
      id: 101,
      promotionName: 'Eid Special Tour Package Voucher',
      code: 'EID2026',
      redeemStart: '2026-08-10',
      redeemEnd: '2026-08-31',
      applyTo: 'Entire Shop',
      discountSettingType: 'money', // 'money' or 'percentage'
      minSpend: 5000,
      discountValue: 500,
      totalIssued: 200,
      usedCount: 48,
      limitPerCustomer: 1,
      status: 'Active'
    },
    {
      id: 102,
      promotionName: 'Thailand Visa Flash Deal Voucher',
      code: 'FLASH2000',
      redeemStart: '2026-08-01',
      redeemEnd: '2026-09-15',
      applyTo: 'Specific Products',
      specificProduct: 'Thailand Tourist Sticker VISA Service',
      discountSettingType: 'percentage',
      minSpend: 10000,
      discountValue: 10,
      totalIssued: 100,
      usedCount: 32,
      limitPerCustomer: 2,
      status: 'Active'
    }
  ]);

  // Direct Discounts List
  const [discountsList, setDiscountsList] = useState([
    {
      id: 201,
      promotionName: 'Monsoon Tour Package Special Discount',
      discountSettingType: 'percentage',
      discountValue: 20,
      minSpend: 8000,
      applyTo: 'Specific Products',
      specificProduct: 'Sajek Valley Cloud 3-Day Resort Tour',
      redeemEnd: '2026-08-25',
      status: 'Active'
    }
  ]);

  // Modal Form State
  const [promotionName, setPromotionName] = useState('');
  const [code, setCode] = useState('');
  const [redeemStart, setRedeemStart] = useState('2026-08-15');
  const [redeemEnd, setRedeemEnd] = useState('2026-08-31');
  const [applyTo, setApplyTo] = useState('Entire Shop');
  const [specificProduct, setSpecificProduct] = useState("Cox's Bazar Deluxe Beach Resort Package");
  const [discountSettingType, setDiscountSettingType] = useState('money');
  const [minSpend, setMinSpend] = useState('2000');
  const [discountValue, setDiscountValue] = useState('200');
  const [totalIssued, setTotalIssued] = useState('100');
  const [limitPerCustomer, setLimitPerCustomer] = useState('1');
  const [status, setStatus] = useState('Active');

  const handleOpenModal = (item = null, mode = 'edit') => {
    setModalMode(mode);
    if (item) {
      setEditingItem(item);
      setPromotionName(item.promotionName);
      setCode(item.code || '');
      setRedeemStart(item.redeemStart || '2026-08-15');
      setRedeemEnd(item.redeemEnd || '2026-08-31');
      setApplyTo(item.applyTo || 'Entire Shop');
      setSpecificProduct(item.specificProduct || "Cox's Bazar Deluxe Beach Resort Package");
      setDiscountSettingType(item.discountSettingType || 'money');
      setMinSpend(item.minSpend ? item.minSpend.toString() : '2000');
      setDiscountValue(item.discountValue ? item.discountValue.toString() : '200');
      setTotalIssued(item.totalIssued ? item.totalIssued.toString() : '100');
      setLimitPerCustomer(item.limitPerCustomer ? item.limitPerCustomer.toString() : '1');
      setStatus(item.status || 'Active');
    } else {
      setEditingItem(null);
      setPromotionName(activeTab === 'voucher' ? 'Eid Promo Voucher Deal' : 'Monsoon Direct Package Discount');
      setCode(activeTab === 'voucher' ? 'PROMO' + Math.floor(1000 + Math.random() * 9000) : '');
      setRedeemStart('2026-08-15');
      setRedeemEnd('2026-08-31');
      setApplyTo('Entire Shop');
      setSpecificProduct("Cox's Bazar Deluxe Beach Resort Package");
      setDiscountSettingType('money');
      setMinSpend('2000');
      setDiscountValue('200');
      setTotalIssued('100');
      setLimitPerCustomer('1');
      setStatus('Active');
    }
    setShowModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!promotionName.trim() || !discountValue || !minSpend) return;

    if (activeTab === 'voucher') {
      if (editingItem) {
        setVouchersList(prev => prev.map(v => v.id === editingItem.id ? {
          ...v,
          promotionName,
          code: code.toUpperCase(),
          redeemStart,
          redeemEnd,
          applyTo,
          specificProduct: applyTo === 'Specific Products' ? specificProduct : '',
          discountSettingType,
          minSpend: parseFloat(minSpend) || 0,
          discountValue: parseFloat(discountValue) || 0,
          totalIssued: parseInt(totalIssued) || 100,
          limitPerCustomer: parseInt(limitPerCustomer) || 1,
          status
        } : v));
      } else {
        const newVoucher = {
          id: Date.now(),
          promotionName,
          code: code.toUpperCase() || ('PROMO' + Date.now().toString().slice(-4)),
          redeemStart,
          redeemEnd,
          applyTo,
          specificProduct: applyTo === 'Specific Products' ? specificProduct : '',
          discountSettingType,
          minSpend: parseFloat(minSpend) || 0,
          discountValue: parseFloat(discountValue) || 0,
          totalIssued: parseInt(totalIssued) || 100,
          usedCount: 0,
          limitPerCustomer: parseInt(limitPerCustomer) || 1,
          status
        };
        setVouchersList(prev => [newVoucher, ...prev]);
      }
    } else {
      // Direct Discount
      if (editingItem) {
        setDiscountsList(prev => prev.map(d => d.id === editingItem.id ? {
          ...d,
          promotionName,
          discountSettingType,
          discountValue: parseFloat(discountValue) || 0,
          minSpend: parseFloat(minSpend) || 0,
          applyTo,
          specificProduct: applyTo === 'Specific Products' ? specificProduct : '',
          redeemEnd,
          status
        } : d));
      } else {
        const newDiscount = {
          id: Date.now(),
          promotionName,
          discountSettingType,
          discountValue: parseFloat(discountValue) || 0,
          minSpend: parseFloat(minSpend) || 0,
          applyTo,
          specificProduct: applyTo === 'Specific Products' ? specificProduct : '',
          redeemEnd,
          status
        };
        setDiscountsList(prev => [newDiscount, ...prev]);
      }
    }

    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    if (activeTab === 'voucher') {
      setVouchersList(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Paused' : 'Active' } : v));
    } else {
      setDiscountsList(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Paused' : 'Active' } : d));
    }
  };

  const handleDeleteItem = (id) => {
    if (activeTab === 'voucher') {
      setVouchersList(prev => prev.filter(v => v.id !== id));
    } else {
      setDiscountsList(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">

            {/* Clean Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-tags" style={{ color: '#2563EB' }}></i>
                  <span>Special Offer</span>
                </h1>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Create and manage shop promotional vouchers and package discounts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                style={{
                  background: activeTab === 'voucher' ? '#2563EB' : '#166534',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'voucher' ? '0 4px 12px rgba(37,99,235,0.25)' : '0 4px 12px rgba(22,101,52,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <span>{activeTab === 'voucher' ? 'Create Voucher' : 'Create Discount'}</span>
              </button>
            </header>

            {/* ── 2 CLEAN OPTIONS / TABS BAR ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #E2E8F0', marginBottom: '24px', paddingBottom: '0' }}>
              <button
                type="button"
                onClick={() => setActiveTab('voucher')}
                style={{
                  padding: '12px 24px',
                  background: activeTab === 'voucher' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'voucher' ? '#2563EB' : '#64748B',
                  fontWeight: activeTab === 'voucher' ? 800 : 600,
                  fontSize: '0.96rem',
                  border: 'none',
                  borderBottom: activeTab === 'voucher' ? '3px solid #2563EB' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '-2px'
                }}
              >
                <i className="fa-solid fa-ticket" style={{ color: activeTab === 'voucher' ? '#2563EB' : '#94A3B8' }}></i>
                <span>Voucher</span>
                <span style={{ background: activeTab === 'voucher' ? '#DBEAFE' : '#F1F5F9', color: activeTab === 'voucher' ? '#1D4ED8' : '#64748B', fontSize: '0.74rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {vouchersList.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('discount')}
                style={{
                  padding: '12px 24px',
                  background: activeTab === 'discount' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'discount' ? '#166534' : '#64748B',
                  fontWeight: activeTab === 'discount' ? 800 : 600,
                  fontSize: '0.96rem',
                  border: 'none',
                  borderBottom: activeTab === 'discount' ? '3px solid #166534' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '-2px'
                }}
              >
                <i className="fa-solid fa-percent" style={{ color: activeTab === 'discount' ? '#166534' : '#94A3B8' }}></i>
                <span>Discount</span>
                <span style={{ background: activeTab === 'discount' ? '#DCFCE7' : '#F1F5F9', color: activeTab === 'discount' ? '#15803D' : '#64748B', fontSize: '0.74rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {discountsList.length}
                </span>
              </button>
            </div>

            {/* ── TAB 1 CONTENT: VOUCHERS LIST TABLE ── */}
            {activeTab === 'voucher' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {/* Filter & Search Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, marginRight: '10px' }}>Voucher List</h2>

                    {/* Status Dropdown */}
                    <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', color: '#334155', outline: 'none', background: '#FFFFFF', fontWeight: 600 }}>
                      <option>All Status</option>
                      <option>Ongoing</option>
                      <option>Expired</option>
                    </select>



                    {/* Search Field Group */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF' }}>
                      <select style={{ padding: '8px 10px', border: 'none', borderRight: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#475569', background: '#F8FAFC', outline: 'none', fontWeight: 600 }}>
                        <option>Voucher Name</option>
                        <option>Promotion ID</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Voucher Name / Promotion Id"
                        style={{ padding: '8px 12px', border: 'none', fontSize: '0.84rem', outline: 'none', width: '220px', color: '#0F172A' }}
                      />
                      <button type="button" style={{ background: '#F8FAFC', border: 'none', borderLeft: '1px solid #E2E8F0', padding: '8px 14px', cursor: 'pointer', color: '#64748B' }}>
                        🔍
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Container */}
                <div style={{ overflowX: 'auto', border: '1px solid #F1F5F9', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px', minWidth: '180px' }}>Voucher Name</th>
                        <th style={{ padding: '14px 16px', minWidth: '180px' }}>Collect Start Time ~ Redeem End Time</th>
                        <th style={{ padding: '14px 16px' }}>Discount Apply To</th>
                        <th style={{ padding: '14px 16px' }}>Vouchers Collected</th>
                        <th style={{ padding: '14px 16px', minWidth: '190px' }}>Discount Details</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchersList.map((item, idx) => {
                        const isActive = item.status === 'Active';
                        return (
                          <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}>
                            <td style={{ padding: '16px' }}>
                              <strong style={{ display: 'block', color: '#0F172A', fontSize: '0.88rem', fontWeight: 700 }}>{item.promotionName}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '2px', fontFamily: 'monospace' }}>ID: 50000{item.id}86693</span>
                              <span style={{ fontSize: '0.72rem', color: '#2563EB', background: '#EFF6FF', padding: '1px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', fontWeight: 700 }}>
                                Code: {item.code}
                              </span>
                            </td>
                            <td style={{ padding: '16px', color: '#475569', lineHeight: 1.4 }}>
                              <div>From <span style={{ fontWeight: 600, color: '#0F172A' }}>{item.redeemStart} 00:00:00</span></div>
                              <div>To <span style={{ fontWeight: 600, color: '#0F172A' }}>{item.redeemEnd} 23:59:59</span></div>
                            </td>
                            <td style={{ padding: '16px', color: '#334155', fontWeight: 600 }}>
                              {item.applyTo === 'Entire Shop' ? 'Entire Shop' : item.specificProduct}
                            </td>
                            <td style={{ padding: '16px', color: '#0F172A', fontWeight: 700 }}>
                              {item.usedCount}/{item.totalIssued}
                            </td>
                            <td style={{ padding: '16px', color: '#334155', lineHeight: 1.4 }}>
                              <div>Discount would be: <strong style={{ color: '#0F172A' }}>{item.discountSettingType === 'money' ? `৳ ${item.discountValue}` : `${item.discountValue}%`}</strong></div>
                              <div style={{ color: '#64748B', fontSize: '0.78rem' }}>If order value reaches: ৳ {item.minSpend.toLocaleString()}</div>
                            </td>
                            <td style={{ padding: '16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#D97706' : '#DC2626' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? '#F59E0B' : '#DC2626' }}></span>
                                {isActive ? 'Ongoing' : 'Not Started'}
                              </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                <button
                                  type="button"
                                  title="View Voucher Details"
                                  onClick={() => handleOpenModal(item, 'view')}
                                  style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button
                                  type="button"
                                  title="Edit Voucher"
                                  onClick={() => handleOpenModal(item, 'edit')}
                                  style={{ background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                                </button>
                                <button
                                  type="button"
                                  title="Delete Voucher"
                                  onClick={() => handleDeleteItem(item.id)}
                                  style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '0.82rem', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Total {vouchersList.length}</span>
                    <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', background: '#FFFFFF' }}>
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button type="button" disabled style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', color: '#94A3B8', cursor: 'not-allowed', fontWeight: 600 }}>
                      ‹ Previous
                    </button>
                    <button type="button" style={{ padding: '6px 12px', border: 'none', borderRadius: '8px', background: '#EA580C', color: '#FFFFFF', fontWeight: 800 }}>
                      1
                    </button>
                    <button type="button" disabled style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', color: '#94A3B8', cursor: 'not-allowed', fontWeight: 600 }}>
                      Next ›
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2 CONTENT: DISCOUNTS LIST TABLE ── */}
            {activeTab === 'discount' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {/* Filter & Search Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, marginRight: '10px' }}>Discount List</h2>

                    {/* Status Dropdown */}
                    <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', color: '#334155', outline: 'none', background: '#FFFFFF', fontWeight: 600 }}>
                      <option>All Status</option>
                      <option>Ongoing</option>
                      <option>Expired</option>
                    </select>

                    {/* Search Field Group */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF' }}>
                      <select style={{ padding: '8px 10px', border: 'none', borderRight: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#475569', background: '#F8FAFC', outline: 'none', fontWeight: 600 }}>
                        <option>Discount Title</option>
                        <option>Promotion ID</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Discount Title / Promotion Id"
                        style={{ padding: '8px 12px', border: 'none', fontSize: '0.84rem', outline: 'none', width: '220px', color: '#0F172A' }}
                      />
                      <button type="button" style={{ background: '#F8FAFC', border: 'none', borderLeft: '1px solid #E2E8F0', padding: '8px 14px', cursor: 'pointer', color: '#64748B' }}>
                        🔍
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Container */}
                <div style={{ overflowX: 'auto', border: '1px solid #F1F5F9', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px', minWidth: '180px' }}>Discount Title</th>
                        <th style={{ padding: '14px 16px', minWidth: '180px' }}>Start Time ~ Redeem End Time</th>
                        <th style={{ padding: '14px 16px' }}>Discount Apply To</th>
                        <th style={{ padding: '14px 16px', minWidth: '190px' }}>Discount Details</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discountsList.map((item) => {
                        const isActive = item.status === 'Active';
                        return (
                          <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}>
                            <td style={{ padding: '16px' }}>
                              <strong style={{ display: 'block', color: '#0F172A', fontSize: '0.88rem', fontWeight: 700 }}>{item.promotionName}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '2px', fontFamily: 'monospace' }}>ID: 60000{item.id}99201</span>
                            </td>
                            <td style={{ padding: '16px', color: '#475569', lineHeight: 1.4 }}>
                              <div>From <span style={{ fontWeight: 600, color: '#0F172A' }}>2026-08-10 00:00:00</span></div>
                              <div>To <span style={{ fontWeight: 600, color: '#0F172A' }}>{item.redeemEnd} 23:59:59</span></div>
                            </td>
                            <td style={{ padding: '16px', color: '#334155', fontWeight: 600 }}>
                              {item.applyTo === 'Entire Shop' ? 'Entire Shop' : item.specificProduct}
                            </td>
                            <td style={{ padding: '16px', color: '#334155', lineHeight: 1.4 }}>
                              <div>Discount would be: <strong style={{ color: '#166534' }}>{item.discountSettingType === 'percentage' ? `${item.discountValue}%` : `৳ ${item.discountValue}`}</strong></div>
                              <div style={{ color: '#64748B', fontSize: '0.78rem' }}>If order value reaches: ৳ {item.minSpend.toLocaleString()}</div>
                            </td>
                            <td style={{ padding: '16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#15803D' : '#DC2626' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? '#16A34A' : '#DC2626' }}></span>
                                {isActive ? 'Ongoing' : 'Deactivated'}
                              </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                <button
                                  type="button"
                                  title="View Discount Details"
                                  onClick={() => handleOpenModal(item, 'view')}
                                  style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #86EFAC', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button
                                  type="button"
                                  title="Edit Discount"
                                  onClick={() => handleOpenModal(item, 'edit')}
                                  style={{ background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                                </button>
                                <button
                                  type="button"
                                  title="Delete Discount"
                                  onClick={() => handleDeleteItem(item.id)}
                                  style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '0.82rem', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Total {discountsList.length}</span>
                    <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', background: '#FFFFFF' }}>
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button type="button" disabled style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', color: '#94A3B8', cursor: 'not-allowed', fontWeight: 600 }}>
                      ‹ Previous
                    </button>
                    <button type="button" style={{ padding: '6px 12px', border: 'none', borderRadius: '8px', background: '#EA580C', color: '#FFFFFF', fontWeight: 800 }}>
                      1
                    </button>
                    <button type="button" disabled style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', color: '#94A3B8', cursor: 'not-allowed', fontWeight: 600 }}>
                      Next ›
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ── MODERN TOUR DIBO CREATE/EDIT MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '580px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #CBD5E1', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className={activeTab === 'voucher' ? 'fa-solid fa-ticket' : 'fa-solid fa-percent'} style={{ color: activeTab === 'voucher' ? '#2563EB' : '#166534' }}></i>
                <span>
                  {modalMode === 'view'
                    ? `View ${activeTab === 'voucher' ? 'Voucher' : 'Discount'} Details`
                    : editingItem
                    ? `Edit ${activeTab === 'voucher' ? 'Voucher' : 'Discount'}`
                    : `Create New ${activeTab === 'voucher' ? 'Voucher' : 'Discount'}`}
                </span>
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            {modalMode === 'view' ? (
              /* READ-ONLY VIEW DETAILS MODAL */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Offer Name &amp; ID</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px 0' }}>{promotionName}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'monospace' }}>ID: 50000{editingItem?.id || 101}86693</span>
                </div>

                {activeTab === 'voucher' && (
                  <div style={{ background: '#EFF6FF', border: '1.5px dashed #3B82F6', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.74rem', color: '#1D4ED8', fontWeight: 700 }}>COUPON CODE</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E40AF', fontFamily: 'monospace', letterSpacing: '1px' }}>{code}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Copied code: ${code}`)}
                      style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Copy Code
                    </button>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>DISCOUNT AMOUNT</small>
                    <strong style={{ fontSize: '1.1rem', color: '#2563EB', fontWeight: 800 }}>
                      {discountSettingType === 'money' ? `৳ ${discountValue} OFF` : `${discountValue}% OFF`}
                    </strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>MIN ORDER SPEND</small>
                    <strong style={{ fontSize: '1.1rem', color: '#0F172A', fontWeight: 800 }}>৳ {Number(minSpend).toLocaleString()}</strong>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>APPLICABLE SCOPE</small>
                  <strong style={{ color: '#334155', fontSize: '0.88rem' }}>
                    {applyTo === 'Entire Shop' ? 'Entire Shop (All Packages & Visas)' : specificProduct}
                  </strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>START DATE</small>
                    <strong style={{ color: '#0F172A', fontSize: '0.86rem' }}>{redeemStart}</strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>EXPIRY DATE</small>
                    <strong style={{ color: '#0F172A', fontSize: '0.86rem' }}>{redeemEnd}</strong>
                  </div>
                </div>

                {activeTab === 'voucher' && (
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <small style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>ISSUED &amp; USED STATS</small>
                      <strong style={{ color: '#0F172A', fontSize: '0.88rem' }}>{editingItem?.usedCount || 48} Used / {totalIssued} Total Vouchers</strong>
                    </div>
                    <span style={{ fontSize: '0.76rem', background: '#DBEAFE', color: '#1D4ED8', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 }}>
                      Limit: {limitPerCustomer}/User
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setModalMode('edit')}
                    style={{ padding: '9px 18px', borderRadius: '10px', border: '1px solid #FDE68A', background: '#FEF3C7', color: '#D97706', cursor: 'pointer', fontWeight: 700, fontSize: '0.84rem' }}
                  >
                    ✏️ Switch to Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ padding: '9px 22px', borderRadius: '10px', border: 'none', background: '#0F172A', color: '#FFFFFF', cursor: 'pointer', fontWeight: 800, fontSize: '0.84rem' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* EDIT / CREATE FORM MODAL */
              <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  {activeTab === 'voucher' ? 'Voucher Name *' : 'Discount Offer Title *'}
                </label>
                <input
                  type="text"
                  placeholder={activeTab === 'voucher' ? 'e.g. Eid Tour Promo Voucher' : 'e.g. Monsoon Special Package Discount'}
                  value={promotionName}
                  onChange={(e) => setPromotionName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              {activeTab === 'voucher' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Coupon Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. EID2026"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 800, fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                </div>
              )}

              {/* Discount Setting Type & Values */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Discount Type *</label>
                  <select
                    value={discountSettingType}
                    onChange={(e) => setDiscountSettingType(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                  >
                    <option value="money">Fixed Amount (৳) OFF</option>
                    <option value="percentage">Percentage (%) OFF</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Discount Value ({discountSettingType === 'money' ? '৳' : '%'}) *
                  </label>
                  <input
                    type="number"
                    placeholder={discountSettingType === 'money' ? '500' : '15'}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* Min Spend Threshold */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Minimum Order Spend Required (৳) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 700 }}
                />
              </div>

              {/* Target Scope Selection */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Applicable Target *</label>
                <select
                  value={applyTo}
                  onChange={(e) => setApplyTo(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                >
                  <option value="Entire Shop">Entire Shop (All Packages &amp; Visas)</option>
                  <option value="Specific Products">Specific Package / Visa Only</option>
                </select>
              </div>

              {applyTo === 'Specific Products' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Select Package/Visa Service *</label>
                  <select
                    value={specificProduct}
                    onChange={(e) => setSpecificProduct(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                  >
                    <option value="Cox's Bazar Deluxe Beach Resort Package">Cox's Bazar Deluxe Package</option>
                    <option value="Sajek Valley Cloud 3-Day Resort Tour">Sajek Valley 3-Day Resort Tour</option>
                    <option value="Thailand Tourist Sticker VISA Service">Thailand Tourist Visa</option>
                  </select>
                </div>
              )}

              {/* Validity Date Pickers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Start Date *</label>
                  <input
                    type="date"
                    value={redeemStart}
                    onChange={(e) => setRedeemStart(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>End / Expiry Date *</label>
                  <input
                    type="date"
                    value={redeemEnd}
                    onChange={(e) => setRedeemEnd(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Quantities for Vouchers */}
              {activeTab === 'voucher' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Total Vouchers Issued *</label>
                    <input
                      type="number"
                      placeholder="100"
                      value={totalIssued}
                      onChange={(e) => setTotalIssued(e.target.value)}
                      required
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Usage Limit per User *</label>
                    <input
                      type="number"
                      placeholder="1"
                      value={limitPerCustomer}
                      onChange={(e) => setLimitPerCustomer(e.target.value)}
                      required
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: activeTab === 'voucher' ? '#2563EB' : '#166534', color: '#FFFFFF', cursor: 'pointer', fontWeight: 800 }}>Save {activeTab === 'voucher' ? 'Voucher' : 'Discount'} ✓</button>
              </div>

            </form>
          )}

        </div>
      </div>
    )}

      <Footer />
    </div>
  );
}

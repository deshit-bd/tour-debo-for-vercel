'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';
import { useCurrency } from '../../context/CurrencyContext';

function formatVoucherDateRange(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 'Aug 9th 26 - Sep 23rd 26';

  const formatSingle = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    const yr = d.getFullYear().toString().slice(-2);
    return `${month} ${day}${suffix} ${yr}`;
  };

  return `${formatSingle(startDateStr)} - ${formatSingle(endDateStr)}`;
}

const renderTargetScope = (item) => {
  const isEntire = item.applyTo === 'Entire Shop' || item.specificProduct === 'Entire Shop';
  if (isEntire) {
    return (
      <span style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '4px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, display: 'inline-block' }}>
        🛍️ Entire Shop
      </span>
    );
  }

  const prodStr = item.specificProduct || '';
  const isMultiple = prodStr.includes(',') || prodStr.toLowerCase().includes('multiple');

  if (isMultiple) {
    return (
      <div>
        <span style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, display: 'inline-block' }}>
          📦 Multiple Selected
        </span>
        <div style={{ fontSize: '0.74rem', color: '#475569', fontWeight: 600, marginTop: '3px' }}>
          {prodStr.length > 25 ? `${prodStr.substring(0, 23)}...` : prodStr}
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.84rem' }}>
      {prodStr || 'Specific Product'}
    </div>
  );
};

export default function SpecialOffersPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('voucher'); // 'voucher', 'discount', or 'gift_voucher'
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalMode, setModalMode] = useState('edit'); // 'view', 'edit', 'create'
  const [dispatchAlert, setDispatchAlert] = useState('');

  // 🔍 Filter & Search Bar States (Matching Screenshot)
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('Collectible');
  const [searchByField, setSearchByField] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const pkgDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pkgDropdownRef.current && !pkgDropdownRef.current.contains(event.target)) {
        setPkgDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ALL_SHOP_SERVICES = [
    "Cox's Bazar Deluxe Package",
    "Sajek Valley 3-Day Resort Tour",
    "Thailand Tourist Visa",
    "Dubai Express E-Visa Service",
    "Cox's Bazar Local Expert Tour Guide",
    "Sylhet Rainforest & Swamp Guide Service",
    "Sylhet Ratargul & Jaflong Tour",
    "Sundarbans Mangrove Wilderness Cruise",
    "Sundarbans Wildlife Explorer Guide",
    "Singapore & Malaysia Combo Tour Package",
    "Maldives Luxury Water Villa Honeymoon Package"
  ];

  // Vouchers List
  const [vouchersList, setVouchersList] = useState([
    {
      id: 101,
      promotionName: 'Eid Special Tour Package Voucher',
      code: 'PROMO7447',
      redeemStart: '2026-08-10',
      redeemEnd: '2026-08-31',
      applyTo: 'Specific Package / Visa Only',
      specificProduct: "Cox's Bazar Deluxe Package",
      discountSettingType: 'money',
      minSpend: 2000,
      discountValue: 200,
      totalIssued: 100,
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
      applyTo: 'Specific Package / Visa Only',
      specificProduct: 'Thailand Tourist Visa',
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
      applyTo: 'Specific Package / Visa Only',
      specificProduct: 'Sajek Valley 3-Day Resort Tour',
      redeemEnd: '2026-08-25',
      status: 'Active'
    }
  ]);

  // Gift Vouchers List (Targeting: All Customers vs Email OR Phone)
  const [giftVouchersList, setGiftVouchersList] = useState([
    {
      id: 301,
      promotionName: 'Eid Special Travel Gift Card ৳1,000',
      code: 'GIFT-EID1000',
      discountSettingType: 'money',
      discountValue: 1000,
      minSpend: 2000,
      totalIssued: 50,
      usedCount: 18,
      redeemStart: '2026-08-10',
      redeemEnd: '2026-12-31',
      applyTo: 'Entire Shop',
      targetAudience: 'all',
      targetDelivery: 'email',
      targetEmail: '',
      targetPhone: '',
      status: 'Active'
    },
    {
      id: 302,
      promotionName: 'VIP Customer Loyalty Gift Card ৳2,500',
      code: 'VIP-TANVIR-2500',
      discountSettingType: 'money',
      discountValue: 2500,
      minSpend: 5000,
      totalIssued: 1,
      usedCount: 0,
      redeemStart: '2026-08-01',
      redeemEnd: '2026-11-30',
      applyTo: 'Entire Shop',
      targetAudience: 'specific',
      targetDelivery: 'email',
      targetEmail: 'tanvir.h@gmail.com',
      targetPhone: '',
      giftNote: 'Thank you for being a loyal customer!',
      status: 'Active'
    },
    {
      id: 303,
      promotionName: 'Mobile SMS Promo Gift Card ৳1,500',
      code: 'SMS-GIFT-1500',
      discountSettingType: 'money',
      discountValue: 1500,
      minSpend: 3000,
      totalIssued: 1,
      usedCount: 0,
      redeemStart: '2026-08-05',
      redeemEnd: '2026-10-31',
      applyTo: 'Entire Shop',
      targetAudience: 'specific',
      targetDelivery: 'phone',
      targetEmail: '',
      targetPhone: '+880 1712-345678',
      giftNote: 'SMS Gift Card Offer',
      status: 'Active'
    }
  ]);

  // Modal Form State
  const [promotionName, setPromotionName] = useState('');
  const [code, setCode] = useState('');
  const [redeemStart, setRedeemStart] = useState('2026-08-15');
  const [redeemEnd, setRedeemEnd] = useState('2026-08-31');
  const [applyTo, setApplyTo] = useState('Entire Shop');
  const [specificProduct, setSpecificProduct] = useState("Cox's Bazar Deluxe Package");
  const [selectedProducts, setSelectedProducts] = useState(["Cox's Bazar Deluxe Package"]);
  const [pkgSearchQuery, setPkgSearchQuery] = useState('');
  const [pkgDropdownOpen, setPkgDropdownOpen] = useState(false);

  const [discountSettingType, setDiscountSettingType] = useState('money'); // 'money' or 'percentage'
  const [minSpend, setMinSpend] = useState('2000');
  const [maxDiscount, setMaxDiscount] = useState('1000');
  const [discountValue, setDiscountValue] = useState('200');
  const [totalIssued, setTotalIssued] = useState('100');
  const [limitPerCustomer, setLimitPerCustomer] = useState('1');
  const [status, setStatus] = useState('Active');

  // Specific Customer Target & Delivery Method State
  const [targetAudience, setTargetAudience] = useState('all'); // 'all' or 'specific'
  const [targetDelivery, setTargetDelivery] = useState('email'); // 'email' or 'phone'
  const [targetEmail, setTargetEmail] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const handleOpenModal = (item = null, mode = 'edit') => {
    setModalMode(mode);
    setPkgSearchQuery('');
    setPkgDropdownOpen(false);

    if (item) {
      setEditingItem(item);
      setPromotionName(item.promotionName || '');
      setCode(item.code || '');
      setRedeemStart(item.redeemStart || '2026-08-15');
      setRedeemEnd(item.redeemEnd || '2026-08-31');
      setApplyTo(item.applyTo || 'Entire Shop');
      setSpecificProduct(item.specificProduct || "Cox's Bazar Deluxe Package");
      const itemProds = item.selectedProducts && Array.isArray(item.selectedProducts)
        ? item.selectedProducts
        : (item.specificProduct ? item.specificProduct.split(', ') : ["Cox's Bazar Deluxe Package"]);
      setSelectedProducts(itemProds);
      setDiscountSettingType(item.discountSettingType || 'money');
      setMinSpend(item.minSpend ? item.minSpend.toString() : '2000');
      setMaxDiscount(item.maxDiscount ? item.maxDiscount.toString() : '1000');
      setDiscountValue(item.discountValue ? item.discountValue.toString() : '200');
      setTotalIssued(item.totalIssued ? item.totalIssued.toString() : '100');
      setLimitPerCustomer(item.limitPerCustomer ? item.limitPerCustomer.toString() : '1');
      setStatus(item.status || 'Active');

      setTargetAudience(item.targetAudience || 'all');
      setTargetDelivery(item.targetDelivery || (item.targetPhone ? 'phone' : 'email'));
      setTargetEmail(item.targetEmail || '');
      setTargetPhone(item.targetPhone || '');
      setGiftNote(item.giftNote || '');
    } else {
      setEditingItem(null);
      setPromotionName(activeTab === 'gift_voucher' ? 'Special Travel Gift Voucher' : (activeTab === 'voucher' ? 'Shop Promotion Voucher' : 'Package Special Discount'));
      setCode(activeTab === 'gift_voucher' ? ('GIFT-' + Date.now().toString().slice(-4)) : ('PROMO' + Date.now().toString().slice(-4)));
      setRedeemStart('2026-08-15');
      setRedeemEnd('2026-09-30');
      setApplyTo('Entire Shop');
      setSpecificProduct("Cox's Bazar Deluxe Package");
      setSelectedProducts(["Cox's Bazar Deluxe Package"]);
      setDiscountSettingType('money');
      setMinSpend(activeTab === 'gift_voucher' ? '2000' : '2000');
      setDiscountValue(activeTab === 'gift_voucher' ? '1000' : '200');
      setTotalIssued('100');
      setLimitPerCustomer('1');
      setStatus('Active');

      setTargetAudience('all');
      setTargetDelivery('email');
      setTargetEmail('');
      setTargetPhone('');
      setGiftNote('');
    }
    setShowModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!discountValue || !minSpend) return;

    const formattedProductString = selectedProducts.length > 0
      ? selectedProducts.join(', ')
      : "Cox's Bazar Deluxe Package";

    if (activeTab === 'voucher') {
      if (editingItem) {
        setVouchersList(prev => prev.map(v => v.id === editingItem.id ? {
          ...v,
          promotionName: promotionName || 'Shop Voucher',
          code: code.toUpperCase(),
          redeemStart,
          redeemEnd,
          applyTo,
          selectedProducts: applyTo === 'Specific Package / Visa Only' ? selectedProducts : [],
          specificProduct: applyTo === 'Specific Package / Visa Only' ? formattedProductString : 'Entire Shop',
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
          promotionName: promotionName || 'Shop Voucher',
          code: code.toUpperCase() || ('PROMO' + Date.now().toString().slice(-4)),
          redeemStart,
          redeemEnd,
          applyTo,
          selectedProducts: applyTo === 'Specific Package / Visa Only' ? selectedProducts : [],
          specificProduct: applyTo === 'Specific Package / Visa Only' ? formattedProductString : 'Entire Shop',
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
    } else if (activeTab === 'gift_voucher') {
      const finalEmail = targetAudience === 'specific' && targetDelivery === 'email' ? targetEmail.trim() : '';
      const finalPhone = targetAudience === 'specific' && targetDelivery === 'phone' ? targetPhone.trim() : '';

      if (editingItem) {
        setGiftVouchersList(prev => prev.map(g => g.id === editingItem.id ? {
          ...g,
          promotionName: promotionName || 'Gift Voucher',
          code: code.toUpperCase(),
          discountValue: parseFloat(discountValue) || 0,
          minSpend: parseFloat(minSpend) || 0,
          totalIssued: targetAudience === 'specific' ? 1 : (parseInt(totalIssued) || 50),
          redeemStart,
          redeemEnd,
          targetAudience,
          targetDelivery,
          targetEmail: finalEmail,
          targetPhone: finalPhone,
          giftNote: targetAudience === 'specific' ? giftNote.trim() : '',
          status
        } : g));
      } else {
        const newGift = {
          id: Date.now(),
          promotionName: promotionName || 'Gift Voucher',
          code: code.toUpperCase() || ('GIFT' + Date.now().toString().slice(-4)),
          discountSettingType: 'money',
          discountValue: parseFloat(discountValue) || 1000,
          minSpend: parseFloat(minSpend) || 2000,
          totalIssued: targetAudience === 'specific' ? 1 : (parseInt(totalIssued) || 50),
          usedCount: 0,
          redeemStart,
          redeemEnd,
          applyTo: 'Entire Shop',
          targetAudience,
          targetDelivery,
          targetEmail: finalEmail,
          targetPhone: finalPhone,
          giftNote: targetAudience === 'specific' ? giftNote.trim() : '',
          status
        };
        setGiftVouchersList(prev => [newGift, ...prev]);

        if (targetAudience === 'specific') {
          if (targetDelivery === 'email' && finalEmail) {
            setDispatchAlert(`🎉 Gift Voucher (${code.toUpperCase()}) successfully sent to Email: ${finalEmail}`);
          } else if (targetDelivery === 'phone' && finalPhone) {
            setDispatchAlert(`🎉 Gift Voucher (${code.toUpperCase()}) successfully sent to Phone SMS: ${finalPhone}`);
          }
          setTimeout(() => setDispatchAlert(''), 5000);
        }
      }
    } else {
      // Direct Discount
      if (editingItem) {
        setDiscountsList(prev => prev.map(d => d.id === editingItem.id ? {
          ...d,
          promotionName: promotionName || 'Special Discount',
          discountSettingType,
          discountValue: parseFloat(discountValue) || 0,
          minSpend: parseFloat(minSpend) || 0,
          applyTo,
          specificProduct: applyTo === 'Specific Package / Visa Only' ? specificProduct : 'Entire Shop',
          redeemEnd,
          status
        } : d));
      } else {
        const newDiscount = {
          id: Date.now(),
          promotionName: promotionName || 'Special Discount',
          discountSettingType,
          discountValue: parseFloat(discountValue) || 0,
          minSpend: parseFloat(minSpend) || 0,
          applyTo,
          specificProduct: applyTo === 'Specific Package / Visa Only' ? specificProduct : 'Entire Shop',
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
    } else if (activeTab === 'gift_voucher') {
      setGiftVouchersList(prev => prev.map(g => g.id === id ? { ...g, status: g.status === 'Active' ? 'Paused' : 'Active' } : g));
    } else {
      setDiscountsList(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Paused' : 'Active' } : d));
    }
  };

  const handleDeleteItem = (id) => {
    if (activeTab === 'voucher') {
      setVouchersList(prev => prev.filter(v => v.id !== id));
    } else if (activeTab === 'gift_voucher') {
      setGiftVouchersList(prev => prev.filter(g => g.id !== id));
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
                  <span>Marketing & Discount</span>
                </h1>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0 0' }}>
                  Create and manage shop promotional vouchers, gift vouchers, and package discounts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                style={{
                  background: activeTab === 'gift_voucher' ? '#7C3AED' : (activeTab === 'voucher' ? '#2563EB' : '#166534'),
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'gift_voucher' ? '0 4px 12px rgba(124,58,237,0.25)' : (activeTab === 'voucher' ? '0 4px 12px rgba(37,99,235,0.25)' : '0 4px 12px rgba(22,101,52,0.25)'),
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <span>{activeTab === 'gift_voucher' ? 'Create Gift Voucher' : (activeTab === 'voucher' ? 'Create Voucher' : 'Create Discount')}</span>
              </button>
            </header>

            {/* Dispatch Notification Alert */}
            {dispatchAlert && (
              <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', padding: '12px 18px', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '20px', boxShadow: '0 4px 12px rgba(16,185,129,0.1)' }}>
                {dispatchAlert}
              </div>
            )}

            {/* ── 3 CLEAN OPTIONS / TABS BAR ── */}
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

              <button
                type="button"
                onClick={() => setActiveTab('gift_voucher')}
                style={{
                  padding: '12px 24px',
                  background: activeTab === 'gift_voucher' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'gift_voucher' ? '#7C3AED' : '#64748B',
                  fontWeight: activeTab === 'gift_voucher' ? 800 : 600,
                  fontSize: '0.96rem',
                  border: 'none',
                  borderBottom: activeTab === 'gift_voucher' ? '3px solid #7C3AED' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '-2px'
                }}
              >
                <i className="fa-solid fa-gift" style={{ color: activeTab === 'gift_voucher' ? '#7C3AED' : '#94A3B8' }}></i>
                <span>Gift Voucher</span>
                <span style={{ background: activeTab === 'gift_voucher' ? '#F3E8FF' : '#F1F5F9', color: activeTab === 'gift_voucher' ? '#6D28D9' : '#64748B', fontSize: '0.74rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                  {giftVouchersList.length}
                </span>
              </button>
            </div>

            {/* ── TAB 1 CONTENT: VOUCHERS LIST TABLE ── */}
            {activeTab === 'voucher' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                
                {/* 🔍 VOUCHER LIST FILTER & SEARCH BAR (0 GAP INSIDE SAME CARD) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Voucher List
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* 1. All Status Dropdown */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer',
                        outline: 'none',
                        minWidth: '130px'
                      }}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Not Started">Not Started</option>
                    </select>

                    {/* 3. Joined Input Group: Voucher Name dropdown + Text input + Search Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF' }}>
                      <select
                        value={searchByField}
                        onChange={(e) => setSearchByField(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: 'none',
                          borderRight: '1px solid #CBD5E1',
                          background: '#F8FAFC',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: '#475569',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="name">Voucher Name</option>
                        <option value="id">Promotion ID</option>
                        <option value="code">Voucher Code</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Voucher Name / Promotion Id"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          padding: '8px 14px',
                          border: 'none',
                          outline: 'none',
                          fontSize: '0.86rem',
                          color: '#0F172A',
                          width: '210px'
                        }}
                      />

                      <button
                        type="button"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          color: '#64748B',
                          fontSize: '0.95rem'
                        }}
                      >
                        🔍
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', border: '1px solid #F1F5F9', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px', minWidth: '220px' }}>Voucher Name</th>
                        <th style={{ padding: '14px 16px', minWidth: '200px' }}>Start and End Time</th>
                        <th style={{ padding: '14px 16px' }}>Target Scope</th>
                        <th style={{ padding: '14px 16px' }}>Discount Details</th>
                        <th style={{ padding: '14px 16px' }}>Issued / Used</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchersList.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem', marginBottom: '4px' }}>
                              {item.promotionName || 'Regular Voucher'}
                            </div>
                            <div style={{ marginBottom: '4px' }}>
                              <code style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.82rem', display: 'inline-block' }}>
                                {item.code}
                              </code>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                              2026-08-09 13:21:31
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                              ID: 500000{item.id}86693
                            </div>
                          </td>
                          <td style={{ padding: '16px', color: '#334155', fontWeight: 700 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1E40AF', fontSize: '0.84rem' }}>
                              <span>📅</span>
                              <span>{formatVoucherDateRange(item.redeemStart || '2026-08-09', item.redeemEnd)}</span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
                              2026-08-09 13:21 to {item.redeemEnd || '2026-09-23'} 23:59
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            {renderTargetScope(item)}
                          </td>
                          <td style={{ padding: '16px', color: '#334155' }}>
                            <strong style={{ color: '#2563EB' }}>
                              {item.discountSettingType === 'money' ? `${formatPrice(item.discountValue)} OFF` : `${item.discountValue}% OFF`}
                            </strong>
                            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Min Spend: {formatPrice(item.minSpend)}</div>
                          </td>
                          <td style={{ padding: '16px', color: '#0F172A', fontWeight: 700 }}>
                            {item.usedCount}/{item.totalIssued} (Limit: {item.limitPerCustomer}/user)
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.status === 'Active' ? '#D97706' : '#DC2626' }}>{item.status}</span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button type="button" onClick={() => handleOpenModal(item, 'view')} title="View" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-eye" style={{ fontSize: '0.85rem' }}></i></button>
                              <button type="button" onClick={() => handleOpenModal(item, 'edit')} title="Edit" style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.85rem' }}></i></button>
                              <button type="button" onClick={() => handleDeleteItem(item.id)} title="Delete" style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-trash-can" style={{ fontSize: '0.85rem' }}></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── TAB 2 CONTENT: DISCOUNTS LIST TABLE ── */}
            {activeTab === 'discount' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                
                {/* 🔍 DISCOUNT LIST FILTER & SEARCH BAR (0 GAP INSIDE SAME CARD) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Discount List
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.86rem', fontWeight: 600, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: '130px' }}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Not Started">Not Started</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF' }}>
                      <select
                        value={searchByField}
                        onChange={(e) => setSearchByField(e.target.value)}
                        style={{ padding: '8px 12px', border: 'none', borderRight: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.84rem', fontWeight: 700, color: '#475569', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="name">Discount Name</option>
                        <option value="id">Promotion ID</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Discount Name / Id"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '8px 14px', border: 'none', outline: 'none', fontSize: '0.86rem', color: '#0F172A', width: '210px' }}
                      />
                      <button type="button" style={{ background: 'transparent', border: 'none', padding: '8px 12px', cursor: 'pointer', color: '#64748B', fontSize: '0.95rem' }}>🔍</button>
                    </div>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #F1F5F9', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px' }}>Discount Title</th>
                        <th style={{ padding: '14px 16px' }}>Start and End Time</th>
                        <th style={{ padding: '14px 16px' }}>Apply To</th>
                        <th style={{ padding: '14px 16px' }}>Discount Value</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discountsList.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem', marginBottom: '2px' }}>
                              {item.promotionName || 'Monsoon Tour Package Special Discount'}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                              2026-08-09 13:21:31
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                              ID: 500000{item.id}86693
                            </div>
                          </td>
                          <td style={{ padding: '16px', color: '#166534', fontWeight: 700 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
                              <span>📅</span>
                              <span>{formatVoucherDateRange(item.redeemStart || '2026-08-09', item.redeemEnd)}</span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
                              2026-08-09 13:21 to {item.redeemEnd || '2026-09-23'} 23:59
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>{renderTargetScope(item)}</td>
                          <td style={{ padding: '16px', fontWeight: 700, color: '#166534' }}>{item.discountValue}% OFF</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.status === 'Active' ? '#D97706' : '#DC2626' }}>{item.status}</span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button type="button" onClick={() => handleOpenModal(item, 'view')} title="View" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-eye" style={{ fontSize: '0.85rem' }}></i></button>
                              <button type="button" onClick={() => handleOpenModal(item, 'edit')} title="Edit" style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.85rem' }}></i></button>
                              <button type="button" onClick={() => handleDeleteItem(item.id)} title="Delete" style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-trash-can" style={{ fontSize: '0.85rem' }}></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── TAB 3 CONTENT: GIFT VOUCHERS LIST TABLE ── */}
            {activeTab === 'gift_voucher' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                
                {/* 🔍 GIFT VOUCHER LIST FILTER & SEARCH BAR (0 GAP INSIDE SAME CARD) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Gift Voucher List
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.86rem', fontWeight: 600, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: '130px' }}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Not Started">Not Started</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF' }}>
                      <select
                        value={searchByField}
                        onChange={(e) => setSearchByField(e.target.value)}
                        style={{ padding: '8px 12px', border: 'none', borderRight: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.84rem', fontWeight: 700, color: '#475569', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="name">Gift Voucher Name</option>
                        <option value="code">Gift Code</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Gift Voucher Name / Code"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '8px 14px', border: 'none', outline: 'none', fontSize: '0.86rem', color: '#0F172A', width: '210px' }}
                      />
                      <button type="button" style={{ background: 'transparent', border: 'none', padding: '8px 12px', cursor: 'pointer', color: '#64748B', fontSize: '0.95rem' }}>🔍</button>
                    </div>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #F3E8FF', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#F5F3FF', borderBottom: '1px solid #DDD6FE', color: '#6D28D9', fontWeight: 700 }}>
                        <th style={{ padding: '14px 16px', minWidth: '220px' }}>Gift Voucher Name</th>
                        <th style={{ padding: '14px 16px', minWidth: '200px' }}>Start and End Time</th>
                        <th style={{ padding: '14px 16px' }}>Gift Card Value</th>
                        <th style={{ padding: '14px 16px' }}>Recipient Audience</th>
                        <th style={{ padding: '14px 16px' }}>Claimed / Total</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {giftVouchersList.map((item) => {
                        const isActive = item.status === 'Active';
                        const isPhoneTarget = item.targetDelivery === 'phone' || (item.targetPhone && !item.targetEmail);

                        return (
                          <tr key={item.id} style={{ borderBottom: '1px solid #F5F3FF' }}>
                            <td style={{ padding: '16px' }}>
                              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem', marginBottom: '4px' }}>{item.promotionName}</div>
                              <div style={{ marginBottom: '4px' }}>
                                <code style={{ background: '#F3E8FF', color: '#6D28D9', border: '1px solid #DDD6FE', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.82rem', display: 'inline-block' }}>
                                  {item.code}
                                </code>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 700 }}>Prepaid Gift Voucher</div>
                            </td>
                            <td style={{ padding: '16px', color: '#475569', fontWeight: 700 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6D28D9', fontSize: '0.84rem' }}>
                                <span>📅</span>
                                <span>{formatVoucherDateRange(item.redeemStart || '2026-08-09', item.redeemEnd)}</span>
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
                                2026-08-09 13:21 to {item.redeemEnd || '2026-09-23'} 23:59
                              </div>
                            </td>
                            <td style={{ padding: '16px', fontWeight: 900, color: '#7C3AED', fontSize: '0.95rem' }}>
                              {formatPrice(item.discountValue)}
                            </td>

                            {/* Recipient Audience Target Column */}
                            <td style={{ padding: '16px' }}>
                              {item.targetAudience === 'specific' ? (
                                <div style={{ background: isPhoneTarget ? '#FEF3C7' : '#DEF7EC', border: `1px solid ${isPhoneTarget ? '#FDE68A' : '#86EFAC'}`, padding: '6px 10px', borderRadius: '8px' }}>
                                  <span style={{ fontSize: '0.74rem', color: isPhoneTarget ? '#B45309' : '#15803D', fontWeight: 800, display: 'block' }}>
                                    {isPhoneTarget ? '📱 Mobile Phone SMS' : '✉️ Email Target'}
                                  </span>
                                  <div style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 800, marginTop: '2px' }}>
                                    {isPhoneTarget ? item.targetPhone : item.targetEmail}
                                  </div>
                                </div>
                              ) : (
                                <span style={{ background: '#F3E8FF', color: '#7C3AED', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 800, display: 'inline-block' }}>
                                  🌐 All Customers (Public)
                                </span>
                              )}
                            </td>

                            <td style={{ padding: '16px', color: '#0F172A', fontWeight: 700 }}>
                              {item.usedCount}/{item.totalIssued}
                            </td>
                            <td style={{ padding: '16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#D97706' : '#DC2626' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? '#F59E0B' : '#DC2626' }}></span>
                                {isActive ? 'Ongoing' : 'Paused'}
                              </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                <button
                                  type="button"
                                  title="View Gift Voucher"
                                  onClick={() => handleOpenModal(item, 'view')}
                                  style={{ background: '#F3E8FF', color: '#7C3AED', border: '1px solid #DDD6FE', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <i className="fa-solid fa-eye" style={{ fontSize: '0.85rem' }}></i>
                                </button>
                                <button
                                  type="button"
                                  title="Edit Gift Voucher"
                                  onClick={() => handleOpenModal(item, 'edit')}
                                  style={{ background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.85rem' }}></i>
                                </button>
                                <button
                                  type="button"
                                  title="Delete Gift Voucher"
                                  onClick={() => handleDeleteItem(item.id)}
                                  style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <i className="fa-solid fa-trash-can" style={{ fontSize: '0.85rem' }}></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ── EXACT SCREENSHOT-MATCHING CREATE / EDIT MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '560px', padding: '26px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #CBD5E1', maxHeight: '92vh', overflowY: 'auto' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {modalMode === 'view'
                  ? `View Offer Details`
                  : editingItem
                  ? `Edit ${activeTab === 'gift_voucher' ? 'Gift Voucher' : (activeTab === 'voucher' ? 'Voucher' : 'Discount')}`
                  : `Create New ${activeTab === 'gift_voucher' ? 'Gift Voucher' : (activeTab === 'voucher' ? 'Voucher' : 'Discount')}`}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: '#F1F5F9', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            {modalMode === 'view' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 🎟️ TICKET STUB CARD MATCHING 2ND IMAGE */}
                <div style={{
                  background: '#FFFFFF',
                  border: '2px solid #F97316',
                  borderRadius: '14px',
                  padding: '16px',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.1)',
                  overflow: 'hidden'
                }}>
                  {/* Top Right Orange Ribbon Badge with Checkmark */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '28px',
                    height: '28px',
                    background: '#F97316',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                    display: 'flex',
                    alignItems: 'top',
                    justifyContent: 'right'
                  }}>
                    <span style={{ color: '#FFF', fontSize: '0.65rem', fontWeight: 900, marginRight: '4px', marginTop: '2px' }}>✓</span>
                  </div>

                  {/* Top Title */}
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>
                    {promotionName || (activeTab === 'voucher' ? 'Regular Voucher' : (activeTab === 'gift_voucher' ? 'Prepaid Gift Voucher' : 'Percentage Discount Off'))}
                  </div>

                  {/* Ticket Stub Graphic Container */}
                  <div style={{
                    background: '#FFF1F2',
                    borderRadius: '12px',
                    padding: '16px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: '1px solid #FFE4E6',
                    overflow: 'hidden'
                  }}>
                    {/* Top & Bottom Semi-Circle Notches */}
                    <div style={{ position: 'absolute', top: '-8px', left: '88px', width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF', borderBottom: '1px solid #FFE4E6' }}></div>
                    <div style={{ position: 'absolute', bottom: '-8px', left: '88px', width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF', borderTop: '1px solid #FFE4E6' }}></div>

                    {/* Left Side: Shop Logo & Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px', flexShrink: 0, borderRight: '1.5px dashed #FDA4AF', paddingRight: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                        🛍️
                      </div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#F43F5E', textAlign: 'center', lineHeight: '1.1' }}>
                        Tour Dibo
                      </span>
                    </div>

                    {/* Right Side: Discount % / Value, Min Spend & Start-End Date Range */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F43F5E', lineHeight: '1' }}>
                          {discountSettingType === 'money' ? discountValue : discountValue}
                        </span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#F43F5E' }}>
                          {discountSettingType === 'money' ? '৳ off' : '% off'}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F43F5E' }}>
                        Min. Spend {Number(minSpend || 0).toLocaleString()} ৳
                      </div>

                      {/* Start Date to End Date Range (kobe theke kobe) */}
                      <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F43F5E', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <span>📅</span>
                        <span>{formatVoucherDateRange(redeemStart, redeemEnd)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details Table */}
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Coupon Code:</span>
                    <code style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>{code}</code>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Applicable Scope:</span>
                    <strong style={{ color: '#0F172A', fontWeight: 700 }}>{applyTo === 'Entire Shop' ? 'Entire Shop (All Packages, Visas & Guides)' : specificProduct}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Max Discount Cap:</span>
                    <strong style={{ color: '#0F172A', fontWeight: 700 }}>৳ {Number(maxDiscount || 1000).toLocaleString()}</strong>
                  </div>
                </div>

                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* 🎁 RECIPIENT AUDIENCE & DELIVERY METHOD SELECTOR (GIFT VOUCHER ONLY) */}
                {activeTab === 'gift_voucher' && (
                  <div style={{ background: '#F5F3FF', border: '1.5px solid #DDD6FE', padding: '16px', borderRadius: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 800, color: '#6D28D9', marginBottom: '10px' }}>
                      🎁 Target Recipient Audience *
                    </label>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="targetAudience"
                          value="all"
                          checked={targetAudience === 'all'}
                          onChange={() => setTargetAudience('all')}
                        />
                        <span>🌐 All Customers (Public Gift)</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="targetAudience"
                          value="specific"
                          checked={targetAudience === 'specific'}
                          onChange={() => setTargetAudience('specific')}
                        />
                        <span>👤 Specific Customer</span>
                      </label>
                    </div>

                    {targetAudience === 'specific' && (
                      <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #DDD6FE', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '14px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 800, color: targetDelivery === 'email' ? '#2563EB' : '#475569', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="targetDelivery"
                              value="email"
                              checked={targetDelivery === 'email'}
                              onChange={() => setTargetDelivery('email')}
                            />
                            <span>✉️ Via Email Address</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 800, color: targetDelivery === 'phone' ? '#D97706' : '#475569', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="targetDelivery"
                              value="phone"
                              checked={targetDelivery === 'phone'}
                              onChange={() => setTargetDelivery('phone')}
                            />
                            <span>📱 Via Phone SMS</span>
                          </label>
                        </div>

                        {targetDelivery === 'email' ? (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Customer Email Address *</label>
                            <input
                              type="email"
                              required={targetAudience === 'specific' && targetDelivery === 'email'}
                              value={targetEmail}
                              onChange={(e) => setTargetEmail(e.target.value)}
                              placeholder="e.g. customer@gmail.com"
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                            />
                          </div>
                        ) : (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Customer Mobile Phone Number *</label>
                            <input
                              type="tel"
                              required={targetAudience === 'specific' && targetDelivery === 'phone'}
                              value={targetPhone}
                              onChange={(e) => setTargetPhone(e.target.value)}
                              placeholder="e.g. +880 1712-345678"
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 0. VOUCHER NAME / PROMOTION TITLE */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    {activeTab === 'gift_voucher' ? 'Gift Voucher Name *' : (activeTab === 'voucher' ? 'Voucher Name *' : 'Discount Title *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={promotionName}
                    onChange={(e) => setPromotionName(e.target.value)}
                    placeholder={activeTab === 'gift_voucher' ? 'e.g. Eid Special Travel Gift Card' : (activeTab === 'voucher' ? 'e.g. Regular Voucher' : 'e.g. Monsoon Tour Special Discount')}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                  />
                </div>

                {/* 1. COUPON CODE */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. PROMO7447"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700, fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                </div>

                {/* 2. DISCOUNT TYPE & DISCOUNT VALUE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Discount Type *
                    </label>
                    <select
                      value={discountSettingType}
                      onChange={(e) => setDiscountSettingType(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFFFFF', fontWeight: 700, color: '#1E293B' }}
                    >
                      <option value="money">Fixed Amount (৳) OFF</option>
                      <option value="percentage">Percentage (%) OFF</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Discount Value ({discountSettingType === 'money' ? '৳' : '%'}) *
                    </label>
                    <input
                      type="number"
                      required
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="e.g. 200"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                    />
                  </div>
                </div>

                {/* 3. MIN ORDER AMOUNT */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    Min Order Amount (৳) <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={minSpend}
                    onChange={(e) => setMinSpend(e.target.value)}
                    placeholder="e.g. 2000 (Leave empty for no min limit)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                  />
                </div>

                {/* 3.5. MAXIMUM DISCOUNT PER ORDER (CAP) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '2px' }}>
                    Maximum Discount per Order
                  </label>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '6px' }}>
                    Set up a discount cap to avoid over budget
                  </span>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '14px', fontSize: '0.9rem', fontWeight: 700, color: '#64748B' }}>৳</span>
                    <input
                      type="number"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="e.g. 1000"
                      style={{ width: '100%', padding: '10px 14px 10px 32px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                    />
                  </div>
                </div>

                {/* 4. APPLICABLE TARGET */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    Applicable Target *
                  </label>
                  <select
                    value={applyTo}
                    onChange={(e) => setApplyTo(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFFFFF', fontWeight: 700, color: '#1E293B' }}
                  >
                    <option value="Entire Shop">Entire Shop (All Packages, Visas & Guides)</option>
                    <option value="Specific Package / Visa Only">Specific Package / Visa / Guide Only</option>
                  </select>
                </div>

                {/* 5. SELECT PACKAGE/VISA/GUIDE SERVICE (TYPEABLE SEARCH + CHECKBOX MULTI-SELECT DROPDOWN) */}
                {applyTo === 'Specific Package / Visa Only' && (
                  <div ref={pkgDropdownRef} style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Select Package / Visa / Guide Service *
                    </label>

                    {/* Selected Badges Row */}
                    {selectedProducts.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {selectedProducts.map((pkgName, i) => (
                          <span
                            key={i}
                            style={{
                              background: '#EFF6FF',
                              color: '#1D4ED8',
                              border: '1px solid #BFDBFE',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>{pkgName}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedProducts(prev => prev.filter(p => p !== pkgName))}
                              style={{ background: 'none', border: 'none', color: '#1D4ED8', cursor: 'pointer', fontWeight: 800, padding: 0, fontSize: '0.8rem' }}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Typeable Search Input Field */}
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Type to search packages, visas or guides..."
                        value={pkgSearchQuery}
                        onChange={(e) => {
                          setPkgSearchQuery(e.target.value);
                          setPkgDropdownOpen(true);
                        }}
                        onFocus={() => setPkgDropdownOpen(true)}
                        style={{
                          width: '100%',
                          padding: '10px 36px 10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.88rem',
                          outline: 'none',
                          background: '#FFFFFF',
                          fontWeight: 600,
                          color: '#0F172A'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setPkgDropdownOpen(prev => !prev)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: '0.8rem' }}
                      >
                        {pkgDropdownOpen ? '▲' : '▼'}
                      </button>
                    </div>

                    {/* Checkbox Dropdown Menu */}
                    {pkgDropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          marginTop: '4px',
                          background: '#FFFFFF',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                          maxHeight: '220px',
                          overflowY: 'auto',
                          zIndex: 999,
                          padding: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px 8px 8px', borderBottom: '1px solid #F1F5F9', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                            {selectedProducts.length} Selected
                          </span>
                          <button
                            type="button"
                            onClick={() => setPkgDropdownOpen(false)}
                            style={{ background: '#F1F5F9', border: 'none', padding: '2px 8px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                          >
                            Done ✓
                          </button>
                        </div>

                        {ALL_SHOP_SERVICES.filter(item => item.toLowerCase().includes(pkgSearchQuery.toLowerCase())).map((pkg, idx) => {
                          const isChecked = selectedProducts.includes(pkg);

                          return (
                            <label
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                background: isChecked ? '#F0F9FF' : 'transparent',
                                cursor: 'pointer',
                                fontSize: '0.86rem',
                                fontWeight: isChecked ? 800 : 600,
                                color: isChecked ? '#0284C7' : '#334155',
                                transition: 'background 0.15s ease'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedProducts(prev => prev.filter(p => p !== pkg));
                                  } else {
                                    setSelectedProducts(prev => [...prev, pkg]);
                                  }
                                }}
                                style={{ width: '16px', height: '16px', accentColor: '#0284C7', cursor: 'pointer' }}
                              />
                              <span>{pkg}</span>
                            </label>
                          );
                        })}

                        {ALL_SHOP_SERVICES.filter(item => item.toLowerCase().includes(pkgSearchQuery.toLowerCase())).length === 0 && (
                          <div style={{ padding: '12px', textAlign: 'center', color: '#94A3B8', fontSize: '0.82rem' }}>
                            No matching package, visa or guide found for &quot;{pkgSearchQuery}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. TOTAL VOUCHERS ISSUED & USAGE LIMIT PER USER */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Total Vouchers Issued *
                    </label>
                    <input
                      type="number"
                      required
                      disabled={targetAudience === 'specific'}
                      value={targetAudience === 'specific' ? '1' : totalIssued}
                      onChange={(e) => setTotalIssued(e.target.value)}
                      placeholder="e.g. 100"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Usage Limit per User *
                    </label>
                    <input
                      type="number"
                      required
                      value={limitPerCustomer}
                      onChange={(e) => setLimitPerCustomer(e.target.value)}
                      placeholder="e.g. 1"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontWeight: 700 }}
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: activeTab === 'gift_voucher' ? '#7C3AED' : '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                    }}
                  >
                    {activeTab === 'gift_voucher'
                      ? (targetAudience === 'specific' ? (targetDelivery === 'email' ? 'Send Gift Voucher (Email)' : 'Send Gift Voucher (SMS)') : 'Save Gift Voucher ✓')
                      : (activeTab === 'voucher' ? 'Save Voucher ✓' : 'Save Discount ✓')}
                  </button>
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

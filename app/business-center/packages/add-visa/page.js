'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

const SAMPLE_VISAS_MAP = {
  'visa-usa-001': {
    country: 'United States', capital: 'Washington, D.C.', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', validity: '90 Days', processingTime: '5-7 Working Days',
    localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 USD is equivalent to 118 BDT', embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '2400', processingFee: '36000',
    matrixItems: [
      { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '6500' },
      { id: 2, visaType: 'Tourist Visa', entryType: 'Multiple Entry', price: '18500' }
    ]
  },
  'visa-uk-001': {
    country: 'United Kingdom', capital: 'London', visaType: 'Student Visa', visaAvailableLabel: 'Student Visa Available', validity: '6 Months', processingTime: '10-15 Working Days',
    localTime: 'GMT +0', telephoneCode: '+44', exchangeRate: '1 GBP is equivalent to 140 BDT', embassyAddress: 'United Nations Road, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '1800', processingFee: '31200',
    matrixItems: [
      { id: 1, visaType: 'Student Visa', entryType: 'Single Entry', price: '12000' },
      { id: 2, visaType: 'Student Visa', entryType: 'Multiple Entry', price: '31200' }
    ]
  },
  'visa-canada-001': {
    country: 'Canada', capital: 'Ottawa', visaType: 'Tourist Visa', visaAvailableLabel: 'Student & Tourist Visa Available', validity: '30 Days', processingTime: '5-7 Working Days',
    localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 CAD is equivalent to 86 BDT', embassyAddress: 'House 16A, Road 48, Gulshan 2, Dhaka 1212, Bangladesh',
    visaFee: '1800', processingFee: '24000',
    matrixItems: [
      { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '6500' },
      { id: 2, visaType: 'Tourist Visa', entryType: 'Multiple Entry', price: '18500' }
    ]
  },
  'visa-dubai-001': {
    country: 'UAE (Dubai)', capital: 'Abu Dhabi', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', validity: '30 Days', processingTime: '3-5 Working Days',
    localTime: 'GMT +4', telephoneCode: '+971', exchangeRate: '1 AED is equivalent to 32 BDT', embassyAddress: 'House 19, Road 143, Gulshan 2, Dhaka 1212, Bangladesh',
    visaFee: '1800', processingFee: '23400',
    matrixItems: [
      { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '6500' },
      { id: 2, visaType: 'Tourist Visa', entryType: 'Multiple Entry', price: '18500' }
    ]
  },
  'visa-malaysia-001': {
    country: 'Malaysia', capital: 'Kuala Lumpur', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', validity: '30 Days', processingTime: '3-5 Working Days',
    localTime: 'GMT +8', telephoneCode: '+60', exchangeRate: '1 MYR is equivalent to 25 BDT', embassyAddress: 'Gulshan Avenue, Dhaka, Bangladesh',
    visaFee: '960', processingFee: '21600',
    matrixItems: [
      { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '5500' },
      { id: 2, visaType: 'Tourist Visa', entryType: 'Multiple Entry', price: '15500' }
    ]
  },
  'visa-australia-001': {
    country: 'Australia', capital: 'Canberra', visaType: 'Student Visa', visaAvailableLabel: 'Student Visa Available', validity: '6 Months', processingTime: '15-30 Working Days',
    localTime: 'GMT +10', telephoneCode: '+61', exchangeRate: '1 AUD is equivalent to 72 BDT', embassyAddress: 'Gulshan Avenue, Dhaka, Bangladesh',
    visaFee: '1440', processingFee: '28800',
    matrixItems: [
      { id: 1, visaType: 'Student Visa', entryType: 'Single Entry', price: '14000' }
    ]
  },
  'visa-japan-001': {
    country: 'Japan', capital: 'Tokyo', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', validity: '30 Days', processingTime: '5-7 Working Days',
    localTime: 'GMT +9', telephoneCode: '+81', exchangeRate: '1 JPY is equivalent to 0.78 BDT', embassyAddress: 'Plot No. 5 & 7, Dutabash Road, Baridhara, Dhaka 1212',
    visaFee: '1200', processingFee: '22800',
    matrixItems: [
      { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '6500' }
    ]
  },
  'visa-germany-001': {
    country: 'Germany', capital: 'Berlin', visaType: 'Student Visa', visaAvailableLabel: 'Student Visa Available', validity: '6 Months', processingTime: '15-30 Working Days',
    localTime: 'GMT +1', telephoneCode: '+49', exchangeRate: '1 EUR is equivalent to 128 BDT', embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '1200', processingFee: '25200',
    matrixItems: [
      { id: 1, visaType: 'Student Visa', entryType: 'Single Entry', price: '12000' }
    ]
  },
};

function AddVisaFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams ? searchParams.get('edit') : null;
  const [isEditing, setIsEditing] = useState(false);

  // ── Section 1: Basic Info ──
  const [country, setCountry] = useState('Thailand');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [visaAvailableLabel, setVisaAvailableLabel] = useState('Tourist Visa Available');
  const [validity, setValidity] = useState('90 Days');
  const [entryType, setEntryType] = useState('Single Entry');
  const [processingTime, setProcessingTime] = useState('5-7 Working Days');

  // Generic add-option modal
  const [modalConfig, setModalConfig] = useState(null); // { title, fieldLabel, list, setter, valueSetter }
  const [modalInput, setModalInput] = useState('');
  const [modalError, setModalError] = useState('');

  const DEFAULT_VISA_TYPES     = ['Tourist Visa', 'Medical Visa', 'Business Visa', 'Student Visa', 'PR Visa (Permanent Resident)', 'Transit Visa'];
  const DEFAULT_VALIDITIES     = ['15 Days', '30 Days', '60 Days', '90 Days', '6 Months', '1 Year', '5 Years', '10 Years'];
  const DEFAULT_ENTRY_TYPES    = ['Single Entry', 'Double Entry', 'Multiple Entry'];
  const DEFAULT_PROC_TIMES     = ['1-2 Working Days (Express)', '3-5 Working Days', '5-7 Working Days', '10-15 Working Days', '15-30 Working Days'];

  const [customVisaTypes,  setCustomVisaTypes]  = useState([]);
  const [customValidities, setCustomValidities] = useState([]);
  const [customEntryTypes, setCustomEntryTypes] = useState([]);
  const [customProcTimes,  setCustomProcTimes]  = useState([]);

  const allVisaTypes  = [...DEFAULT_VISA_TYPES,  ...customVisaTypes];
  const allValidities = [...DEFAULT_VALIDITIES,  ...customValidities];
  const allEntryTypes = [...DEFAULT_ENTRY_TYPES, ...customEntryTypes];
  const allProcTimes  = [...DEFAULT_PROC_TIMES,  ...customProcTimes];

  const openModal = (config) => {
    setModalConfig(config);
    setModalInput('');
    setModalError('');
  };
  const closeModal = () => { setModalConfig(null); setModalInput(''); setModalError(''); };

  const handleModalAdd = () => {
    const trimmed = modalInput.trim();
    if (!trimmed) { setModalError('Please enter a value.'); return; }
    const existing = modalConfig.list.map(x => x.toLowerCase());
    if (existing.includes(trimmed.toLowerCase())) { setModalError('This option already exists.'); return; }
    modalConfig.setter(prev => [...prev, trimmed]);
    modalConfig.valueSetter(trimmed);
    closeModal();
  };

  const ALL_COUNTRIES = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua & Barbuda','Argentina','Armenia','Australia',
    'Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin',
    'Bhutan','Bolivia','Bosnia & Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
    'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia',
    'Comoros','Congo (DRC)','Congo (Republic)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark',
    'Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea',
    'Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana',
    'Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland',
    'India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan',
    'Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho',
    'Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives',
    'Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco',
    'Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands',
    'New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan',
    'Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal',
    'Qatar','Romania','Russia','Rwanda','Saint Kitts & Nevis','Saint Lucia','Saint Vincent & Grenadines',
    'Samoa','San Marino','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore',
    'Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain',
    'Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania',
    'Thailand','Timor-Leste','Togo','Tonga','Trinidad & Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
    'UAE (Dubai)','Uganda','Ukraine','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu',
    'Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
  ];

  // ── Section 2: Country Info (shown on visa detail page) ──
  const [rating, setRating] = useState('4.7');
  const [capital, setCapital] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [telephoneCode, setTelephoneCode] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [embassyAddress, setEmbassyAddress] = useState('');
  const [visaFee, setVisaFee] = useState('');
  const [processingFee, setProcessingFee] = useState('');

  // ── Section 3: Dynamic Combination Pricing ──
  const [matrixItems, setMatrixItems] = useState([
    { id: 1, visaType: 'Tourist Visa', entryType: 'Single Entry', price: '6500' },
    { id: 2, visaType: 'Tourist Visa', entryType: 'Double Entry', price: '10000' },
    { id: 3, visaType: 'Tourist Visa', entryType: 'Multiple Entry', price: '18500' },
  ]);

  const addMatrixItem = () => {
    setMatrixItems(prev => [
      ...prev,
      { id: Date.now(), visaType: visaType || 'Tourist Visa', entryType: entryType || 'Single Entry', price: '' }
    ]);
  };

  const updateMatrixItem = (id, field, value) => {
    setMatrixItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeMatrixItem = (id) => {
    setMatrixItems(prev => prev.filter(item => item.id !== id));
  };

  // ── Section 4: Documents ──
  const [stickerStudentDocs, setStickerStudentDocs] = useState('07 Months Valid Passport With Old Passport (If have)\nRecent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)\nID card (Student) one photocopy both sides\nLeave letter from school or college original copy\nParents bank statement (Last 06 months) and solvency certificate with minimum balance BDT 70,000 for each applicant');
  const [generalDocs, setGeneralDocs] = useState('Filled visa application form\nValid passport and previous travel history copies\nBank statement and sponsor documents\nAdmission or invitation letter where applicable');

  // ── Section 5: Policy ──
  const [description, setDescription] = useState('Official e-Visa and Sticker Visa processing service with express submission.');
  const [conditions, setConditions] = useState('Non-refundable visa fee once submitted to embassy. Processing duration depends on embassy workload.');
  const [policy, setPolicy] = useState('Full refund of service charge if visa gets rejected due to documentation error from our side.');
  const [importantNotes, setImportantNotes] = useState('Please contact the visa department for document processing after payment. Visa rates may change without prior notice.');

  // ── Section 6: Images ──
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const [saved, setSaved] = useState(false);

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setMainImage(evt.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setGalleryImages(prev => [...prev, evt.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  // ── Populate state if in EDIT mode ──
  useEffect(() => {
    if (!editId) return;
    setIsEditing(true);

    try {
      const savedList = JSON.parse(localStorage.getItem('planner_visa_services') || '[]');
      let item = savedList.find(v => v.id === editId);

      if (!item && SAMPLE_VISAS_MAP[editId]) {
        item = SAMPLE_VISAS_MAP[editId];
      }

      if (item) {
        setCountry(item.country || 'Thailand');
        setVisaType(item.visaType || 'Tourist Visa');
        setVisaAvailableLabel(item.visaAvailableLabel || (item.visaType ? item.visaType + ' Available' : 'Tourist Visa Available'));
        setValidity(item.validity || '30 Days');
        setProcessingTime(item.processingTime || '5-7 Working Days');
        setCapital(item.capital || (item.country ? item.country + ' Capital' : ''));
        setLocalTime(item.localTime || 'GMT +6');
        setTelephoneCode(item.telephoneCode || '+880');
        setExchangeRate(item.exchangeRate || '1 USD is equivalent to 118 BDT');
        setEmbassyAddress(item.embassyAddress || ('Embassy of ' + (item.country || 'Destination Country') + ', Dhaka, Bangladesh'));
        setVisaFee(item.visaFee || '1800');
        setProcessingFee(item.processingFee || '24000');
        if (item.matrixItems && item.matrixItems.length > 0) {
          setMatrixItems(item.matrixItems);
        } else {
          setMatrixItems([
            { id: 1, visaType: item.visaType || 'Tourist Visa', entryType: 'Single Entry', price: item.processingFee || '6500' }
          ]);
        }
        if (item.stickerStudentDocs) setStickerStudentDocs(item.stickerStudentDocs);
        if (item.generalDocs) setGeneralDocs(item.generalDocs);
        if (item.description) setDescription(item.description);
        if (item.conditions) setConditions(item.conditions);
        if (item.policy) setPolicy(item.policy);
        if (item.importantNotes) setImportantNotes(item.importantNotes);
        const validMain = (item.mainImage && typeof item.mainImage === 'string' && !item.mainImage.startsWith('blob:') && !item.mainImage.startsWith('Main') && item.mainImage.length > 5)
          ? item.mainImage
          : 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80';
        setMainImage(validMain);

        if (item.galleryImages && Array.isArray(item.galleryImages) && item.galleryImages.length > 0) {
          const filteredGallery = item.galleryImages.filter(img => img && typeof img === 'string' && !img.startsWith('blob:') && !img.startsWith('Gallery') && img.length > 5);
          if (filteredGallery.length > 0) {
            setGalleryImages(filteredGallery);
          } else {
            setGalleryImages([
              'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=500&q=80'
            ]);
          }
        } else {
          setGalleryImages([
            'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=500&q=80'
          ]);
        }
      }
    } catch (err) {
      console.error('Error populating edit data:', err);
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const visaData = {
      id: editId || ('visa-' + (country ? country.toLowerCase().replace(/[^a-z0-9]/g, '') : 'custom') + '-' + Date.now()),
      country: country || 'Thailand',
      capital: capital || '',
      visaType: visaType || 'Tourist Visa',
      validity: validity || '30 Days',
      processingTime: processingTime || '5-7 Working Days',
      visaFee: visaFee || '0',
      processingFee: processingFee || matrixItems[0]?.price || '0',
      matrixItems: matrixItems,
      stickerStudentDocs,
      generalDocs,
      description,
      conditions,
      policy,
      importantNotes,
      mainImage,
      galleryImages,
      createdAt: new Date().toISOString(),
      status: 'Active',
      isCustom: true
    };

    try {
      const existing = JSON.parse(localStorage.getItem('planner_visa_services') || '[]');
      if (editId) {
        const existsInCustom = existing.some(item => item.id === editId);
        let updated;
        if (existsInCustom) {
          updated = existing.map(item => item.id === editId ? { ...item, ...visaData } : item);
        } else {
          updated = [visaData, ...existing];
        }
        localStorage.setItem('planner_visa_services', JSON.stringify(updated));
      } else {
        localStorage.setItem('planner_visa_services', JSON.stringify([visaData, ...existing]));
      }
    } catch (err) {
      console.error('Failed to save visa service:', err);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 6000);
  };

  // ── Style shortcuts ──
  const inp   = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.92rem', fontFamily: 'inherit', outline: 'none', background: '#FAFBFF' };
  const lbl   = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' };
  const sec   = { fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' };
  const subsec = { fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' };

  // ── Plus button helper ──
  const PlusBtn = ({ onClick }) => (
    <button type="button" onClick={onClick} title="Add custom option"
      style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', width: '22px', height: '22px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, flexShrink: 0 }}>
      +
    </button>
  );

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content seller-main-wrapper">
        <div className="seller-layout-grid">
          <SellerSidebar />
          <div className="seller-main-content">

            <header className="seller-header">
              <div>
                <h1 className="seller-page-title">{isEditing ? 'Edit VISA Processing Service Product' : 'Add VISA Processing Service Product'}</h1>
                <p className="seller-page-subtitle">Configure VISA Country, Type, Validity, Entry options, and Combination Price Sets.</p>
              </div>
            </header>

            {saved && (
              <div style={{ background: '#DEF7EC', border: '1px solid #31C48D', color: '#03543F', padding: '14px 20px', borderRadius: '12px', marginTop: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>✓ VISA Service Product Added Successfully!</span>
                <Link href="/business-center/packages/manage-visa" style={{ color: '#03543F', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: '800' }}>
                  View in Manage Visa ➔
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginTop: '20px' }}>

              {/* ── 1. Basic VISA Product Info ── */}
              <h3 style={sec}>1. Basic VISA Product Info</h3>
              <p style={subsec}>Set the destination country, visa category and entry options.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>

                {/* Country Dropdown with 190+ countries */}
                <div>
                  <label style={lbl}>Destination Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={inp}
                  >
                    <option value="" disabled>Select Destination Country...</option>
                    {ALL_COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* VISA Available Label */}
                <div>
                  <label style={lbl}>VISA Available Label *</label>
                  <input type="text" placeholder="e.g. Tourist Visa / Student Visa Available" value={visaAvailableLabel} onChange={(e) => setVisaAvailableLabel(e.target.value)} style={inp} />
                </div>

                {/* VISA Type */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>Primary VISA Category *</label>
                    <PlusBtn onClick={() => openModal({ title: 'Add VISA Type', fieldLabel: 'VISA Type Name', list: allVisaTypes, setter: setCustomVisaTypes, valueSetter: setVisaType })} />
                  </div>
                  <select value={visaType} onChange={(e) => setVisaType(e.target.value)} style={inp}>
                    {allVisaTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Validity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>VISA Validity Option *</label>
                    <PlusBtn onClick={() => openModal({ title: 'Add Validity Option', fieldLabel: 'Validity Duration', list: allValidities, setter: setCustomValidities, valueSetter: setValidity })} />
                  </div>
                  <select value={validity} onChange={(e) => setValidity(e.target.value)} style={inp}>
                    {allValidities.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>


                {/* Processing Time */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>Processing Time</label>
                    <PlusBtn onClick={() => openModal({ title: 'Add Processing Time', fieldLabel: 'Processing Duration', list: allProcTimes, setter: setCustomProcTimes, valueSetter: setProcessingTime })} />
                  </div>
                  <select value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} style={inp}>
                    {allProcTimes.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 2. Country Info (shown on visa detail page) ── */}
              <h3 style={sec}>2. Country Info (Shown on VISA Detail Page)</h3>
              <p style={subsec}>These details appear on the public visa detail page — Capital City, Local Time, Exchange Rate, Embassy etc.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={lbl}>Capital City</label>
                  <input type="text" placeholder="e.g. Washington, D.C." value={capital} onChange={(e) => setCapital(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Local Time (Timezone)</label>
                  <input type="text" placeholder="e.g. GMT -5" value={localTime} onChange={(e) => setLocalTime(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Telephone Code</label>
                  <input type="text" placeholder="e.g. +1" value={telephoneCode} onChange={(e) => setTelephoneCode(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Exchange Rate</label>
                  <input type="text" placeholder="e.g. 1 USD is equivalent to 118 BDT" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Starting Visa Fee (BDT)</label>
                  <input type="text" placeholder="e.g. 2400" value={visaFee} onChange={(e) => setVisaFee(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Processing Fee (BDT)</label>
                  <input type="text" placeholder="e.g. 36000" value={processingFee} onChange={(e) => setProcessingFee(e.target.value)} style={inp} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={lbl}>Embassy Address in Bangladesh</label>
                  <input type="text" placeholder="e.g. Madani Avenue, Baridhara, Dhaka 1212, Bangladesh" value={embassyAddress} onChange={(e) => setEmbassyAddress(e.target.value)} style={inp} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 3. Dynamic Pricing Combinations ── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 style={{ ...sec, margin: 0 }}>3. VISA Pricing & Package Combinations</h3>
                <button
                  type="button"
                  onClick={addMatrixItem}
                  style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: '8px', fontSize: '0.84rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  + Add Combination
                </button>
              </div>
              <p style={subsec}>Set prices for different entry options of your primary VISA category (or add other category combinations if offered).</p>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '28px' }}>
                {matrixItems.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.85rem', margin: '16px 0' }}>No pricing combinations added yet. Click <strong>"+ Add Combination"</strong> to set prices.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {matrixItems.map((item, index) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', minWidth: '20px' }}>#{index + 1}</span>

                        {/* VISA Type Select */}
                        <div style={{ flex: '1 1 180px' }}>
                          <select
                            value={item.visaType}
                            onChange={(e) => updateMatrixItem(item.id, 'visaType', e.target.value)}
                            style={{ ...inp, padding: '7px 10px', fontSize: '0.85rem' }}
                          >
                            {allVisaTypes.map((vt) => (
                              <option key={vt} value={vt}>{vt}</option>
                            ))}
                          </select>
                        </div>

                        <span style={{ color: '#CBD5E1', fontWeight: 'bold' }}>+</span>

                        {/* Entry Option Select */}
                        <div style={{ flex: '1 1 160px' }}>
                          <select
                            value={item.entryType}
                            onChange={(e) => updateMatrixItem(item.id, 'entryType', e.target.value)}
                            style={{ ...inp, padding: '7px 10px', fontSize: '0.85rem' }}
                          >
                            {allEntryTypes.map((et) => (
                              <option key={et} value={et}>{et}</option>
                            ))}
                          </select>
                        </div>

                        {/* Price Input */}
                        <div style={{ flex: '0 0 140px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1E293B' }}>৳</span>
                          <input
                            type="number"
                            placeholder="Price (BDT)"
                            value={item.price}
                            onChange={(e) => updateMatrixItem(item.id, 'price', e.target.value)}
                            style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.88rem', fontWeight: '700', outline: 'none' }}
                          />
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeMatrixItem(item.id)}
                          title="Remove combination"
                          style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 4. Required Documents ── */}
              <h3 style={sec}>4. Required Documents</h3>
              <p style={subsec}>Each line will show as a bullet point on the visa detail page. Press Enter to separate each item.</p>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={lbl}>Required Documents for Sticker Visa (Student Category)</label>
                  <textarea rows="6" value={stickerStudentDocs} onChange={(e) => setStickerStudentDocs(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>Required Documents (General Category)</label>
                  <textarea rows="5" value={generalDocs} onChange={(e) => setGeneralDocs(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 5. Description & Policy ── */}
              <h3 style={sec}>5. Description and Policy Information</h3>
              <p style={subsec}>These appear in accordion sections on the public visa detail page.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={lbl}>Service Description *</label>
                  <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>Conditions as ShareTrip *</label>
                  <textarea rows="2" value={conditions} onChange={(e) => setConditions(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>Cancellation and Refund Policy *</label>
                  <textarea rows="2" value={policy} onChange={(e) => setPolicy(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>Important Notes</label>
                  <textarea rows="2" value={importantNotes} onChange={(e) => setImportantNotes(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 6. Cover Image and Gallery ── */}
              <h3 style={sec}>6. Cover Image and Gallery Photos</h3>
              <p style={subsec}>Upload a hero image and gallery photos for this visa destination.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px', alignItems: 'start' }}>
                <div>
                  <label style={lbl}>Main / Cover Image *</label>
                  <input type="file" accept="image/*" onChange={handleMainImage} style={{ display: 'none' }} id="bc-visa-main" />
                  <label htmlFor="bc-visa-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #BFDBFE', borderRadius: '12px', padding: '20px', cursor: 'pointer', background: '#F0F7FF', color: '#2563EB', fontWeight: 600, fontSize: '0.88rem', height: '160px', boxSizing: 'border-box', gap: '6px' }}>
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt="Main"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80';
                        }}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : <><span style={{ fontSize: '2.2rem' }}>📷</span><span>Click to upload cover image</span><span style={{ fontWeight: 400, color: '#64748B', fontSize: '0.78rem' }}>JPG, PNG, WEBP</span></>}
                  </label>
                </div>

                <div>
                  <label style={lbl}>Gallery Images (multiple) — {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} added</label>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryImages} style={{ display: 'none' }} id="bc-visa-gallery" />

                  {galleryImages.length === 0 ? (
                    <label htmlFor="bc-visa-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #E5E7EB', borderRadius: '12px', padding: '20px', cursor: 'pointer', background: '#F9FAFB', color: '#6B7280', fontWeight: 600, fontSize: '0.88rem', height: '160px', boxSizing: 'border-box', gap: '6px' }}>
                      <span style={{ fontSize: '2.2rem' }}>🖼️</span>
                      <span>Click to select gallery images</span>
                      <span style={{ fontWeight: 400, color: '#94A3B8', fontSize: '0.78rem' }}>You can select multiple images at once</span>
                    </label>
                  ) : (
                    <div style={{ border: '2px solid #E5E7EB', borderRadius: '12px', padding: '16px', background: '#F9FAFB' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
                        {galleryImages.map((src, i) => (
                          <div key={i} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1', border: '2px solid #E2E8F0' }}>
                            <img
                              src={src}
                              alt={`Gallery ${i + 1}`}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=80';
                              }}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(i)}
                              style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                              title="Remove"
                            >
                              ✕
                            </button>
                            <div style={{ position: 'absolute', bottom: '3px', left: '4px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.65rem', borderRadius: '4px', padding: '1px 5px' }}>#{i + 1}</div>
                          </div>
                        ))}
                        <label htmlFor="bc-visa-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #BFDBFE', borderRadius: '8px', cursor: 'pointer', background: '#EFF6FF', color: '#2563EB', fontSize: '0.78rem', fontWeight: 600, aspectRatio: '1', gap: '4px' }}>
                          <span style={{ fontSize: '1.5rem' }}>+</span>
                          <span>Add More</span>
                        </label>
                      </div>
                      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} selected — scroll to see all</span>
                        <button type="button" onClick={() => setGalleryImages([])} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Clear All</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Submit ── */}
              <button type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '8px' }}>
                {isEditing ? 'Update VISA Service Product' : 'Publish VISA Service Product'}
              </button>
            </form>

          </div>
        </div>
      </main>
      <Footer />

      {/* ── Generic Add Option Modal ── */}
      {modalConfig && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}
        >
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', position: 'relative' }}>

            {/* Close */}
            <button type="button" onClick={closeModal}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              &#x2715;
            </button>

            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#EFF6FF', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>+</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>{modalConfig.title}</h3>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>New option will appear in the dropdown.</p>
              </div>
            </div>

            {/* Existing options */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Current Options:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '90px', overflowY: 'auto' }}>
                {modalConfig.list.map((item) => (
                  <span key={item} style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', padding: '3px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>
                {modalConfig.fieldLabel} *
              </label>
              <input
                type="text"
                autoFocus
                placeholder={'Enter new ' + modalConfig.fieldLabel.toLowerCase() + '...'}
                value={modalInput}
                onChange={(e) => { setModalInput(e.target.value); setModalError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleModalAdd(); } }}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: modalError ? '2px solid #EF4444' : '2px solid #E2E8F0', fontSize: '0.92rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
              {modalError && <p style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '5px', fontWeight: 600 }}>{modalError}</p>}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={closeModal}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1.5px solid #E2E8F0', background: '#F8FAFC', color: '#475569', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
                Cancel
              </button>
              <button type="button" onClick={handleModalAdd}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AddVisaPackagePage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading VISA Service Form...</div>}>
      <AddVisaFormContent />
    </Suspense>
  );
}
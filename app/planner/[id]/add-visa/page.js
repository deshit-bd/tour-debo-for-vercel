'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function PlannerAddVisaPage() {
  const params = useParams();
  const plannerId = params?.id || 'deshit';

  // Section 1: Basic Info
  const [country, setCountry] = useState('');
  const [visaAvailableLabel, setVisaAvailableLabel] = useState('Tourist Visa Available');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [validity, setValidity] = useState('90 Days');
  const [entryType, setEntryType] = useState('Single Entry');
  const [processingTime, setProcessingTime] = useState('5-7 Working Days');
  const [rating, setRating] = useState('4.7');

  // Section 2: Country Info (shown on visa detail page)
  const [capital, setCapital] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [telephoneCode, setTelephoneCode] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [embassyAddress, setEmbassyAddress] = useState('');
  const [visaFee, setVisaFee] = useState('');
  const [processingFee, setProcessingFee] = useState('');

  const ADMIN_COUNTRY_CONFIGS = {
    'Thailand': { capital: 'Bangkok', localTime: 'GMT +7', telephoneCode: '+66', exchangeRate: '1 THB is equivalent to 3.3 BDT', visaFee: '1800', embassyAddress: 'Royal Thai Embassy, 18 & 20 Madani Avenue, Baridhara, Dhaka 1212' },
    'United States': { capital: 'Washington, D.C.', localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 USD is equivalent to 118 BDT', visaFee: '2400', embassyAddress: 'Embassy of the United States, Madani Avenue, Baridhara, Dhaka 1212' },
    'USA': { capital: 'Washington, D.C.', localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 USD is equivalent to 118 BDT', visaFee: '2400', embassyAddress: 'Embassy of the United States, Madani Avenue, Baridhara, Dhaka 1212' },
    'United Kingdom': { capital: 'London', localTime: 'GMT +0', telephoneCode: '+44', exchangeRate: '1 GBP is equivalent to 148 BDT', visaFee: '2100', embassyAddress: 'British High Commission, United Nations Road, Baridhara, Dhaka 1212' },
    'UK': { capital: 'London', localTime: 'GMT +0', telephoneCode: '+44', exchangeRate: '1 GBP is equivalent to 148 BDT', visaFee: '2100', embassyAddress: 'British High Commission, United Nations Road, Baridhara, Dhaka 1212' },
    'Canada': { capital: 'Ottawa', localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 CAD is equivalent to 87 BDT', visaFee: '2200', embassyAddress: 'High Commission of Canada, United Nations Road, Baridhara, Dhaka 1212' },
    'Japan': { capital: 'Tokyo', localTime: 'GMT +9', telephoneCode: '+81', exchangeRate: '1 JPY is equivalent to 0.77 BDT', visaFee: '1500', embassyAddress: 'Embassy of Japan, Plot No. 5 & 7, Dutabash Road, Baridhara, Dhaka 1212' },
    'Malaysia': { capital: 'Kuala Lumpur', localTime: 'GMT +8', telephoneCode: '+60', exchangeRate: '1 MYR is equivalent to 26.5 BDT', visaFee: '1600', embassyAddress: 'High Commission of Malaysia, House 19, Road 6, Baridhara, Dhaka 1212' },
    'Singapore': { capital: 'Singapore', localTime: 'GMT +8', telephoneCode: '+65', exchangeRate: '1 SGD is equivalent to 88 BDT', visaFee: '1900', embassyAddress: 'Consulate of Singapore, House 8, Road 51, Gulshan 2, Dhaka 1212' },
    'Dubai (UAE)': { capital: 'Abu Dhabi', localTime: 'GMT +4', telephoneCode: '+971', exchangeRate: '1 AED is equivalent to 32 BDT', visaFee: '1800', embassyAddress: 'Embassy of the UAE, House 19, Road 143, Gulshan 2, Dhaka 1212' },
    'India': { capital: 'New Delhi', localTime: 'GMT +5:30', telephoneCode: '+91', exchangeRate: '1 INR is equivalent to 1.41 BDT', visaFee: '800', embassyAddress: 'High Commission of India, Plot No 1-3, Park Road, Baridhara, Dhaka 1212' },
    'Saudi Arabia': { capital: 'Riyadh', localTime: 'GMT +3', telephoneCode: '+966', exchangeRate: '1 SAR is equivalent to 31.4 BDT', visaFee: '2500', embassyAddress: 'Royal Embassy of Saudi Arabia, House 5 (NE) L, Road 83, Gulshan 2, Dhaka 1212' },
    'Germany': { capital: 'Berlin', localTime: 'GMT +1', telephoneCode: '+49', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of Germany, 11 Madani Avenue, Baridhara, Dhaka 1212' },
    'France': { capital: 'Paris', localTime: 'GMT +1', telephoneCode: '+33', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of France, Road 108, Gulshan 2, Dhaka 1212' },
    'Turkey': { capital: 'Ankara', localTime: 'GMT +3', telephoneCode: '+90', exchangeRate: '1 TRY is equivalent to 3.6 BDT', visaFee: '2000', embassyAddress: 'Embassy of the Republic of Turkey, 6 Madani Avenue, Baridhara, Dhaka 1212' },
    'Australia': { capital: 'Canberra', localTime: 'GMT +10', telephoneCode: '+61', exchangeRate: '1 AUD is equivalent to 78 BDT', visaFee: '2400', embassyAddress: 'Australian High Commission, 184 Gulshan Avenue, Gulshan 2, Dhaka 1212' }
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    const config = ADMIN_COUNTRY_CONFIGS[selectedCountry] || {
      capital: selectedCountry + ' Capital',
      localTime: 'GMT +6',
      telephoneCode: '+880',
      exchangeRate: '1 USD is equivalent to 118 BDT',
      visaFee: '1800',
      embassyAddress: 'Embassy of ' + selectedCountry + ', Dhaka, Bangladesh'
    };
    setCapital(config.capital);
    setLocalTime(config.localTime);
    setTelephoneCode(config.telephoneCode);
    setExchangeRate(config.exchangeRate);
    setVisaFee(config.visaFee || '1800');
    setEmbassyAddress(config.embassyAddress);
  };

  // Section 3: Pricing Matrix
  const [matrixPrices, setMatrixPrices] = useState({
    'Tourist Visa-Single Entry': '',
    'Tourist Visa-Multiple Entry': '',
    'Business Visa-Single Entry': '',
    'Business Visa-Multiple Entry': '',
    'Medical Visa-Single Entry': '',
    'Medical Visa-Multiple Entry': '',
    'PR Visa-Multiple Entry': '',
  });
  const handlePriceChange = (key, val) => setMatrixPrices(prev => ({ ...prev, [key]: val }));

  // Section 4: Documents
  const [stickerStudentDocs, setStickerStudentDocs] = useState('07 Months Valid Passport With Old Passport (If have)\nRecent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)\nID card (Student) one photocopy both sides\nLeave letter from school or college original copy\nParents bank statement (Last 06 months) and solvency certificate with minimum balance BDT 70,000 for each applicant');
  const [generalDocs, setGeneralDocs] = useState('Filled visa application form\nValid passport and previous travel history copies\nBank statement and sponsor documents\nAdmission or invitation letter where applicable');

  // Section 5: Policy
  const [description, setDescription] = useState('');
  const [conditions, setConditions] = useState('');
  const [policy, setPolicy] = useState('');
  const [importantNotes, setImportantNotes] = useState('Please contact the visa department for document processing after payment. Visa rates may change without prior notice.');

  // Section 6: Images
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const [saved, setSaved] = useState(false);

  const handleMainImage = (e) => { const f = e.target.files[0]; if (f) setMainImage(URL.createObjectURL(f)); };
  const handleGalleryImages = (e) => {
    const newFiles = Array.from(e.target.files).map(f => URL.createObjectURL(f));
    setGalleryImages(prev => [...prev, ...newFiles]);
  };
  const removeGalleryImage = (index) => setGalleryImages(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country) { alert('Please select a Destination Country!'); return; }
    try {
      const data = { id: `visa-${country.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`, country, visaAvailableLabel, visaType, validity, entryType, processingTime, rating, capital, localTime, telephoneCode, exchangeRate, embassyAddress, visaFee, processingFee, matrixPrices, stickerStudentDocs, generalDocs, description, conditions, policy, importantNotes, mainImage, galleryImages, plannerId, publishedAt: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem('planner_visa_services') || '[]');
      localStorage.setItem('planner_visa_services', JSON.stringify([data, ...existing]));
    } catch (e) { console.error(e); }
    setSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSaved(false), 5000);
  };

  const inp = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '0.92rem', outline: 'none', background: '#FAFBFF', color: '#0F172A', fontFamily: 'inherit' };
  const lbl = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' };
  const card = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', marginBottom: '20px' };
  const secH = (n, t) => (
    <div style={{ marginBottom: '14px' }}>
      <h2 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
        <span style={{ background: '#EFF6FF', color: '#2563EB', width: '30px', height: '30px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{n}</span>
        {t}
      </h2>
    </div>
  );

  return (
    <div className="figma-page-shell">
      <Navbar />
      <main className="figma-main-content" style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px 60px' }}>

        <div style={{ display: 'flex', gap: '6px', fontSize: '0.82rem', color: '#64748B', marginBottom: '14px', alignItems: 'center' }}>
          <Link href={`/planner/${plannerId}`} style={{ color: '#2563EB', fontWeight: 600 }}>Planner</Link>
          <span>›</span>
          <Link href={`/planner/${plannerId}/products`} style={{ color: '#2563EB', fontWeight: 600 }}>All Products</Link>
          <span>›</span>
          <span>Add VISA Service</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Add VISA Processing Service</h1>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>Configure VISA country, type, validity, pricing matrix, documents and policies.</p>
          </div>
          <Link href={`/planner/${plannerId}/products`} style={{ background: '#F1F5F9', color: '#475569', padding: '9px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', border: '1px solid #E2E8F0' }}>
            Back to Products
          </Link>
        </div>

        {saved && (
          <div style={{ background: '#DCFCE7', border: '1.5px solid #16A34A', color: '#14532D', padding: '16px 20px', borderRadius: '14px', marginBottom: '20px', fontWeight: 700 }}>
            VISA Service Published Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* 1. Basic VISA Info */}
          <div style={card}>
            {secH('1', 'Basic VISA Product Info')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>Set the destination country, visa category and entry options that buyers will see.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={lbl}>Destination Country *</label>
                <select required value={country} onChange={(e) => handleCountrySelect(e.target.value)} style={inp}>
                  <option value="">Select Country</option>
                  <option>Thailand</option><option>Malaysia</option><option>Singapore</option>
                  <option>Dubai (UAE)</option><option>Turkey</option><option>Schengen / Europe</option>
                  <option>USA</option><option>UK</option><option>Canada</option><option>Australia</option>
                  <option>Japan</option><option>South Korea</option><option>China</option>
                  <option>India</option><option>Saudi Arabia</option><option>Qatar</option>
                  <option>Bahrain</option><option>Indonesia</option><option>Vietnam</option><option>Nepal</option>
                  <option>Germany</option><option>France</option><option>New Zealand</option>
                </select>
              </div>
              <div>
                <label style={lbl}>VISA Available Label</label>
                <input type="text" placeholder="e.g. Tourist Visa / Student Visa Available" value={visaAvailableLabel} onChange={(e) => setVisaAvailableLabel(e.target.value)} style={inp} />
              </div>
              <div>
                <label style={lbl}>Default VISA Type *</label>
                <select value={visaType} onChange={(e) => setVisaType(e.target.value)} style={inp}>
                  <option>Tourist Visa</option><option>Medical Visa</option>
                  <option>Business Visa</option><option>Student Visa</option>
                  <option>PR Visa (Permanent Resident)</option><option>Transit Visa</option>
                </select>
              </div>
              <div>
                <label style={lbl}>VISA Validity *</label>
                <select value={validity} onChange={(e) => setValidity(e.target.value)} style={inp}>
                  <option>15 Days</option><option>30 Days</option><option>60 Days</option>
                  <option>90 Days</option><option>6 Months</option>
                  <option>1 Year</option><option>5 Years</option><option>10 Years</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Default Entry Option *</label>
                <select value={entryType} onChange={(e) => setEntryType(e.target.value)} style={inp}>
                  <option>Single Entry</option><option>Double Entry</option><option>Multiple Entry</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Processing Time</label>
                <select value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} style={inp}>
                  <option>1-2 Working Days (Express)</option><option>3-5 Working Days</option>
                  <option>5-7 Working Days</option><option>10-15 Working Days</option><option>15-30 Working Days</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Rating (1-5)</label>
                <input type="number" step="0.1" min="1" max="5" placeholder="4.7" value={rating} onChange={(e) => setRating(e.target.value)} style={inp} />
              </div>
            </div>
          </div>

          {/* 2. Country Info */}
          <div style={card}>
            {secH('2', 'Destination Country & Embassy Information')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>Country details auto-populate upon selecting country. You can review and specify your custom processing fee &amp; embassy address below.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
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
          </div>

          {/* 3. Pricing Matrix */}
          <div style={card}>
            {secH('3', 'Feature Combination Pricing Matrix')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>Set individual prices for combination of VISA Type and Entry Option.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              {Object.keys(matrixPrices).map((key) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.83rem', fontWeight: '600', color: '#374151' }}>{key}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#2563EB' }}>৳</span>
                    <input type="number" min="0" placeholder="0" value={matrixPrices[key]} onChange={(e) => handlePriceChange(key, e.target.value)} style={{ width: '100px', padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontWeight: 'bold', fontSize: '0.9rem', outline: 'none', textAlign: 'right' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Required Documents */}
          <div style={card}>
            {secH('4', 'Required Documents')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>Each line becomes a bullet point on the visa detail page. Press Enter to add new items.</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={lbl}>Required Documents for Sticker Visa (Student Category)</label>
                <textarea rows="6" value={stickerStudentDocs} onChange={(e) => setStickerStudentDocs(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div>
                <label style={lbl}>Required Documents (General Category)</label>
                <textarea rows="5" value={generalDocs} onChange={(e) => setGeneralDocs(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* 5. Description & Policy */}
          <div style={card}>
            {secH('5', 'Description and Policy Information')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>These appear in accordion sections on the visa detail page.</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={lbl}>Service Description *</label>
                <textarea rows="3" placeholder="Official e-Visa and Sticker Visa processing service with express submission." value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div>
                <label style={lbl}>Conditions as ShareTrip *</label>
                <textarea rows="2" placeholder="Non-refundable visa fee once submitted to embassy." value={conditions} onChange={(e) => setConditions(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div>
                <label style={lbl}>Cancellation and Refund Policy *</label>
                <textarea rows="2" placeholder="Full refund of service charge if visa gets rejected due to documentation error." value={policy} onChange={(e) => setPolicy(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div>
                <label style={lbl}>Important Notes</label>
                <textarea rows="2" value={importantNotes} onChange={(e) => setImportantNotes(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* 6. Cover Image and Gallery */}
          <div style={card}>
            {secH('6', 'Cover Image and Gallery Photos')}
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px', marginTop: '-6px' }}>Upload a main hero image and gallery photos for this visa destination.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={lbl}>Main / Cover Image *</label>
                <input type="file" accept="image/*" onChange={handleMainImage} style={{ display: 'none' }} id="planner-visa-main" />
                <label htmlFor="planner-visa-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #BFDBFE', borderRadius: '12px', padding: '24px', cursor: 'pointer', background: '#F0F7FF', color: '#2563EB', fontWeight: 600, fontSize: '0.88rem', minHeight: '160px' }}>
                  {mainImage ? <img src={mainImage} alt="Cover" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} /> : <><span style={{ fontSize: '2rem' }}>📷</span><span>Click to upload cover image</span><span style={{ fontWeight: 400, color: '#64748B', fontSize: '0.78rem' }}>JPG, PNG, WEBP</span></>}
                </label>
                        <div>
                <label style={lbl}>Gallery Images (multiple) — {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} added</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryImages} style={{ display: 'none' }} id="planner-visa-gallery" />

                {galleryImages.length === 0 ? (
                  <label htmlFor="planner-visa-gallery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #E2E8F0', borderRadius: '12px', padding: '32px 24px', cursor: 'pointer', background: '#F8FAFC', color: '#475569', fontWeight: 600, fontSize: '0.88rem', minHeight: '160px', gap: '6px' }}>
                    <span style={{ fontSize: '2.5rem' }}>🖼️</span>
                    <span>Click to select gallery images</span>
                    <span style={{ fontWeight: 400, color: '#94A3B8', fontSize: '0.78rem' }}>You can select multiple images at once (min 4 recommended)</span>
                  </label>
                ) : (
                  <div style={{ border: '2px solid #E2E8F0', borderRadius: '12px', padding: '16px', background: '#F8FAFC' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
                      {galleryImages.map((src, i) => (
                        <div key={i} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1', border: '2px solid #E2E8F0' }}>
                          <img src={src} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                            title="Remove image"
                          >
                            ✕
                          </button>
                          <div style={{ position: 'absolute', bottom: '3px', left: '4px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.65rem', borderRadius: '4px', padding: '1px 5px' }}>#{i + 1}</div>
                        </div>
                      ))}
                      <label htmlFor="planner-visa-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '2px dashed #BFDBFE', borderRadius: '8px', cursor: 'pointer', background: '#EFF6FF', color: '#2563EB', fontSize: '0.78rem', fontWeight: 600, aspectRatio: '1', gap: '4px' }}>
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
              </div>          </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <Link href={`/planner/${plannerId}/products`} style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '13px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              Cancel
            </Link>
            <button type="submit" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#fff', border: 'none', padding: '13px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 6px 16px rgba(37,99,235,0.25)' }}>
              Publish VISA Service Product
            </button>
          </div>

        </form>
      </main>
      <Footer />
    </div>
  );
}
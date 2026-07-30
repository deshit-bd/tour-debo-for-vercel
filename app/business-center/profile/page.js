'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellerSidebar from '../components/SellerSidebar';

export default function SellerProfilePage() {
  const [companyName, setCompanyName] = useState('DeshIT - BD Tours & Travels');
  const [address, setAddress] = useState('Level 4, House 12, Road 5, Block B, Gulshan-1, Dhaka');
  const [mobile, setMobile] = useState('+880 17 0000 0000');
  const [email, setEmail] = useState('info@deshit-bd.com');
  const [nidNumber, setNidNumber] = useState('1995269182348123');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/019481/2024');

  const [bankName, setBankName] = useState('Dutch-Bangla Bank Ltd');
  const [branch, setBranch] = useState('Gulshan Branch');
  const [district, setDistrict] = useState('Dhaka');
  const [routingNo, setRoutingNo] = useState('090261421');
  const [accNo, setAccNo] = useState('115.120.948123');

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
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
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Seller Info & Verification Profile</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0 0' }}>
                    Complete your business profile and upload legal verification documents (NID, Trade License, Electricity Bill, Selfie, Bank Info).
                  </p>
                </div>
                <span className="status-pill success" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                  ✓ Verified Seller
                </span>
              </div>

              {saved && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '20px' }}>
                  ✓ Seller Particulars & Bank Info Saved Successfully!
                </div>
              )}

              <form onSubmit={handleSave} className="seller-form-grid">
                {/* Particulars Section */}
                <div className="seller-form-group full-width">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    1. Company & Contact Particulars (PDF Standard)
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>Company Name / Personal Name *</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Mobile Number *</label>
                  <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>National ID (NID) Number *</label>
                  <input type="text" value={nidNumber} onChange={(e) => setNidNumber(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width">
                  <label>Trade License Number *</label>
                  <input type="text" value={tradeLicense} onChange={(e) => setTradeLicense(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width">
                  <label>Business / Registered Office Address *</label>
                  <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                {/* Document Verification Uploads */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    2. Document Verification Uploads
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>NID Copy Upload *</label>
                  <input type="file" accept="image/*,.pdf" />
                  <small style={{ color: '#10B981', fontWeight: 700 }}>✓ nid_front_back.pdf Uploaded</small>
                </div>

                <div className="seller-form-group">
                  <label>Trade License Document Upload *</label>
                  <input type="file" accept="image/*,.pdf" />
                  <small style={{ color: '#10B981', fontWeight: 700 }}>✓ trade_license_2024.pdf Uploaded</small>
                </div>

                <div className="seller-form-group">
                  <label>Selfie Verification Upload *</label>
                  <input type="file" accept="image/*" />
                  <small style={{ color: '#10B981', fontWeight: 700 }}>✓ selfie_verified.jpg Uploaded</small>
                </div>

                <div className="seller-form-group">
                  <label>Electricity / Utility Bill Copy Upload *</label>
                  <input type="file" accept="image/*,.pdf" />
                  <small style={{ color: '#10B981', fontWeight: 700 }}>✓ electricity_bill.pdf Uploaded</small>
                </div>

                {/* Bank Account Details */}
                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', borderBottom: '2px solid #EFF6FF', paddingBottom: '8px' }}>
                    3. Bank Information (PDF Standard)
                  </h3>
                </div>

                <div className="seller-form-group">
                  <label>Bank Name *</label>
                  <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Branch Name *</label>
                  <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>District *</label>
                  <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                </div>

                <div className="seller-form-group">
                  <label>Routing Number *</label>
                  <input type="text" value={routingNo} onChange={(e) => setRoutingNo(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width">
                  <label>Bank Account Number *</label>
                  <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} required />
                </div>

                <div className="seller-form-group full-width" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn-seller-primary" style={{ justifyContent: 'center' }}>
                    Save & Update Verification Info
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

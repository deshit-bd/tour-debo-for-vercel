'use client';

import { useState, useRef, useEffect } from 'react';

export default function AddressSegment({ onChange, initialCountry = 'Bangladesh' }) {
  const [countriesList, setCountriesList] = useState([]);
  const [bdData, setBdData] = useState({});
  const [loading, setLoading] = useState(true);

  const [country, setCountry] = useState(initialCountry);
  const [searchTerm, setSearchTerm] = useState(initialCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cascading state for Bangladesh
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [policeStation, setPoliceStation] = useState('Dhanmondi');
  const [postOffice, setPostOffice] = useState('Dhanmondi TSO (1205)');
  const [areaVillage, setAreaVillage] = useState('Road #7, Block D');
  const [postCode, setPostCode] = useState('1205');

  // International Form State
  const [otherForm, setOtherForm] = useState({
    fullName: 'Sanjid Ibrahim',
    mobile: '+1 415 555 2671',
    province: 'California',
    city: 'San Francisco',
    area: 'Downtown',
    fullAddress: '742 Evergreen Terrace, San Francisco, CA 94107',
  });

  // Fetch backend API endpoints for Countries and BD Location Hierarchy
  useEffect(() => {
    async function fetchLocationData() {
      try {
        const [cRes, bdRes] = await Promise.all([
          fetch('/api/location/countries'),
          fetch('/api/location/bd-hierarchy'),
        ]);

        const cData = await cRes.json();
        const bdDataJson = await bdRes.json();

        if (cData.success) setCountriesList(cData.countries);
        if (bdDataJson.success) setBdData(bdDataJson.hierarchy);
      } catch (err) {
        console.error('Failed to load backend location data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLocationData();
  }, []);

  // Calculate cascading options from backend data
  const divisionsList = Object.keys(bdData);
  const districtsList = Object.keys(bdData[division] || {});
  const psList = Object.keys((bdData[division] && bdData[division][district]) || {});
  const poList = (bdData[division] && bdData[division][district] && bdData[division][district][policeStation]) || [];

  // Division Change -> reset District, Police Station, Post Office
  const handleDivisionChange = (newDiv) => {
    setDivision(newDiv);
    const newDistList = Object.keys(bdData[newDiv] || {});
    const firstDist = newDistList[0] || '';
    setDistrict(firstDist);

    const newPsList = Object.keys((bdData[newDiv] && bdData[newDiv][firstDist]) || {});
    const firstPs = newPsList[0] || '';
    setPoliceStation(firstPs);

    const newPoList = (bdData[newDiv] && bdData[newDiv][firstDist] && bdData[newDiv][firstDist][firstPs]) || [];
    const firstPo = newPoList[0] || '';
    setPostOffice(firstPo);

    if (onChange) {
      onChange({ type: 'Bangladesh', division: newDiv, district: firstDist, policeStation: firstPs, postOffice: firstPo, areaVillage, postCode });
    }
  };

  // District Change -> reset Police Station, Post Office
  const handleDistrictChange = (newDist) => {
    setDistrict(newDist);
    const newPsList = Object.keys((bdData[division] && bdData[division][newDist]) || {});
    const firstPs = newPsList[0] || '';
    setPoliceStation(firstPs);

    const newPoList = (bdData[division] && bdData[division][newDist] && bdData[division][newDist][firstPs]) || [];
    const firstPo = newPoList[0] || '';
    setPostOffice(firstPo);

    if (onChange) {
      onChange({ type: 'Bangladesh', division, district: newDist, policeStation: firstPs, postOffice: firstPo, areaVillage, postCode });
    }
  };

  // Police Station Change -> reset Post Office
  const handlePoliceStationChange = (newPs) => {
    setPoliceStation(newPs);
    const newPoList = (bdData[division] && bdData[division][district] && bdData[division][district][newPs]) || [];
    const firstPo = newPoList[0] || '';
    setPostOffice(firstPo);

    if (onChange) {
      onChange({ type: 'Bangladesh', division, district, policeStation: newPs, postOffice: firstPo, areaVillage, postCode });
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countriesList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCountry = (cObj) => {
    setCountry(cObj.name);
    setSearchTerm(`${cObj.flag} ${cObj.name}`);
    setIsDropdownOpen(false);
  };

  const handleOtherChange = (e) => {
    const updated = { ...otherForm, [e.target.name]: e.target.value };
    setOtherForm(updated);
    if (onChange) onChange({ type: 'Other', country, ...updated });
  };

  const currentFlag = countriesList.find((c) => c.name.toLowerCase() === country.toLowerCase())?.flag || '🇧🇩';

  if (loading) {
    return (
      <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', marginTop: '20px' }}>
        <span style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 'bold' }}>⚡ Loading location data from backend API...</span>
      </div>
    );
  }

  return (
    <div className="address-segment-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', marginTop: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>📍 Address Segment</h3>
          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '4px 0 0 0' }}>Backend API driven location fields and dynamic country search.</p>
        </div>

        {/* SEARCHABLE COUNTRY SELECTOR */}
        <div ref={dropdownRef} style={{ position: 'relative', minWidth: '240px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Select / Type Country:</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                setSearchTerm('');
                setIsDropdownOpen(true);
              }}
              placeholder="Type country name..."
              style={{
                width: '100%',
                padding: '9px 34px 9px 12px',
                borderRadius: '8px',
                border: '1.5px solid #2563EB',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: '#EFF6FF',
                color: '#1E40AF',
                outline: 'none',
              }}
            />
            <span
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ position: 'absolute', right: '12px', fontSize: '0.75rem', cursor: 'pointer', color: '#2563EB', fontWeight: 'bold' }}
            >
              ▼
            </span>
          </div>

          {/* Floating Dropdown List */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                maxHeight: '260px',
                overflowY: 'auto',
                background: '#ffffff',
                border: '1.5px solid #2563EB',
                borderRadius: '8px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                zIndex: 9999,
              }}
            >
              {filteredCountries.length === 0 ? (
                <div style={{ padding: '12px', fontSize: '0.85rem', color: '#64748B', textAlign: 'center' }}>
                  No matching country found
                </div>
              ) : (
                filteredCountries.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => handleSelectCountry(c)}
                    style={{
                      padding: '10px 14px',
                      fontSize: '0.88rem',
                      fontWeight: country.toLowerCase() === c.name.toLowerCase() ? '800' : '600',
                      color: country.toLowerCase() === c.name.toLowerCase() ? '#2563EB' : '#1E293B',
                      background: country.toLowerCase() === c.name.toLowerCase() ? '#EFF6FF' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderBottom: '1px solid #F1F5F9',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = country.toLowerCase() === c.name.toLowerCase() ? '#EFF6FF' : '#ffffff')}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{c.flag}</span>
                    <span>{c.name}</span>
                    <small style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 'bold' }}>{c.code}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* FORM TYPE 1: FOR BANGLADESH */}
      {country.toLowerCase() === 'bangladesh' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {/* Division */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Division *</label>
              <select
                name="division"
                value={division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none', cursor: 'pointer' }}
              >
                {divisionsList.map((div) => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>District *</label>
              <select
                name="district"
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none', cursor: 'pointer' }}
              >
                {districtsList.map((dis) => (
                  <option key={dis} value={dis}>{dis}</option>
                ))}
              </select>
            </div>

            {/* Police Station */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Police Station *</label>
              <select
                name="policeStation"
                value={policeStation}
                onChange={(e) => handlePoliceStationChange(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none', cursor: 'pointer' }}
              >
                {psList.map((ps) => (
                  <option key={ps} value={ps}>{ps}</option>
                ))}
              </select>
            </div>

            {/* Post Office */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Post Office *</label>
              <select
                name="postOffice"
                value={postOffice}
                onChange={(e) => setPostOffice(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff', outline: 'none', cursor: 'pointer' }}
              >
                {poList.map((po) => (
                  <option key={po} value={po}>{po}</option>
                ))}
              </select>
            </div>

            {/* Area / Village */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Area / Village:</label>
              <input
                type="text"
                name="areaVillage"
                value={areaVillage}
                onChange={(e) => setAreaVillage(e.target.value)}
                placeholder="e.g. Road 7, Block D"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Post Code */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Post Code:</label>
              <input
                type="text"
                name="postCode"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                placeholder="e.g. 1205"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* FORM TYPE 2: FOR OTHER COUNTRY */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {/* Full Name */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={otherForm.fullName}
                onChange={handleOtherChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Mobile */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={otherForm.mobile}
                onChange={handleOtherChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Province */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Province / State</label>
              <input
                type="text"
                name="province"
                value={otherForm.province}
                onChange={handleOtherChange}
                placeholder="Select or enter province"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* City */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>City</label>
              <input
                type="text"
                name="city"
                value={otherForm.city}
                onChange={handleOtherChange}
                placeholder="Select or enter city"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Area */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Area / Zip Code</label>
              <input
                type="text"
                name="area"
                value={otherForm.area}
                onChange={handleOtherChange}
                placeholder="Select or enter area"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Full Address */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Full Address</label>
              <input
                type="text"
                name="fullAddress"
                value={otherForm.fullAddress}
                onChange={handleOtherChange}
                placeholder="Enter complete address"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

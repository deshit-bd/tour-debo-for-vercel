'use client';

import { useState, useEffect, useRef } from 'react';

const VISA_COUNTRIES = [
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE (Dubai)', flag: '🇦🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

export const defaultVisaFilters = {
  rating: 1,
  maxPriceBdt: 60000,
  countrySearch: '',
  onlyOffer: false,
  countryType: [],
  selectedCountries: [],
  visaType: [],
};

export default function VisaFilterSidebar({ filters = defaultVisaFilters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const update = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const toggleArr = (key, item) => {
    const list = localFilters[key] || [];
    const next = list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
    update(key, next);
  };

  const handleReset = () => {
    setLocalFilters(defaultVisaFilters);
    setCountrySearch('');
    setIsCountryDropdownOpen(false);
    if (onFilterChange) onFilterChange(defaultVisaFilters);
  };

  const filteredCountries = VISA_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <aside className="figma-filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="btn-reset-filter" onClick={handleReset}>Reset</button>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <label className="filter-group-title">Ratings</label>
        <div className="star-rating-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star-icon ${star <= (localFilters.rating || 1) ? 'active' : ''}`}
              onClick={() => update('rating', star)}
              style={{ cursor: 'pointer' }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Service Charge Range (BDT) */}
      <div className="filter-group">
        <label className="filter-group-title" style={{ fontSize: '0.83rem', whiteSpace: 'nowrap' }}>
          Service Charge Range (৳{(localFilters.maxPriceBdt || 60000).toLocaleString()})
        </label>
        <div className="price-slider-wrap">
          <input
            type="range"
            min="6000"
            max="60000"
            step="1000"
            value={localFilters.maxPriceBdt || 60000}
            onChange={(e) => update('maxPriceBdt', Number(e.target.value))}
            className="custom-range-input"
          />
          <div className="price-labels">
            <span>৳6,000</span>
            <span>৳60,000</span>
          </div>
        </div>
      </div>

      {/* Country Search */}
      <div className="filter-group">
        <label className="filter-group-title">Search Country</label>
        <div className="select-location-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="e.g. Canada, Japan..."
            value={localFilters.countrySearch || ''}
            onChange={(e) => update('countrySearch', e.target.value)}
          />
        </div>
      </div>

      {/* Offer Only */}
      <div className="filter-group">
        <label className="checkbox-item bold-label">
          <input
            type="checkbox"
            checked={!!localFilters.onlyOffer}
            onChange={(e) => update('onlyOffer', e.target.checked)}
          />
          <span className="checkmark"></span>
          Offer Packages Only
        </label>
      </div>

      {/* Country Type */}
      <div className="filter-group">
        <label className="filter-group-title">Country</label>
        <div className="checkbox-list">
          {['Single Country', 'Multi - Country'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.countryType || []).includes(item)}
                onChange={() => toggleArr('countryType', item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* Country Multi-select Dropdown - Only shown when 'Multi - Country' is selected */}
        {(localFilters.countryType || []).includes('Multi - Country') && (
          <div ref={dropdownRef} style={{ marginTop: '10px', position: 'relative' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px', display: 'block' }}>
              Select Countries:
            </label>

            {/* Dropdown Trigger */}
            <div
              onClick={() => setIsCountryDropdownOpen((p) => !p)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#fff', border: `1px solid ${isCountryDropdownOpen ? '#2563EB' : '#CBD5E1'}`,
                borderRadius: '10px', padding: '8px 12px', cursor: 'pointer',
                boxShadow: isCountryDropdownOpen ? '0 0 0 3px rgba(37,99,235,0.12)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                {(localFilters.selectedCountries || []).length > 0
                  ? `${localFilters.selectedCountries.length} selected`
                  : 'Select countries...'}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
                <polyline points={isCountryDropdownOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </div>

            {/* Dropdown List */}
            {isCountryDropdownOpen && (
              <div style={{
                position: 'absolute', top: '44px', left: 0, right: 0, zIndex: 999,
                background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)', overflow: 'hidden',
              }}>
                <div style={{ padding: '8px' }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%', padding: '6px 10px', border: '1px solid #E2E8F0',
                      borderRadius: '8px', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '4px 8px' }}>
                  {filteredCountries.map((c) => {
                    const isSelected = (localFilters.selectedCountries || []).includes(c.name);
                    return (
                      <label
                        key={c.code}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '6px 8px', borderRadius: '6px', cursor: 'pointer',
                          background: isSelected ? '#EFF6FF' : 'transparent',
                          fontSize: '0.82rem', fontWeight: isSelected ? '700' : '500',
                          color: isSelected ? '#1D4ED8' : '#334155',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleArr('selectedCountries', c.name)}
                        />
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected Country Badges */}
            {(localFilters.selectedCountries || []).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                {localFilters.selectedCountries.map((c) => (
                  <span
                    key={c}
                    style={{
                      background: '#DBEAFE', color: '#1E40AF', fontSize: '0.72rem',
                      fontWeight: '700', padding: '2px 8px', borderRadius: '999px',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                    }}
                  >
                    {c}
                    <span
                      onClick={() => toggleArr('selectedCountries', c)}
                      style={{ cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                    >
                      ✕
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visa Type */}
      <div className="filter-group">
        <label className="filter-group-title">Visa Type</label>
        <div className="checkbox-list">
          {[
            { value: 'Student', label: '🎓 Student Visa' },
            { value: 'Tourist', label: '✈️ Tourist Visa' },
            { value: 'Work', label: '💼 Work Visa' },
            { value: 'Business', label: '🏢 Business Visa' },
            { value: 'Hajj', label: '🕋 Hajj Visa' },
            { value: 'Umrah', label: '🕌 Umrah Hajj' },
          ].map((item) => (
            <label key={item.value} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.visaType || []).includes(item.value)}
                onChange={() => toggleArr('visaType', item.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

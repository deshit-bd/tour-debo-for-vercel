'use client';

import { useState } from 'react';

const defaultFilterState = {
  rating: 1,
  maxPrice: 300,
  startingPoint: '',
  onlyOffer: false,
  countryType: [],
  packageType: [],
  duration: [],
  transportation: [],
  meal: [],
  accommodation: [],
  sightseeing: [],
};

export default function FilterSidebar({ filters = defaultFilterState, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilters = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    if (onFilterChange) {
      onFilterChange(updated);
    }
  };

  const toggleArrayItem = (key, item) => {
    const currentList = localFilters[key] || [];
    const updatedList = currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
    updateFilters(key, updatedList);
  };

  const handleReset = () => {
    setLocalFilters(defaultFilterState);
    if (onFilterChange) {
      onFilterChange(defaultFilterState);
    }
  };

  return (
    <aside className="figma-filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="btn-reset-filter" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Ratings */}
      <div className="filter-group">
        <label className="filter-group-title">Ratings</label>
        <div className="star-rating-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star-icon ${star <= (localFilters.rating || 1) ? 'active' : ''}`}
              onClick={() => updateFilters('rating', star)}
              style={{ cursor: 'pointer' }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label className="filter-group-title">
          Price Range (${localFilters.maxPrice || 300})
        </label>
        <div className="price-slider-wrap">
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={localFilters.maxPrice || 300}
            onChange={(e) => updateFilters('maxPrice', Number(e.target.value))}
            className="custom-range-input"
          />
          <div className="price-labels">
            <span>$50</span>
            <span>$300</span>
          </div>
        </div>
      </div>

      {/* Starting Point */}
      <div className="filter-group">
        <label className="filter-group-title">Starting Point</label>
        <div className="select-location-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder="Search Location (e.g. Dhaka, Cox's)"
            value={localFilters.startingPoint || ''}
            onChange={(e) => updateFilters('startingPoint', e.target.value)}
          />
        </div>
      </div>

      {/* Offer */}
      <div className="filter-group">
        <label className="checkbox-item bold-label">
          <input
            type="checkbox"
            checked={!!localFilters.onlyOffer}
            onChange={(e) => updateFilters('onlyOffer', e.target.checked)}
          />
          <span className="checkmark"></span>
          Offer Packages Only
        </label>
      </div>

      {/* Country */}
      <div className="filter-group">
        <label className="filter-group-title">Country</label>
        <div className="checkbox-list">
          {['Single Country', 'Multi - Country'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.countryType || []).includes(item)}
                onChange={() => toggleArrayItem('countryType', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Package Type */}
      <div className="filter-group">
        <label className="filter-group-title">Package Type</label>
        <div className="checkbox-list">
          {['Family', 'Group', 'Couple'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.packageType || []).includes(item)}
                onChange={() => toggleArrayItem('packageType', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Package Duration */}
      <div className="filter-group">
        <label className="filter-group-title">Package Duration</label>
        <div className="checkbox-list">
          {['3 Days', '5 Days', '7 Days'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.duration || []).includes(item)}
                onChange={() => toggleArrayItem('duration', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div className="filter-group">
        <label className="filter-group-title">Transportation</label>
        <div className="checkbox-list">
          {['Include', 'Partial Include', 'Exclude'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.transportation || []).includes(item)}
                onChange={() => toggleArrayItem('transportation', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Meal */}
      <div className="filter-group">
        <label className="filter-group-title">Meal</label>
        <div className="checkbox-list">
          {['Breakfast', 'Lunch', 'Dinner', 'All Include'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.meal || []).includes(item)}
                onChange={() => toggleArrayItem('meal', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Accommodation Type */}
      <div className="filter-group">
        <label className="filter-group-title">Accommodation Type</label>
        <div className="checkbox-grid-2col">
          {[
            '5 Star',
            'Bamboo Cottage',
            '4 Star',
            'Tent',
            '3 Star',
            'Wooden Boat',
            '2 Star',
            'Ship',
          ].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.accommodation || []).includes(item)}
                onChange={() => toggleArrayItem('accommodation', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Sightseeing */}
      <div className="filter-group">
        <label className="filter-group-title">Sightseeing</label>
        <div className="checkbox-grid-2col">
          {[
            'Sea',
            'Nature',
            'Mountain',
            'Lake',
            'river',
            'Forest',
            'City',
          ].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.sightseeing || []).includes(item)}
                onChange={() => toggleArrayItem('sightseeing', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

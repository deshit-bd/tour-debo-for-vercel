'use client';

import { useState, useEffect, useRef } from 'react';

const defaultFilterState = {
  rating: 1,
  maxPrice: 300,
  maxDays: 30,
  startingPoint: '',
  onlyOffer: false,
  localTour: false,
  countryType: [],
  selectedCountries: [],
  packageType: [],
  duration: [],
  transportation: [],
  meal: [],
  accommodation: [],
  sightseeing: [],
  languages: [],
  foods: [],
};

const AVAILABLE_COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
  { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'TL', name: 'East Timor (Timor-Leste)', flag: '🇹🇱' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CI', name: "Ivory Coast (Côte d'Ivoire)", flag: '🇨🇮' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey (Türkiye)', aliases: 'turkey turkiye', flag: '🇹🇷' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'AE', name: 'UAE (Dubai)', aliases: 'uae dubai emirates united arab emirates', flag: '🇦🇪' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'GB', name: 'UK (United Kingdom)', aliases: 'uk united kingdom england britain british', flag: '🇬🇧' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'US', name: 'USA (United States of America)', aliases: 'america usa united states us american', flag: '🇺🇸' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
];

const AVAILABLE_LANGUAGES = [
  'English', 'Bengali', 'Sylheti', 'Chakma', 'Marma', 'Garo', 'Santali', 'Tripura (Kokborok)', 'Hajong', 'Tanchangya',
  'Spanish', 'French', 'German', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese', 'Arabic', 'Hindi', 'Russian', 'Portuguese',
  'Italian', 'Korean', 'Turkish', 'Dutch', 'Vietnamese', 'Thai', 'Urdu', 'Persian (Farsi)', 'Malay', 'Indonesian',
  'Swedish', 'Polish', 'Greek', 'Hebrew', 'Filipino (Tagalog)', 'Czech', 'Romanian', 'Hungarian', 'Danish', 'Finnish',
  'Norwegian', 'Ukrainian', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Swahili', 'Amharic', 'Somali',
  'Afrikaans', 'Nepali', 'Sinhala', 'Burmese', 'Khmer', 'Lao', 'Tibetan', 'Mongolian', 'Kazakh', 'Uzbek',
  'Azerbaijani', 'Georgian', 'Armenian', 'Tajik', 'Turkmen', 'Kyrgyz', 'Pashto', 'Kurdish (Kurmanji)', 'Kurdish (Sorani)', 'Balochi',
  'Sindhi', 'Kashmiri', 'Assamese', 'Odia', 'Malayalam', 'Kannada', 'Bhojpuri', 'Maithili', 'Magahi', 'Chhattisgarhi',
  'Haryanvi', 'Rajasthani', 'Konkani', 'Manipuri (Meitei)', 'Mizo', 'Nagamese', 'Khasi', 'Bodo', 'Dogri', 'Dhivehi',
  'Javanese', 'Sundanese', 'Madurese', 'Minangkabau', 'Buginese', 'Balinese', 'Cebuano', 'Ilocano', 'Hiligaynon', 'Bikol',
  'Maori', 'Samoan', 'Tongan', 'Fijian', 'Tahitian', 'Hawaiian', 'Chamorro', 'Palauan', 'Marshallese', 'Bislama',
  'Tok Pisin', 'Irish (Gaeilge)', 'Scottish Gaelic', 'Welsh', 'Breton', 'Basque (Euskara)', 'Catalan', 'Galician', 'Corsican', 'Sardinian',
  'Maltese', 'Icelandic', 'Faroese', 'Luxembourgish', 'Frisian', 'Yiddish', 'Ladino', 'Esperanto', 'Latin', 'Ancient Greek',
  'Albanian', 'Macedonian', 'Bulgarian', 'Serbian', 'Croatian', 'Bosnian', 'Slovenian', 'Slovak', 'Belarusian', 'Lithuanian',
  'Latvian', 'Estonian', 'Finnish (Suomi)', 'Saami', 'Tatar', 'Bashkir', 'Chuvash', 'Chechen', 'Avar', 'Ossetian',
  'Abkhaz', 'Circassian', 'Uyghur', 'Dungan', 'Hakka', 'Min Nan (Hokkien)', 'Wu (Shanghainese)', 'Xiang', 'Gan', 'Zulu',
  'Xhosa', 'Yoruba', 'Igbo', 'Hausa', 'Oromo', 'Tigrinya', 'Shona', 'Chichewa (Nyanja)', 'Kinyarwanda', 'Kirundi',
  'Luganda', 'Lingala', 'Kikongo', 'Wolof', 'Bambara', 'Fulani (Fula)', 'Akan (Twi)', 'Ewe', 'Ga', 'Fon',
  'Sango', 'Malagasy', 'Seychellois Creole', 'Mauritian Creole', 'Haitian Creole', 'Papiamento', 'Quechua', 'Aymara', 'Guarani', 'Nahuatl',
  'Mayan (K\'iche\')', 'Mapudungun', 'Navajo', 'Cherokee', 'Inuktitut', 'Greenlandic (Kalaallisut)', 'Dari', 'Tajiki', 'Karen', 'Shan', 'Mon'
];

export default function FilterSidebar({ filters = defaultFilterState, onFilterChange, mode = 'tour', hideCountryType = false }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef(null);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const langDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsCountryDropdownOpen(false);
    setIsLangDropdownOpen(false);
    setCountrySearch('');
    setLangSearch('');
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

      {/* Price / Service Charge Range */}
      <div className="filter-group">
        <label className="filter-group-title" style={{ fontSize: '0.83rem', whiteSpace: 'nowrap' }}>
          {mode === 'visa' ? 'Service Charge Range' : 'Price Range'} (${localFilters.maxPrice || (mode === 'visa' ? 500 : 300)})
        </label>
        <div className="price-slider-wrap">
          <input
            type="range"
            min="50"
            max={mode === 'visa' ? 500 : 300}
            step="10"
            value={localFilters.maxPrice || (mode === 'visa' ? 500 : 300)}
            onChange={(e) => updateFilters('maxPrice', Number(e.target.value))}
            className="custom-range-input"
          />
          <div className="price-labels">
            <span>$50</span>
            <span>${mode === 'visa' ? 500 : 300}</span>
          </div>
        </div>
      </div>

      {/* Starting Country */}
      <div className="filter-group">
        <label className="filter-group-title">Starting Country</label>
        <div className="select-location-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <select
            value={localFilters.startingCountry || 'Bangladesh'}
            onChange={(e) => updateFilters('startingCountry', e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#0F172A',
              cursor: 'pointer',
            }}
          >
            <option value="Bangladesh">🇧🇩 Bangladesh</option>
            <option value="India">🇮🇳 India</option>
            <option value="Nepal">🇳🇵 Nepal</option>
            <option value="Thailand">🇹🇭 Thailand</option>
            <option value="UAE">🇦🇪 UAE</option>
            <option value="France">🇫🇷 France</option>
            <option value="USA">🇺🇸 USA</option>
          </select>
        </div>
      </div>

      {/* Starting Point */}
      <div className="filter-group">
        <label className="filter-group-title">{mode === 'visa' ? 'Search Country' : 'Starting Point (City)'}</label>
        <div className="select-location-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder={mode === 'visa' ? 'Search Country (e.g. Canada, Japan)' : "Search Location (e.g. Dhaka, Cox's)"}
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
      {!hideCountryType && (
      <div className="filter-group">
        <label className="filter-group-title">Country</label>
        <div className="checkbox-list">

          {/* Local Tour Toggle — hidden in visa mode */}
          {mode !== 'visa' && (
          <label className="checkbox-item" style={{
            background: localFilters.localTour ? 'linear-gradient(135deg, #DCFCE7, #BBF7D0)' : 'transparent',
            border: localFilters.localTour ? '1px solid #86EFAC' : '1px solid transparent',
            borderRadius: '8px',
            padding: '6px 10px',
            fontWeight: localFilters.localTour ? '700' : '500',
            color: localFilters.localTour ? '#15803D' : '#334155',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={localFilters.localTour || false}
              onChange={() => updateFilters('localTour', !localFilters.localTour)}
            />
            🏠 Local Tour
          </label>
          )}

          {['Single Country', 'Multi - Country'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.countryType || []).includes(item)}
                onChange={() => {
                  toggleArrayItem('countryType', item);
                  if (item === 'Multi - Country' && !(localFilters.countryType || []).includes('Multi - Country')) {
                    setIsCountryDropdownOpen(true);
                  }
                }}
              />
              {item}
            </label>
          ))}
        </div>

        {/* Multi-Country Typeable Combobox Input (Shown when Multi - Country is checked) */}
        {(localFilters.countryType || []).includes('Multi - Country') && (
          <div ref={countryDropdownRef} style={{ marginTop: '10px', position: 'relative' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px', display: 'block' }}>
              Select Multi-Countries:
            </label>
            
            {/* Typeable Input Capsule */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '2px 10px',
                boxShadow: isCountryDropdownOpen ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none',
                borderColor: isCountryDropdownOpen ? '#2563EB' : '#CBD5E1',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="text"
                placeholder={
                  (localFilters.selectedCountries || []).length > 0
                    ? `Search (${localFilters.selectedCountries.length} selected)...`
                    : 'Type country name (e.g. America, France)...'
                }
                value={countrySearch}
                onFocus={() => setIsCountryDropdownOpen(true)}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setIsCountryDropdownOpen(true);
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  padding: '8px 0',
                  fontSize: '0.82rem',
                  color: '#1E293B',
                  fontWeight: '500',
                  background: 'transparent',
                }}
              />

              <span
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#64748B', paddingLeft: '6px' }}
              >
                {isCountryDropdownOpen ? '▲' : '▼'}
              </span>
            </div>

            {/* Scrollable Checkbox List Popup (No Duplicate Search Bar!) */}
            {isCountryDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(15,23,42,0.18)',
                  border: '1px solid #E2E8F0',
                  padding: '8px',
                  zIndex: 50,
                  maxHeight: '210px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {AVAILABLE_COUNTRIES.filter((c) => {
                    const q = countrySearch.toLowerCase().trim();
                    if (!q) return true;
                    const matchName = c.name.toLowerCase().includes(q);
                    const matchAlias = c.aliases ? c.aliases.toLowerCase().includes(q) : false;
                    const matchCode = c.code ? c.code.toLowerCase().includes(q) : false;
                    return matchName || matchAlias || matchCode;
                  }).map((country) => {
                    const isSelected = (localFilters.selectedCountries || []).includes(country.name);
                    return (
                      <label
                        key={country.code}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: isSelected ? '#EFF6FF' : 'transparent',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? '700' : '500',
                          color: isSelected ? '#1D4ED8' : '#334155',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleArrayItem('selectedCountries', country.name)}
                        />
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
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
                      background: '#DBEAFE',
                      color: '#1E40AF',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {c}
                    <span
                      onClick={() => toggleArrayItem('selectedCountries', c)}
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
      )}

      {/* Package Type — tour only */}
      {mode !== 'visa' && (
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
      )}

      {/* Package Duration Range Slider — tour only */}
      {mode !== 'visa' && (
      <div className="filter-group">
        <label className="filter-group-title" style={{ fontSize: '0.83rem', whiteSpace: 'nowrap' }}>
          Package Duration ({localFilters.maxDays || 30} Days)
        </label>
        <div className="price-slider-wrap">
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={localFilters.maxDays || 30}
            onChange={(e) => updateFilters('maxDays', Number(e.target.value))}
            className="custom-range-input"
          />
          <div className="price-labels">
            <span>1 Day</span>
            <span>30 Days</span>
          </div>
        </div>
      </div>
      )}



      {/* Accommodation Type — tour only */}
      {mode !== 'visa' && (
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
      )}

      {/* Languages Typeable Multi-Select Combobox Dropdown */}
      {mode !== 'visa' && (
      <div className="filter-group">
        <label className="filter-group-title">Languages</label>
        <div ref={langDropdownRef} style={{ marginTop: '6px', position: 'relative' }}>
          {/* Typeable Search Input Capsule */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '2px 10px',
              boxShadow: isLangDropdownOpen ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none',
              borderColor: isLangDropdownOpen ? '#2563EB' : '#CBD5E1',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="text"
              placeholder={
                (localFilters.languages || []).length > 0
                  ? `Search (${localFilters.languages.length} selected)...`
                  : 'Type language name (e.g. English, French)...'
              }
              value={langSearch}
              onFocus={() => setIsLangDropdownOpen(true)}
              onChange={(e) => {
                setLangSearch(e.target.value);
                setIsLangDropdownOpen(true);
              }}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                padding: '8px 0',
                fontSize: '0.82rem',
                color: '#1E293B',
                fontWeight: '500',
                background: 'transparent',
              }}
            />

            <span
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#64748B', paddingLeft: '6px' }}
            >
              {isLangDropdownOpen ? '▲' : '▼'}
            </span>
          </div>

          {/* Scrollable Checkbox List Popup */}
          {isLangDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '105%',
                left: 0,
                right: 0,
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 12px 32px rgba(15,23,42,0.18)',
                border: '1px solid #E2E8F0',
                padding: '8px',
                zIndex: 50,
                maxHeight: '210px',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {AVAILABLE_LANGUAGES.filter((lang) => {
                  const q = langSearch.toLowerCase().trim();
                  if (!q) return true;
                  return lang.toLowerCase().includes(q);
                }).map((lang) => {
                  const isSelected = (localFilters.languages || []).includes(lang);
                  return (
                    <label
                      key={lang}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: isSelected ? '#EFF6FF' : 'transparent',
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? '700' : '500',
                        color: isSelected ? '#1D4ED8' : '#334155',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleArrayItem('languages', lang)}
                      />
                      <span>{lang}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Language Pill Badges for Clear Visual Feedback */}
          {(localFilters.languages || []).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
              {localFilters.languages.map((lang) => (
                <span
                  key={lang}
                  style={{
                    background: '#DBEAFE',
                    color: '#1E40AF',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  🌐 {lang}
                  <span
                    onClick={() => toggleArrayItem('languages', lang)}
                    style={{ cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      )}

      {/* Foods (Breakfast, Lunch, Snacks, Dinner, Street Foods) */}
      {mode !== 'visa' && (
      <div className="filter-group">
        <label className="filter-group-title">Foods</label>
        <div className="checkbox-list">
          {['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Street Foods'].map((item) => (
            <label key={item} className="checkbox-item">
              <input
                type="checkbox"
                checked={(localFilters.foods || []).includes(item)}
                onChange={() => toggleArrayItem('foods', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      )}

      {/* Guide Languages & Specialty — tour only */}
      {mode !== 'visa' && (
      <div className="filter-group">
        <label className="filter-group-title">Guide Specialty</label>
        <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #CBD5E1', padding: '6px 12px', marginTop: '6px' }}>
          <select
            value={(localFilters.sightseeing || [])[0] || ''}
            onChange={(e) => {
              const val = e.target.value;
              updateFilters('sightseeing', val ? [val] : []);
            }}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: '600',
              color: '#1E293B',
              cursor: 'pointer',
            }}
          >
            <option value="">All Specialties ▾</option>
            <option value="English Guide">English Guide</option>
            <option value="Bengali Guide">Bengali Guide</option>
            <option value="Sylheti Guide">Sylheti Guide</option>
            <option value="Chakma Guide">Chakma Guide</option>
            <option value="French Guide">French Guide</option>
            <option value="Photography Expert">Photography Expert</option>
            <option value="Certified Instructor">Certified Instructor</option>
          </select>
        </div>
      </div>
      )}
    </aside>
  );
}

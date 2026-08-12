'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SellerSidebar from '../../components/SellerSidebar';

const ALL_WORLD_COUNTRIES = [
  'Bangladesh',
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'United Arab Emirates', 'Uganda', 'Ukraine', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
];

const SAMPLE_VISAS_MAP = {
  'visa-usa-001': {
    country: 'United States', capital: 'Washington, D.C.', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', processingTime: '5-7 Working Days',
    localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 USD is equivalent to 118 BDT', embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '2400',
    dynamicPricingItems: [
      { id: 1, title: '30 Days Single Entry', regularPrice: '10000', discountType: 'percentage', discountValue: '10' },
      { id: 2, title: '90 Days Multiple Entry', regularPrice: '36000', discountType: 'amount', discountValue: '2000' }
    ]
  },
  'visa-uk-001': {
    country: 'United Kingdom', capital: 'London', visaType: 'Student Visa', visaAvailableLabel: 'Student Visa Available', processingTime: '10-15 Working Days',
    localTime: 'GMT +0', telephoneCode: '+44', exchangeRate: '1 GBP is equivalent to 140 BDT', embassyAddress: 'United Nations Road, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '1800',
    dynamicPricingItems: [
      { id: 1, title: '6 Months Single Entry', regularPrice: '15000', discountType: 'percentage', discountValue: '5' },
      { id: 2, title: '1 Year Multiple Entry', regularPrice: '35000', discountType: 'amount', discountValue: '3000' }
    ]
  },
  'visa-dubai-001': {
    country: 'United Arab Emirates', capital: 'Abu Dhabi', visaType: 'Tourist Visa', visaAvailableLabel: 'Tourist Visa Available', processingTime: '3-5 Working Days',
    localTime: 'GMT +4', telephoneCode: '+971', exchangeRate: '1 AED is equivalent to 32 BDT', embassyAddress: 'House 19, Road 143, Gulshan 2, Dhaka 1212, Bangladesh',
    visaFee: '1800',
    dynamicPricingItems: [
      { id: 1, title: '30 Days Single Entry', regularPrice: '12000', discountType: 'percentage', discountValue: '10' },
      { id: 2, title: '60 Days Multiple Entry', regularPrice: '25000', discountType: 'amount', discountValue: '1500' }
    ]
  }
};

const ADMIN_COUNTRY_CONFIGS = {
  'Thailand': { capital: 'Bangkok', localTime: 'GMT +7', telephoneCode: '+66', exchangeRate: '1 THB is equivalent to 3.3 BDT', visaFee: '1800', embassyAddress: 'Royal Thai Embassy, 18 & 20 Madani Avenue, Baridhara, Dhaka 1212' },
  'United States': { capital: 'Washington, D.C.', localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 USD is equivalent to 118 BDT', visaFee: '2400', embassyAddress: 'Embassy of the United States, Madani Avenue, Baridhara, Dhaka 1212' },
  'United Kingdom': { capital: 'London', localTime: 'GMT +0', telephoneCode: '+44', exchangeRate: '1 GBP is equivalent to 148 BDT', visaFee: '2100', embassyAddress: 'British High Commission, United Nations Road, Baridhara, Dhaka 1212' },
  'Canada': { capital: 'Ottawa', localTime: 'GMT -5', telephoneCode: '+1', exchangeRate: '1 CAD is equivalent to 87 BDT', visaFee: '2200', embassyAddress: 'High Commission of Canada, United Nations Road, Baridhara, Dhaka 1212' },
  'Japan': { capital: 'Tokyo', localTime: 'GMT +9', telephoneCode: '+81', exchangeRate: '1 JPY is equivalent to 0.77 BDT', visaFee: '1500', embassyAddress: 'Embassy of Japan, Plot No. 5 & 7, Dutabash Road, Baridhara, Dhaka 1212' },
  'Malaysia': { capital: 'Kuala Lumpur', localTime: 'GMT +8', telephoneCode: '+60', exchangeRate: '1 MYR is equivalent to 26.5 BDT', visaFee: '1600', embassyAddress: 'High Commission of Malaysia, House 19, Road 6, Baridhara, Dhaka 1212' },
  'Singapore': { capital: 'Singapore', localTime: 'GMT +8', telephoneCode: '+65', exchangeRate: '1 SGD is equivalent to 88 BDT', visaFee: '1900', embassyAddress: 'Consulate of Singapore, House 8, Road 51, Gulshan 2, Dhaka 1212' },
  'United Arab Emirates': { capital: 'Abu Dhabi', localTime: 'GMT +4', telephoneCode: '+971', exchangeRate: '1 AED is equivalent to 32 BDT', visaFee: '1800', embassyAddress: 'Embassy of the UAE, House 19, Road 143, Gulshan 2, Dhaka 1212' },
  'India': { capital: 'New Delhi', localTime: 'GMT +5:30', telephoneCode: '+91', exchangeRate: '1 INR is equivalent to 1.41 BDT', visaFee: '800', embassyAddress: 'High Commission of India, Plot No 1-3, Park Road, Baridhara, Dhaka 1212' },
  'Saudi Arabia': { capital: 'Riyadh', localTime: 'GMT +3', telephoneCode: '+966', exchangeRate: '1 SAR is equivalent to 31.4 BDT', visaFee: '2500', embassyAddress: 'Royal Embassy of Saudi Arabia, House 5 (NE) L, Road 83, Gulshan 2, Dhaka 1212' },
  'Germany': { capital: 'Berlin', localTime: 'GMT +1', telephoneCode: '+49', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of Germany, 11 Madani Avenue, Baridhara, Dhaka 1212' },
  'France': { capital: 'Paris', localTime: 'GMT +1', telephoneCode: '+33', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of France, Road 108, Gulshan 2, Dhaka 1212' },
  'Turkey': { capital: 'Ankara', localTime: 'GMT +3', telephoneCode: '+90', exchangeRate: '1 TRY is equivalent to 3.6 BDT', visaFee: '2000', embassyAddress: 'Embassy of the Republic of Turkey, 6 Madani Avenue, Baridhara, Dhaka 1212' },
  'Australia': { capital: 'Canberra', localTime: 'GMT +10', telephoneCode: '+61', exchangeRate: '1 AUD is equivalent to 78 BDT', visaFee: '2400', embassyAddress: 'Australian High Commission, 184 Gulshan Avenue, Gulshan 2, Dhaka 1212' },
  'China': { capital: 'Beijing', localTime: 'GMT +8', telephoneCode: '+86', exchangeRate: '1 CNY is equivalent to 16.3 BDT', visaFee: '2200', embassyAddress: 'Embassy of China, Plot 2 & 4, Embassy Road, Baridhara, Dhaka 1212' },
  'South Korea': { capital: 'Seoul', localTime: 'GMT +9', telephoneCode: '+82', exchangeRate: '1 KRW is equivalent to 0.086 BDT', visaFee: '1800', embassyAddress: 'Embassy of South Korea, 4 Madani Avenue, Baridhara, Dhaka 1212' },
  'Italy': { capital: 'Rome', localTime: 'GMT +1', telephoneCode: '+39', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of Italy, Road 74/79, Plot 2/3, Gulshan 2, Dhaka 1212' },
  'Spain': { capital: 'Madrid', localTime: 'GMT +1', telephoneCode: '+34', exchangeRate: '1 EUR is equivalent to 127 BDT', visaFee: '2300', embassyAddress: 'Embassy of Spain, House 49, Road 90, Gulshan 2, Dhaka 1212' },
  'New Zealand': { capital: 'Wellington', localTime: 'GMT +12', telephoneCode: '+64', exchangeRate: '1 NZD is equivalent to 72 BDT', visaFee: '2400', embassyAddress: 'Consulate of New Zealand, Plot 11, Road 44, Gulshan 2, Dhaka 1212' },
  'Egypt': { capital: 'Cairo', localTime: 'GMT +2', telephoneCode: '+20', exchangeRate: '1 EGP is equivalent to 2.4 BDT', visaFee: '1600', embassyAddress: 'Embassy of Egypt, House 9, Road 90, Gulshan 2, Dhaka 1212' },
  'Vietnam': { capital: 'Hanoi', localTime: 'GMT +7', telephoneCode: '+84', exchangeRate: '1 VND is equivalent to 0.0047 BDT', visaFee: '1500', embassyAddress: 'Embassy of Vietnam, House 14, Road 33, Gulshan 2, Dhaka 1212' },
  'Indonesia': { capital: 'Jakarta', localTime: 'GMT +7', telephoneCode: '+62', exchangeRate: '1 IDR is equivalent to 0.0074 BDT', visaFee: '1400', embassyAddress: 'Embassy of Indonesia, Plot 14, Road 53, Gulshan 2, Dhaka 1212' },
  'Qatar': { capital: 'Doha', localTime: 'GMT +3', telephoneCode: '+974', exchangeRate: '1 QAR is equivalent to 32.4 BDT', visaFee: '2000', embassyAddress: 'Embassy of Qatar, House 23, Road 108, Gulshan 2, Dhaka 1212' },
  'Ivory Coast': { capital: 'Yamoussoukro', localTime: 'GMT +0', telephoneCode: '+225', exchangeRate: '1 XOF is equivalent to 0.19 BDT', visaFee: '1800', embassyAddress: 'Embassy of Ivory Coast, New Delhi (Honorary Consulate Dhaka 1212)' }
};

function AddVisaFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams ? searchParams.get('edit') : null;
  const [isEditing, setIsEditing] = useState(false);

  // ── Section 1: Basic Info (Single Visa Type per Product) ──
  const [country, setCountry] = useState('Thailand');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [visaAvailableLabel, setVisaAvailableLabel] = useState('Tourist Visa Available');
  const [processingTime, setProcessingTime] = useState('5-7 Working Days');

  // Generic Add Option Modal
  const [modalConfig, setModalConfig] = useState(null);
  const [modalInput, setModalInput] = useState('');
  const [modalError, setModalError] = useState('');

  const DEFAULT_VISA_TYPES = ['Tourist Visa', 'Business Visa', 'Student Visa', 'Medical Visa', 'PR Visa (Permanent Resident)', 'Transit Visa', 'Work Visa'];
  const DEFAULT_PROC_TIMES = ['1-2 Working Days (Express)', '3-5 Working Days', '5-7 Working Days', '10-15 Working Days', '15-30 Working Days'];

  const [customVisaTypes, setCustomVisaTypes] = useState([]);
  const [customProcTimes, setCustomProcTimes] = useState([]);

  const allVisaTypes = [...DEFAULT_VISA_TYPES, ...customVisaTypes];
  const allProcTimes = [...DEFAULT_PROC_TIMES, ...customProcTimes];

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

  // ── Section 2: Country Info (Set by Admin — Same across all seller panel) ──
  const [capital, setCapital] = useState('Bangkok');
  const [localTime, setLocalTime] = useState('GMT +7');
  const [telephoneCode, setTelephoneCode] = useState('+66');
  const [exchangeRate, setExchangeRate] = useState('1 THB is equivalent to 3.3 BDT');
  const [embassyAddress, setEmbassyAddress] = useState('Royal Thai Embassy, 18 & 20 Madani Avenue, Baridhara, Dhaka 1212');
  const [visaFee, setVisaFee] = useState('1800');
  const [processingFee, setProcessingFee] = useState('6500');

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    try {
      const savedAdminConfigs = JSON.parse(localStorage.getItem('admin_country_configs') || '{}');
      const config = savedAdminConfigs[selectedCountry] || ADMIN_COUNTRY_CONFIGS[selectedCountry] || {
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
    } catch (e) {
      console.error('Error auto-filling country config:', e);
    }
  };

  // ── Section 3: Pricing Policy (Same as Tour Package: Dynamic Options & Discount Calculator) ──
  const [dynamicPricingItems, setDynamicPricingItems] = useState([
    { id: 1, title: '30 Days', regularPrice: '6500', discountType: 'percentage', discountValue: '10' },
    { id: 2, title: '90 Days', regularPrice: '18500', discountType: 'amount', discountValue: '2000' }
  ]);

  const addPricingItem = () => {
    setDynamicPricingItems((prev) => [
      ...prev,
      { id: Date.now(), title: '', regularPrice: '', discountType: 'percentage', discountValue: '0' }
    ]);
  };

  const handlePricingItemChange = (index, field, value) => {
    setDynamicPricingItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removePricingItem = (index) => {
    if (dynamicPricingItems.length > 1) {
      setDynamicPricingItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const calculateFinalPrice = (item) => {
    const regPrice = parseFloat(item.regularPrice) || 0;
    const discVal = parseFloat(item.discountValue) || 0;
    if (regPrice <= 0) return 0;
    if (item.discountType === 'percentage') {
      const discounted = regPrice - (regPrice * discVal) / 100;
      return Math.max(0, Math.round(discounted));
    } else {
      const discounted = regPrice - discVal;
      return Math.max(0, Math.round(discounted));
    }
  };

  // ── Section 4: Child & Infant Pricing Breakdown ──
  const [childDiscountType, setChildDiscountType] = useState('percentage'); // 'percentage' | 'flat'
  const [childDiscountValue, setChildDiscountValue] = useState('50'); // 50% Off
  const [childPrice, setChildPrice] = useState('3250');
  const [infantPrice, setInfantPrice] = useState('1000');
  const [childPolicyNotes, setChildPolicyNotes] = useState('50% Off for Children aged 2-11 years. Infant processing fee is fixed at ৳1,000 for children under 2 years.');

  // Auto-sync Child Policy Notes string dynamically when discount or price values change
  useEffect(() => {
    const childDesc = childDiscountType === 'percentage'
      ? `${childDiscountValue || 0}% Off`
      : `৳${Number(childPrice || 0).toLocaleString()} fixed rate`;
    const infantDesc = infantPrice
      ? `Infant processing fee is fixed at ৳${Number(infantPrice).toLocaleString()} for children under 2 years.`
      : 'Infants under 2 years apply free or nominal fee.';
    setChildPolicyNotes(`${childDesc} for Children aged 2-11 years. ${infantDesc}`);
  }, [childDiscountType, childDiscountValue, childPrice, infantPrice]);

  // ── Section 5: Required Documents ──
  const [stickerStudentDocs, setStickerStudentDocs] = useState('07 Months Valid Passport With Old Passport (If have)\nRecent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)\nID card (Student) one photocopy both sides\nLeave letter from school or college original copy\nParents bank statement (Last 06 months) and solvency certificate with minimum balance BDT 70,000 for each applicant');
  const [generalDocs, setGeneralDocs] = useState('Filled visa application form\nValid passport and previous travel history copies\nBank statement and sponsor documents\nAdmission or invitation letter where applicable');

  // ── Section 5: Description & Policy ──
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
        setProcessingTime(item.processingTime || '5-7 Working Days');
        setCapital(item.capital || 'Bangkok');
        setLocalTime(item.localTime || 'GMT +7');
        setTelephoneCode(item.telephoneCode || '+66');
        setExchangeRate(item.exchangeRate || '1 THB is equivalent to 3.3 BDT');
        setEmbassyAddress(item.embassyAddress || 'Embassy of Destination Country, Dhaka, Bangladesh');
        setVisaFee(item.visaFee || '1800');

        if (item.dynamicPricingItems && item.dynamicPricingItems.length > 0) {
          setDynamicPricingItems(item.dynamicPricingItems);
        } else if (item.matrixItems && item.matrixItems.length > 0) {
          setDynamicPricingItems(item.matrixItems.map((m, idx) => ({
            id: m.id || idx + 1,
            title: m.entryType || 'Single Entry Option',
            regularPrice: m.price || '6500',
            discountType: 'percentage',
            discountValue: '0'
          })));
        }

        if (item.childDiscountType) setChildDiscountType(item.childDiscountType);
        if (item.childDiscountValue) setChildDiscountValue(item.childDiscountValue);
        if (item.childPrice) setChildPrice(item.childPrice);
        if (item.infantPrice) setInfantPrice(item.infantPrice);
        if (item.childPolicyNotes) setChildPolicyNotes(item.childPolicyNotes);
        if (item.stickerStudentDocs) setStickerStudentDocs(item.stickerStudentDocs);
        if (item.generalDocs) setGeneralDocs(item.generalDocs);
        if (item.description) setDescription(item.description);
        if (item.conditions) setConditions(item.conditions);
        if (item.policy) setPolicy(item.policy);
        if (item.importantNotes) setImportantNotes(item.importantNotes);

        const validMain = (item.mainImage && typeof item.mainImage === 'string' && !item.mainImage.startsWith('blob:') && item.mainImage.length > 5)
          ? item.mainImage
          : 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80';
        setMainImage(validMain);

        if (item.galleryImages && Array.isArray(item.galleryImages) && item.galleryImages.length > 0) {
          setGalleryImages(item.galleryImages);
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
    const firstCalculatedPrice = calculateFinalPrice(dynamicPricingItems[0] || { regularPrice: 0, discountValue: 0 });

    const visaData = {
      id: editId || ('visa-' + (country ? country.toLowerCase().replace(/[^a-z0-9]/g, '') : 'custom') + '-' + Date.now()),
      country: country || 'Thailand',
      capital: capital || '',
      visaType: visaType || 'Tourist Visa',
      visaAvailableLabel: visaAvailableLabel || `${visaType} Available`,
      processingTime: processingTime || '5-7 Working Days',
      visaFee: visaFee || '0',
      processingFee: processingFee || firstCalculatedPrice.toString(),
      childDiscountType,
      childDiscountValue,
      childPrice,
      infantPrice,
      childPolicyNotes,
      dynamicPricingItems: dynamicPricingItems,
      matrixItems: dynamicPricingItems.map(item => ({
        id: item.id,
        visaType: visaType,
        entryType: item.title,
        price: calculateFinalPrice(item).toString()
      })),
      localTime,
      telephoneCode,
      exchangeRate,
      embassyAddress,
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
  const inp = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.92rem', fontFamily: 'inherit', outline: 'none', background: '#FAFBFF' };
  const lbl = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' };
  const sec = { fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' };
  const subsec = { fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' };

  // ── Plus button helper ──
  const PlusBtn = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      title="Add custom option"
      style={{
        background: '#F0FDF4',
        color: '#166534',
        border: '1.5px solid #86EFAC',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '800',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        flexShrink: 0
      }}
    >
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
                <h1 className="seller-page-title">{isEditing ? 'Edit VISA Service Product' : 'Add VISA Service Product'}</h1>
                <p className="seller-page-subtitle">Configure single VISA Type per product with multiple validity options &amp; dynamic pricing tiers.</p>
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
              <p style={subsec}>Set destination country, single visa category for this product, and processing time.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>

                {/* Country Dropdown with 190+ world countries */}
                <div>
                  <label style={lbl}>Destination Country *</label>
                  <select
                    value={country}
                    onChange={(e) => handleCountrySelect(e.target.value)}
                    style={{ ...inp, fontWeight: 600 }}
                  >
                    {ALL_WORLD_COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* VISA Available Label */}
                <div>
                  <label style={lbl}>VISA Available Label *</label>
                  <input
                    type="text"
                    placeholder="e.g. Tourist Visa / Student Visa Available"
                    value={visaAvailableLabel}
                    onChange={(e) => setVisaAvailableLabel(e.target.value)}
                    style={inp}
                  />
                </div>

                {/* Single VISA Type for entire product */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>Primary VISA Category (Single Type) *</label>
                    <PlusBtn onClick={() => openModal({ title: 'Add VISA Category', fieldLabel: 'VISA Category Name', list: allVisaTypes, setter: setCustomVisaTypes, valueSetter: setVisaType })} />
                  </div>
                  <select value={visaType} onChange={(e) => setVisaType(e.target.value)} style={{ ...inp, fontWeight: 600 }}>
                    {allVisaTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Processing Time */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>Processing Time *</label>
                    <PlusBtn onClick={() => openModal({ title: 'Add Processing Time', fieldLabel: 'Processing Duration', list: allProcTimes, setter: setCustomProcTimes, valueSetter: setProcessingTime })} />
                  </div>
                  <select value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} style={{ ...inp, fontWeight: 600 }}>
                    {allProcTimes.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 2. Destination Country & Embassy Information ── */}
              <h3 style={sec}>2. Destination Country &amp; Embassy Information</h3>
              <p style={subsec}>Country metadata auto-populates upon selecting destination country. You can review and set your custom processing fee &amp; embassy details below.</p>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
                <span style={{ fontSize: '0.82rem', color: '#1E40AF', fontWeight: 500 }}>
                  <strong>Auto-Filled Country Details:</strong> Capital City, Timezone, Telephone Code, and Embassy Fee automatically populate when a country is selected. You can specify your custom <strong>Processing Fee</strong> and <strong>Embassy Address</strong> below.
                </span>
              </div>

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
                  <label style={lbl}>Starting Embassy Fee (BDT)</label>
                  <input type="text" placeholder="e.g. 1800" value={visaFee} onChange={(e) => setVisaFee(e.target.value)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Processing Fee (BDT) *</label>
                  <input type="text" placeholder="e.g. 36000" value={processingFee} onChange={(e) => setProcessingFee(e.target.value)} style={{ ...inp, background: '#FFFFFF', border: '1.5px solid #2563EB', fontWeight: 'bold' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={lbl}>Embassy Address in Bangladesh *</label>
                  <input type="text" placeholder="e.g. Madani Avenue, Baridhara, Dhaka 1212, Bangladesh" value={embassyAddress} onChange={(e) => setEmbassyAddress(e.target.value)} style={{ ...inp, background: '#FFFFFF', border: '1.5px solid #2563EB' }} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 3. Dynamic Pricing Options & Discount Calculator (Identical to Tour Package) ── */}
              <div className="seller-form-group full-width" style={{ marginTop: '10px', marginBottom: '28px' }}>
                <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: '18px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#7E22CE', margin: 0 }}>
                      3. Pricing Policy &amp; Multiple Validity Options ({visaType})
                    </h3>

                    <button
                      type="button"
                      onClick={addPricingItem}
                      style={{
                        background: '#7E22CE',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(126,34,206,0.25)',
                      }}
                    >
                      + Create New Validity Option / Tier
                    </button>
                  </div>

                  {/* Pricing Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {dynamicPricingItems.map((item, index) => {
                      const autoFinalPrice = calculateFinalPrice(item);
                      return (
                        <div
                          key={item.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #DDD6FE',
                            borderRadius: '14px',
                            padding: '16px',
                            boxShadow: '0 2px 8px rgba(126,34,206,0.05)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                            <span style={{ background: '#F3E8FF', color: '#6B21A8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                              Validity Option Tier #{index + 1}
                            </span>
                            {dynamicPricingItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePricingItem(index)}
                                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                Remove Tier ✕
                              </button>
                            )}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr 1fr 1fr 1.2fr', gap: '10px', alignItems: 'end' }}>
                            {/* Entry Option Dropdown */}
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Entry Option *
                              </label>
                              <select
                                value={item.entryType || (item.title && item.title.includes('Multiple') ? 'Multiple Entry' : (item.title && item.title.includes('Double') ? 'Double Entry' : 'Single Entry'))}
                                onChange={(e) => {
                                  const entry = e.target.value;
                                  handlePricingItemChange(index, 'entryType', entry);
                                  if (!item.title) {
                                    handlePricingItemChange(index, 'title', `30 Days ${entry}`);
                                  }
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                              >
                                <option value="Single Entry">Single Entry</option>
                                <option value="Double Entry">Double Entry</option>
                                <option value="Multiple Entry">Multiple Entry</option>
                              </select>
                            </div>

                            {/* Validity Title Input */}
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Validity *
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 30 Days"
                                value={item.title}
                                onChange={(e) => handlePricingItemChange(index, 'title', e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                              />
                            </div>

                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Regular Price (৳) *
                              </label>
                              <input
                                type="number"
                                placeholder="e.g. 15000"
                                value={item.regularPrice}
                                onChange={(e) => handlePricingItemChange(index, 'regularPrice', e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                              />
                            </div>

                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Discount Type *
                              </label>
                              <select
                                value={item.discountType}
                                onChange={(e) => handlePricingItemChange(index, 'discountType', e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                              >
                                <option value="percentage">Percentage (%)</option>
                                <option value="amount">Fixed Amount (৳)</option>
                              </select>
                            </div>

                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Discount Value ({item.discountType === 'percentage' ? '%' : '৳'}) *
                              </label>
                              <input
                                type="number"
                                placeholder={item.discountType === 'percentage' ? 'e.g. 10' : 'e.g. 2000'}
                                value={item.discountValue}
                                onChange={(e) => handlePricingItemChange(index, 'discountValue', e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                              />
                            </div>

                            {/* Auto-Calculated Result */}
                            <div>
                              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857', display: 'block', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                                Final Price
                              </label>
                              <div style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '37px' }}>
                                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669', whiteSpace: 'nowrap' }}>
                                  ৳{autoFinalPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 4. Child & Infant Pricing Breakdown ── */}
              <h3 style={sec}>4. Child &amp; Infant Pricing Breakdown</h3>
              <p style={subsec}>Configure separate pricing, discounts, and policy rules for child and infant applicants.</p>

              <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={lbl}>Child Pricing Discount Type *</label>
                    <select
                      value={childDiscountType}
                      onChange={(e) => setChildDiscountType(e.target.value)}
                      style={{ ...inp, fontWeight: 600 }}
                    >
                      <option value="percentage">Percentage Discount (% Off Adult Rate)</option>
                      <option value="flat">Fixed Rate (৳ per Child)</option>
                    </select>
                  </div>

                  <div>
                    <label style={lbl}>
                      {childDiscountType === 'percentage' ? 'Child Discount Percentage (% Off) *' : 'Child Fixed Price (৳) *'}
                    </label>
                    <input
                      type="number"
                      placeholder={childDiscountType === 'percentage' ? 'e.g. 50' : 'e.g. 3250'}
                      value={childDiscountType === 'percentage' ? childDiscountValue : childPrice}
                      onChange={(e) => {
                        if (childDiscountType === 'percentage') {
                          setChildDiscountValue(e.target.value);
                        } else {
                          setChildPrice(e.target.value);
                        }
                      }}
                      style={{ ...inp, fontWeight: 600 }}
                    />
                    {(() => {
                      const sampleAdultFee = calculateFinalPrice(dynamicPricingItems[0] || { regularPrice: 0, discountValue: 0 });
                      const sampleChildFee = childDiscountType === 'percentage'
                        ? Math.round(sampleAdultFee * (1 - (parseFloat(childDiscountValue) || 0) / 100))
                        : (parseFloat(childPrice) || 0);
                      return (
                        <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>💡 Calculated Child Fee:</span>
                          <strong style={{ color: '#047857' }}>৳{sampleChildFee.toLocaleString()}</strong>
                          <span style={{ color: '#6B7280' }}>(from ৳{sampleAdultFee.toLocaleString()} Adult rate)</span>
                        </div>
                      );
                    })()}
                  </div>

                  <div>
                    <label style={lbl}>Infant Price (৳) <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>(Under 2 Yrs)</span> *</label>
                    <input
                      type="number"
                      placeholder="e.g. 1000"
                      value={infantPrice}
                      onChange={(e) => setInfantPrice(e.target.value)}
                      style={{ ...inp, fontWeight: 600 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={lbl}>Child &amp; Infant Policy Notes</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Birth certificate and parent passport copy required for child applicants under 12."
                    value={childPolicyNotes}
                    onChange={(e) => setChildPolicyNotes(e.target.value)}
                    style={{ ...inp, resize: 'vertical' }}
                  />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 20px 0' }} />

              {/* ── 5. Required Documents ── */}
              <h3 style={sec}>5. Required Documents</h3>
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

              {/* ── 6. Description & Policy ── */}
              <h3 style={sec}>6. Description and Policy Information</h3>
              <p style={subsec}>These appear in accordion sections on the public visa detail page.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={lbl}>Service Description *</label>
                  <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>Conditions *</label>
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

              {/* ── 7. Cover Image and Gallery ── */}
              <h3 style={sec}>7. Cover Image and Gallery Photos</h3>
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
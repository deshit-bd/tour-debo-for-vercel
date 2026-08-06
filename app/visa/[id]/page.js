'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const VISA_DETAILS = {
  canada: {
    country: 'Canada',
    rating: '4.7',
    type: 'Student Visa / Tourist Visa Available',
    capital: 'Ottawa',
    localTime: 'GMT -5',
    telephoneCode: '+1',
    exchangeRate: '1 CAD is equivalent to 86 BDT',
    embassyAddress: 'House 16A, Road 48, Gulshan 2, Dhaka 1212, Bangladesh',
    visaFee: '৳1,800',
    processingFee: '৳24,000',
    mainImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?auto=format&fit=crop&w=500&q=80',
    ],
  },
  uk: {
    country: 'United Kingdom',
    rating: '4.8',
    type: 'Student Visa Available',
    capital: 'London',
    localTime: 'GMT +0',
    telephoneCode: '+44',
    exchangeRate: '1 GBP is equivalent to 140 BDT',
    embassyAddress: 'United Nations Road, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '৳1,800',
    processingFee: '৳31,200',
    mainImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&w=500&q=80',
    ],
  },
  australia: {
    country: 'Australia',
    rating: '4.6',
    type: 'Student Visa Available',
    capital: 'Canberra',
    localTime: 'GMT +10',
    telephoneCode: '+61',
    exchangeRate: '1 AUD is equivalent to 72 BDT',
    embassyAddress: 'Gulshan Avenue, Dhaka, Bangladesh',
    visaFee: '৳1,440',
    processingFee: '৳28,800',
    mainImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1524293581917-878a6d017c71?auto=format&fit=crop&w=500&q=80',
    ],
  },
  usa: {
    country: 'United States',
    rating: '4.9',
    type: 'Student Visa Available',
    capital: 'Washington, D.C.',
    localTime: 'GMT -5',
    telephoneCode: '+1',
    exchangeRate: '1 USD is equivalent to 118 BDT',
    embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '৳2,400',
    processingFee: '৳36,000',
    mainImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
    ],
  },
  germany: {
    country: 'Germany',
    rating: '4.5',
    type: 'Student Visa Available',
    capital: 'Berlin',
    localTime: 'GMT +1',
    telephoneCode: '+49',
    exchangeRate: '1 EUR is equivalent to 128 BDT',
    embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212, Bangladesh',
    visaFee: '৳1,200',
    processingFee: '৳25,200',
    mainImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=80',
    ],
  },
  malaysia: {
    country: 'Malaysia',
    rating: '4.7',
    type: 'Student Visa Available',
    capital: 'Kuala Lumpur',
    localTime: 'GMT +8',
    telephoneCode: '+60',
    exchangeRate: '1 MYR is equivalent to 25 BDT',
    embassyAddress: 'Gulshan Avenue, Dhaka, Bangladesh',
    visaFee: '৳960',
    processingFee: '৳21,600',
    mainImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1524015308230-f65f7b921b66?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=500&q=80',
    ],
  },
  japan: {
    country: 'Japan',
    rating: '4.8',
    type: 'Tourist Visa Available',
    capital: 'Tokyo',
    localTime: 'GMT +9',
    telephoneCode: '+81',
    exchangeRate: '1 JPY is equivalent to 0.78 BDT',
    embassyAddress: 'Plot No. 5 & 7, Dutabash Road, Baridhara, Dhaka 1212',
    visaFee: '৳1,200',
    processingFee: '৳22,800',
    mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=80',
    ],
  },
  singapore: {
    country: 'Singapore',
    rating: '4.9',
    type: 'Work Visa Available',
    capital: 'Singapore',
    localTime: 'GMT +8',
    telephoneCode: '+65',
    exchangeRate: '1 SGD is equivalent to 88 BDT',
    embassyAddress: 'Ventura Avenue, Gulshan 2, Dhaka 1212',
    visaFee: '৳1,440',
    processingFee: '৳26,400',
    mainImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a61a516170?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=500&q=80',
    ],
  },
  dubai: {
    country: 'UAE (Dubai)',
    rating: '4.8',
    type: 'Tourist Visa Available',
    capital: 'Abu Dhabi',
    localTime: 'GMT +4',
    telephoneCode: '+971',
    exchangeRate: '1 AED is equivalent to 32 BDT',
    embassyAddress: 'House 19, Road 143, Gulshan 2, Dhaka 1212',
    visaFee: '৳1,800',
    processingFee: '৳23,400',
    mainImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80',
    ],
  },
  france: {
    country: 'France',
    rating: '4.7',
    type: 'Student Visa Available',
    capital: 'Paris',
    localTime: 'GMT +1',
    telephoneCode: '+33',
    exchangeRate: '1 EUR is equivalent to 128 BDT',
    embassyAddress: 'Madani Avenue, Baridhara, Dhaka 1212',
    visaFee: '৳1,440',
    processingFee: '৳27,600',
    mainImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
    ],
  },
  turkey: {
    country: 'Turkey',
    rating: '4.6',
    type: 'Tourist Visa Available',
    capital: 'Ankara',
    localTime: 'GMT +3',
    telephoneCode: '+90',
    exchangeRate: '1 TRY is equivalent to 3.6 BDT',
    embassyAddress: 'House 7, Road 2, Baridhara, Dhaka 1212',
    visaFee: '৳960',
    processingFee: '৳18,000',
    mainImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1527838832700-54595d63713b?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=500&q=80',
    ],
  },
  newzealand: {
    country: 'New Zealand',
    rating: '4.7',
    type: 'Work Visa Available',
    capital: 'Wellington',
    localTime: 'GMT +12',
    telephoneCode: '+64',
    exchangeRate: '1 NZD is equivalent to 70 BDT',
    embassyAddress: 'Gulshan Avenue, Dhaka, Bangladesh',
    visaFee: '৳2,160',
    processingFee: '৳33,600',
    mainImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=500&q=80',
    ],
  },
};

const otherCountries = [
  {
    id: 'canada',
    country: 'Canada',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    price: '৳24,000',
    oldPrice: '৳30,000',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    price: '৳31,200',
    oldPrice: '৳38,400',
  },
  {
    id: 'australia',
    country: 'Australia',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    price: '৳28,800',
    oldPrice: '৳36,000',
  },
  {
    id: 'usa',
    country: 'United States',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    price: '৳36,000',
    oldPrice: '৳45,600',
  },
  {
    id: 'germany',
    country: 'Germany',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    price: '৳25,200',
    oldPrice: '৳31,200',
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    price: '৳21,600',
    oldPrice: '৳27,600',
  },
  {
    id: 'japan',
    country: 'Japan',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    price: '৳22,800',
    oldPrice: '৳28,800',
  },
  {
    id: 'singapore',
    country: 'Singapore',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    price: '৳26,400',
    oldPrice: '৳32,400',
  },
];

export default function VisaDetailPage({ params }) {
  const routeParams = useParams();
  const visaId = routeParams?.id || params?.id || 'canada';

  const [customVisa, setCustomVisa] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('planner_visa_services');
      if (saved) {
        const list = JSON.parse(saved);
        const found = list.find(v => v.id === visaId || (v.country && v.country.toLowerCase().replace(/[^a-z0-9]/g, '') === visaId));
        if (found) {
          setCustomVisa({
            country: found.country || 'Visa Destination',
            rating: found.rating || '5.0',
            type: found.visaAvailableLabel || (found.visaType ? found.visaType + ' Available' : 'Visa Service Available'),
            capital: found.capital || (found.country + ' Capital'),
            localTime: found.localTime || 'GMT +6',
            telephoneCode: found.telephoneCode || '+880',
            exchangeRate: found.exchangeRate || '1 USD is equivalent to 118 BDT',
            embassyAddress: found.embassyAddress || ('Embassy of ' + found.country + ', Dhaka, Bangladesh'),
            visaFee: '৳' + (found.visaFee || '1,800'),
            processingFee: '৳' + (found.processingFee || '24,000'),
            mainImage: (found.mainImage && !found.mainImage.startsWith('blob:')) ? found.mainImage : 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80',
            gallery: (found.galleryImages && Array.isArray(found.galleryImages) && found.galleryImages.length > 0 && !found.galleryImages[0].startsWith('blob:')) ? found.galleryImages : [
              'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?auto=format&fit=crop&w=500&q=80'
            ],
            matrixItems: found.matrixItems || []
          });
        }
      }
    } catch (e) {
      console.error('Error fetching custom visa detail:', e);
    }
  }, [visaId]);

  const visa = customVisa || VISA_DETAILS[visaId] || VISA_DETAILS.canada;

  const [applicantCount, setApplicantCount] = useState(1);
  const [visaTypeSelect, setVisaTypeSelect] = useState('Tourist Visa');
  const [entryTypeSelect, setEntryTypeSelect] = useState('Single Entry');
  const [openAccordions, setOpenAccordions] = useState({
    stickerVisa: true,
    requiredDocs: false,
    importantNotes: true,
  });

  const calcVisaFee = () => {
    if (customVisa && customVisa.matrixItems && customVisa.matrixItems.length > 0) {
      const match = customVisa.matrixItems.find(
        m => m.visaType === visaTypeSelect && m.entryType === entryTypeSelect
      );
      if (match && match.price) return Number(match.price);
    }

    let base = Number((visa.processingFee || '24000').replace(/[^0-9]/g, '')) || 6500;
    if (visaTypeSelect === 'Medical Visa') base += 2000;
    if (visaTypeSelect === 'Business Visa') base += 5000;
    if (visaTypeSelect === 'PR Visa') base += 25000;
    if (entryTypeSelect === 'Double Entry') base += 3500;
    if (entryTypeSelect === 'Multiple Entry') base += 8500;
    return base;
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="detail-gallery-grid">
          <div className="gallery-main-view">
            <Image
              src={visa.mainImage}
              alt={`${visa.country} visa destination`}
              fill
              sizes="(max-width: 768px) 100vw, 76vw"
              className="detail-main-img"
              priority
            />
            <button className="gallery-arrow left-arrow">&#8249;</button>
            <button className="gallery-arrow right-arrow">&#8250;</button>
          </div>

          <div className="gallery-thumbs-col">
            {visa.gallery.map((image, index) => (
              <div key={image} className={`thumb-item ${index === 3 ? 'thumb-more-overlay' : ''}`}>
                <Image
                  src={image}
                  alt={`${visa.country} gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 18vw"
                  className="thumb-img"
                />
                {index === 3 && <div className="overlay-text">10+</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="visa-header-card">
          <div className="detail-title-row">
            <div className="title-and-rating">
              <h1>{visa.country}</h1>
              <div className="stars-row">
                <span className="star-gold">★★★★★</span>
                <span className="rating-score">{visa.rating}</span>
                <small className="rating-count">(Ratings)</small>
              </div>
            </div>

            <div className="action-buttons-group">
              <button className="btn-icon-circle" aria-label="Share">&#8599;</button>
              <button className="btn-icon-circle" aria-label="Wishlist">♡</button>
            </div>
          </div>

          <p className="visa-subtitle-type">{visa.type}</p>

          <div className="visa-country-meta-grid">
            <div className="meta-info-item">🏙 <strong>Capital City :</strong> {visa.capital}</div>
            <div className="meta-info-item">🕒 <strong>Local Time :</strong> {visa.localTime}</div>
            <div className="meta-info-item">☎ <strong>Telephone Code :</strong> {visa.telephoneCode}</div>
            <div className="meta-info-item">💱 <strong>Exchange Rate :</strong> {visa.exchangeRate}</div>
            <div className="meta-info-item full-width-item">📍 <strong>Embassy Address :</strong> {visa.embassyAddress}</div>
          </div>

          <div className="starting-visa-fee-badge">
            <small>Starting From!</small>
            <div className="fee-big-text">
              Visa Fee <strong>{visa.visaFee}</strong> <small>For One Person</small>
            </div>
          </div>
        </div>

        <div className="detail-two-col-layout">
          <div className="left-content-column">
            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('stickerVisa')}>
                <h3>Required Documents for Sticker visa</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.stickerVisa ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.stickerVisa && (
                <div className="accordion-body docs-body">
                  <h4>Student:</h4>
                  <ul>
                    <li>07 Months Valid Passport With Old Passport (If have)</li>
                    <li>Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)</li>
                    <li>ID card (Student) one photocopy both sides</li>
                    <li>Leave letter from school or college original copy</li>
                    <li>Parents bank statement (Last 06 months) and solvency certificate with minimum balance BDT 70,000 for each applicant</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('requiredDocs')}>
                <h3>Required Documents</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.requiredDocs ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.requiredDocs && (
                <div className="accordion-body docs-body">
                  <h4>General:</h4>
                  <ul>
                    <li>Filled visa application form</li>
                    <li>Valid passport and previous travel history copies</li>
                    <li>Bank statement and sponsor documents</li>
                    <li>Admission or invitation letter where applicable</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="accordion-card">
              <div className="accordion-header" onClick={() => toggleAccordion('importantNotes')}>
                <h3>Important Notes</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openAccordions.importantNotes ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openAccordions.importantNotes && (
                <div className="accordion-body">
                  <p>Please contact the visa department for document processing after payment. Visa rates may change without prior notice.</p>
                </div>
              )}
            </div>
          </div>

          <div className="right-sidebar-column">
            <div className="tour-planner-card">
              <div className="planner-header">
                <div>
                  <small>Tour Planner</small>
                  <h4>DeshIT-BD</h4>
                </div>
                <Link href="/account/messages" className="btn-chat" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Chat</Link>
              </div>

              <div className="planner-badge-row">
                <span className="check-badge">✓ Bronze Planner</span>
              </div>

              <div className="planner-stats-circles">
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Positive Tourist Review</small>
                </div>
                <div className="stat-circle">
                  <span className="stat-percent">90%</span>
                  <small>Chat Response Rate</small>
                </div>
              </div>

              <Link href="/planner/deshit" className="btn-view-shop" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>View Shop</Link>
            </div>

            <div className="booking-price-card" style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '2px solid #2563EB' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px' }}>Configure VISA Type & Entry Options</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>VISA Type (Dropdown)</label>
                  <select
                    value={visaTypeSelect}
                    onChange={(e) => setVisaTypeSelect(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Medical Visa">Medical Visa</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="PR Visa">PR Visa (Permanent Resident)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Entry Type</label>
                  <select
                    value={entryTypeSelect}
                    onChange={(e) => setEntryTypeSelect(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="Single Entry">Single Entry</option>
                    <option value="Double Entry">Double Entry</option>
                    <option value="Multiple Entry">Multiple Entry</option>
                  </select>
                </div>
              </div>

              <div className="price-card-header" style={{ marginBottom: '16px' }}>
                <small>Calculated Fee ({visaTypeSelect} - {entryTypeSelect}):</small>
                <div className="fee-big-text" style={{ color: '#2563EB', fontSize: '1.6rem', fontWeight: 'bold' }}>
                  ৳{calcVisaFee().toLocaleString()}
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setApplicantCount(Math.max(1, applicantCount - 1))}>−</button>
                <span className="count-number">{applicantCount} Applicants</span>
                <button className="counter-btn" onClick={() => setApplicantCount(applicantCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack" style={{ marginTop: '16px' }}>
                <button className="btn-book-now" style={{ background: '#2563EB', color: '#fff', width: '100%', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ⚡ Submit VISA Application (Total: ৳{(calcVisaFee() * applicantCount).toLocaleString()})
                </button>
              </div>
            </div>

            <div className="others-interest-section">
              <h4>Other Countries</h4>
              {otherCountries
                .filter((item) => item.id !== visaId)
                .slice(0, 4)
                .map((item) => (
                  <Link key={item.id} href={`/visa/${item.id}`} className="visa-card-figma mini-visa-card">
                    <div className="visa-card-image-wrap">
                      <Image
                        src={item.image}
                        alt={item.country}
                        fill
                        sizes="(max-width: 768px) 100vw, 28vw"
                        className="visa-card-img"
                      />
                      <span className="badge-featured">★ Featured</span>
                      <span className="heart-circle-btn">♡</span>
                    </div>
                    <div className="visa-card-body">
                      <div className="title-rating-row">
                        <h4>{item.country}</h4>
                        <span className="star-rating">★ {item.rating}</span>
                      </div>
                      <small>Student Visa Available</small>
                      <div className="visa-price-footer">
                        <span className="current-price">{item.price}</span>
                        <span className="strike-price">{item.oldPrice}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <section className="others-interest-section visa-other-countries-section">
          <h4>Other Countries</h4>
          <div className="visa-other-countries-grid">
            {otherCountries
              .filter((item) => item.id !== visaId)
              .map((item) => (
                <Link key={item.id} href={`/visa/${item.id}`} className="visa-card-figma mini-visa-card">
                  <div className="visa-card-image-wrap">
                    <Image
                      src={item.image}
                      alt={item.country}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="visa-card-img"
                    />
                    <span className="badge-featured">★ Featured</span>
                    <span className="heart-circle-btn">♡</span>
                  </div>
                  <div className="visa-card-body">
                    <div className="title-rating-row">
                      <h4>{item.country}</h4>
                      <span className="star-rating">★ {item.rating}</span>
                    </div>
                    <small>Student Visa Available</small>
                    <div className="visa-price-footer">
                      <span className="current-price">{item.price}</span>
                      <span className="strike-price">{item.oldPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <Link href="/account/messages" className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </Link>

      <Footer />
    </div>
  );
}

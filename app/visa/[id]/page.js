'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    visaFee: '$10',
    processingFee: '$200',
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
    visaFee: '$15',
    processingFee: '$260',
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
    visaFee: '$12',
    processingFee: '$240',
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
    visaFee: '$20',
    processingFee: '$300',
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
    visaFee: '$10',
    processingFee: '$210',
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
    visaFee: '$8',
    processingFee: '$180',
    mainImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1524015308230-f65f7b921b66?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=500&q=80',
    ],
  },
};

const otherCountries = [
  {
    id: 'canada',
    country: 'Canada',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    price: '$200',
    oldPrice: '$250',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    price: '$260',
    oldPrice: '$320',
  },
  {
    id: 'australia',
    country: 'Australia',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    price: '$240',
    oldPrice: '$300',
  },
  {
    id: 'usa',
    country: 'United States',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    price: '$300',
    oldPrice: '$380',
  },
  {
    id: 'germany',
    country: 'Germany',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    price: '$210',
    oldPrice: '$260',
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    price: '$180',
    oldPrice: '$230',
  },
];

export default function VisaDetailPage({ params }) {
  const visa = VISA_DETAILS[params?.id] || VISA_DETAILS.canada;
  const [applicantCount, setApplicantCount] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({
    stickerVisa: true,
    requiredDocs: false,
    importantNotes: true,
  });

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
                <span className="chevron">{openAccordions.stickerVisa ? '▲' : '▼'}</span>
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
                <span className="chevron">{openAccordions.requiredDocs ? '▲' : '▼'}</span>
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
                <span className="chevron">{openAccordions.importantNotes ? '▲' : '▼'}</span>
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
                <button className="btn-chat">Chat</button>
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

              <button className="btn-view-shop">View Shop</button>
            </div>

            <div className="booking-price-card">
              <div className="price-card-header">
                <small>Starting From!</small>
                <div className="package-rate-item active">
                  <div className="rate-left">
                    <strong>Processing Fee</strong>
                    <span>+ Visa Fee {visa.visaFee}</span>
                  </div>
                  <div className="rate-right">
                    <span className="main-dollar">{visa.processingFee}</span>
                    <span className="tag-discount">-30%</span>
                  </div>
                </div>
              </div>

              <div className="counter-row">
                <button className="counter-btn" onClick={() => setApplicantCount(Math.max(1, applicantCount - 1))}>−</button>
                <span className="count-number">{applicantCount}</span>
                <button className="counter-btn" onClick={() => setApplicantCount(applicantCount + 1)}>+</button>
              </div>

              <div className="booking-buttons-stack">
                <button className="btn-add-wishlist">Add To Wishlist</button>
                <button className="btn-book-now">Book now</button>
              </div>
            </div>

            <div className="others-interest-section">
              <h4>Other Countries</h4>
              {otherCountries
                .filter((item) => item.id !== params?.id)
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
              .filter((item) => item.id !== params?.id)
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

      <div className="floating-messages-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span>Messages</span>
      </div>

      <Footer />
    </div>
  );
}

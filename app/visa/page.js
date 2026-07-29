import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Student Visa | Tour Dibo',
  description: 'Student Visa search and listings from Figma Design Image 6',
};

const visaListings = Array.from({ length: 6 }, (_, idx) => ({
  id: `visa-${idx + 1}`,
  country: 'Canada',
  rating: '4.7',
  availability: 'Student Visa Available',
  duration: 'Duration : 6-12 Months',
  visaFee: 'Visa Fee : $10',
  peopleServed: '0 People Served',
  price: '$200',
  oldPrice: '$250',
  discount: '-30%',
  flagImage: 'https://images.unsplash.com/photo-1519832979-6fa011b87615?auto=format&fit=crop&w=800&q=80',
}));

export default function StudentVisaPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="visa-page-header">
          <h2>Student Visa</h2>
        </div>

        {/* 3-Column Grid of Visa Cards */}
        <div className="visa-3col-grid">
          {visaListings.map((v) => (
            <div key={v.id} className="visa-card-figma">
              <div className="visa-card-image-wrap">
                <Image src={v.flagImage} alt={v.country} fill className="visa-card-img" />
                <span className="badge-featured">★ Featured</span>
                <button className="heart-circle-btn">♡</button>
              </div>

              <div className="visa-card-body">
                <div className="title-rating-row">
                  <Link href="/visa/canada">
                    <h3>{v.country}</h3>
                  </Link>
                  <span className="star-rating">★ {v.rating}</span>
                </div>

                <div className="visa-info-lines">
                  <p>{v.availability}</p>
                  <p>{v.duration}</p>
                  <p>{v.visaFee}</p>
                </div>

                <div className="visa-served-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="9" cy="10" r="2" />
                    <line x1="15" y1="8" x2="19" y2="8" />
                    <line x1="15" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>{v.peopleServed}</span>
                </div>

                <div className="visa-price-footer">
                  <small>Processing Fee Starting From</small>
                  <div className="price-tag-row">
                    <span className="current-price">{v.price}</span>
                    <span className="strike-price">{v.oldPrice}</span>
                    <span className="discount-tag">{v.discount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Messages Button */}
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

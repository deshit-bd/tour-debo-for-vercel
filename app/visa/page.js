import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Student Visa | Tour Dibo',
  description: 'Student Visa search and listings from Figma Design Image 6',
};

const visaListings = [
  {
    id: 'canada',
    country: 'Canada',
    rating: '4.7',
    availability: 'Student Visa Available',
    duration: '6-12 Months',
    visaFee: '$10',
    peopleServed: '1,240 People Served',
    price: '$200',
    oldPrice: '$250',
    discount: '-30%',
    flagImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    rating: '4.8',
    availability: 'Student Visa Available',
    duration: '4-8 Months',
    visaFee: '$15',
    peopleServed: '980 People Served',
    price: '$260',
    oldPrice: '$320',
    discount: '-20%',
    flagImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'australia',
    country: 'Australia',
    rating: '4.6',
    availability: 'Student Visa Available',
    duration: '3-7 Months',
    visaFee: '$12',
    peopleServed: '760 People Served',
    price: '$240',
    oldPrice: '$300',
    discount: '-20%',
    flagImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'usa',
    country: 'United States',
    rating: '4.9',
    availability: 'Student Visa Available',
    duration: '5-10 Months',
    visaFee: '$20',
    peopleServed: '1,580 People Served',
    price: '$300',
    oldPrice: '$380',
    discount: '-18%',
    flagImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'germany',
    country: 'Germany',
    rating: '4.5',
    availability: 'Student Visa Available',
    duration: '3-6 Months',
    visaFee: '$10',
    peopleServed: '620 People Served',
    price: '$210',
    oldPrice: '$260',
    discount: '-15%',
    flagImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    rating: '4.7',
    availability: 'Student Visa Available',
    duration: '2-4 Months',
    visaFee: '$8',
    peopleServed: '890 People Served',
    price: '$180',
    oldPrice: '$230',
    discount: '-25%',
    flagImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
  },
];

export default function StudentVisaPage() {
  return (
    <div className="figma-page-shell">
      <Navbar />

      <main className="figma-main-content">
        <div className="visa-page-header">
          <div>
            <span className="visa-eyebrow">Study Abroad Support</span>
            <h2>Student Visa</h2>
            <p>Verified visa processing packages for top study destinations.</p>
          </div>
        </div>

        {/* 3-Column Grid of Visa Cards */}
        <div className="visa-3col-grid">
          {visaListings.map((v) => (
            <div key={v.id} className="visa-card-figma">
              <div className="visa-card-image-wrap">
                <Image
                  src={v.flagImage}
                  alt={v.country}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={v.id === 'canada' || v.id === 'uk'}
                  className="visa-card-img"
                />
                <span className="badge-featured">★ Featured</span>
                <button className="heart-circle-btn">♡</button>
              </div>

              <div className="visa-card-body">
                <div className="title-rating-row">
                  <Link href={`/visa/${v.id}`}>
                    <h3>{v.country}</h3>
                  </Link>
                  <span className="star-rating">★ {v.rating}</span>
                </div>

                <div className="visa-info-lines">
                  <p>{v.availability}</p>
                  <p>Duration : {v.duration}</p>
                  <p>Visa Fee : {v.visaFee}</p>
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

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const trips = [
  { name: 'Bali Retreat', duration: '7 Days', price: '$1,890', description: 'Beach clubs, jungle lodges, and island-hopping adventures.' },
  { name: 'Santorini Escape', duration: '5 Days', price: '$2,240', description: 'Cliffside villas, sunsets, and private sailing experiences.' },
  { name: 'Kyoto Discovery', duration: '6 Days', price: '$1,640', description: 'Tea houses, shrines, and seasonal cherry blossom routes.' },
];

export default function DestinationsPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <Navbar />

        <div className="section">
          <p className="eyebrow">Explore trips</p>
          <h1>Choose the itinerary that fits your vibe.</h1>
          <p className="hero-copy">Every journey is designed to be relaxed, immersive, and beautifully organized.</p>
        </div>

        <div className="card-grid">
          {trips.map((trip) => (
            <article key={trip.name} className="destination-card">
              <div className="card-body">
                <h3>{trip.name}</h3>
                <p>{trip.description}</p>
                <div className="trip-meta">
                  <span>{trip.duration}</span>
                  <strong>{trip.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

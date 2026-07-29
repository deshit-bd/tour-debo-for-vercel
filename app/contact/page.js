import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <Navbar />

        <div className="section">
          <p className="eyebrow">Contact</p>
          <h1>Let’s plan your next unforgettable holiday.</h1>
          <p className="hero-copy">Reach out for custom itineraries, hotel recommendations, and booking support.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="mailto:hello@tourdibo.com">hello@tourdibo.com</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

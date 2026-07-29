import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <Navbar />

        <div className="section">
          <p className="eyebrow">About us</p>
          <h1>We create thoughtful travel plans that feel effortless.</h1>
          <p className="hero-copy">Our team blends local insight, premium hospitality, and personal attention to design every itinerary carefully.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

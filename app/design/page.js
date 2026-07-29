import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DesignGallery from '../components/DesignGallery';

export default function DesignPage() {

  return (
    <main className="page-shell">
      <section className="hero-card">
        <Navbar />

        <div className="section">
          <p className="eyebrow">Figma reference</p>
          <h1>All design screenshots</h1>
          <p className="hero-copy">These screenshots are now available in the project so you can review the visual design one by one.</p>
        </div>

        <DesignGallery />
      </section>
      <Footer />
    </main>
  );
}

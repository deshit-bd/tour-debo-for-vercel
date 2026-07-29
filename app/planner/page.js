import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const planner = {
  name: 'DeshIT - BD',
  followers: '999 Followers',
  positive: '90% Positive Review',
  success: '100% Successful Tours',
  rank: 'Bronze Planner',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
};

const cards = Array(6).fill({
  title: 'Tenting at Cox’s Bazar',
  price: '$200',
  oldPrice: '$250',
  rating: '4.7',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
});

export default function PlannerPage() {
  return (
    <main className="planner-shell">
      <Navbar />
      <section className="planner-hero">
        <div className="planner-profile-card">
          <Image src={planner.image} alt={planner.name} width={140} height={140} className="planner-avatar" />
          <div>
            <h1>{planner.name}</h1>
            <p>{planner.followers}</p>
            <p>{planner.positive}</p>
            <p>{planner.success}</p>
            <p>{planner.rank}</p>
          </div>
        </div>
        <div className="planner-stats-card">
          <div>
            <p>Positive Tourist Review</p>
            <div className="stat-line"><span style={{ width: '90%' }} /></div>
          </div>
          <div>
            <p>Chat Response Time</p>
            <div className="stat-line"><span style={{ width: '90%' }} /></div>
          </div>
        </div>
      </section>

      <section className="planner-content">
        <div className="planner-nav">
          <span className="active">Homepage</span>
          <span>All Products</span>
        </div>
        <div className="planner-grid">
          {cards.map((card, idx) => (
            <article key={idx} className="planner-card">
              <Image src={card.image} alt={card.title} width={360} height={240} />
              <div className="planner-card-body">
                <h3>{card.title}</h3>
                <p>Starting from</p>
                <div className="planner-price">
                  <strong>{card.price}</strong>
                  <small>{card.oldPrice}</small>
                </div>
                <p>{card.rating} ★</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

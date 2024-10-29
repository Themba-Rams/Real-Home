import Founder from "./Founder";
import { Link } from 'react-router-dom';
import styles from "./Hpage.module.css";

function Hpage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.vcontainer}>
        <video autoPlay muted loop src="assets/welcome.mp4" alt="welcomevid" />
      </div>
      <div className={styles.novatext}>
        <p>RealHome is a prestigious real estate agency specializing in</p>
        luxury properties in both Cape Town and Johannesburg.
        <p>Curating exquisite homes for discerning buyers who appreciate</p>
        <p>elegance, sophistication, and breathtaking views.</p>
      </div>
      <section className={styles.cardcontainer}>
        <div className={styles.card1}>
          <div className={`${styles.cardimg} ${styles.JHB}`}>
            <h2>Discover Johannesburg Listings RENT/BUY/</h2>
            <p>Luxury properties in Johannesburg feature elegant designs, expansive living spaces, and modern architecture with high-end finishes. Located in prestigious suburbs, these homes provide access to exclusive amenities and vibrant lifestyles.</p>
           <li><Link to="/List">Explore</Link></li>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={`${styles.cardimg} ${styles.Cape1}`}>
            <h2>Discover Cape Town Properties RENT/BUY/</h2>
            <p>Luxury properties in Cape Town boast breathtaking views with high-end amenities like infinity pools and private gyms. Located in exclusive neighborhoods like Clifton and Camps Bay, these homes offer a sophisticated lifestyle in a stunning setting.</p>
            <li><Link to="/List">Explore</Link></li>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={`${styles.cardimg} ${styles.JHB}`}>
            <h2>List With Us // JHB & CPT</h2>
            <p> Luxury .</p>
            <li><Link to="/Login">SELL</Link></li>
          </div>
        </div>
      </section>
      <Founder />
    </main>
  );
}

export default Hpage;

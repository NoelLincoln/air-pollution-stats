import africa from '../images/africa.png';

const HomePage = () => (
  <section className="home-container">
    <div className="continet">
      <div className="continent-img">
        <img src={africa} alt="" />
        <div className="continent-details">
          <h1>Africa</h1>
          <span>4000 views</span>
        </div>
      </div>
    </div>
  </section>
);

export default HomePage;

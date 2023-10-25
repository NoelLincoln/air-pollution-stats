import kenya from '../images/kenya.png';

const CountryList = () => (
  <section className="country-list-container">
    <h4>Stats By State/County</h4>
    <ul className="country-list">
      <li className="country-stat">
        <img src={kenya} alt="" className="country-img" />
        <div>
          <p>Kenya</p>
          <p>3600</p>
        </div>
      </li>
    </ul>
  </section>
);

export default CountryList;

/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirQualityAsync } from '../redux/features/countrySlice';

const StateDetails = () => {
  const { selectedState, airQualityData } = useSelector(
    (state) => state.country,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedState) {
      dispatch(fetchAirQualityAsync(selectedState));
    }
  }, [selectedState, dispatch]);

  return (
    <section className="state-air-info">
      <div className="state-air-details">
        <h1>State Details</h1>
        <p>
          Name:
          {selectedState?.stateName}
        </p>
      </div>

      {airQualityData ? (
        <div>
          <div className="air-quality-index">
            <h2>Air Quality Data</h2>
            <p>Air Quality Index (AQI): {airQualityData.list[0].main.aqi}</p>
          </div>

          <h3>Components:</h3>
          <ul className="air-components">
            <li className="air-components-stat">
              <p> Carbon monoxide :</p>
              <p>{airQualityData.list[0].components.co}</p>
            </li>
            <li className="air-components-stat">
              <p>Nitrogen monoxide:</p>
              <p>{airQualityData.list[0].components.no}</p>
            </li>
            <li className="air-components-stat">
              <p>Nitrogen dioxide:</p>
              <p>{airQualityData.list[0].components.no2}</p>
            </li>
            <li className="air-components-stat">
              <p> Ozone:</p>
              <p>{airQualityData.list[0].components.o3}</p>
            </li>
            <li className="air-components-stat">
              <p>Sulphur dioxide:</p>
              <p>{airQualityData.list[0].components.so2}</p>
            </li>
            <li className="air-components-stat">
              <p>Fine Particles Matter:</p>
              <p>{airQualityData.list[0].components.pm2_5}</p>
            </li>
            <li className="air-components-stat">
              <p>Coarse particulate matter:</p>
              <p>{airQualityData.list[0].components.pm10}</p>
            </li>
            <li className="air-components-stat">
              <p> Ammonia:</p>
              <p>{airQualityData.list[0].components.nh3}</p>
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading air quality data...</p>
      )}
      <section className="air-quality-guide-container">
        <div>
          <p>Air Quality Index guide</p>
        </div>
        <ul className="air-quallity-index-guide">
          <li> 1 = Good</li>
          <li>2 = Fair</li>
          <li>3 = Moderate</li>
          <li> 4 = Poor</li>
          <li>5 = Very Poor</li>
        </ul>
      </section>
    </section>
  );
};

export default StateDetails;

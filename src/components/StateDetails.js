import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirQualityAsync } from '../redux/features/countrySlice';

const StateDetails = () => {
  const { selectedState, airQualityData } = useSelector(
    (state) => state.country
  );
  const dispatch = useDispatch();

  console.log(selectedState);
  useEffect(() => {
    if (selectedState) {
      dispatch(fetchAirQualityAsync(selectedState));
    }
  }, [selectedState, dispatch]);

  return (
    <div>
      <h1>State Details</h1>
      <p>
        State Name:
        {selectedState?.stateName}
      </p>

      {airQualityData ? (
        <div>
          <h2>Air Quality Data</h2>
          <p>
            Air Quality Index (AQI):
            {airQualityData.list[0].main.aqi}
          </p>
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
    </div>
  );
};

export default StateDetails;

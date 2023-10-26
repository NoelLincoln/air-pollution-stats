import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirQualityAsync } from '../redux/features/countrySlice';

const StateDetails = () => {
  const { selectedState, airQualityData } = useSelector(
    (state) => state.country,
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
          <ul>
            <li>
              CO:
              {airQualityData.list[0].components.co}
            </li>
            <li>
              NO:
              {airQualityData.list[0].components.no}
            </li>
            <li>
              NO2:
              {airQualityData.list[0].components.no2}
            </li>
            <li>
              O3:
              {airQualityData.list[0].components.o3}
            </li>
            <li>
              SO2:
              {airQualityData.list[0].components.so2}
            </li>
            <li>
              PM2.5:
              {airQualityData.list[0].components.pm2_5}
            </li>
            <li>
              PM10:
              {airQualityData.list[0].components.pm10}
            </li>
            <li>
              NH3:
              {airQualityData.list[0].components.nh3}
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

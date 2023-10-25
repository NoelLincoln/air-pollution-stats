import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocation,
  reverseGeocodeAsync,
} from '../redux/features/countrySlice';

const HomePage = () => {
  const { country, image } = useSelector((state) => state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    function successCallback(position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      dispatch(setLocation({ latitude, longitude }));
      dispatch(reverseGeocodeAsync({ latitude, longitude }));
    }

    function errorCallback(error) {
      console.error(`Error getting user's location: ${error.message}`);
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, [dispatch]);

  return (
    <section className="home-container">
      <div className="continent">
        <div className="continent-img">
          <img src={image} alt="" />
          <div className="continent-details">
            <h1>{country}</h1>
            <span>4000 views</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

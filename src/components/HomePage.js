import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocation,
  reverseGeocodeAsync,
  setDataFetched,
} from '../redux/features/countrySlice';

const HomePage = () => {
  const { country, image, isDataFetched } = useSelector(
    (state) => state.country,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataFetched) {
      const successCallback = (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        dispatch(setLocation({ latitude, longitude }));
        dispatch(reverseGeocodeAsync({ latitude, longitude }));
        dispatch(setDataFetched(true));
      };

      const errorCallback = (error) => {
        console.error(`Error getting user's location: ${error.message}`);
        dispatch(setDataFetched(true));
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
        );
      } else {
        console.error('Geolocation is not available in this browser.');
        dispatch(setDataFetched(true));
      }
    }
  }, [dispatch, isDataFetched]);

  return (
    <section className="home-container">
      <div className="country">
        <div className="country-img">
          <img src={image} alt="" />
          <div className="country-details">
            <h1>{country}</h1>
            <span>4000 views</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

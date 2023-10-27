import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import worldimg from '../images/world-globe.gif';
import CountrySelectionModal from './CountrySelectionModal';

import {
  setLocation,
  reverseGeocodeAsync,
  setDataFetched,
  setCountriesList,
  setTotalNumberOfStates,
  fetchCountriesAsync,
  fetchStatesAsync,
  setStates,
  setCountry,
  setCountryShortCode,
} from '../redux/features/countrySlice';
import 'leaflet/dist/leaflet.css';

const HomePage = () => {
  const { country, image, isDataFetched, states, countries } = useSelector(
    (state) => state.country
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      const successCallback = (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        dispatch(setLocation({ latitude, longitude }));
        dispatch(reverseGeocodeAsync({ latitude, longitude }));
        dispatch(setDataFetched(true));
        dispatch(setTotalNumberOfStates(states.length));
      };

      const errorCallback = (error) => {
        console.error(`Error getting user's location: ${error.message}`);
        dispatch(setDataFetched(true));
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      } else {
        console.error('Geolocation is not available in this browser.');
        dispatch(setDataFetched(true));
      }
    }
  }, [dispatch, isDataFetched, states]);

  const openCountrySelectionModal = () => {
    dispatch(fetchCountriesAsync()).then((result) => {
      if (fetchCountriesAsync.fulfilled.match(result)) {
        dispatch(setCountriesList(result.payload));
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch countries');
      }
    });
  };

  const closeCountrySelectionModal = () => {
    setIsModalOpen(false);
  };

  const handleCountrySelect = (selectedCountry) => {
    const newCountryShortCode = selectedCountry.iso2;

    dispatch(setCountry([selectedCountry]));

    dispatch(setCountry(selectedCountry.name));

    dispatch(setCountryShortCode(newCountryShortCode));

    dispatch(fetchStatesAsync(newCountryShortCode)).then((result) => {
      if (fetchStatesAsync.fulfilled.match(result)) {
        dispatch(setStates(result.payload));
      } else {
        console.error('Failed to fetch states for the selected country');
      }
    });

    closeCountrySelectionModal();
  };

  return (
    <section className="home-container">
      <div className="country">
        <div className="country-img">
          <div className="world-img">
            <img src={worldimg} alt="" />
          </div>
          <div className="country-details">
            <h1>{country}</h1>
            <span>
              {states.length}
              <br />
              States
            </span>
            <button type="button" onClick={openCountrySelectionModal} className="change-country-btn">
              Change country
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CountrySelectionModal
          countries={countries}
          onSelect={handleCountrySelect}
          onClose={closeCountrySelectionModal}
        />
      )}
    </section>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchStatesAsync,
  fetchGeolocationAsync,
  setSelectedState,
} from '../redux/features/countrySlice';

const StateList = () => {
  const { countryShortCode, image, states, fetchStatus, error, selectedState } =
    useSelector((state) => state.country);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (countryShortCode) {
      dispatch(fetchStatesAsync(countryShortCode));
    }
  }, [countryShortCode, dispatch]);

  const handleStateClick = async (state) => {
    const stateName = state.name;

    if (stateName) {
      dispatch(fetchGeolocationAsync(stateName));
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchText(searchTerm);

    const filteredResults = searchTerm
      ? states.filter((state) => state.name.toLowerCase().includes(searchTerm))
      : states;

    setSearchResults(filteredResults);
  };

  const handleStateSelection = (state) => {
    dispatch(setSelectedState(state));
  };

  return (
    <section className="state-list-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a state"
          value={searchText}
          onChange={handleSearchChange}
        />
        <ul>
          {searchResults.map((state) => (
            <li key={state.id} onClick={() => handleStateSelection(state)}>
              {state.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-state">
        {selectedState && (
          <div>
            <h2>Selected State</h2>
            <p>State Name: {selectedState.name}</p>
            {/* Display other state details here */}
          </div>
        )}
      </div>
      <h4>Stats By State</h4>
      <ul className="state-list">
        {fetchStatus === 'loading' && <p>Loading states...</p>}
        {fetchStatus === 'failed' && <p>Error: {error}</p>}
        {fetchStatus === 'fulfilled' &&
          (searchResults.length > 0 ? searchResults : states).map((state) => (
            <li key={state.id} className="state-stat">
              <Link to={`/state/${state.id}`}>
                <button
                  type="button"
                  onClick={() => handleStateClick(state)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img src={image} alt="" className="state-img" />
                  <p>{state.name}</p>
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default StateList;

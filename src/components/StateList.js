import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import arrowRight from '../images/arrow-right.png';
import {
  fetchStatesAsync,
  fetchGeolocationAsync,
  setSelectedState,
} from '../redux/features/countrySlice';

const StateList = () => {
  const {
    countryShortCode, image, states, fetchStatus, error,
  } = useSelector(
    (state) => state.country,
  );
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
        <h4>Stats By State</h4>

        <input
          type="text"
          placeholder="Search for a state"
          value={searchText}
          onChange={handleSearchChange}
        />
        <ul>
          {searchResults.map((state) => (
            <button
              type="button"
              key={state.id}
              onClick={() => handleStateSelection(state)}
            >
              {state.name}
            </button>
          ))}
        </ul>
      </div>

      <ul className="state-list">
        {fetchStatus === 'loading' && <p>Loading states...</p>}
        {fetchStatus === 'failed' && <p>{error}</p>}
        {fetchStatus === 'fulfilled'
          && (searchResults.length > 0 ? searchResults : states).map((state) => (
            <li key={state.id} className="state-stat">
              <div className="arrow-right-cont">
                <img src={arrowRight} alt="arrow right" />
              </div>
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
                  <div className="statenamelist">
                    <p>{state.name}</p>
                    {state.id}
                  </div>
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default StateList;

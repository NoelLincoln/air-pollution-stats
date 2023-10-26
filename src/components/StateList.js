import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchStatesAsync,
  fetchGeolocationAsync,
} from '../redux/features/countrySlice';

const StateList = () => {
  const {
    countryShortCode, image, states, fetchStatus, error,
  } = useSelector(
    (state) => state.country,
  );
  const dispatch = useDispatch();

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

  return (
    <section className="state-list-container">
      <h4>Stats By State</h4>
      <ul className="state-list">
        {fetchStatus === 'loading' && <p>Loading states...</p>}
        {fetchStatus === 'failed' && (
          <p>
            Error:
            {error}
          </p>
        )}
        {fetchStatus === 'fulfilled'
          && states.map((state) => (
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

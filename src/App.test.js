import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import redux-mock-store
import App from './App';

const mockStore = configureStore([]);
const initialState = {
  latitude: -1.3025617,
  longitude: 36.9916181,
  countries: [],
  country: 'Kenya',
  countryShortCode: 'KE',
  image: 'https://twemoji.maxcdn.com/2/svg/1f1f0-1f1ea.svg',
  states: [
    {
      id: 64772,
      name: 'Ahero',
    },
    {
      id: 64773,
      name: 'Athi River',
    },
  ],
  totalNumberOfStates: 110,
  selectedState: [],
  airQualityData: null,
  isDataFetched: true,
  fetchStatus: 'fulfilled',
  error: null,
};

const store = mockStore(initialState);

test('App component renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  expect(asFragment()).toMatchSnapshot();
});

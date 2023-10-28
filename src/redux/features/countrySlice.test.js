import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react';
import axios from 'axios';

import {
  fetchCountriesAsync,
  reverseGeocodeAsync,
  fetchStatesAsync,
  fetchGeolocationAsync,
  fetchAirQualityAsync,
} from './countrySlice';

describe('Redux Slice Async Thunks', () => {
  it('fetchCountriesAsync should fetch and return a list of countries', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ name: 'Country1' }, { name: 'Country2' }],
    });

    const dispatch = jest.fn();
    await fetchCountriesAsync()(dispatch, jest.fn());

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchCountriesAsync.fulfilled.type,
      payload: [{ name: 'Country1' }, { name: 'Country2' }],
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    });
  });

  it('reverseGeocodeAsync should reverse geocode and return country details', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          country: 'us',
          flag_url: 'https://twemoji.maxcdn.com/2/svg/1f1fa-1f1f8.svg',
        },
      ],
    });

    const getState = jest.fn().mockReturnValue({
      country: {
        countryShortCode: 'US',
      },
    });

    const dispatch = jest.fn();
    await reverseGeocodeAsync({ latitude: 0, longitude: 0 })(
      dispatch,
      getState,
    );

    const expectedAction = {
      meta: {
        arg: { latitude: 0, longitude: 0 },
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
      payload: {
        countryShortName: 'us',
        fullName: 'United States',
        imageUrl: 'https://twemoji.maxcdn.com/2/svg/1f1fa-1f1f8.svg',
      },
      type: reverseGeocodeAsync.fulfilled.type,
    };

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('fetchStatesAsync should fetch and return a list of states', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ name: 'State1' }, { name: 'State2' }],
    });

    const dispatch = jest.fn();
    await fetchStatesAsync('US')(dispatch, jest.fn());

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchStatesAsync.fulfilled.type,
        payload: [{ name: 'State1' }, { name: 'State2' }],
      }),
    );
  });

  it('fetchGeolocationAsync should fetch and return geolocation data', async () => {
    // Mock the axios.get method
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ lat: 12.34, lon: 56.78, country: 'US' }],
    });

    // Mock the getState function
    const getState = jest.fn().mockReturnValue({
      country: {
        countryShortCode: 'US',
      },
    });

    const dispatch = jest.fn();
    await fetchGeolocationAsync('StateName')(dispatch, getState);

    // Wait for the asynchronous thunk to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchGeolocationAsync.fulfilled.type,
        payload: {
          latitude: 12.34,
          longitude: 56.78,
          stateName: 'StateName',
          country: 'US',
        },
      }),
    );
  });

  it('fetchAirQualityAsync should fetch and return air quality data', async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: { airQuality: 'good' },
    });

    const dispatch = jest.fn();
    await fetchAirQualityAsync({ latitude: 12.34, longitude: 56.78 })(dispatch);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchAirQualityAsync.fulfilled.type,
        payload: { airQuality: 'good' },
      }),
    );
  });
});

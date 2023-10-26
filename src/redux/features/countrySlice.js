import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import countries from '../../components/countries';

export const fetchCountriesAsync = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const apiKey = 'RWJoWUt3SUtEQXNDSktpUDhIY1VNYTFvTXpSNmxPUjVubUdWV0U3Wg==';
    const apiEndpoint = 'https://api.countrystatecity.in/v1/countries';
    const response = await fetch(apiEndpoint, {
      headers: {
        'X-CSCAPI-KEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }

    const data = await response.json();
    return data;
  }
);

export const reverseGeocodeAsync = createAsyncThunk(
  'country/reverseGeocode',
  async ({ latitude, longitude }) => {
    const apiKey = '862090a665075dd09b646a7cca4e4e1e';
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=20&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }
    const data = await response.json();
    const countryShortName = data[0].country.toLowerCase();

    const matchedCountry = countries.find(
      (country) => country.code === countryShortName
    );

    if (!matchedCountry) {
      throw new Error('Country not found');
    }

    const fullName = matchedCountry.name;
    const imageUrl = matchedCountry.flag;

    return { fullName, imageUrl, countryShortName };
  }
);
export const fetchStatesAsync = createAsyncThunk(
  'country/fetchStates',
  async (countryShortName) => {
    const apiKey = 'RWJoWUt3SUtEQXNDSktpUDhIY1VNYTFvTXpSNmxPUjVubUdWV0U3Wg==';
    const apiEndpoint = `https://api.countrystatecity.in/v1/countries/${countryShortName}/cities`;

    const response = await fetch(apiEndpoint, {
      headers: {
        'X-CSCAPI-KEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }

    const data = await response.json();
    return data;
  }
);

export const fetchGeolocationAsync = createAsyncThunk(
  'state/fetchGeolocation',
  async (stateName, { getState }) => {
    try {
      const apiKey = '862090a665075dd09b646a7cca4e4e1e';
      const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${stateName}&limit=10&appid=${apiKey}`;

      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const { data } = response;

        const selectedCountry = getState().country.countryShortCode;
        const filteredData = data.find(
          (item) => item.country === selectedCountry
        );

        if (data && data[0]) {
          const { lat, lon } = data[0];
          const { country } = filteredData;
          const geolocationData = {
            latitude: lat,
            longitude: lon,
            stateName,
            country,
          };
          return geolocationData;
        }
        throw new Error('No geolocation data found');
      } else {
        throw new Error('Failed to fetch geolocation data');
      }
    } catch (error) {
      throw new Error('Failed to fetch geolocation data');
    }
  }
);

export const fetchAirQualityAsync = createAsyncThunk(
  'state/fetchAirQuality',
  async ({ latitude, longitude }) => {
    try {
      const apiKey = '862090a665075dd09b646a7cca4e4e1e';
      const endpoint = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const airQualityData = response.data;

        return airQualityData;
      }
      throw new Error('Failed to fetch air quality data');
    } catch (error) {
      throw new Error('Failed to fetch air quality data');
    }
  }
);
export const setCountry = createAction('country/setCountry');
export const setStates = createAction('country/setStates');
export const clearCountry = createAction('country/clearCountry');
export const setCountryShortCode = createAction('country/setCountryShortCode');

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    latitude: null,
    longitude: null,
    countries: [],
    country: null,
    countryShortCode: '',
    image: null,
    states: [],
    totalNumberOfStates: null,
    selectedState: [],
    airQualityData: null,
    isDataFetched: false,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
    setDataFetched: (state, action) => {
      state.isDataFetched = action.payload;
    },
    setTotalNumberOfStates: (state, action) => {
      state.totalNumberOfStates = action.payload;
    },
    setCountriesList: (state, action) => {
      state.countries = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    clearCountry: (state) => {
      state.country = null;
    },
    setCountryShortCode: (state, action) => {
      state.countryShortCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reverseGeocodeAsync.fulfilled, (state, action) => {
        state.country = action.payload.fullName;
        state.image = action.payload.imageUrl;
        state.countryShortCode = action.payload.countryShortName.toUpperCase();
      })
      .addCase(reverseGeocodeAsync.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(reverseGeocodeAsync.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.countries = action.payload;
      })
      .addCase(fetchCountriesAsync.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchCountriesAsync.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStatesAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.states = action.payload;
        state.totalNumberOfStates = action.payload.length;
      })
      .addCase(fetchStatesAsync.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStatesAsync.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchGeolocationAsync.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchGeolocationAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.selectedState = action.payload;
      })
      .addCase(fetchGeolocationAsync.rejected, (state) => {
        state.fetchStatus = 'failed';
      })
      .addCase(fetchAirQualityAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.airQualityData = action.payload;
      })
      .addCase(fetchAirQualityAsync.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchAirQualityAsync.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(setStates, (state, action) => {
        state.states = action.payload;
      });
  },
});

export const {
  setLocation,
  setSelectedState,
  setDataFetched,
  setTotalNumberOfStates,
  setSelectedCountry,
  setCountriesList,
} = countrySlice.actions;
export default countrySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countries from '../../components/countries';

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
    console.log('states', data);

    return data;
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    latitude: null,
    longitude: null,
    country: null,
    countryShortCode: '',
    image: null,
    states: [],
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
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
      .addCase(fetchStatesAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.states = action.payload;
      })
      .addCase(fetchStatesAsync.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchStatesAsync.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setLocation } = countrySlice.actions;
export default countrySlice.reducer;

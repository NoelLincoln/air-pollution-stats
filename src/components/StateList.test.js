import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import StateList from './StateList';

// Mock the asynchronous actions to return sample data
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test('renders StateList component', () => {
  useSelector.mockReturnValue({
    type: 'country/fetchStates/fulfilled',
    payload: [
      {
        id: 64772,
        name: 'Ahero',
      },
      {
        id: 64773,
        name: 'Athi River',
      },
    ],
    meta: {
      arg: 'KE',
      requestId: 'BoN8_YKigJabj8Ni2e-2E',
      requestStatus: 'fulfilled',
    },
  });

  render(
    <MemoryRouter>
      <StateList />
    </MemoryRouter>,
  );

  const stateListContainer = screen.getByText('Stats By State');
  expect(stateListContainer).toBeInTheDocument();
});

test('displays "Loading states..." while fetching data', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  useSelector.mockReturnValue({
    countryShortCode: 'US',
    image: 'state-image.png',
    states: [],
    fetchStatus: 'loading',
    error: null,
  });

  render(
    <MemoryRouter>
      <StateList />
    </MemoryRouter>,
  );

  const loadingText = screen.getByText('Loading states...');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  expect(loadingText).toBeInTheDocument();
});

test('displays an error message when there is a fetch failure', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  useSelector.mockReturnValue({
    countryShortCode: 'US',
    image: 'state-image.png',
    states: [],
    fetchStatus: 'failed',
    error: 'An error occurred',
  });

  render(
    <MemoryRouter>
      <StateList />
    </MemoryRouter>,
  );

  const errorText = screen.getByText('An error occurred');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  expect(errorText).toBeInTheDocument();
});

test('displays the list of states when data is available', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue({
    countryShortCode: 'US',
    image: 'state-image.png',
    states: [
      { id: 1, name: 'State1' },
      { id: 2, name: 'State2' },
    ],
    fetchStatus: 'fulfilled',
    error: null,
  });

  render(
    <MemoryRouter>
      <StateList />
    </MemoryRouter>,
  );

  const state1 = screen.getByText('State1');
  const state2 = screen.getByText('State2');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(state1).toBeInTheDocument();
  expect(state2).toBeInTheDocument();
});

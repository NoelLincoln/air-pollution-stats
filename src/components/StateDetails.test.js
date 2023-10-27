import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

import StateDetails from './StateDetails';

// Mock the asynchronous action to return sample data
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test('renders StateDetails component', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  useSelector.mockReturnValue({
    selectedState: { stateName: 'TestState' },
    airQualityData: null,
  });

  render(<StateDetails />);
  const stateDetailsComponent = screen.getByText('State Details');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  expect(stateDetailsComponent).toBeInTheDocument();
});

test('displays "Loading air quality data..." while data is being fetched', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue({
    selectedState: { stateName: 'TestState' },
    airQualityData: null,
  });

  render(<StateDetails />);
  const loadingText = screen.getByText('Loading air quality data...');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  expect(loadingText).toBeInTheDocument();
});

test('displays the Air Quality Index guide', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue({
    selectedState: { stateName: 'TestState' },
    airQualityData: null,
  });

  render(<StateDetails />);
  const guideText = screen.getByText('Air Quality Index guide');
  expect(guideText).toBeInTheDocument();
  const indexGuideItems = screen.getAllByRole('listitem');
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  expect(indexGuideItems).toHaveLength(5);
});

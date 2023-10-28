import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import HomePage from './HomePage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockReturnValue({
    country: 'USA',
    states: ['State1', 'State2'],
    isDataFetched: true,
  });
});

test('renders HomePage component', () => {
  render(<HomePage />);
  const changeCountryBtn = screen.getByRole('button', {
    name: 'Change country',
  });
  expect(changeCountryBtn).toBeInTheDocument();
});

test('displays country name and states count', () => {
  useSelector.mockReturnValue({
    country: 'USA',
    states: ['State1', 'State2'],
    isDataFetched: true,
  });

  render(<HomePage />);
  const countryName = screen.getByText('USA');
  expect(countryName).toBeInTheDocument();
});

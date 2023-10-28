import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSelector } from 'react-redux';
import CountrySelectionModal from './CountrySelectionModal';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockCountries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
];

beforeEach(() => {
  useSelector.mockReturnValue({ countries: mockCountries });
});

test('renders the CountrySelectionModal component', () => {
  render(<CountrySelectionModal onSelect={() => {}} onClose={() => {}} />);

  const searchInput = screen.getByPlaceholderText('Search for a country');
  expect(searchInput).toBeInTheDocument();

  mockCountries.forEach((country) => {
    const countryButton = screen.getByRole('button', {
      name: new RegExp(country.name, 'i'),
    });
    expect(countryButton).toBeInTheDocument();
  });
});

test('filters and displays countries based on search input', () => {
  render(<CountrySelectionModal onSelect={() => {}} onClose={() => {}} />);

  const searchInput = screen.getByPlaceholderText('Search for a country');

  fireEvent.change(searchInput, { target: { value: 'United' } });

  const filteredCountry = screen.getByRole('button', {
    name: /United States/,
  });
  expect(filteredCountry).toBeInTheDocument();

  mockCountries
    .filter((country) => country.name !== 'United States')
    .forEach((country) => {
      const countryButton = screen.queryByText(country.name);
      expect(countryButton).not.toBeInTheDocument();
    });
});

test('calls onSelect and onClose when a country is selected', () => {
  const mockOnSelect = jest.fn();
  const mockOnClose = jest.fn();

  render(
    <CountrySelectionModal onSelect={mockOnSelect} onClose={mockOnClose} />,
  );

  const canadaButton = screen.getByRole('button', {
    name: /Canada/,
  });

  fireEvent.click(canadaButton);

  expect(mockOnSelect).toHaveBeenCalledWith(mockCountries[1]);
  expect(mockOnClose).toHaveBeenCalled();
});

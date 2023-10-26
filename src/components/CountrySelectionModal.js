// CountrySelectionModal.js

import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

import { useSelector } from 'react-redux/es/hooks/useSelector';

const CountrySelectionModal = ({ onSelect, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const { countries } = useSelector((state) => state.country);

  const handleSelectCountry = (country) => {
    onSelect(country);
    onClose();
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="country-selection-modal">
      <input
        type="text"
        placeholder="Search for a country"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.code} onClick={() => handleSelectCountry(country)}>
            {country.name}
            {country.code}
          </li>
        ))}
      </ul>
    </div>
  );
};

CountrySelectionModal.propTypes = {
  onSelect: PropTypes.func.isRequired, // 'onSelect' should be a function and is required
  onClose: PropTypes.func.isRequired, // 'onClose' should be a function and is required
};

export default CountrySelectionModal;

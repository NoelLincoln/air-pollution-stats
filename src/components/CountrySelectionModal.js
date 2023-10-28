import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

const CountrySelectionModal = ({ onSelect, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const { countries } = useSelector((state) => state.country);

  const handleSelectCountry = (country) => {
    onSelect(country);
    onClose();
  };

  const searchTextLowerCase = searchText.toLowerCase();
  // eslint-disable-next-line max-len
  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchTextLowerCase));
  return (
    <div className="country-selection-modal">
      <input
        type="text"
        placeholder="Search for a country"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="list-countries">
        {filteredCountries.map((country) => (
          <button
            type="button"
            key={country.code}
            onClick={() => handleSelectCountry(country)}
          >
            {country.name}
            {country.code}
          </button>
        ))}
      </div>
    </div>
  );
};

CountrySelectionModal.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CountrySelectionModal;

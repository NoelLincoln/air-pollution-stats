import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import arrowback from '../images/arrow-back.png';
import menuicon from '../images/menu-icon.png';

const Navigation = () => {
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  return (
    <div className="nav">
      {isHomepage ? (
        <div className="empty-div" />
      ) : (
        <div className="arrow-back">
          <Link to="/">
            <img src={arrowback} alt="Go Back" />
          </Link>
        </div>
      )}
      <div>
        <h2>Air Pollution Stats</h2>
      </div>
      <div className="menu-icon">
        <img src={menuicon} alt="Menu" />
      </div>
    </div>
  );
};

export default Navigation;

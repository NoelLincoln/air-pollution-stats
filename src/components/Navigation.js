import arrowback from '../images/arrow-back.png';
import menuicon from '../images/menu-icon.png';

const Navigation = () => (
  <div className="nav">
    <div className="arrow-back">
      <img src={arrowback} alt="" />
    </div>
    <div className="menu-icon">
      <img src={menuicon} alt="" />
    </div>
  </div>
);

export default Navigation;

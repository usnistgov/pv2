import React from "react";
import './Header.scss';
import NISTLogo from '../../assets/images/NIST-logo.jpg';

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="nist-logo">
          <img src={NISTLogo} alt={"nist logo"} />
        </div>
    </div>
  );
}

export default Header;

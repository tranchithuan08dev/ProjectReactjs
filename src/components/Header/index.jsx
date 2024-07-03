import React from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderMenus from './HeaderMenus';
import HeaderSearch from './HeaderSearch';
import './header.css';

function Header(props) {
  return (
    <header id="header">
      <div className="tcl-container">
        <div className="tcl-row tcl-no-gutters header">
          <div className="tcl-col-2">
            <HeaderLogo />
          </div>
          <div className="tcl-col-4">
            <HeaderSearch />
          </div>
          <div className="tcl-col-6">
            <HeaderMenus />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

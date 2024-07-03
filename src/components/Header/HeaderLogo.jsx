import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLogo(props) {
  return (
    <div className="header-logo">
      <Link to="/">
        <img src="/assets/images/logo.png" alt="Go to homepage" />
      </Link>
    </div>
  );
}

export default HeaderLogo;

import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav>
        <Link to="/" className="title">aprox</Link>
      <ul>
        <li><Link to="/methods">methods</Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/help">help</Link></li>
      </ul>
    </nav>
  );
};

export default TopBar;

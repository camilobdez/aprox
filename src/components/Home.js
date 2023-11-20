import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <Link to="/methods">
        <img src="/home.jpg" alt='teseracto' style={{ width: '90%', margin: 'auto', display: 'block' }} />
      </Link>
    </div>
  );
};

export default Home;

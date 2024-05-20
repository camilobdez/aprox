import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div>
      <div className='title-about'>
          <a className='about-title'>help</a>
      </div>

      <div className="about-container">
        
        <div className="about-text">
          <p><em>The function I provided cannot be parsed</em></p>
          <ul>
            <li>check <a href="https://github.com/camilobdez/aprox/blob/main/src/backend/app.py">app.py</a> to see how functions are parsed</li>
            <li>remember to check the help button to see how to write your function expression</li>
          </ul>
          <br/>
          <p><em>I found a bug/an issue on the website</em></p>
          <ul>
            <li>please <a href="https://github.com/camilobdez/aprox/issues/new">create an issue</a> on the <a href="https://github.com/camilobdez/aprox">GitHub project</a></li>
          </ul>
        </div>
        <div className="about-image">
          <Link to="/01101100-01101111-01110011-01110100">
            <img src="/help.png" alt="About" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
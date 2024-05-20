import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <div className='title-about'>
          <a className='about-title'>about</a>
      </div>
      <div className="about-container">
        <div className="about-text">
          <p>We made this web app to present some methods used to solve numerical problems.</p>
          <br/>
          <p>
            Main libraries/packages used for this project
          </p>
          <ul>
            <li><a href="https://mauriciopoppe.github.io/function-plot/">function-plot:</a> A 2d function plotter powered by D3</li>
            <li><a href="https://www.sympy.org/en/index.html">sympy:</a>: A python library for symbolic mathematics</li>
            <li><a href="https://numpy.org/">numpy:</a>  A powerful library for numerical operations in python</li>
            <li><a href="https://flask.palletsprojects.com/en/3.0.x/">flask:</a> A lightweight web application framework in python</li>
          </ul>
          <br/>
          <p>
            If you wish to contribute to this project, check out the <a href="https://github.com/camilobdez/aprox">GitHub page</a>
          </p>
          <p>Built with <a href="https://react.dev/">React</a></p>
          <br/>
          <p>Collaborators</p>
          <ul>
            <li>Camilo Bermúdez</li>
            <li>Luis Baena</li>
          </ul>
        </div>
        <div className="about-image">
          <Link to="/01101100-01101111-01110011-01110100">
            <img src="/about.png" alt="About" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Methods = () => {
  const [expandedSections, setExpandedSections] = useState([]);

  const expandSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const isExpanded = (section) => expandedSections.includes(section);


  
  return (
    <div className="methods">
      <div className="section">
        <a onClick={() => expandSection('equations')}>
          {isExpanded('equations') ? '▼' : '►'} solving equations
        </a>
        {isExpanded('equations') && (
          <div>
            <ul>
                <li><Link to="/bisection"><span>bisection</span></Link></li>
                <li><Link to="/false-position"><span>false position</span></Link></li>
                <li><Link to="/fixed-point"><span>fixed point</span></Link></li>
                <li><Link to="/newton-raphson"><span>newton-raphson</span></Link></li>
                <li><Link to="/secant"><span>secant</span></Link></li>
                <li><Link to="/multiple-roots"><span>multiple roots</span></Link></li>
            </ul>
          </div>
        )}
      </div>

      <div className="section">
        <a onClick={() => expandSection('systems')}>
          {isExpanded('systems') ? '▼' : '►'} solving systems of equations
        </a>
        {isExpanded('systems') && (
          <div>
            <ul>
                <li><Link to="/jacobi"><span>jacobi</span></Link></li>
                <li><Link to="/gauss-seidel"><span>gauss-seidel</span></Link></li>
                <li><Link to="/sor"><span>sor</span></Link></li>
            </ul>
          </div>
        )}
      </div>

      <div className="section">
        <a onClick={() => expandSection('interpolation')}>
          {isExpanded('interpolation') ? '▼' : '►'} interpolation
        </a>
        {isExpanded('interpolation') && (
          <div>
            <ul>
                <li><Link to="/vandermonde"><span>vandermonde</span></Link></li>
                <li><Link to="/newton"><span>newton</span></Link></li>
                <li><Link to="/lagrange"><span>lagrange</span></Link></li>
                <li><Link to="/spline"><span>spline</span></Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Methods;

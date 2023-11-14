import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // Updated import statements
import Home from './components/Home';
import Methods from './components/Methods';
import Help from './components/Help';
import TopBar from './components/TopBar';
import About from './components/About';
import Graph from './components/Graph';
import Bisection from './components/methods/Bisection';
import FalsePosition from './components/methods/FalsePosition';
import FixedPoint from './components/methods/FixedPoint';
import NewtonRaphson from './components/methods/NewtonRaphson';
import Secant from './components/methods/Secant';
import MultipleRoots from './components/methods/MultipleRoots';
import Jacobi from './components/methods/Jacobi';


const App = () => {
  return (
    <Router>
      <div className='App'>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/methods/bisection" element={<Bisection/>}/>
          <Route path="/methods/false-position" element={<FalsePosition/>}/>
          <Route path="/methods/fixed-point" element={<FixedPoint/>}/>
          <Route path="/methods/newton-raphson" element={<NewtonRaphson/>}/>
          <Route path="/methods/secant" element={<Secant/>}/>
          <Route path='/methods/multiple-roots' element={<MultipleRoots/>}/>
          <Route path='/graph' element={<Graph/>}/>
          <Route path='/methods/jacobi' element={<Jacobi/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

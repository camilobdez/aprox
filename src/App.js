import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // Updated import statements
import { Redirect } from 'react-router-dom';
import Home from './components/Home';
import Methods from './components/Methods';
import Help from './components/Help';
import TopBar from './components/TopBar';
import About from './components/About';
import Graph from './components/Graph';
import NotFound from './components/NotFound';
import Bisection from './components/methods/Bisection';
import FalsePosition from './components/methods/FalsePosition';
import FixedPoint from './components/methods/FixedPoint';
import NewtonRaphson from './components/methods/NewtonRaphson';
import Secant from './components/methods/Secant';
import MultipleRoots from './components/methods/MultipleRoots';
import Jacobi from './components/methods/Jacobi';
import GaussSeidel from './components/methods/GaussSeidel';
import Sor from './components/methods/SOR';
import Vandermonde from './components/methods/Vandermonde';
import Newton from './components/methods/Newton';
import Lagrange from './components/methods/Lagrange';
import Spline from './components/methods/Spline';


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
          <Route path="*" element={<NotFound/>}/>
          <Route path="/methods/bisection" element={<Bisection/>}/>
          <Route path="/methods/false-position" element={<FalsePosition/>}/>
          <Route path="/methods/fixed-point" element={<FixedPoint/>}/>
          <Route path="/methods/newton-raphson" element={<NewtonRaphson/>}/>
          <Route path="/methods/secant" element={<Secant/>}/>
          <Route path='/methods/multiple-roots' element={<MultipleRoots/>}/>
          <Route path='/graph' element={<Graph/>}/>
          <Route path='/methods/jacobi' element={<Jacobi/>}/>
          <Route path='/methods/gauss_seidel' element={<GaussSeidel/>}/>
          <Route path='/methods/sor' element={<Sor/>}/>
          <Route path='/methods/vandermonde' element={<Vandermonde/>}/>
          <Route path='/methods/newton' element={<Newton/>}/>
          <Route path='/methods/lagrange' element={<Lagrange/>}/>
          <Route path='/methods/spline' element={<Spline/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // Updated import statements
import Home from './components/Home';
import Methods from './components/Methods';
import Help from './components/Help';
import TopBar from './components/TopBar';
import About from './components/About';
import Bisection from './components/methods/Bisection';
import FalsePosition from './components/methods/FalsePosition';

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
          <Route path="/bisection" element={<Bisection/>}/>
          <Route path="/false-position" element={<FalsePosition/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

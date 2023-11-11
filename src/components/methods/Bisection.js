import React, { useState } from 'react';

const Bisection = () => {
  const [funct, setFunct] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [maxIterations, setMaxIterations] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div>
      <div className='form-container'>
        
        <form className='form'>

          <label >
            Function:
            <input
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              />
          </label>

          <label>
            Function
            <input
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              />
          </label>

          <label>
            Function
            <input
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              />
          </label>

          <label>
            Function
            <input
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              />
          </label>

          <label>
            Function
            <input
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              />
          </label>


        </form>
      </div>

    </div>
  )
}
export default Bisection;
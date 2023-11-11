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
      <a className='method-title' >bisection</a>

      <div className='form-container'>
        
        <form className='form'>

          <label >
            function
            <input type="text"value={funct} onChange={(e) => setFunct(e.target.value)}/>
          </label>

          <label>
            left endpoint
            <input type="number" value={a} onChange={(e) => setA(e.target.value)}/>
          </label>

          <label>
            right endpoint
            <input type="number" value={b} onChange={(e) => setB(e.target.value)}/>
          </label>

          <label>
            tolerance 
            <input type="number"value={tolerance} onChange={(e) => setTolerance(e.target.value)}/>
          </label>

          <label>
            max iterations
            <input type="number"value={maxIterations} onChange={(e) => setMaxIterations(e.target.value)}/>
          </label>

        </form>
      </div>

    </div>
  )
}
export default Bisection;
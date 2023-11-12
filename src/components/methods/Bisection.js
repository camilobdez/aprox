import React, { useState } from 'react';
import Graph from '../Graph';
import axios from 'axios';

const Bisection = () => {
  const [funct, setFunct] = useState('x**2-2');
  const [a, setA] = useState('-2');
  const [b, setB] = useState('2');
  const [tolerance, setTolerance] = useState('1e-7');
  const [maxIterations, setMaxIterations] = useState('100');
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/bisection', {
              funct: funct,
              a: a,
              b: b,
              tolerance: tolerance,
              maxIterations: maxIterations,
          });

          setResult(response.data.result);
      } catch (error) {
          setResult('Error: Unable to calculate the result.');
      }
  };

  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >bisection</a></div>

      <div className='content-method'>
        <div className='form-container'>
          
          <form className='form' onSubmit={handleFormSubmit}>
          
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

            <button type="submit" style={{color: '#00ce7c'}}>run</button>

            <a className='button-graph'
            href={"/graph?function=" + encodeURIComponent(funct)}
            target="_blank"
            rel="noopener noreferrer">
              graph {funct}
            </a>
            
          </form>
        </div>

        <div className='result'>
          {result && (
                  <table>
                      <thead>
                          <tr>
                              <th>i</th>
                              <th>a</th>
                              <th>b</th>
                              <th>x_m</th>
                              <th>f(x_m)</th>
                              <th>E</th>
                          </tr>
                      </thead>
                      <tbody>
                          {result.map((iteration, index) => (
                              <tr key={index}>
                                  <td>{iteration[0]}</td>
                                  <td>{iteration[1]}</td>
                                  <td>{iteration[2]}</td>
                                  <td>{iteration[3]}</td>
                                  <td>{iteration[4]}</td>
                                  <td>{iteration[5]}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          
        </div>
      </div>
     

    </div>
  )
}
export default Bisection;
import React, { useState } from 'react';
import axios from 'axios';

const Secant = () => {
  const [funct, setFunct] = useState('x**2-2');
  const [x0, setx0] = useState('-100');
  const [x1, setx1] = useState('98');
  const [tolerance, setTolerance] = useState('1e-7');
  const [maxIterations, setMaxIterations] = useState('100');
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/secant', {
              funct: funct,
              x0: x0,
              x1: x1,
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
      <div className='title-method'><a className='method-title' >secant</a></div>

      <div className='content-method'>
        <div className='form-container'>
          
          <form className='form' onSubmit={handleFormSubmit}>

            <label >
              function
              <input type="text"value={funct} onChange={(e) => setFunct(e.target.value)}/>
            </label>

            <label>
              x0
              <input type="number" value={x0} onChange={(e) => setx0(e.target.value)}/>
            </label>

            <label>
              x1
              <input type="number" value={x1} onChange={(e) => setx1(e.target.value)}/>
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
                              <th>x_i</th>
                              <th>f(x_i)</th>
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
export default Secant;
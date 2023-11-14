import React, { useState } from 'react';
import axios from 'axios';

const FixedPoint = () => {
  const [funct, setFunct] = useState('log(sin(x)^2 + 1)-(1/2)-x');
  const [gunct, setGunct] = useState('log(sin(x)^2 + 1)-(1/2)');
  const [x0, setx0] = useState('-0.5');
  const [tolerance, setTolerance] = useState('1e-7');
  const [maxIterations, setMaxIterations] = useState('100');
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/fixedpoint', {
              funct: funct,
              gunct: gunct,
              x0: x0,
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
      <div className='title-method'><a className='method-title' >fixed point</a></div>

      <div className='content-method'>
        <div className='form-container'>
          
          <form className='form' onSubmit={handleFormSubmit}>

            <label >
              function f
              <input type="text"value={funct} onChange={(e) => setFunct(e.target.value)}/>
            </label>

            <label>
              function g
              <input type="text" value={gunct} onChange={(e) => setGunct(e.target.value)}/>
            </label>

            <label>
              initial value (x_0)
              <input type="number" value={x0} onChange={(e) => setx0(e.target.value)}/>
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
            href={"/graph?function=" + encodeURIComponent(funct.replace(/e\^(\w+)/g, 'exp($1)').replace(/e\^\((.*?)\)/g, 'exp($1)'))}
            target="_blank"
            rel="noopener noreferrer">
              graph {funct}
            </a>

            <a className='button-graph'
            href={"/graph?function=" + encodeURIComponent(gunct.replace(/e\^(\w+)/g, 'exp($1)').replace(/e\^\((.*?)\)/g, 'exp($1)'))}
            target="_blank"
            rel="noopener noreferrer">
              graph {gunct}
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
                              <th>g(x_i)</th>
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
                                  <td>{iteration[4]}</td>
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
export default FixedPoint;
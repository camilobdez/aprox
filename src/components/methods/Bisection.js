import React, { useState } from 'react';
import axios from 'axios';

const Bisection = () => {
  const [funct, setFunct] = useState('log(sin(x)^2 + 1)-(1/2)');
  const [a, setA] = useState('0');
  const [b, setB] = useState('1');
  const [typeError, setTypeError] = useState('absolute');
  const [lastTypeError, setLastTypeError] = useState('absolute');
  const [tolerance, setTolerance] = useState('1e-7');
  const [maxIterations, setMaxIterations] = useState('100');
  const [result, setResult] = useState({
    tabla: null,
    message: null,
  });
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/bisection', {
        funct: funct,
        a: a,
        b: b,
        typeError: typeError === 'relative' ? 1 : 0,
        tolerance: tolerance,
        maxIterations: maxIterations,
      });      

      if (response.data.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult({
          tabla: response.data.tabla,
          message: response.data.message,
        });
        setLastTypeError(typeError);
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('unable to calculate the result');
      }
      setResult(null);
    }
  };

  return (
    <div className='container-method'>
      <div className='title-method'>
        <a className='method-title'>bisection</a>
      </div>

      <div className='content-method'>
        <div className='form-container'>
          <form className='form' onSubmit={handleFormSubmit}>
            <label>
              function
              <input type="text" value={funct} onChange={(e) => setFunct(e.target.value)} />
            </label>

            <label>
              left endpoint
              <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
            </label>

            <label>
              right endpoint
              <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
            </label>

            <label>
              error type
              <select value={typeError} onChange={(e) => setTypeError(e.target.value)}>
                <option value="absolute">absolute</option>
                <option value="relative">relative</option>
              </select>
            </label>

            <label>
              tolerance
              <input type="number" value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
            </label>

            <label>
              max iterations
              <input type="number" value={maxIterations} onChange={(e) => setMaxIterations(e.target.value)} />
            </label>

            <button type="submit" style={{ color: '#00ce7c' }}>
              run
            </button>

            <button type="button" style={{color: '#00ce7c'}} onClick={() => setShowHelp(!showHelp)}>
              help
            </button>

            <a
              className='button-graph'
              href={"/graph?function=" + encodeURIComponent(funct.replace(/e\^(\w+)/g, 'exp($1)').replace(/e\^\((.*?)\)/g, 'exp($1)'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              graph {funct}
            </a>

            {showHelp && (
              <div className='help-container'>
                <ul>
                  <li>the function must be continuous in [a, b]</li>
                  <li>f(a)*f(b) {'<'} 0</li>
                  <li>symbols defined: x, log (base e), e, sin, cos, tan, abs, ^</li>
                  <li>to multiply terms you must use  the '*' symbol</li>
                </ul>
              </div>
              )}

          </form>
        </div>

        <div className='result'>
          {error && <div className='error-message'> error: {error} </div>}

          {result && result.message &&
          <div className='message'>
            {result.message}
          </div>
          }

          {result && result.tabla && result.tabla.length > 0 ?  (
            <table>
              <thead>
                <tr>
                  <th>i</th>
                  <th>a</th>
                  <th>x_m</th>
                  <th>b</th>
                  <th>f(x_m)</th>
                  <th>{lastTypeError === 'relative' ? 'ε' : 'E'}</th>
                </tr>
              </thead>
              <tbody>
                {result.tabla.map((iteration, index) => (
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
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default Bisection;

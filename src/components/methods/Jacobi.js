import React, { useState } from 'react';
import axios from 'axios';

const Jacobi = () => {
  const [coefficients, setCoefficients] = useState([[10, 5, 6], [-2, 11, 1], [-1, -1, 4]]);
  const [constants, setConstants] = useState([15, 15, 20]);
  const [initialGuess, setInitialGuess] = useState([1, 1, 1]);
  const [typeError, setTypeError] = useState('absolute');
  const [tolerance, setTolerance] = useState(0.5);
  const [maxIterations, setMaxIterations] = useState(100);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState(null);
  const [numIterations, setNumIterations] = useState(null); 
  const [radio, setRadio] = useState(null); 
  const [showHelp, setShowHelp] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/jacobi', {
        coefficients: coefficients,
        constants: constants,
        initialGuess: initialGuess,
        typeError: typeError === 'relative' ? 1 : 0,
        tolerance: tolerance,
        maxIterations: maxIterations,
      });
        
      setResult(response.data.result);
      setErrors(response.data.errors);
      setNumIterations(response.data.numIterations);
      setRadio(response.data.radio);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
    }
  };
  
  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >Jacobi</a></div>
      <div className='content-method'>
        <div className='form-container'>
      
          <form className='form' onSubmit={handleFormSubmit}>
          
            {/* Input for coefficients */}
            <label>
              Coefficients:
              <input
                type='text'
                value={coefficients
                  .map((row) => row.map((val) => (isNaN(val) ? '' : val.toString())).join(','))
                  .join(';')}
                onChange={(e) =>
                  setCoefficients(
                    e.target.value.split(';').map((row) =>
                      row.split(',').map((val) => (val.includes('.') ? parseFloat(val) : parseInt(val)))
                    )
                  )
                }
              />
            </label>

            {/* Input for constants */}
            <label>
              Constants:
              <input
                type='text'
                value={constants.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setConstants(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
                  )
                }
              />
            </label>

            {/* Input for initial guess */}
            <label>
              Initial guess:
              <input
                type='text'
                value={initialGuess.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setInitialGuess(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
                  )
                }
              />
            </label>

            {/* Input for type error */}
            <label>
              Error type 
              <select value={typeError} onChange={(e) => setTypeError(e.target.value)}>
                <option value="absolute">absolute</option>
                <option value="relative">relative</option>
              </select>
            </label>

            {/* Input for tolerance */}
            <label>
              Tolerance
              <input type='number' value={tolerance} onChange={(e) => setTolerance(parseFloat(e.target.value))} />
            </label>

            {/* Input for max iterations */}
            <label>
              Max iterations
              <input
                type='number'
                value={maxIterations}
                onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              />
            </label>

            <button type="submit" style={{color: '#00ce7c'}}>run</button>
            
            <button type="button" style={{color: '#00ce7c'}} onClick={() => setShowHelp(!showHelp)}>
              help
            </button>

            {showHelp && (
              <div className='help-container'>
                <ul>
                  <li>[1] Si el radio espectral es {'>='} 1, el metodo no necesariamente converge</li>
                  <li>[2] Para ingresar la mátriz separe las filas con ';' y los valores con ',' como en Matlab</li>
                  <li>[3] El método de Jacobi converge si la matriz es estrictamente diagonalmente dominante.</li>
                  <li>[4] Se usó la norma infinita para calcular el error.</li>
                </ul>
              </div>
              )}

          </form>
        </div>

        <div className='result'>
          {result && (
            <table>
              <thead>
                <tr>
                  <th>i</th>
                  <th>E</th>
                  <th>aprox</th>
                </tr>
              </thead>
              <tbody>
                {numIterations.map((value, index) => (
                  <tr key={index}>
                    <td>{value}</td>
                    <td>{errors[index]}</td>
                    <td>{result[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>            
            )}
            <br />
          <th>Radio espectral: {radio}</th>
        </div>
      </div>
    </div>
  )
}

export default Jacobi;
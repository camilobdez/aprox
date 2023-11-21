import React, { useState } from 'react';
import axios from 'axios';

const Lagrange = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/lagrange', {
        x: x,
        y: y,
      });

      if (response.data.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult(response.data.result);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('unable to calculate the result');
        setError(null);
      }
      setResult([]);
    }
  };

  const getPolynomialExpression = () => {
    const expressionTerms = result.map((value, index) => {
      if (value !== 0) {
        const sign = value < 0 || index === 0 ? '' : '+';
        const term = `${value} * x^${result.length - 1 - index}`;
        return `${sign}${term}`;
      }
      return null;
    });
  
    return expressionTerms.join(' ') || '0';
  };

  const polynomialExpression = getPolynomialExpression();
  const encodedPolynomialExpression = encodeURIComponent(polynomialExpression);
  const graphUrl = `/graph?function=${encodedPolynomialExpression}`;

  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >Lagrange</a></div>
      <div className='content-method'>
        <div className='form-container'>

          <form className='form' onSubmit={handleFormSubmit}>

            {/* Input for x values */}
            <label>
              X values:
              <input
                type='text'
                value={x.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setX(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : val))
                  )
                }
              />
            </label>

            {/* Input for y values */}
            <label>
              Y values:
              <input
                type='text'
                value={y.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setY(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : val))
                  )
                }
              />
            </label>

            <button type="submit" style={{ color: '#00ce7c' }}>run</button>
            
            <button type="button" style={{color: '#00ce7c'}} onClick={() => setShowHelp(!showHelp)}>
              help
            </button>

            <a className='button-graph' href={graphUrl} target="_blank" rel="noopener noreferrer">
              Graph Function
            </a>

            {showHelp && (
              <div className='help-container'>
                <ul>
                  <li> [1] Ingresa las coordenadas separadas por ','</li>
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
          } <br/>

          {result && (
            <table>
              <thead>
                <tr>
                  <th colSpan={result.length}>Coeficientes</th>
                </tr>
              </thead>
              <tbody>
                {result.map((value, index) => (
                <td key={index}>{value}</td>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <th>
            Polinomio: 
            {result.map((value, index) => (
              <React.Fragment key={index}> 
              {value !== 0 && ( // Mostrar solo los términos no nulos
                <span>
                {value < 0 || index == 0 ? ` ${value}x^${result.length - 1 - index}` : ` + ${value}x^${result.length - 1 - index}`}
                </span>
              )}
              </React.Fragment>
            ))}
          </th>
        </div>
      </div>
    </div>
  )
}

export default Lagrange;
import React, { useState } from 'react';
import Graph from '../Graph';
import axios from 'axios';

const Vandermonde = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [result, setResult] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/vandermonde', {
        x: x,
        y: y,
      });

      setResult(response.data.result);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
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
      <div className='title-method'><a className='method-title' >Vandermonde</a></div>
      <div className='content-method'>
        <div className='form-container'>

          <form className='form' onSubmit={handleFormSubmit}>

            {/* Input for x values */}
            <label>
              x Values (separate values with commas):
              <input
                type='text'
                value={x.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setX(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
                  )
                }
              />
            </label>

            {/* Input for y values */}
            <label>
              y Values (separate values with commas):
              <input
                type='text'
                value={y.map((val) => (isNaN(val) ? '' : val)).join(',')}
                onChange={(e) =>
                  setY(
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
                  )
                }
              />
            </label>

            <button type="submit" style={{ color: '#00ce7c' }}>run</button>
            <br/>

            <br/>
            <a className='button-graph' href={graphUrl} target="_blank" rel="noopener noreferrer">
              Graph Function
            </a>
          
          </form>
          <br/>

          <div style={{color: '#c2fbe1', fontSize: '16px', width: '160%', border: '0.1px solid #ccc', padding: '6px'}}>
            <th>Notas:</th><br/>
            [1] Ingresa las coordenadas separadas por ','<br/><br/>
          </div>
        </div>

        <div className='result'>
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

export default Vandermonde;

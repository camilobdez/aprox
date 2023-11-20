import React, { useState } from 'react';
import axios from 'axios';

const Spline = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [result, setResult] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/spline', {
        x: x,
        y: y,
      });

      setResult(response.data.result);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
    }
  };

  const getPiecewiseLinearExpression = () => {
    if (result.length === 0) {
      return '0';
    }
  
    const expressions = result.map((value, index) => {
      if (index < result.length - 1) {
        const nextIndex = index + 1;
        const expression = `(${value[0]} * (x >= ${value[1]} && x < ${result[nextIndex][1]}))`;
        return expression;
      }
      return null;
    });
  
    const validExpressions = expressions.filter((expression) => expression !== null);
  
    // Construye la expresión a trozos usando operadores de suma
    const piecewiseExpression = validExpressions.reduce((accumulator, expression) => {
      return `${accumulator} + ${expression}`;
    }, '');
  
    return piecewiseExpression;
  };
  
  const piecewiseLinearExpression = getPiecewiseLinearExpression();
  const encodedPiecewiseLinearExpression = encodeURIComponent(piecewiseLinearExpression);
  const graphUrl = `/graph?function=${encodedPiecewiseLinearExpression}`;
      
  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >Spline</a></div>
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
                <td key={index}>
                  {Array.isArray(value) ? value.join(', ') : value}
                </td>
              ))}
              </tbody>
            </table>
          )}
          <br />
          <table>
          <tbody>
            {result.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>Polinomio {rowIndex + 1}:</td>
                <td>
                  {row.map((value, index) => (
                    <React.Fragment key={index}>
                      <span>
                        {index === 0
                          ? `${value}x^${row.length - 1}`
                          : value < 0
                          ? ` - ${-value}x^${row.length - 1 - index}`
                          : ` + ${value}x^${row.length - 1 - index}`}
                      </span>
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Spline;

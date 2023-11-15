import React, { useState } from 'react';
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
                value={x.join(',')}
                onChange={(e) => setX(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            {/* Input for y values */}
            <label>
              y Values (separate values with commas):
              <input
                type='text'
                value={y.join(',')}
                onChange={(e) => setY(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            <button type="submit" style={{ color: '#00ce7c' }}>run</button>

          </form>
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

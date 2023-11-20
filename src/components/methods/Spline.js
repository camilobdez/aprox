import React, { useState } from 'react';
import axios from 'axios';

const Spline = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [d, setD] = useState(1);
  const [result, setResult] = useState([]);
  const [plotImage, setPlotImage] = useState(null);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los valores x e y al servidor para calcular el resultado
      const response = await axios.post('http://localhost:5000/spline', {
        x: x,
        y: y,
        d: d,
      });
      
      // Solicitar al servidor la generación del gráfico con los valores x e y
      const plotResponse = await axios.get('http://localhost:5000/generate_plot', {
        params: {
          x: x.join(','),
          y: y.join(','),
          d: d,
        },
        responseType: 'blob',
      });

      if (response.data.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult(response.data.result);
        const imageSrc = URL.createObjectURL(new Blob([plotResponse.data]));
        setPlotImage(imageSrc);
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('unable to calculate the result');
      }
      setResult([]);
    }
  };

  const openGraphWindow = () => {
    if (plotImage) {
      const graphWindow = window.open('', '_blank');
      graphWindow.document.write(`<img src="${plotImage}" alt="Generated Plot" />`);
    }
  };

  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >Spline</a></div>
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

            {/* Input for d */}
            <label>
              d
              <input
                type='number'
                value={d}
                onChange={(e) => setD(parseFloat(e.target.value))}
              />
              <button onClick={() => setD(1)}>set to 1</button>
              <button onClick={() => setD(3)}>set to 3</button>
            </label>


            <button type="submit" style={{ color: '#00ce7c' }}>run</button>
            
            <button type="button" style={{color: '#00ce7c'}} onClick={() => setShowHelp(!showHelp)}>
              help
            </button>

            <button className='button-graph' onClick={openGraphWindow}>
              Graph Function
            </button>

            {showHelp && (
              <div className='help-container'>
                <ul>
                  <li>[1] Ingresa las coordenadas separadas por ','</li>
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

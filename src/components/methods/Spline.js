import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Spline = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [d, setD] = useState(1);
  const [result, setResult] = useState([]);
  const [plotImage, setPlotImage] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showGraph, setShowGraph] = useState(false);


  useEffect(() => {
    // Fetch the plot image from the Flask server
    fetch('http://localhost:5000/generate_plot')  // Update the URL to match your Flask server
        .then((response) => response.blob())
        .then((blob) => {
            // Create a blob URL for the image
            const imageSrc = URL.createObjectURL(blob);
            setPlotImage(imageSrc);
        })
        .catch((error) => {
            console.error('Error fetching plot image:', error);
        });
}, []);



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los valores x e y al servidor para calcular el resultado
      const response = await axios.post('http://localhost:5000/spline', {
        x: x,
        y: y,
        d: d,
      });

      setResult(response.data.result);
      //setPlotImage(response.data.plotImage); // Almacena la URL de la imagen

      // Solicitar al servidor la generación del gráfico con los valores x e y
      const plotResponse = await axios.get('http://localhost:5000/generate_plot', {
        params: {
          x: x.join(','),
          y: y.join(','),
          d: d,
        },
        responseType: 'blob',
      });

      // Crear una URL de blob para la imagen
      const imageSrc = URL.createObjectURL(new Blob([plotResponse.data]));
      setPlotImage(imageSrc);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
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
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
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
                    e.target.value.split(',').map((val) => (val.trim() === '' || isNaN(val) ? NaN : parseFloat(val)))
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

        {plotImage && <img src={plotImage} alt="Generated Plot" />}

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

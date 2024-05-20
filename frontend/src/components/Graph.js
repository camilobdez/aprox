import React, { useEffect, useState } from 'react';
import functionPlot from 'function-plot';

const Graph = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const functionToPlot = urlParams.get('function');

    try {
      functionPlot({
        target: '#graph',
        xAxis: { label: 'x'},
        yAxis: { label: 'y'},
        data: [{
          fn: functionToPlot,
          color: '#00ce7c',
        }],
      });
    } catch (error) {
      setError('error plotting the function: provide a valid function');
    }
  }, []);

  return (
    <div>
      {error && <div className='error-graph'> {error} </div>}

      {!error &&<div id="graph"></div>}

    </div>
  );
};

export default Graph;

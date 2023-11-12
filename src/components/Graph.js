import React, { useEffect } from 'react';
import functionPlot from 'function-plot';

const Graph = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const functionToPlot = urlParams.get('function');

    functionPlot({
      target: '#graph',
      xAxis: { label: 'x'},
      yAxis: { label: 'y'},
      data: [{
        fn: functionToPlot,
        color: '#00ce7c',
      }],
      
    });
  }, []);

  return <div id="graph" style={{ width: '100%', height: '10px'}}></div>;
};

export default Graph;

import React from 'react';

const Home = () => {

  const textStyle = {
    color: '#c2fbe1',
  };

  return (
    <div>
      <h2>Home</h2>
      <br/>
      <tbody>
        <div style={textStyle}>
        Proyecto de Análisis Numérico ST0256
        </div>
        <br/>
        <div style={textStyle}>
        Este espacio digital es la puerta de entrada a nuestro proyecto de Análisis Numérico,
        donde exploramos y aplicamos diversas técnicas y métodos para resolver problemas
        matemáticos complejos. A través de esta pagina web, compartimos nuestro trabajo
        en diferentes capítulos, cada uno abordando aspectos específicos del análisis numérico.
        </div>
        <br/>
        <div style={textStyle}>
        Descubre nuestras implementaciones detalladas de métodos como Bisección, Punto Fijo,
        Regla Falsa, Newton, Secante, Raíces Múltiples (Capítulo 1), Jacobi, Gauss-Seidel,
        Sor (Capítulo 2), Vandermonde, Newton Interpolante, Lagrange, Spline Lineal y Cúbico
        (Capítulo 3). Cada método te invita a explorar sus detalles, desde la entrada de datos
        hasta las tablas de salida detalladas. En el Capítulo 1, sumérgete en las gráficas de
        funciones y en el Capítulo 3, explora los fascinantes polinomios de interpolación.
        Además, en el Capítulo 2, analizamos el radio espectral y determinamos la convergencia
        de los métodos utilizados.
        </div>
        
        </tbody>
    </div>
  );
};

export default Home;

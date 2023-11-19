import React from 'react';

const About = () => {

  const textStyle = {
    color: '#c2fbe1',
  };

  return (
    <div>
      <h2>About</h2>
      <br/>
      <tbody>
        <div style={textStyle}>
          Conoce al Equipo de Análisis Numérico
        </div>
        <br/>
        <div style={textStyle}>
          Juan Camilo Bermúdez [Ing Matemática]
        <br/>
          Luis Alejandro Baena [Ing Matemática]
        </div>
        <br/>
        <div style={textStyle}>
        Cada uno de nosotros aporta habilidades únicas y perspectivas valiosas al proyecto.
        Nos esforzamos por fusionar teoría y aplicación, creando implementaciones robustas
        y detalladas de métodos como Bisección, Jacobi, Lagrange, entre otros.

        </div>
        </tbody>
    </div>
  );
};

export default About;

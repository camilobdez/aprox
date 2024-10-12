# aprox

A collection of numerical methods for solving equations, solving systems of equations, and performing interpolation. The project includes implementations of well-known numerical methods and is designed as a web application for easy interaction and visualization.


## Methods

### Solving Equations
- **Bisection**: A bracketing method that repeatedly bisects an interval and then selects a subinterval in which a root must lie.
- **False Position**: Similar to the bisection method but uses a linear interpolation to find the root.
- **Fixed Point**: An iterative method that solves equations by repeatedly applying a function.
- **Newton-Raphson**: An iterative method that uses the first derivative to find successively better approximations to the roots of a real-valued function.
- **Secant**: Similar to the Newton-Raphson method but does not require the computation of the derivative.
- **Multiple Roots**: Methods designed to handle cases where a function has multiple roots.

### Solving Systems of Equations
- **Jacobi**: An iterative algorithm for determining the solutions of a diagonally dominant system of linear equations.
- **Gauss-Seidel**: An iterative method used to solve a system of linear equations. It is a variant of the Jacobi method.
- **SOR (Successive Over-Relaxation)**: An iterative method that improves the convergence rate of the Gauss-Seidel method.

### Interpolation
- **Vandermonde**: A matrix method for polynomial interpolation.
- **Newton**: Newton's divided differences interpolation polynomial.
- **Lagrange**: A method of polynomial interpolation which is simple and straightforward to implement.
- **Spline**: A method of interpolation where the interpolant is a special type of piecewise polynomial called a spline.


## Getting Started

### Prerequisites
- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)
- Install required libraries: `flask`, `flask_cors`, `plotly`, `osmnx`, `matplotlib`, `sympy`, `scipy`, etc.

### Installation and usage

To get started with aprox, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/camilobdez/aprox.git
    ```
2. Navigate to the project directory:
    ```bash
    cd aprox/frontend
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Navigate to the backend directory and run the application:
    ```bash
    cd aprox/backend
    python app.py
    ```
5. Run the application:
    ```bash
    cd aprox/frontend
    npm start
    ```
Finally, open your browser and navigate to `http://localhost:3000` to interact with the web app.

## Demo
https://github.com/camilobdez/Aprox/assets/121780547/19ca133b-cf36-4300-a639-a65de62b2756

## Acknowledgements
This project was created as part of a numerical analysis course and includes contributions from various open-source libraries.

## Collaborators

- [Camilo Bermúdez](https://www.github.com/camilobdez)
- [Luis Baena](https://www.github.com/alejobaenam)
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import math
import re
from methods.bisection import my_bisection
from methods.false_position import my_false_position
from methods.fixed_point import my_fixed_point
from methods.newton_raphson import my_newtonraphson
from methods.secant import my_secant
from methods.multiple_roots import my_multipleroots
from methods.jacobi import my_jacobi
from methods.gauss_seidel import my_gauss_seidel
from methods.sor import my_sor
from methods.vandermonde import my_vandermonde
from methods.newton import my_newton
from methods.lagrange import my_lagrange
from methods.spline import my_spline

app = Flask(__name__)
CORS(app)

def f_to_python(funct):
    funct = funct.replace('^', '**').replace('e', 'math.exp(1)').replace('sin', 'math.sin').replace('cos', 'math.cos').replace('tan', 'math.tan').replace('log', 'math.log')
    print(funct)
    f = lambda x: eval(funct)
    print(f(1))
    return f

@app.route('/bisection', methods=['POST'])
def bisection():
    data = request.get_json()
    f = f_to_python(data['funct'])
    a = float(data['a'])
    b = float(data['b'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_bisection(f, a, b, typeE, tol, max_it)
    return jsonify({'result': result})

@app.route('/falseposition', methods=['POST'])
def falseposition():
    data = request.get_json()
    f = f_to_python(data['funct'])
    a = float(data['a'])
    b = float(data['b'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_false_position(f, a, b, typeE, tol, max_it)
    return jsonify({'result': result})

@app.route('/fixedpoint', methods=['POST'])
def fixedpoint():
    data = request.get_json()
    f = f_to_python(data['funct'])
    g = f_to_python(data['gunct'])
    x0 = float(data['x0'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_fixed_point(f, g, x0, typeE, tol, max_it)
    return jsonify({'result': result})

@app.route('/newtonraphson', methods=['POST'])
def newtonraphson():
    data = request.get_json()
    funct = data['funct'].replace('^', '**')
    funct = re.sub(r'e\^(\([^)]+\)|[a-zA-Z0-9]+)', r'exp(\1)', funct)
    f = funct
    x0 = float(data['x0'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_newtonraphson(f, x0, typeE, tol, max_it)
    return jsonify({'result': result})

@app.route('/secant', methods=['POST'])
def secant():
    data = request.get_json()
    f = f_to_python(data['funct'])
    x0 = float(data['x0'])
    x1 = float(data['x1'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_secant(f, x0, x1, typeE, tol, max_it)
    return jsonify({'result': result})

@app.route('/multipleroots', methods=['POST'])
def multipleroots():
    data = request.get_json()
    f = f_to_python(data['funct'])
    x0 = float(data['x0'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_multipleroots(f, x0, typeE,  tol, max_it)
    return jsonify({'result': result})

@app.route('/jacobi', methods=['POST'])
def jacobi():
    data = request.get_json()
    coefficients = np.array(data['coefficients'])
    constants = np.array(data['constants'])
    initial_guess = np.array(data['initialGuess'])
    typeE = int(data['typeError'])
    tol = float(data['tolerance'])
    max_iter = int(data['maxIterations'])

    try:
        result, errors, num_iterations, radio = my_jacobi(coefficients, constants, initial_guess, tol, typeE, max_iter)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/gauss_seidel', methods=['POST'])
def gaussseidel():
    data = request.get_json()
    coefficients = np.array(data['coefficients'])
    constants = np.array(data['constants'])
    initial_guess = np.array(data['initialGuess'])
    tol = float(data['tolerance'])
    max_iter = int(data['maxIterations'])

    try:
        result, errors, num_iterations, radio = my_gauss_seidel(coefficients, constants, initial_guess, tol, max_iter)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/sor', methods=['POST'])
def sor():
    data = request.get_json()
    coefficients = np.array(data['coefficients'])
    constants = np.array(data['constants'])
    initial_guess = np.array(data['initialGuess'])
    tol = float(data['tolerance'])
    max_iter = int(data['maxIterations'])
    w = float(data['w'])

    try:
        result, errors, num_iterations, radio = my_sor(coefficients, constants, initial_guess, tol, max_iter, w)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/vandermonde', methods=['POST'])
def vandermonde():
    data = request.get_json()
    x = np.array(data['x'])
    y = np.array(data['y'])
    
    try:
        result = my_vandermonde(x, y)
        response = {'result': result}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/newton', methods=['POST'])
def newton():
    data = request.get_json()
    x_values = np.array(data['x'])
    y_values = np.array(data['y'])

    try:
        result = my_newton(x_values, y_values)
        pol = my_lagrange(x_values, y_values)
        response = {'result': result, 'pol': pol}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/lagrange', methods=['POST'])
def lagrange():
    data = request.get_json()
    x = np.array(data['x'])
    y = np.array(data['y'])

    try:
        result = my_lagrange(x, y)
        response = {'result': result}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


@app.route('/spline', methods=['POST'])
def spline():
    data = request.get_json()
    x = np.array(data['x'])
    y = np.array(data['y'])

    try:
        result = my_spline(x, y)
        response = {'result': result}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
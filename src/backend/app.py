from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from methods.bisection import my_bisection
from methods.false_position import my_false_position
from methods.fixed_point import my_fixed_point
from methods.newton_raphson import my_newtonraphson
from methods.secant import my_secant
from methods.multiple_roots import my_multipleroots
from methods.jacobi import my_jacobi

app = Flask(__name__)
CORS(app)

@app.route('/bisection', methods=['POST'])
def bisection():
    data = request.get_json()
    f = data['funct']
    a = float(data['a'])
    b = float(data['b'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_bisection(f, a, b, tol, max_it)
    return jsonify({'result': result})

@app.route('/falseposition', methods=['POST'])
def falseposition():
    data = request.get_json()
    f = data['funct']
    a = float(data['a'])
    b = float(data['b'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_false_position(f, a, b, tol, max_it)
    return jsonify({'result': result})

@app.route('/fixedpoint', methods=['POST'])
def fixedpoint():
    data = request.get_json()
    f = data['funct']
    g = data['gunct']
    x0 = float(data['x0'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_fixed_point(f, g, x0, tol, max_it)
    return jsonify({'result': result})

@app.route('/newtonraphson', methods=['POST'])
def newtonraphson():
    data = request.get_json()
    f = data['funct']
    x0 = float(data['x0'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_newtonraphson(f, x0, tol, max_it)
    return jsonify({'result': result})

@app.route('/secant', methods=['POST'])
def secant():
    data = request.get_json()
    f = data['funct']
    x0 = float(data['x0'])
    x1 = float(data['x1'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_secant(f, x0, x1,  tol, max_it)
    return jsonify({'result': result})

@app.route('/multipleroots', methods=['POST'])
def multipleroots():
    data = request.get_json()
    f = data['funct']
    x0 = float(data['x0'])
    tol = float(data['tolerance'])
    max_it = float(data['maxIterations'])
    result = my_multipleroots(f, x0,  tol, max_it)
    return jsonify({'result': result})

@app.route('/jacobi', methods=['POST'])
def jacobi_route():
    data = request.get_json()
    coefficients = np.array(data['coefficients'])
    constants = np.array(data['constants'])
    initial_guess = np.array(data['initialGuess'])
    tol = float(data['tolerance'])
    max_iter = int(data['maxIterations'])

    try:
        result, errors, num_iterations = my_jacobi(coefficients, constants, initial_guess, tol, max_iter)
        response = {'result': result.tolist(), 'errors': errors, 'numIterations': num_iterations}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True)
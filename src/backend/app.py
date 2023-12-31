from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import math
import plotly.express as px
from flask import Flask, render_template, send_file
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import re
import base64
import threading
from scipy.interpolate import CubicSpline
from scipy import interpolate
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
    return f

@app.route('/generate_plot', methods=['GET'])
def generate_plot():
     # Obtén los parámetros de la URL
    x_values = request.args.get('x', default='', type=str)
    y_values = request.args.get('y', default='', type=str)
    d = request.args.get('d', default='', type=int)

    x_values = [float(x) for x in x_values.split(',')]
    y_values = [float(y) for y in y_values.split(',')]
    plt.clf()

    if d == 1:
        plt.plot(x_values, y_values)
        plt.xlabel('X-axis')
        plt.ylabel('Y-axis')
        plt.title('Generated Plot')

        image_stream = io.BytesIO()
        plt.savefig(image_stream, format='png')
        image_stream.seek(0)

        return send_file(image_stream, mimetype='image/png')
    else:
        cs = CubicSpline(x_values, y_values)
        tck = interpolate.splrep(x_values, y_values, s=0)
        xfit = np.arange(x_values[0], x_values[-1], np.pi/50)
        yfit = interpolate.splev(xfit, tck, der=0)
        plt.plot(xfit, yfit,'b')
        
        plt.xlabel('X-axis')
        plt.ylabel('Y-axis')
        plt.title('Generated Plot')

        image_stream = io.BytesIO()
        plt.savefig(image_stream, format='png')
        image_stream.seek(0)

        return send_file(image_stream, mimetype='image/png')




@app.route('/bisection', methods=['POST'])
def bisection():
    data = request.get_json()
    try:
        f = f_to_python(data['funct'])
        a = float(data['a'])
        b = float(data['b'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if a >= b:
            raise ValueError("left endpoint must be less than right endpoint")

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        print(f(a))
        print(f(b))

        if f(a)*f(b)>0:
            raise ValueError("f(a)*f(b) must be < 0")

        [tabla, message] = my_bisection(f, a, b, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400

    except Exception as e:
        return jsonify({'error': 'not valid function expression'}), 500


@app.route('/falseposition', methods=['POST'])
def falseposition():
    data = request.get_json()
    try:
        f = f_to_python(data['funct'])
        a = float(data['a'])
        b = float(data['b'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if a >= b:
            raise ValueError("left endpoint must be less than right endpoint")

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        print(f(a))
        print(f(b))

        if f(a)*f(b)>0:
            raise ValueError("f(a)*f(b) must be < 0")

        [tabla, message] = my_false_position(f, a, b, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400

    except Exception as e:
        return jsonify({'error': 'not valid function expression'}), 500

@app.route('/fixedpoint', methods=['POST'])
def fixedpoint():
    data = request.get_json()
    try:
        f = f_to_python(data['funct'])
        g = f_to_python(data['gunct'])
        x0 = float(data['x0'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        print(f(x0))
        print(g(x0))

        [tabla, message] = my_fixed_point(f, g, x0, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400         

    except Exception as e:
        return jsonify({'error': 'not valid function expression'}), 500
        
@app.route('/newtonraphson', methods=['POST'])
def newtonraphson():
    data = request.get_json()
    try:
        funct = data['funct']
        funct = re.sub(r'e\^(\([^)]+\)|[a-zA-Z0-9]+)', r'exp(\1)', funct)
        f = funct.replace('^', '**')
        print(f)
        x0 = float(data['x0'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        [tabla, message] = my_newtonraphson(f, x0, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400         

    except Exception as e:
        return jsonify({'error': 'not valid function expression'}), 500

@app.route('/secant', methods=['POST'])
def secant():
    data = request.get_json()
    try:
        f = f_to_python(data['funct'])
        x0 = float(data['x0'])
        x1 = float(data['x1'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if x0==x1:
            raise ValueError("x0 and x1 must be different")
        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        print(f(x0))
        print(f(x1))
        
        [tabla, message] = my_secant(f, x0, x1, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400         

    except Exception as e:
        return jsonify({'error': 'not valid function expression'}), 500

@app.route('/multipleroots', methods=['POST'])
def multipleroots():
    data = request.get_json()
    try:
        funct = data['funct']
        funct = re.sub(r'e\^(\([^)]+\)|[a-zA-Z0-9]+)', r'exp(\1)', funct)
        f = funct.replace('^', '**')
        print(f)
        x0 = float(data['x0'])
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_it = float(data['maxIterations'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_it <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        [tabla, message] = my_multipleroots(f, x0, typeE, tol, max_it)
        return jsonify({'tabla': tabla, 'message': message})
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except ZeroDivisionError:
        return jsonify({'error': 'division by zero'}), 400         

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/jacobi', methods=['POST'])
def jacobi():
    data = request.get_json()
    try:
        coefficients = np.array(data['coefficients'], dtype=float)
        constants = np.array(data['constants'], dtype=float)
        initial_guess = np.array(data['initialGuess'], dtype=float)
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_iter = int(data['maxIterations'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_iter <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        if len(coefficients) != len(constants):
            raise ValueError("Tamaño de coefficients y constants debe ser igual")
        
        if len(coefficients) != len(initial_guess):
            raise ValueError("Tamaño de coefficients y initial_guess debe ser igual")
        
        if len(constants) != len(initial_guess):
            raise ValueError("Tamaño de constants y initial_guess debe ser igual")

        result, errors, num_iterations, radio = my_jacobi(coefficients, constants, initial_guess, tol, typeE, max_iter)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/gauss_seidel', methods=['POST'])
def gaussseidel():
    data = request.get_json()
    try:
        coefficients = np.array(data['coefficients'], dtype=float)
        constants = np.array(data['constants'], dtype=float)
        initial_guess = np.array(data['initialGuess'], dtype=float)
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_iter = int(data['maxIterations'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_iter <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        if len(coefficients) != len(constants):
            raise ValueError("Tamaño de coefficients y constants debe ser igual")
        
        if len(coefficients) != len(initial_guess):
            raise ValueError("Tamaño de coefficients y initial_guess debe ser igual")
        
        if len(constants) != len(initial_guess):
            raise ValueError("Tamaño de constants y initial_guess debe ser igual")

        result, errors, num_iterations, radio = my_gauss_seidel(coefficients, constants, initial_guess, tol, typeE, max_iter)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/sor', methods=['POST'])
def sor():
    data = request.get_json()
    try:
        coefficients = np.array(data['coefficients'], dtype=float)
        constants = np.array(data['constants'], dtype=float)
        initial_guess = np.array(data['initialGuess'], dtype=float)
        typeE = int(data['typeError'])
        tol = float(data['tolerance'])
        max_iter = int(data['maxIterations'])
        w = float(data['w'])

        if tol <= 0:
            raise ValueError("tolerance must be > 0")
        
        if max_iter <= 0:
            raise ValueError("max number  of iterations must be > 0")
        
        if len(coefficients) != len(constants):
            raise ValueError("Tamaño de coefficients y constants debe ser igual")
        
        if len(coefficients) != len(initial_guess):
            raise ValueError("Tamaño de coefficients y initial_guess debe ser igual")
        
        if len(constants) != len(initial_guess):
            raise ValueError("Tamaño de constants y initial_guess debe ser igual")

        result, errors, num_iterations, radio = my_sor(coefficients, constants, initial_guess, tol, typeE, max_iter, w)
        response = {'result': result, 'errors': errors, 'numIterations': num_iterations, 'radio': radio}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/vandermonde', methods=['POST'])
def vandermonde():
    data = request.get_json()
    try:
        x = np.array(data['x'], dtype=float)
        y = np.array(data['y'], dtype=float)

        if len(x) != len(y):
            raise ValueError("El tamaño de X y Y debería ser igual")
        
        if len(x) != len(set(x)):
            raise ValueError("Los valores de X no deben repetirse")
    
        result = my_vandermonde(x, y)
        response = {'result': result}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        response = {'error': str(e)}


@app.route('/newton', methods=['POST'])
def newton():
    data = request.get_json()
    try:
        x_values = np.array(data['x'], dtype=float)
        y_values = np.array(data['y'], dtype=float)

        if len(x_values) != len(y_values):
            raise ValueError("El tamaño de X y Y debería ser igual")
        
        if len(x_values) != len(set(x_values)):
            raise ValueError("Los valores de X no deben repetirse")

        result = my_newton(x_values, y_values)
        pol = my_lagrange(x_values, y_values)
        response = {'result': result, 'pol': pol}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        response = {'error': str(e)}


@app.route('/lagrange', methods=['POST'])
def lagrange():
    data = request.get_json()
    try:
        x = np.array(data['x'], dtype=float)
        y = np.array(data['y'], dtype=float)

        if len(x) != len(y):
            raise ValueError("El tamaño de X y Y debería ser igual")
        
        if len(x) != len(set(x)):
            raise ValueError("Los valores de X no deben repetirse")
    
        result = my_lagrange(x, y)
        response = {'result': result}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        response = {'error': str(e)}


@app.route('/spline', methods=['POST'])
def spline():
    data = request.get_json()
    try:
        x = np.array(data['x'], dtype=float)
        y = np.array(data['y'], dtype=float)
        d = int(data['d'])

        if len(x) != len(y):
            raise ValueError("El tamaño de X y Y debería ser igual")
        
        if len(x) != len(set(x)):
            raise ValueError("Los valores de X no deben repetirse")

        result = my_spline(x, y, d)
        response = {'result': result}
        return jsonify(response)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        response = {'error': str(e)}


if __name__ == '__main__':
    app.run(debug=True)
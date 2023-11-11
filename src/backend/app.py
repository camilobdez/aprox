from flask import Flask, request, jsonify
from flask_cors import CORS
from methods.bisection import my_bisection  # Importing bisection method

app = Flask(__name__)
CORS(app)  # Enable CORS

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

if __name__ == '__main__':
    app.run(debug=True)

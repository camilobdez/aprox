import sympy as sp

def my_newtonraphson(funct, x0, tol, max_iter):
    f = lambda x: eval(funct)
    x = sp.symbols('x')
    f_sym = f(x)
    df = sp.diff(f_sym, x)
    f_prima = sp.lambdify(x, df)
    iterations = []
    i = 0
    E = 1e10
    while (E >= tol and i < max_iter):
        f_x=f(x0)
        current_iteration = [f"{i}", f"{x0:.10f}", f"{f_x:.4e}", f"{E:.4e}"]
        iterations.append(current_iteration)
        f_x=f(x0)
        h = f_x/f_prima(x0)
        x0 = x0-h
        E = abs(f_x-f(x0))
        i += 1
        print(current_iteration)
    return iterations

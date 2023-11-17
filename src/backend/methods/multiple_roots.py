import math
import sympy as sp

def my_multipleroots(f, x0, typeE, tol, max_iter):
    x = sp.symbols('x')
    f_sym = f(x)
    df = sp.diff(f_sym, x)
    dff = sp.diff(df, x)
    f_p = sp.lambdify(x, df)
    f_pp = sp.lambdify(x, dff)
    iterations = []
    f_x=f(x0)
    iterations.append([0, f"{x0:.10f}", f"{f_x:.4e}", ])
    i = 1
    E = 1e10
    while (E >= tol and i < max_iter):
        xi = x0-(f(x0)*f_p(x0))/(f_p(x0)*f_p(x0)-f(x0)*f_pp(x0))
        E = abs(x0-xi)
        x0 = xi
        f_x=f(x0)
        current_iteration = [f"{i}", f"{x0:.10f}", f"{f_x:.4e}", f"{E:.4e}"]
        iterations.append(current_iteration)
        if (f_x==0):
            break
        i += 1
        print(current_iteration)
    return iterations

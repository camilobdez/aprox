import numpy as np

def my_false_position(funct, a, b, tol, max_iter):
    f = lambda x: eval(funct)
    iterations = []
    i = 1
    E = 1e10
    while (E >= tol and i < max_iter):
        c = (a * f(b) - b * f(a))/ (f(b) - f(a))
        f_c=f(c)
        current_iteration = [f"{i}", f"{a:.10f}", f"{b:.10f}", f"{c:.10f}", f"{f_c:.4e}", f"{E:.4e}"]
        iterations.append(current_iteration)
        if f_c == 0:
            break
        elif f_c * f(a) < 0:
            b = c
        else:
            a = c
        E = abs(f((a * f(b) - b * f(a))/ (f(b) - f(a)))-f_c)
        i += 1
        print(current_iteration)
    return iterations

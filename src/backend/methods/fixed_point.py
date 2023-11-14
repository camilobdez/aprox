import math

def my_fixed_point(f, g, x0, tol, max_iter):
    iterations = []
    i = 0
    E = 1e10
    while (E >= tol and i < max_iter):
        x1 = g(x0)
        f_x = f(x0)        
        current_iteration = [f"{i}", f"{x0:.10f}", f"{x1:.10f}", f"{f_x:.4e}", f"{E:.4e}"]
        x0 = x1
        iterations.append(current_iteration)
        if f_x == 0:
            break
        E = abs(f_x-f(x0))
        i += 1
        print(current_iteration)
    return iterations


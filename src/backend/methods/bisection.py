

def my_bisection(funct, a, b, tol, max_iter):
    f = lambda x: eval(funct)
    iterations = []
    i = 1
    E = 1e10
    while (E >= tol and i < max_iter):
        c = (a + b) / 2
        f_c = f(c)
        current_iteration = [f"{i}", f"{a:.10f}", f"{b:.10f}", f"{c:.10f}", f"{f_c:.4e}", f"{E:.4e}"]
        iterations.append(current_iteration)
        if f_c * f(a) < 0:
            b = c
        else:
            a = c
        i += 1
        E = abs(f((a + b) / 2) - f_c)
        print(current_iteration)
    return iterations
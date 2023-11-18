import math

def my_secant(f, x0, x1, typeE,  tol, max_iter):
    i = 2
    E = 1e10
    iterations=[]
    iterations.append([f"{0}", f"{x0:.10f}", f"{f(x0):.4e}", ])
    iterations.append([f"{1}", f"{x1:.10f}", f"{f(x1):.4e}", ])
    while (E >= tol and i < max_iter):
        
        xi = ((x0 * f(x1) - x1 * f(x0)) / (f(x1) - f(x0))) 
        E=abs(x1 - xi)
        f_x=f(xi)
        
        current_iteration = [f"{i}", f"{xi:.10f}", f"{f_x:.4e}", f"{E:.4e}"]
        iterations.append(current_iteration)
        c = f(xi) * f(x0) 

        x0 = x1; 
        x1 = xi; 

        if (c == 0): 
            break; 
        i+=1
            
    return iterations
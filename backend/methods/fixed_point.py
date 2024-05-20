import math

def my_fixed_point(f, g, x0, typeE, tol, max_iter):
    iterations = []

    if f(x0)==0:
        message = "the root was found for x = ",x0
    else:
        f_x=f(x0)
        current_iteration = [0, f"{x0:.10f}", f"{g(x0):.10f}", f"{f_x:.1e}", ]
        iterations.append(current_iteration)
        E=1e19
        i=1
        xa=x0
        x0=g(x0)

        while (E >= tol and i <= max_iter and f_x!=0):
            x1 = g(x0)
            f_x = f(x0) 
            
            E=abs(x0-xa)
            if typeE==1:
                E=abs(E/x0)  

            current_iteration = [f"{i}", f"{x0:.10f}", f"{x1:.10f}", f"{f_x:.1e}", f"{E:.1e}"]
            iterations.append(current_iteration)
            print(current_iteration)
            
            xa = x0
            x0 = x1
            
            i += 1
        
        if f_x==0:
            message = "the root was found for x = ",xa
        elif E < tol:
            message = "An approximation of the root was found for x = ",xa
        else:
            message = "The method failed in ",i-1," iterations"
        

    return [iterations, message]


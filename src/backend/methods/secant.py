import math

def my_secant(f, x0, x1, typeE,  tol, max_iter):
    iterations = []

    if f(x0)==0:
        message = "the root was found for x = ",x0
    elif f(x1)==0:
        message = "the root was found for x = ",x1
    else:
        iterations.append([0, f"{x0:.10f}", f"{f(x0):.4e}", ])
        iterations.append([1, f"{x1:.10f}", f"{f(x1):.4e}", ])
        
        i=2
        E=1e19

        while (E >= tol and i <= max_iter):
            
            xi = ((x0 * f(x1) - x1 * f(x0)) / (f(x1) - f(x0)))
            f_x=f(xi)

            E=abs(x1 - xi)
            if typeE==1:
                E=abs(E/xi)

            
            current_iteration = [f"{i}", f"{xi:.10f}", f"{f_x:.4e}", f"{E:.4e}"]
            iterations.append(current_iteration)
            print(current_iteration)
            x0 = x1; 
            x1 = xi; 

            if (f_x==0): 
                break; 
            i+=1

        if f_x==0:
            message = "the root was found for x = ",xi
        elif E < tol:
            message = "An approximation of the root was found for x = ",xi
        else:
            message = "The method failed in ",i-1," iterations"
            
    return [iterations, message]
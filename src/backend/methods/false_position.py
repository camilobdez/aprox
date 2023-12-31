import math

def my_false_position(f, a, b, typeE, tol, max_iter):
    iterations = []
    
    if f(a)==0:
        message = "the root was found for x = ",a
    elif f(b)==0:
        message = "the root was found for x = ",b
    else:
        xm = (a * f(b) - b * f(a))/ (f(b) - f(a))
        fm = f(xm)
        current_iteration = [1, f"{a:.10f}", f"{xm:.10f}", f"{b:.10f}", f"{fm:.1e}", ]
        iterations.append(current_iteration)
        E = 1e19
        i = 2

        while (E >= tol and i <= max_iter and fm!=0):

            if fm * f(a) < 0:
                b = xm
            else:
                a = xm

            xa = xm
            xm = (a * f(b) - b * f(a))/ (f(b) - f(a))
            fm = f(xm)

            E = abs(xm-xa)
            if typeE==1:
                E=abs(E/xm)
            
            current_iteration = [f"{i}", f"{a:.10f}", f"{xm:.10f}", f"{b:.10f}", f"{fm:.1e}", f"{E:.1e}"]
            iterations.append(current_iteration)
            print(current_iteration)
            
            i+=1

        if fm==0:
            message = "the root was found for x = ",xm
        elif E < tol:
            message = "An approximation of the root was found for x = ",xm
        else:
            message = "The method failed in ",i-1," iterations"

    print(message)
        
    return [iterations, message]
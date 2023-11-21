import math
import sympy as sp

def my_newtonraphson(funct, x0, typeE, tol, max_iter):
    iterations = []
    
    x = sp.symbols('x')
    f = sp.sympify(funct)
    f_xi = f.subs(x,x0)

    if f_xi==0:
        message = "the root was found for x = " + str(x0)
    else:
        df = sp.diff(f, x)
        print(df)
        x0 = float(x0)
        f_xi = float(f_xi)
        
        current_iteration = [0, f"{x0:.10f}", f"{f_xi:.4e}", ]
        iterations.append(current_iteration)
        print(current_iteration)
        xi=x0
        df_xi=df.subs(x, xi)
        i = 1
        E = 1e19
        while (E >= tol and i <= max_iter and f_xi!=0):
            xi = xi - f_xi/df_xi
            f_xi = f.subs(x,xi)
            xi = float(xi)
            f_xi = float(f_xi)
            df_xi=df.subs(x, xi)

            E = abs(xi-x0)
            if typeE==1:
                E = abs(E/xi)
            
            current_iteration = [f"{i}", f"{xi:.4e}", f"{f_xi:.4e}", f"{E:.4e}"]
            iterations.append(current_iteration)
            print(current_iteration)

    
            x0 = xi
            i += 1

        if f_xi==0:
            message = "the root was found for x = " + str(xi)
        elif E < tol:
            message = "An approximation of the root was found for x = " + str(xi)
        else:
            message = "The method failed in ",i-1," iterations"
        print(message)

    return [iterations, message]

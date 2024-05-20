import sympy as sp

def my_multipleroots(funct, x0, typeE, tol, max_iter):
    iterations = []
    xi=x0
    x = sp.symbols('x')
    f = sp.sympify(funct)
    f0 = f.subs(x,xi)
    
    if f0==0:
        message = "the root was found for x = " + str(xi)
    else:
        df = sp.diff(f, x)
        dff = sp.diff(f, x, 2)
        xi = float(xi)
        f0 = float(f0)

        current_iteration = [0, f"{xi:.10f}", f"{f0:.4e}", ]
        iterations.append(current_iteration)
        
        fx=df.subs(x, xi)
        fxx=dff.subs(x,xi)
        i = 1
        E = 1e19

        while (E >= tol and i <= max_iter and f0!=0):
            xi = xi-(f0*fx)/(fx*fx-f0*fxx)
            f0 = f.subs(x,xi)
            xi = float(xi)
            f0 = float(f0)
            fx=df.subs(x, xi)
            fxx = dff.subs(x,xi)

            E = abs(xi-x0)
            if typeE==1:
                E = abs(E/xi)
            
            current_iteration = [f"{i}", f"{xi:.4e}", f"{f0:.4e}", f"{E:.4e}"]
            iterations.append(current_iteration)
            print(current_iteration)

            x0 = xi
            i += 1
            
        if f0==0:
            message = "the root was found for x = " + str(xi)
        elif E < tol:
            message = "An approximation of the root was found for x = " + str(xi)
        else:
            message = "The method failed in ",str(i-1)," iterations"

    return [iterations, message]


import numpy as np

def my_vandermonde(x, y):
    A = np.vander(x, increasing=False)
    b = y

    try:
        coef = np.linalg.solve(A, b)
        #a = a[::-1]
        return coef.tolist()
    
    except np.linalg.LinAlgError as e:
        print(f"Error al resolver el sistema: {e}")
        return ["Error al resolver el sistema"]
    

    #coefficients = np.polyfit(x, y, len(x) - 1)
    #return coefficients.tolist()

import numpy as np

def my_vandermonde(x, y):
    A = np.vander(x, increasing=False)
    b = y

    try:
        coef = np.linalg.solve(A, b)
        return coef.tolist()
    
    except np.linalg.LinAlgError as e:
        raise ValueError(f"Error al resolver el sistema")
        return ["Error al resolver el sistema"]

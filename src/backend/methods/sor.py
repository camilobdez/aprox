import numpy as np

def my_sor(A, b, x0, tol, typeE, max_iter, w):
    # Descomposición de la matriz A en componentes
    D = np.diag(np.diag(A))
    L = -np.tril(A, k=-1)
    U = -np.triu(A, k=1)
    
    c = 0  # Contador de iteraciones
    error = tol + 1  # Inicialización del error
    E = []  # Lista para almacenar los errores en cada iteración
    n = []  # Lista para almacenar el número de iteración
    s = []  # Lista para almacenar las soluciones intermedias
    radio = 0  # Inicialización del radio espectral

    while error > tol and c < max_iter:
        # Cálculo de la siguiente iteración usando el método SOR
        T = np.linalg.inv(D - w*L) @ ((1 - w)*D + w*U)
        C = w * np.linalg.inv(D - w*L) @ b
        x1 = T @ x0 + C
        radio = np.max(np.abs(np.linalg.eigvals(T)))

        # Cálculo del error según el tipo especificado
        if typeE == 0:
            E.append(np.linalg.norm(x1 - x0, np.inf))
        else: 
            E.append(np.linalg.norm((x1 - x0), np.inf)/np.linalg.norm(x1, np.inf))

        error = E[-1]  # Actualización del error

        x0 = x1  # Actualización de la solución anterior
        c += 1  # Incremento del contador de iteraciones
        n.append(c)  # Almacenamiento del número de iteración
        s.append(str(x0))  # Almacenamiento de la solución intermedia

    if error < tol:
        return s, E, n, radio  # Devuelve las soluciones, errores, iteraciones y radio espectral
    
    else:
        # Si el método no converge, lanza una excepción
        raise ValueError(f"Fracasó en {max_iter} iteraciones. Verifica que la matriz sea diagonal dominante")
        return None, E, n, radio  # Devuelve errores, iteraciones y radio espectral

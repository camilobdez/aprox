import numpy as np

def my_jacobi(A, b, x0, tol, max_iter):
    D = np.diag(np.diag(A))
    L = -np.tril(A, k=-1)
    U = -np.triu(A, k=1)
    
    c = 0
    error = tol + 1
    E = []
    n = []
    s = []

    while error > tol and c < max_iter:
        T = np.linalg.inv(D) @ (L + U)
        C = np.linalg.inv(D) @ b
        x1 = T @ x0 + C

        E.append(np.linalg.norm(x1 - x0, np.inf))
        error = E[-1]

        x0 = x1
        c += 1
        n.append(c)
        s.append(str(x0))

    if error < tol:
        #s = x0
        return s, E, n
    else:
        s = x0
        n = c
        print(f"Fracasó en {max_iter} iteraciones")
        return None, E, n

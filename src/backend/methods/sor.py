import numpy as np

def my_sor(A, b, x0, tol, max_iter, w):
    D = np.diag(np.diag(A))
    L = -np.tril(A, k=-1)
    U = -np.triu(A, k=1)
    
    c = 0
    error = tol + 1
    E = []
    n = []
    s = []
    radio = 0

    while error > tol and c < max_iter:
        T = np.linalg.inv(D-w*L) @ ((1-w)*D+w*U)
        C = w*np.linalg.inv(D-w*L) @ b
        x1 = T @ x0 + C
        radio = np.max(np.abs(np.linalg.eigvals(T)))
        
        E.append(np.linalg.norm(x1 - x0, np.inf))
        error = E[-1]

        x0 = x1
        c += 1
        n.append(c)
        s.append(str(x0))

    if error < tol:

        return s, E, n, radio
    else:
        print(f"Fracasó en {max_iter} iteraciones")
        return None, E, n, radio

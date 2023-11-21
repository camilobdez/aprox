import numpy as np

def my_spline(x, y, d):
    try:
        n = len(x)
        A = np.zeros(((d + 1) * (n - 1), (d + 1) * (n - 1)))
        b = np.zeros(((d + 1) * (n - 1), 1))
        cua = np.power(x, 2)
        cub = np.power(x, 3)

        if d == 1:  # Lineal
            A, b = construct_linear_spline(x, y, n, A, b)
            val = np.linalg.inv(A).dot(b)
            tabla = np.reshape(val, (n - 1, d + 1))
            return tabla.tolist()

        elif d == 3:  # Cubic
            A, b = construct_cubic_spline(x, y, n, A, b, cua, cub)
            val = np.linalg.inv(A).dot(b)
            tabla = np.reshape(val, (n - 1, d + 1))    
            return tabla.tolist()
        
    except np.linalg.LinAlgError as e:
        raise ValueError(f"Error al resolver el sistema")
        return ["Error al resolver el sistema"]


def construct_linear_spline(x, y, n, A, b):
    c = 0
    h = 0
    for i in range(0, n - 1):
        A[i, c] = x[i]
        A[i, c + 1] = 1
        b[i] = y[i]
        c += 2
        h += 1

    c = 0
    for i in range(1, n):
        A[h, c] = x[i]
        A[h, c + 1] = 1
        b[h] = y[i]
        c += 2
        h += 1

    return A, b

def construct_cubic_spline(x, y, n, A, b, cua, cub):
    c = 0
    h = 0
    for i in range(0, n - 1):
        A[h, c] = cub[i]
        A[h, c + 1] = cua[i]
        A[h, c + 2] = x[i]
        A[h, c + 3] = 1
        b[h] = y[i]
        c += 4
        h += 1

    c = 0
    for i in range(1, n):
        A[h, c] = cub[i]
        A[h, c + 1] = cua[i]
        A[h, c + 2] = x[i]
        A[h, c + 3] = 1
        b[h] = y[i]
        c += 4
        h += 1

    c = 0
    for i in range(1, n - 1):
        A[h, c] = 3 * cua[i]
        A[h, c + 1] = 2 * x[i]
        A[h, c + 2] = 1
        A[h, c + 4] = -3 * cua[i]
        A[h, c + 5] = -2 * x[i]
        A[h, c + 6] = -1
        b[h] = 0
        c += 4
        h += 1

    c = 0
    for i in range(1, n - 1):
        A[h, c] = 6 * x[i]
        A[h, c + 1] = 2
        A[h, c + 4] = -6 * x[i]
        A[h, c + 5] = -2
        b[h] = 0
        c += 4
        h += 1

    A[h, 0] = 6 * x[0]
    A[h, 1] = 2
    b[h] = 0
    h += 1
    A[h, c] = 6 * x[-1]
    A[h, c + 1] = 2
    b[h] = 0

    return A, b
import numpy as np
from scipy.interpolate import lagrange

def my_lagrange(x, y):
    return lagrange(x, y).coef.tolist()
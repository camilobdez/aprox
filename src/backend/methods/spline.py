import numpy as np
from scipy import interpolate
import matplotlib.pyplot as plt


def my_spline(x, y, d=1):
    #n = len(y)
    #plt.plot(x,y,'ro')
    #plt.plot(x,y, 'b')
    #plt.title("Data set and linear interpolation")
    #plt.show() 
    tck = interpolate.splrep(x, y, s=0)
    xfit = np.arange(x[0], x[-1], np.pi/50)
    yfit = interpolate.splev(xfit, tck, der=0)

    #plt.plot(x, y, 'ro')
    #plt.plot(xfit, yfit,'b')
    #plt.plot(xfit, yfit)
    #plt.title("Direct spline interpolantion")
    #plt.show()

    return [str(yfit)]

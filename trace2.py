import math
from decimal import Decimal, getcontext

def isqrt(num, initialGuess = None):
    print(hex(num))
    if (num < 2):
        return num
    if (initialGuess == None):
        initialGuess = 1 << (len(bin(num)) >> 1)
    prevGuess = initialGuess
    newGuess = (prevGuess + num // prevGuess) >> 1
    print(hex(prevGuess))
    while newGuess != prevGuess:
        prevGuess = newGuess
        newGuess = (prevGuess + num // prevGuess) >> 1
        print(hex(prevGuess))
    return prevGuess

def test1():
    result = isqrt(2 << 128)
    print(hex(result))
    print(result == 0x16a09e667f3bcc908)
'''
when running this in python:
hex(math.floor((math.sqrt(2) - 1) * (2 ** 64)))
i expect to get 0x16a09e667f3bcc908, but i get 0x6a09e667f3bcd000. why? how to fix?
'''
def test1():
    print(math.sqrt(2) - 1)
    print(hex(math.floor((math.sqrt(2) - 1) * (2 ** 64))))

def test():
    sqrt2 = Decimal(2).sqrt()
    result = int((sqrt2 - 1) * (Decimal(2) ** 64))
    print(hex(result))
    print(result == 0x6a09e667f3bcc908)

test()

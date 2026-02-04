/*

Newton's method / Babylonian method / Heron's method

what is the difference between Newton's method, Babylonian method and Heron's method?

explain to me Babylonian method as if I were a child. Use simple language, i dont know advanced math

will you remove the fluff and concentrate on the algorithm?
I do not understand it. How does this program manage to compute a float without actually using floats?
How many times does the main loop repeat?

n**a = (n**b)**c, e.g. n**8 = (n**4)**2
sqrt(n**2) = n

sqrt(n) = k + f, where k - integer part, f - fractional part

sqrt(n * 2**128) = 
sqrt(n) * sqrt(2**128) = 
sqrt(n) * 2**64 = 
(k + f) * 2**64 = 
k * 2**64 + f * 2**64

according to RFC6234 the first 64 bits of the fractional part of the square root of 2 is 0x6a09e667f3bcc908
Math.sqrt(2) in js gives 1.4142135623730951.
(4142135623730951).toString(16) gives eb7401a76c707, which is not even close to 6a09e667f3bcc908. why?

I want to verify with Math.sqrt() that the first 64 bits of the fractional part of the square root of 2 is 0x6a09e667f3bcc908

*/
function playground() {
    const root = Math.sqrt(2)
    console.log(root ** 64)
}

function isqrt(num) {
    if (num < 2n) return num
    let prevGuess = num
    // let newGuess = (prevGuess + num / prevGuess) >> 1n
    // let newGuess = (prevGuess + 1n) >> 1n
    let newGuess = prevGuess >> 1n
    console.log(prevGuess.toString(16))
    while (newGuess < prevGuess) {
        prevGuess = newGuess
        newGuess = (prevGuess + num / prevGuess) >> 1n
        console.log(prevGuess.toString(16))
    }
    return prevGuess
}
function isqrt1(num) {
    console.log('*************** isqrt ***************')
    if (num < 2n) return num
    let prevGuess = num
    while (true) {
        const newGuess = (prevGuess + num / prevGuess) >> 1n
        if (newGuess >= prevGuess) {
            return prevGuess
        }
        console.log(prevGuess.toString(16))
        prevGuess = newGuess
    }
}
function compute(num) {
    num = BigInt(num)
    const intPart = isqrt(num)
    console.log('intPart', intPart)
    const scaledNum = num << 128n
    const scaledRoot = isqrt(scaledNum)
    const fracPart = scaledRoot - (intPart << 64n)
    return fracPart
}

function checkError() {
    const prevGuess = 0x100000000000000000000000000000000n
    const newGuess = (prevGuess + 25n / prevGuess) >> 1n
    console.log(prevGuess.toString(16))
    console.log(newGuess.toString(16))
}

function test() {
    const result = compute(2)
    console.log(result.toString(16))
    console.log(result === 0x6a09e667f3bcc908n)
    
    checkError()
}

function test1() {
    const expectedResult = [
        0x6a09e667f3bcc908n,
        0xbb67ae8584caa73bn,
        0x3c6ef372fe94f82bn,
        0xa54ff53a5f1d36f1n,
        0x510e527fade682d1n,
        0x9b05688c2b3e6c1fn,
        0x1f83d9abfb41bd6bn,
        0x5be0cd19137e2179n,
    ]
    const primes = [2, 3, 5, 7, 11, 13, 17, 19]
    const result = []
    for (let i = 0; i < primes.length; i++) {
        const fractional = compute(primes[i])
        result.push(fractional)
    }
    for (let i = 0; i < result.length; i++) {
        if (result[i] !== expectedResult[i]) {
            console.log(result[i].toString(16))
            console.log(expectedResult[i].toString(16))
            return
        }
    }
    console.log('done')
}

test()

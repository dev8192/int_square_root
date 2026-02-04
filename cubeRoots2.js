/*
give me a js program to create an array of numbers that are
the first 64 bits of the fractional parts
of the cube roots of the first eighty prime numbers.
use an array of primes (dont generate them)
dont use Math.cbrt(x) because it truncates the result
*/

function firstNPrimes(n) {
    const primes = [];
    let x = 2;

    function isPrime(k) {
        if (k < 2) return false;
        for (let i = 2; i * i <= k; i++) {
            if (k % i === 0) return false;
        }
        return true;
    }

    while (primes.length < n) {
        if (isPrime(x)) primes.push(x);
        x++;
    }
    return primes;
}

// Compute first 64 bits of fractional part of cube root
function frac64(x) {
    const c = Math.cbrt(x);
    const frac = c - Math.floor(c);
    return Math.floor(frac * 2 ** 64);
}

const primes = [
      2,   3,   5,   7,  11,  13,  17,  19,  23,  29,
     31,  37,  41,  43,  47,  53,  59,  61,  67,  71,
     73,  79,  83,  89,  97, 101, 103, 107, 109, 113,
    127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
    179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
    233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
    283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
    353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
]

// const primes = firstNPrimes(80);
const results = primes.map(frac64);
console.log(results);

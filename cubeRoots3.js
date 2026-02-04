/*

(a^b)^c = a^(b*c)
(2^192)^(1/3) = 2^(192*(1/3)) = 2^(192/3) = 2^64

cube_root(a * b) = cube_root(a) * cube_root(b)
cube_root(p * 2^192) = cube_root(p) * cube_root(2^192) = cube_root(p) * 2^64

*/
// First 80 primes
const primes = [
   2,   3,   5,   7,  11,  13,  17,  19,  23,  29,
  31,  37,  41,  43,  47,  53,  59,  61,  67,  71,
  73,  79,  83,  89,  97, 101, 103, 107, 109, 113,
 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
 233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
 283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
 353, 359, 367, 373, 379, 383, 389, 397, 401, 409
];

function icbrt(n) {
    if (n === 0n) return 0n;
    let x = n;
    while (true) {
        const y = (2n * x + n / (x * x)) / 3n;
        if (y >= x) return x;
        x = y;
    }
}

function floorCbrtSmall(p) {
    let k = 0;
    while ((k + 1) ** 3 <= p) k++;
    return k;
}

function compute(p) {
    const P = BigInt(p);

    // y ≈ floor( cbrt(p) * 2^64 ) exactly:
    // cbrt(p) * 2^64 = cbrt(p * 2^192)
    const N = P << 192n;
    const y = icbrt(N); // floor(cuberoot(p) * 2^64)

    const ip = BigInt(floorCbrtSmall(p)); // integer part of cube root
    const frac64 = y - (ip << 64n);       // remove integer part * 2^64

    return frac64 & ((1n << 64n) - 1n);
}
// console.log(compute(2).toString(16).padStart(16, "0"))

function createInitialValues() {
    const result = []
    for (const prime of primes) {
        result.push(compute(prime))
    }
    return result
}

const expectedResult = [
    0x428a2f98d728ae22n, 0x7137449123ef65cdn, 0xb5c0fbcfec4d3b2fn, 0xe9b5dba58189dbbcn,
    0x3956c25bf348b538n, 0x59f111f1b605d019n, 0x923f82a4af194f9bn, 0xab1c5ed5da6d8118n,
    0xd807aa98a3030242n, 0x12835b0145706fben, 0x243185be4ee4b28cn, 0x550c7dc3d5ffb4e2n,
    0x72be5d74f27b896fn, 0x80deb1fe3b1696b1n, 0x9bdc06a725c71235n, 0xc19bf174cf692694n,
    0xe49b69c19ef14ad2n, 0xefbe4786384f25e3n, 0x0fc19dc68b8cd5b5n, 0x240ca1cc77ac9c65n,
    0x2de92c6f592b0275n, 0x4a7484aa6ea6e483n, 0x5cb0a9dcbd41fbd4n, 0x76f988da831153b5n,
    0x983e5152ee66dfabn, 0xa831c66d2db43210n, 0xb00327c898fb213fn, 0xbf597fc7beef0ee4n,
    0xc6e00bf33da88fc2n, 0xd5a79147930aa725n, 0x06ca6351e003826fn, 0x142929670a0e6e70n,
    0x27b70a8546d22ffcn, 0x2e1b21385c26c926n, 0x4d2c6dfc5ac42aedn, 0x53380d139d95b3dfn,
    0x650a73548baf63den, 0x766a0abb3c77b2a8n, 0x81c2c92e47edaee6n, 0x92722c851482353bn,
    0xa2bfe8a14cf10364n, 0xa81a664bbc423001n, 0xc24b8b70d0f89791n, 0xc76c51a30654be30n,
    0xd192e819d6ef5218n, 0xd69906245565a910n, 0xf40e35855771202an, 0x106aa07032bbd1b8n,
    0x19a4c116b8d2d0c8n, 0x1e376c085141ab53n, 0x2748774cdf8eeb99n, 0x34b0bcb5e19b48a8n,
    0x391c0cb3c5c95a63n, 0x4ed8aa4ae3418acbn, 0x5b9cca4f7763e373n, 0x682e6ff3d6b2b8a3n,
    0x748f82ee5defb2fcn, 0x78a5636f43172f60n, 0x84c87814a1f0ab72n, 0x8cc702081a6439ecn,
    0x90befffa23631e28n, 0xa4506cebde82bde9n, 0xbef9a3f7b2c67915n, 0xc67178f2e372532bn,
    0xca273eceea26619cn, 0xd186b8c721c0c207n, 0xeada7dd6cde0eb1en, 0xf57d4f7fee6ed178n,
    0x06f067aa72176fban, 0x0a637dc5a2c898a6n, 0x113f9804bef90daen, 0x1b710b35131c471bn,
    0x28db77f523047d84n, 0x32caab7b40c72493n, 0x3c9ebe0a15c9bebcn, 0x431d67c49c100d4cn,
    0x4cc5d4becb3e42b6n, 0x597f299cfc657e2an, 0x5fcb6fab3ad6faecn, 0x6c44198c4a475817n,
]
function test(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            console.log(arr1[i].toString(16))
            console.log(arr2[i].toString(16))
            return
        }
    }
    console.log('done')
}
// const result = createInitialValues()
// test(result, expectedResult)

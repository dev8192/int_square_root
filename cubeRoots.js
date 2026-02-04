/*
the first 64 bits of the fractional parts
of the cube roots of the first eighty prime numbers

give me a js program to create an array of numbers that are
the first 64 bits of the fractional parts
of the cube roots of the first eighty prime numbers
*/

function test() {
    console.log(Math.cbrt(2))
    console.log(2 ** (1/3))
    console.log(Math.pow(2, 1/3))
    console.log(1.2599210498948732 * 1.2599210498948732 * 1.2599210498948732)
}

function test1() {
    const buf = new ArrayBuffer(8)
    const f64 = new Float64Array(buf)
    f64[0] = 1.2599210498948732
    // f64[0] = Math.cbrt(2)
    const bits = new BigUint64Array(buf)[0]
    const mantissa = Number(bits & 0xFFFFFFFFFFFFFn)
    console.log(mantissa.toString(16)) // 428a2f98d728b
    console.log(0x428a2f98d728ae22n.toString(16))
}

function cbrt(x) {
    let y = x; // initial guess
    for (let i = 0; i < 20; i++) {
        y = (2 * y + x / (y * y)) / 3;
    }
    return y;
}

// console.log(cbrt(2)); // 1.2599210498948732

test()

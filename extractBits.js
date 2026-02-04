/*
give me a js function to convert numbers like 0.41421356237309515 to a binary fraction.
I want to extract actual bits from Float64Array. expected result is 6a09e667f3bcd
*/

function test() {
    const frac = Math.sqrt(2) - 1
    const buffer = new ArrayBuffer(8)
    new Float64Array(buffer)[0] = frac
    const bits = new BigUint64Array(buffer)[0]

    const mantissa = bits & 0xFFFFFFFFFFFFFn
    let fractionalBits = mantissa.toString(2)
    
    const exponent = (bits >> 52n) & 0x7FFn
    const expValue = Number(exponent) - 1023
    if (expValue !== 0) {
        fractionalBits = '1' + fractionalBits
    }
    console.log(parseInt(fractionalBits, 2).toString(16))
}

test()

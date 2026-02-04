/*
0x3FF6A09E667F3BCD represents 1.41421356237309515 in ieee754, right?




*/

/****************************** createBuffer ******************************/

function createBuffer10() {
    const buf = new ArrayBuffer(8)
    const f64 = new Float64Array(buf)
    f64[0] = 1.41421356237309515
    // f64[0] = Math.sqrt(2)
    return buf
}

function createBuffer20() {
    const buf = new ArrayBuffer(8)
    const u8 = new Uint8Array(buf)
    u8[0] = 0xCD
    u8[1] = 0x3B
    u8[2] = 0x7F
    u8[3] = 0x66
    u8[4] = 0x9E
    u8[5] = 0xA0
    u8[6] = 0xF6
    u8[7] = 0x3F
    return buf
}

function createBuffer30() {
    const u8 = new Uint8Array([0xCD, 0x3B, 0x7F, 0x66, 0x9E, 0xA0, 0xF6, 0x3F])
    return u8.buffer
}

function createBuffer40() {
    const buf = new ArrayBuffer(8)
    const u64 = new BigUint64Array(buf)
    u64[0] = 0x3FF6A09E667F3BCDn
    return buf
}

function createBuffer50() {
    const buf = new ArrayBuffer(8)
    const u64 = new BigUint64Array(buf)
    
    const mantissa = 0x6A09E667F3BCDn
    u64[0] = mantissa
    const exponent = 0x3FFn
    u64[0] |= exponent << 52n
    const sign = 0n
    u64[0] |= sign << 63n

    return buf
}

/****************************** extractBits ******************************/

function extractBits10(buf) {
    const bits = new BigUint64Array(buf)[0]
    const mantissa = bits & 0xFFFFFFFFFFFFFn
    return Number(mantissa)
}

function extractBits20(buf) {
    const u8 = new Uint8Array(buf)
    let mantissa = 0n
    mantissa |= BigInt(u8[0])
    mantissa |= BigInt(u8[1]) << 8n
    mantissa |= BigInt(u8[2]) << 16n
    mantissa |= BigInt(u8[3]) << 24n
    mantissa |= BigInt(u8[4]) << 32n
    mantissa |= BigInt(u8[5]) << 40n
    mantissa |= BigInt(u8[6] & 0xF) << 48n

    return Number(mantissa)
}

function extractBits30(buf) {
    const view = new DataView(buf)
    view.setFloat64(0, num)
    const hi = view.getUint32(0)
    const lo = view.getUint32(4)
    const mantissaHigh = hi & 0x000FFFFF
    const mantissa = (mantissaHigh * 2 ** 32) + lo
    return mantissa
}

function extractBits40(buf) {
    const view = new DataView(buf)
    view.setFloat64(0, num)
    const hi = BigInt(view.getUint32(0))
    const lo = BigInt(view.getUint32(4))
    const mantissa = ((hi & 0xFFFFFn) << 32n) | lo
    return Number(mantissa)
}

function extractBits50(buf) {
    const u32 = new Uint32Array(buf)
    const hi = u32[1]
    const lo = u32[0]
    const mantissaHigh = hi & 0x000FFFFF
    const mantissa = mantissaHigh * 2 ** 32 + lo
    return mantissa
}

function extractBits60(buf) {
    const u32 = new Uint32Array(buf)
    const hi = BigInt(u32[1])
    const lo = BigInt(u32[0])
    const mantissa = ((hi & 0xFFFFFn) << 32n) | lo
    return Number(mantissa)
}

/****************************** main ******************************/

function test1() {
    const buf = createBuffer50()
    const bits = extractBits10(buf)
    console.log(bits === 0x6a09e667f3bcd)
    console.log(bits)
    console.log(bits.toString(16).padStart(13, "0"))
}

/*

expected            actual
6a09e667f3bcc908    6a09e667f3bcd   1.4142135623730951
bb67ae8584caa73b    bb67ae8584caa   1.7320508075688772
3c6ef372fe94f82b    1e3779b97f4a8   2.23606797749979
a54ff53a5f1d36f1    52a7fa9d2f8ea   2.6457513110645907
510e527fade682d1    a887293fd6f34   3.3166247903554
9b05688c2b3e6c1f    cd82b446159f3   3.605551275463989
1f83d9abfb41bd6b    07e0f66afed07   4.123105625617661
5be0cd19137e2179    16f8334644df9   4.358898943540674

IEEE‑754 stores the mantissa after normalizing the fraction.
A normalized mantissa is the fractional part of a floating‑point number
after the value has been scaled so that it lies in the range: 1 <= fraction < 2

(0x1e3779b97f4a8n << 1n).toString(16) == 3c6ef372fe950
(0x52a7fa9d2f8ean << 1n).toString(16) == a54ff53a5f1d4
*/
function test() {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19]
    const buf = new ArrayBuffer(8)
    const f64 = new Float64Array(buf)
    const result = []
    for (const prime of primes) {
        f64[0] = Math.sqrt(prime)
        const bits = extractBits10(buf)
        // result.push(Math.sqrt(prime))
        result.push(bits.toString(16).padStart(13, "0"))
    }
    console.log(result)
}

test()

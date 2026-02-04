function getFloat64HexFraction(num) {
    const buffer = new ArrayBuffer(8);
    const f64 = new Float64Array(buffer);
    const u64view = new Uint8Array(buffer);

    f64[0] = num;

    // Reverse bytes for big-endian uint64 (sign-exp-frac order)
    let uint64 = 0n;
    for (let i = 7; i >= 0; i--) {
        uint64 = (uint64 << 8n) | BigInt(u64view[i]);
    }

    const sign = Number(uint64 >> 63n);
    const biasedExp = Number((uint64 >> 52n) & 0x7FFn);
    let frac64 = uint64 & 0xFFFFFFFFFFFFFn;  // 52 bits

    // Restore implicit 1 for normalized (add 1 << 52)
    if (biasedExp !== 0 && biasedExp !== 0x7FF) {
        frac64 += (1n << 52n);
    }

    // Convert 53-bit significand to hex (pad to 13 digits)
    const hexFrac = frac64.toString(16).padStart(13, '0');

    return {
        fullHex: uint64.toString(16).padStart(16, '0').toUpperCase(),
        fracHex: hexFrac.toUpperCase(),
        sign,
        biasedExp,
        normalized: biasedExp !== 0 && biasedExp !== 0x7FF
    };
}
const approxSqrt2m1 = 0.41421356237309515;
console.log(getFloat64HexFraction(approxSqrt2m1));
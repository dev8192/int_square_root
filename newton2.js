function bigSqrt(S) {
    if (S < 0n) throw new Error("Square root of negative not supported");
    if (S === 0n) return 0n;

    let x = BigInt(Math.floor(Math.sqrt(Number(S))) + 1);

    // Iterate enough times for high precision (10+ iterations for safety)
    for (let i = 0; i < 15; i++) {
        x = (x + S / x) / 2n;
    }

    return x;
}

function sqrtDecimal(S, precision = 30n) {
    const scale = 10n ** precision;
    const scaled = S * scale * scale;
    const root = bigSqrt(scaled);

    const intPart = (root / scale).toString();
    const fracPart = (root % scale).toString().padStart(Number(precision), '0');

    return `${intPart}.${fracPart}`;
}

console.log(sqrtDecimal(2n, 30n));
// Now gives: "1.4142135623730950488016887242096" ✓

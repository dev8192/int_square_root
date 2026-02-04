function bigSqrt(S) {
    if (S < 0n) throw new Error("Square root of negative not supported");
    if (S === 0n) return 0n;

    let x = BigInt(Math.floor(Math.sqrt(Number(S))) + 1);
    let lastX;

    do {
        lastX = x;
        x = (x + S / x) / 2n;
    } while (x < lastX);

    return lastX;
}

function sqrtDecimal(S, precision = 30n) {
    const scale = 10n ** precision;
    const scaled = S * scale * scale;  // Scale by 10^(2*precision)
    const root = bigSqrt(scaled);

    const intPart = (root / scale).toString();
    const fracPart = (root % scale).toString().padStart(Number(precision), '0');

    return `${intPart}.${fracPart}`;
}
/*
1.414213562373095048801688724209

*/
console.log(sqrtDecimal(2n, 30n));


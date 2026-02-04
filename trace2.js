
/*
When computing an integer square root, we can pick up the initial guess that is:
above the root        (Sequence decreases monotonically toward)
below the root        (Next iteration jumps above the root, then decreases monotonically)

*/
function isqrt(num, initialGuess) {
    console.log(num.toString(16))
    if (num < 2n) return num
    if (initialGuess === undefined) {
        initialGuess = 1n << (BigInt(num.toString(2).length) >> 1n)
    }
    let prevGuess = initialGuess
    let newGuess = (prevGuess + num / prevGuess) >> 1n
    console.log(prevGuess.toString(16))
    // while (newGuess < prevGuess) {
    while (newGuess !== prevGuess) {
        prevGuess = newGuess
        newGuess = (prevGuess + num / prevGuess) >> 1n
        console.log(prevGuess.toString(16))
    }
    return prevGuess
}
function test() {
    const result = isqrt(2n << 128n)
    // const result = isqrt(2n << 128n, 1n)
    // const result = isqrt(2n << 128n, 0x123456n)
    // const result = isqrt(2n << 128n, 0x16a09e667f3bcc908n + 0x123456n)

    console.log(result.toString(16))
    console.log(result === 0x16a09e667f3bcc908n)
}
test()

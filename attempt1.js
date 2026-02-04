/*
What we want to compute:
The first 64 bits of the fractional parts of the square roots of the first eight prime numbers
(RFC6234)

Math.sqrt() returns a 64-bit IEEE 754 double, which only has 53 bits of precision in its mantissa. 
This means it can only accurately represent the first 53 bits of the fractional part.

This is not exactly what i want.
Math.sqrt(2) - 1 is 0.41421356237309515.
the fractional part of this number should be stored in iee754 as 6a09e667f3bcd000, right?

give me js code that extracts 0x6a09e667f3bcd from 1.41421356237309515.
dont add irrelevant pieces. just instructions that does exactly what i specified
the result must be a number that is printed with num.toString(16)

3FD6A09E667F3BCD
   6A09E667F3BCD000

*/

function test1() {
    const root = Math.sqrt(2) - 1
    console.log(root) // 0.41421356237309515

    const scaled = root * Math.pow(2, 64)
    console.log(scaled) // 7640891576956015000
    console.log(scaled.toString(16)) // 6a09e667f3bcd000
    
    // const approx = Math.floor(scaled)
    // console.log(approx.toString(16))
    console.log('6a09e667f3bcc908')
}

/*
I still dont understand why i have to scale the result of Math.sqrt(2) to get 6a09e667f3bcc908.
why cant i simply take the fractional part and convert it to hex? Scaling is basically moving the point in the number
Both 0.123456 and 123456.0 contanin the same digits!
*/
function test() {

}

test()

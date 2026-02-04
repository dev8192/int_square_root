
function test() {
    class Example {
        toString() {
            return 'hello'
        }
    }
    const example = new Example()
    console.log(example)
    console.log(example.toString())
    console.log(String(example))
    console.log(`${example}`)
    console.log(example + '!')
}

test()

const { readFile, writeFile } = require('fs')
console.log('start');
readFile('D:/backend/nodeJS/content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result;
    readFile('D:/backend/nodeJS/content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        const second = result;
        writeFile('D:/backend/nodeJS/content/result-async.txt', `Here is the result : ${first}, ${second}`, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('done with this task');
        })
    })
})
console.log('starting next task');
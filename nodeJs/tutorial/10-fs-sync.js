const { readFileSync, writeFileSync } = require('fs')
console.log('start')
const first = readFileSync('D:/backend/nodeJs/content/first.txt', 'utf8')
const second = readFileSync('D:/backend/nodeJs/content/second.txt', 'utf8')

writeFileSync('D:/backend/nodeJS/content/result-sync.txt', `Here is the result : ${first}, ${second}`, { flag: 'a' })

console.log('done with this task');
console.log('starting the next one');
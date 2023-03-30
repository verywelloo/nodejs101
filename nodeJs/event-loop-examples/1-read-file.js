const { readFile } = require('fs')

console.log('started a first task')
// CHECK FILE PATH !!!
readFile('D:\backend\nodeJs\content\first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(result);
    console.log('completed file task');
})
console.log('starting next task');
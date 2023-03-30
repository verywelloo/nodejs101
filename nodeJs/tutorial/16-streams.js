const { createReadStream } = require('fs')

const stream = createReadStream('.D:/backend/nodeJs/content/big.txt', { highWaterMark: 9000, encoding: 'utf8' });

stream.on('data', (result) => {
    console.log(result);
})

stream.on('error', (err) => {
    console.log(err);
})

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = creatReadStream('D:/backend/nodeJs/content/big.txt', { highWaterMark : 90000 })
// const stream = creatReadStream('D:/backend/nodeJs/content/big.txt', { enconding : 'utf8' })
const { writeFileSync } = require('fs')
for (let i = 0; i < 100000; i++) {
    writeFileSync("D:/backend/nodeJs/content/big.txt", `Hello world ${i}\n`, {flag : 'a'})
}
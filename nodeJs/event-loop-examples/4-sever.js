const http = require('http')

const sever = http.createServer((req, res) => {
    console.log('request event');
    res.end('Hello World')
})

sever.listen(5000, () => {
    console.log("Sever listening on port : 5000....");
})
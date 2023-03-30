const http = require('http')

// const server = http.createSever((req, res) => {
//     res.end(welcome);
// })

// Using Event Emitter API
const server = http.createServer()
// emits request event
// subcribe to it / listen for it /  respon to it
server.on('request', (req, res) => {
    res.end("Welcome")
})

server.listen(5000)
const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home Page")
    }
    if (req.url === "/about") {
        res.end("About Page")
        // BLOCKING CODE !!!!
        for (let i = 0; i < 10000; i++){
            for (let j = 0; j < 10000; j++){
                console.log(`${i} ${j}`);
            }
        }
    }
    res.end("Error Page")

})

server.listen(5000, () => {
    console.log('Server listening on port 5000...');
})
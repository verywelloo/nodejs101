const http = require('http')

const server = http.createSever((req, res) => {
    // console.log(req.method);
    const url = req.url
    // home page
    if (url === "/") {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>Home page</h1>')
        res.end()
    }
    //about page 
    else if (url === "/about") {
        res.writeHead(200, { 'content-type': '' })
        res.write("<h1>about page</h1>")
        res.end()
    }
    // 404
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write("page not found")
        res.end()
    }

})

server.listen(5000)
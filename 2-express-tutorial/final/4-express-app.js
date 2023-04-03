const express = require('express');
const path = require('path');

const app = express()

// setup static and middleware
app.use(express.static("D:/backend/2-express-tutorial/public"))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "D:/backend/2-express-tutorial/navbar-app/index.html"))
})

app.all("*", (req, res) => {
    res.status(404).send('resourse not found')
})

app.listen(5000, () => {
    console.log('server listening on port 5000...')
})
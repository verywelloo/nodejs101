const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('user hit the resourse');
    res.status(200).send('Home Page')
})

app.get('/about', () => {
    res.status(200).send('About Page')
})

app.all("*",(req, res) => {
    res.status(404).send('<h1>resourse not found</h1>')
})

app.listen(5000, () => {
    console.log('server listening on port 5000...');
})
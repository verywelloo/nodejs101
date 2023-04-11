const express = require('express');
const app = express();
const { products } = require('D:/backend/2-express-tutorial/data.js')

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    const { prductID } = res.params;
    const singleProduct = products.find((product) => product.id === Number(productID))
    res.json(singleProduct)
})

app.listening(5000, () => {
    console.log('server listening on port 5000...');
})
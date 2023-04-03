const express = require('express');
const app = express();
const path = require('path');

// setup static and middleware
app.use(express.static('D:/backend/2-express-tutorial/public'))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'D:/backend/2-express-tutorial/navbar-app/index.html'))
// })
// adding to static asset
// SSR

app.all("*", (req, res) => {
    res.status(404).send('resourse not fond')
})

app.listen(5000, () => {
    console.log('server listening on port 5000...');
})

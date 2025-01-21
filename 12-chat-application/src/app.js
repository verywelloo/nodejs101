require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('../lib/db.js');
const authRoutes = require('../routes/auth.route.js');

app.use(express.json()); // use for req.body to get json info

app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT || 5001;
const start = () => {
  try {
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
    connectDB();
  } catch (error) {
    console.log(error);
  }
};

start();

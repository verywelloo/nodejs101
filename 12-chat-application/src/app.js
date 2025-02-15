require('dotenv').config();
const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');
const connectDB = require('./lib/db.js');
const authRoutes = require('./routes/auth.route.js');
const messageRoutes = require('./routes/message.route.js');

app.use(express.json()); // use for req.body to get json info
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/message', messageRoutes);


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

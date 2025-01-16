const express = require('express');

const app = express();

const port = process.env.PORT || 5001;
const start = () => {
  try {
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

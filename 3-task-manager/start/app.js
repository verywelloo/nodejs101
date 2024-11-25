require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./DB/connect");
const tasksRoute = require("./routes/tasks");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(express.static("./public"));
app.use(express.json());

app.get("/api/v1/tasks", tasksRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

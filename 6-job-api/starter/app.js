require("dotenv").config();
require("express-async-errors");

// extra security packages
// - helmet : security npm package.
// - cors : let other domain can access our routes. (let others see our frontend)
// - xss-clean : protect attacking in check incoming input from hackers.
// - express-rate-limit : to limit incoming requests.

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// swagger

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");
const authentication = require("./middleware/authentication");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.static("./public"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res)=> {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})
app.use('/api-docs', swaggerUI,serve, swaggerUI,setup(swaggerDocument))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentication, jobRouter);

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

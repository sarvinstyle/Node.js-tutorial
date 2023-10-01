const Logger = require("./middelwares/logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const coursesRoute = require('./routes/courses-route')
const homeRoute = require("./routes/home-route")
const userRoute = require("./routes/users-route")

require("dotenv").config();

const startupDebug = require("debug")("startup")
const dbDebug = require("debug")("db")

const app = express();
app.use(express.json());
//app.use(express.static('public'))
app.use(Logger);
app.use(helmet());

startupDebug("hello from startup debug")
if (app.get("env") === "development") app.use(morgan("tiny"));

//   Key=value&key2=value2
app.use(express.urlencoded({ extended: true }));


app.use('/api/courses' , coursesRoute)
app.use('/api/users' , userRoute)
app.use('/' , homeRoute)




const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
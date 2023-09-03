const Logger = require("./logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

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
const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "javascript" },
];


app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("course with given id not found");
  res.send(course);
});

app.post("/api/courses/", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name is required");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found");

  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("name is required and more than 3 charachter");

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get("/", (req, res) => {
  dbDebug("db debug")
  res.send("hello from sarvinstyle codding");

});


const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

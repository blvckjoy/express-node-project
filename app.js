const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const students = [
  {
    name: "Michael Oliver",
    course: "Computer Science",
    level: 200,
    id: 234,
  },

  {
    name: "Mary Jane",
    course: "Engineering",
    level: 100,
    id: 721,
  },

  {
    name: "John Doe",
    course: "Mathematics",
    level: 300,
    id: 304,
  },
];

app.get("/api/students", (req, res) => {
  res.send(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.send(student);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const Joi = require("joi"); // For data validation
const express = require("express");
const app = express();

app.use(express.json()); // For parsing JSON data in the request body
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

// HTTP GET REQUEST
app.get("/api/students", (req, res) => {
   res.send(students);
});

app.get("/api/students/:id", (req, res) => {
   const student = students.find((s) => s.id === parseInt(req.params.id));

   if (!student) {
      return res.status(404).send("Student not found");
   }
   res.send(student);
});

// Function to generate a 3-digit random ID
const getNextId = () => {
   let newId;
   do {
      newId = Math.floor(Math.random() * 900) + 100; // Generates 100-999
   } while (students.some((s) => s.id === newId)); // Check for duplicates
   return newId;
};

// HTTP POST REQUEST
app.post("/api/students", (req, res) => {
   // validate the request body against the schema
   const result = validateStudent(req.body);

   // 400 Bad Request if validation fails
   if (result.error) {
      return res.status(400).send(result.error.details[0].message);
   }

   const student = {
      name: req.body.name,
      course: req.body.course,
      level: req.body.level,
      id: getNextId(),
   };
   students.push(student);
   res.send(student);
});

// HTTP PUT REQUEST
app.put("/api/students/:id", (req, res) => {
   // Look up the student
   const studentIndex = students.findIndex(
      (s) => s.id === parseInt(req.params.id)
   );
   // If not existing, return 404
   if (studentIndex === -1) {
      res.status(404).send("Student not found");
   }

   // Validate student
   const result = validateStudent(req.body);
   // If invalid, return 400 Bad request
   if (result.error) {
      res.status(400).send(result.error.details[0].message);
   }

   // Update student
   const updatedStudent = {
      name: req.body.name,
      course: req.body.course,
      level: req.body.level,
      id: parseInt(req.params.id),
   };
   // Replace old student in the array
   students[studentIndex] = updatedStudent;

   // Return the updated student
   res.send(updatedStudent);
});

// Function to validate student
function validateStudent(student) {
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      course: Joi.string().min(3).required(),
      level: Joi.number().integer().valid(100, 200, 300, 400, 500).required(),
   });

   return schema.validate(student);
}

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

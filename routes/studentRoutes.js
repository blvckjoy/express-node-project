const express = require("express");
const router = express.Router();
const { students } = require("../data/students");
const { validateStudent } = require("../validation/studentValidation");
const { getNextId } = require("../randomIDGenerator/randomID");

// HTTP GET REQUEST
router.get("/", (req, res) => {
   res.json(students);
});

router.get("/:id", (req, res) => {
   // Look up the student
   const student = students.find((s) => s.id === parseInt(req.params.id));
   // If not existing, return 404
   if (!student) {
      return res.status(404).send("Student not found");
   }
   res.status(200).json(student);
});

// HTTP POST REQUEST
router.post("/", (req, res) => {
   // validate student
   const { error } = validateStudent(req.body);

   // If invalid, return 400 Bad request
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const student = {
      name: req.body.name,
      course: req.body.course,
      level: req.body.level,
      id: getNextId(),
   };
   students.push(student);
   res.status(200).json(student);
});

// HTTP PUT REQUEST
router.put("/:id", (req, res) => {
   // Look up the student
   const student = students.find((s) => s.id === parseInt(req.params.id));
   // If not existing, return 404
   if (!student) {
      return res.status(404).send("student not found");
   }

   // Validate student
   const { error } = validateStudent(req.body);
   // If invalid, return 400 Bad request
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   // Update student
   const updatedStudent = {
      name: req.body.name,
      course: req.body.course,
      level: req.body.level,
      id: parseInt(req.params.id),
   };
   // Replace old student in the array
   const index = students.indexOf(student);
   console.log(students[index]);
   students[index] = updatedStudent;

   // Return the updated student
   res.status(200).json(updatedStudent);
});

// HTTP DELETE REQUEST
router.delete("/:id", (req, res) => {
   // Look up the student
   const student = students.find((s) => s.id === parseInt(req.params.id));
   // If not existing, return 404
   if (!student) {
      return res.status(404).send("Student not found");
   }

   // Delete
   const index = students.indexOf(student);
   students.splice(index, 1);

   // Return the same student
   res.status(200).json(student);
});

module.exports = router;

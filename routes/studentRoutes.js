const express = require("express");
const router = express.Router();
const { students } = require("../data/students");
const { validateStudent } = require("../validation/studentValidation");
const { getNextId } = require("../randomIDGenerator/randomID");

router.get("/", (req, res) => {
   res.json(students);
});

router.get("/:id", (req, res) => {
   const student = students.find(
      (student) => student.id === parseInt(req.params.id)
   );
   if (!student) {
      return res.status(404).json({ message: "Student not found" });
   }
   res.status(200).json(student);
});

router.post("/", (req, res) => {
   const { error } = validateStudent(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   const { name, course, level } = req.body;
   const student = {
      name,
      course,
      level,
      id: getNextId(),
   };
   students.push(student);
   res.status(201).json({ message: "Student added successfully" });
});

router.patch("/:id", (req, res) => {
   const student = students.find(
      (student) => student.id === parseInt(req.params.id)
   );
   if (!student) {
      return res.status(404).json({ message: "Student not found" });
   }

   const { error } = validateStudent(req.body);
   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   const { name, course, level } = req.body;
   const updatedStudent = {
      name,
      course,
      level,
      id: parseInt(req.params.id),
   };
   // Replace old student in the array
   const index = students.indexOf(student);
   students[index] = updatedStudent;

   res.status(200).json(updatedStudent);
});

router.delete("/:id", (req, res) => {
   const student = students.find(
      (student) => student.id === parseInt(req.params.id)
   );
   if (!student) {
      return res.status(404).json({ message: "Student not found" });
   }

   const index = students.indexOf(student);
   students.splice(index, 1);

   res.status(200).json(student);
});

module.exports = router;

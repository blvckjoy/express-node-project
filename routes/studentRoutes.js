const express = require("express");
const router = express.Router();
const { students } = require("../data/students");
const { validateStudent } = require("../validation/studentValidation");
const { getNextId } = require("../randomIDGenerator/randomID");
const Joi = require("joi");

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

   // Create a schema that makes all fields optional for PATCH
   const patchSchema = Joi.object({
      name: Joi.string().min(3),
      course: Joi.string().min(3),
      level: Joi.number().integer().valid(100, 200, 300, 400, 500),
   });

   const { error } = patchSchema.validate(req.body);
   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   const updatedStudent = {
      ...student,
      ...req.body,
   };

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

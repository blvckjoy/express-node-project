const Joi = require("joi");

function validateStudent(student) {
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      course: Joi.string().min(3).required(),
      level: Joi.number().integer().valid(100, 200, 300, 400, 500).required(),
   });

   return schema.validate(student);
}

function validateStudentUpdate(student) {
   const schema = Joi.object({
      name: Joi.string().min(3),
      course: Joi.string().min(3),
      level: Joi.number().integer().valid(100, 200, 300, 400, 500),
   });

   return schema.validate(student);
}

module.exports = { validateStudent, validateStudentUpdate };

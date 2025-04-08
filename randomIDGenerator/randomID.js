const { students } = require("../data/students");

const getNextId = () => {
   let newId;
   do {
      newId = Math.floor(Math.random() * 900) + 100; // Generates 100-999
   } while (students.some((student) => student.id === newId)); // Check for duplicates
   return newId;
};

module.exports = { getNextId };

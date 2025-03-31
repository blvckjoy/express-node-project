// Function to generate a 3-digit random ID
const getNextId = () => {
   let newId;
   do {
      newId = Math.floor(Math.random() * 900) + 100; // Generates 100-999
   } while (students.some((s) => s.id === newId)); // Check for duplicates
   return newId;
};

module.exports = { getNextId };

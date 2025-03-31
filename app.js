const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api/students", studentRoutes);

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

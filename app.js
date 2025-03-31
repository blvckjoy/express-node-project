const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());

// Root route for the base URL
app.get("/", (req, res) => {
   res.send("Welcome to the Students API");
});

app.use("/api/students", studentRoutes);

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

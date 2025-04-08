const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
   res.send("Welcome to the Students API");
});

const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

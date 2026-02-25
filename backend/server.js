const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });  // Load .env properly
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
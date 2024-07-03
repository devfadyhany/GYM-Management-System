require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.CONNECTION_STRING);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Database Connection Failed!");
});

db.once("open", () => {
  console.log("Database Connected Successfully!");
});

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/equipment", equipmentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

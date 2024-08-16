require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("node:http");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Socket.io Server Initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
});

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
app.use("/user", userRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/chat", chatRoutes);

// Socket.io Events Listening
io.on("connection", (socket) => {
  console.log("a user connected with socket id: ", socket.id);

  socket.on("sent-message", (msg) => {
    socket.broadcast.emit("message-sent", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected ", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

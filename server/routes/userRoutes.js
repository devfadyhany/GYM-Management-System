const express = require("express");
const router = express.Router();

const {
  GetClients,
  GetUser,
  EditUser,
  DeleteUser,
  GetCoaches,
} = require("../controllers/userController");
const { Register, Login, Logout } = require("../controllers/authController");
const { RequireAdmin } = require("../middlewares/RequireAdmin");

// User Manapulation Routes
router.get("/clients", RequireAdmin, GetClients);
router.get("/coaches", RequireAdmin, GetCoaches);
router.get("/:id", GetUser);
router.put("/:id", EditUser);
router.delete("/:id", DeleteUser);

// Authentiaction Routes
router.post("/", Register);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;

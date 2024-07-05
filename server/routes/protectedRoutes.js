const express = require("express");
const { RequireAdmin, RequireLogin } = require("../controllers/protectController");
const verifyToken = require("../middlewares/VerifyToken");
const router = express.Router();

// User Manapulation Routes
router.get("/should-be-logged-in", verifyToken, RequireLogin);
router.get("/should-be-admin", verifyToken, RequireAdmin);

module.exports = router;

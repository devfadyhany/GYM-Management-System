require("dotenv").config();
const express = require("express");
const {
  CreateStripeSession,
  CheckStripePaymentSession,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, CreateStripeSession);
router.get("/stripe-session", verifyToken, CheckStripePaymentSession);

module.exports = router;

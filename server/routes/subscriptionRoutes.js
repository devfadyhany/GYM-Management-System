require("dotenv").config();
const express = require("express");
const {
  CreateStripeSession,
  CheckStripePaymentSession,
} = require("../controllers/paymentController");
const {
  GetUserSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/:subId", GetUserSubscription);

router.post("/", CreateStripeSession);
router.post("/stripe-session", CheckStripePaymentSession);

module.exports = router;

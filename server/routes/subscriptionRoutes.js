require("dotenv").config();
const express = require("express");
const {
  CreateStripeSession,
  CheckStripePaymentSession,
} = require("../controllers/paymentController");
const {
  GetUserSubscription,
  GetAllSubscriptions,
  CancelSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", GetAllSubscriptions);
router.get("/:subId", GetUserSubscription);
router.delete("/:subId", CancelSubscription);

router.post("/", CreateStripeSession);
router.post("/stripe-session", CheckStripePaymentSession);

module.exports = router;

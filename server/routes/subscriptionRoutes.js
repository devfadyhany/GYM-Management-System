require("dotenv").config();
const express = require("express");
const checkouts = require("../models/checkouts");
const subscription = require("../models/subscription");
const user = require("../models/user");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const userId = req.body.userId;
  const quantity = req.body.quantity;
  const priceId = req.body.priceId;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${CLIENT_URL}`,
      cancel_url: `${CLIENT_URL}`,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
    });

    const sessionId = session.id;

    // store session id
    await checkouts.create({ userId, sessionId });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stripe-session", async (req, res) => {
  const userId = req.body;
  const membership = req.body.membership;
  let startDate = Date.now();
  let endDate;
  if (membership == "basic") {
    endDate = new Date(startDate.setMonth(startDate.getMonth() + 3));
  } else if (membership == "pro") {
    endDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
  } else if (membership == "premium") {
    endDate = new Date(startDate.setMonth(startDate.getMonth() + 12));
  }

  const stripe_session = await checkouts.findOne({ userId });

  if (!stripe_session.sessionId) {
    return res.json({ message: "fail" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      stripe_session.sessionId
    );

    if (session && session.status === "complete") {
      const result = await subscription.create({
        clientId: userId,
        planType: membership,
        endAt: endDate,
      });

      await user.updateOne({ id: userId }, { activeSubscription: result.id });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.module.exports = router;

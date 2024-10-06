require("dotenv").config();
const checkouts = require("../models/checkouts");
const subscription = require("../models/subscription");
const user = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const CreateStripeSession = async (req, res) => {
  const userId = req.body.userId;
  const quantity = req.body.quantity;
  const priceId = req.body.priceId;
  const membership = req.body.membership;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.CLIENT_URL}/subscribe`,
      cancel_url: `${process.env.CLIENT_URL}`,
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

    let numOfMonths;

    if (membership == "basic") {
      numOfMonths = 3;
    } else if (membership == "pro") {
      numOfMonths = 6;
    } else if (membership == "premium") {
      numOfMonths = 12;
    }

    // clear previous sessions
    await checkouts.deleteMany({ userId });

    // store session id
    await checkouts.create({ userId, sessionId, numOfMonths });

    return res.json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const CheckStripePaymentSession = async (req, res) => {
  const userId = req.body.userId;
  let membership;

  try {
    const stripe_session = await checkouts.findOne({ userId });

    let startDate = new Date();
    let endDate = new Date(
      startDate.setMonth(startDate.getMonth() + stripe_session.numOfMonths)
    );

    if (!stripe_session.sessionId) {
      return res.status(404).json({ message: "fail" });
    }

    if (stripe_session.numOfMonths === 3) {
      membership = "basic";
    } else if (stripe_session.numOfMonths === 6) {
      membership = "pro";
    } else {
      membership = "premium";
    }

    const session = await stripe.checkout.sessions.retrieve(
      stripe_session.sessionId
    );

    if (session && session.status === "complete") {
      const result = await subscription.create({
        clientId: userId,
        planType: membership,
        endAt: endDate,
      });

      await user.updateOne({ _id: userId }, { activeSubscription: result._id });

      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Subscription Failed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { CreateStripeSession, CheckStripePaymentSession };

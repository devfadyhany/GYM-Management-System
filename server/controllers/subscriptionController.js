const subscription = require("../models/subscription");

const GetAllSubscriptions = async (req, res) => {
  try {
    const result = await subscription.find();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetUserSubscription = async (req, res) => {
  const subscriptionId = req.params.subId;

  try {
    const result = await subscription.findById(subscriptionId);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { GetAllSubscriptions, GetUserSubscription };

const subscription = require("../models/subscription");

const GetUserSubscription = async (req, res) => {
  const subscriptionId = req.params.subId;

  try {
    const result = await subscription.findById(subscriptionId);
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { GetUserSubscription };

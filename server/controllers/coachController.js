const User = require("../models/user");

const GetClients = async (req, res) => {
  try {
    const coachId = req.body.id;

    const result = await User.find({ assignedCoachId: coachId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { GetClients };

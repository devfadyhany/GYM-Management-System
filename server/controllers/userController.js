const User = require("../models/user");
const bcrypt = require("bcrypt");

const GetClients = async (req, res) => {
  try {
    const users = await User.find({ isCoach: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetCoaches = async (req, res) => {
  try {
    const users = await User.find({ isCoach: true });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const EditUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    const result = await User.findByIdAndUpdate(id, user);

    res
      .status(200)
      .json({ message: "user data has been updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await User.findByIdAndDelete(id);

    res.status(200).json({ message: "user has been deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { GetClients, GetCoaches, GetUser, EditUser, DeleteUser };

require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const user = req.body;

    // Check if the user already exists
    const foundUser = await User.exists({ email: user.email });

    if (foundUser) {
      res.status(500).json({ message: "user already exists!" });
      return;
    }

    // Hash user is password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Add the new user into the DB
    const result = await User.create(user);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const user = req.body;

    const foundUser = await User.findOne({ email: user.email });

    if (!foundUser) {
      res.status(401).json({ message: "Wrong Credintials!" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      foundUser.password
    );

    if (passwordMatch) {
      delete foundUser._doc.password;
      const age = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        { id: foundUser.id, isAdmin: foundUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: age,
        }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          // secure: true,
          maxAge: age,
        })
        .status(200)
        .json({ message: "Login Successful!" });
    } else {
      res.status(401).json({ message: "Wrong Credintials!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
};

module.exports = { Register, Login, Logout };

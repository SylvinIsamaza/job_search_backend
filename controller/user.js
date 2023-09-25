const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const bcrypt = require("bcrypt");
dotenv.config();
const createUser = async function (req, res) {
  try {
    const { username, fullName, password, email } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      let newUser = null;

      bcrypt
        .hash(password, 10)
        .then(async (newPassword) => {
          newUser = await User.create({
            username,
            fullName,
            password: newPassword,
            email,
          });
        })
        .catch((err) => {
         return res.send(err.message);
        });
      const userToken = jwt.sign({ user: newUser }, process.env.JWT_SECRET_KEY);

      return res
        .status(200)
        .cookie("user", userToken)
        .send("user created successfully");
    } else {
      return res.send("User already exists");
    }
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send("Invalid username or password");
    } else {
      const isCorrect = await bcrypt.compare(password, user.password);
      const userToken = await jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      if (isCorrect) {
        res
          .status(200)
          .cookie("user", userToken)
          .send("successsfully logged in");
      } else {
        res.send("Invalid username or password");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { user } = req.cookies;
    const decodeUser = await jwt.decode(user, process.env.JWT_SECRET_KEY);
    const userExist = await User.findOne({ email: decodeUser.email });
    if (!userExist) {
      res.send("invalid token");
    } else {
      res.status(200).send({ user: userExist });
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { createUser, login, getUser };

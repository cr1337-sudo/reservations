const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (e) {
      res.status(500).json("Erro");
    }
  } else {
    res.status(400).json("You can update only your account");
  }
};

//Delete
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (e) {
      res.status(501).json({ Error: e });
    }
  } else {
    res.status(410).json("You can only delete your account...");
  }
};

//Get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.satus(200).json(info);
  } catch (e) {
    res.status(500).json("Error");
  }
};

//Get all users
const getAllUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json("Erro");
    }
  } else {
    res.status(403).json("You are not allowed to see all users");
  }
};


module.exports = { updateUser, deleteUser, getUser, getAllUsers };

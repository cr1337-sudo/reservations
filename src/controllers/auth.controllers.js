const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, password1, password2, email } = req.body;

  const user = await User.findOne({ email: req.body.email });
  user && res.status(201).json({ error: "Email already registered" });

  if (password1 === password2) {
    try {
      const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password1, 10),
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (e) {
      res.status(500).json("Error");
    }
  } else {
    return res.status(201).json({error:"Passwords dont match"});
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(201).json({ error: "Wrong email!" });

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    !comparePass && res.status(201).json({ error: "Wrong password" });

    const { password, ...info } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_WORD,
      { expiresIn: "5d" }
    );
    res.json({ ...info, token });
  } catch (e) {
    res.status(500).json({ error: "Both fields are required" });
  }
};

module.exports = { register, login };

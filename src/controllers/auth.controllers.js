const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, password1, password2, email } = req.body;
  if(password1 === password2){

  try {
    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password1, 10),
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (e) {
    res.json("Error");
  }
  }else{
    return res.json("Passwords dont match")
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(500).json("Wrong number!");

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    !comparePass && res.json("Wrong password");

    const { password, ...info } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_WORD,
      { expiresIn: "5d" }
    );
    res.json({ ...info, token });
  } catch (e) {
    res.json("Both fields are required");
  }
};

module.exports = { register, login };

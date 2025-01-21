const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
    } else {
    }
  } catch (error) {
    console.log(error);
  }

  res.send('signup route');
};

const login = (req, res) => {
  res.send('login route');
};

const logout = (req, res) => {
  res.send('logout route');
};

module.exports = {
  signup,
  login,
  logout,
};

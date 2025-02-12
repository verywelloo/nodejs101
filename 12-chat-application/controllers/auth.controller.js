const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateToken = require('../lib/utils');
const cloudinary = require('../lib/cloudinary');

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
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    await generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; // working with FileReader in frontend
    console.log(req.body)
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ); // profilePic = url of pic in cloudinary

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('Error in update profile: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller", error.message)
    res.status(500).json({ message: 'Internal Server Error' });

  }
}
module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
};

// const express = require('express');
// const fileUpload = require('express-fileupload');
// const cloudinary = require('cloudinary').v2;
// const User = require('../models/User'); // Adjust the path as needed

// const app = express();

// // Enable file upload middleware
// app.use(fileUpload());

// const updateProfile = async (req, res) => {
//   try {
//     // Check if a file was uploaded
//     if (!req.files || !req.files.profilePic) {
//       return res.status(400).json({ message: 'Profile pic is required' });
//     }

//     const userId = req.user._id;
//     const profilePic = req.files.profilePic; // Access uploaded file

//     // Upload file to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(profilePic.tempFilePath);

//     // Update user with Cloudinary URL
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: uploadResponse.secure_url },
//       { new: true }
//     );

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log('Error in update profile:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Route setup
// app.post('/update-profile', updateProfile);
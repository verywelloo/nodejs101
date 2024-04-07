const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthenticated } = require("../errors");

const register = async (req, res) => {
  // John said it is repetation(repeat) for this error.
  //   if(!name || !email || !password) {
  //     throw new BadRequest('Please provide name, email and password')
  //   }

  // User.create{...tempUser} means {name: ..., email: ..., password: ...}
  // User.create{tempUser} means {tempUser : {name: ..., email: ..., password: ...}}
  const user = await User.create({ ...req.body });

  // Below, we will create token for auth. The full function is in user models.
  const token = user.createJWT();
  // user: { name: user.name} It is using on the forntend.
  // user in {name : user.getName()} from the user variable(const user =await User.create({...req.body})).
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid Credentails");
  }

  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Credentails");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};

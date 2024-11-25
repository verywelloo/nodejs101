// this function is for remove unwanted info in user out like password in user and keep the lest (name, email , role)
// summary, this function make info that attach to token
const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role };
};

module.exports = createTokenUser;

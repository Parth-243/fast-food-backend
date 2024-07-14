const User = require('../../../models/user');

exports.findUserByIdentifier = async (identifier, role) => {
  return await User.findOne({
    $or: [
      { email: identifier.toLowerCase(), role },
      { username: identifier.toLowerCase(), role },
    ],
  });
};

exports.findUserByUsernameOrEmail = async (username, email, role) => {
  return await User.find({
    $or: [
      { email: email.toLowerCase(), role },
      { username: username.toLowerCase(), role },
    ],
  });
};

exports.getUserById = async (_id) => await User.findOne({ _id });

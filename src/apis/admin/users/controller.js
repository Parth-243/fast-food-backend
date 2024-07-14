const { USER_ROLES } = require('../../../../config');
const User = require('../../../models/user');

async function getAllCustomers(req, res) {
  try {
    const users = await User.find({ role: USER_ROLES.USER });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getAllCustomers };

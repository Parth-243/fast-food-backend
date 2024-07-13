const { login, register, logout } = require('../../common/services/auth');
const { USER_ROLES } = require('../../../../config');

ROLE = USER_ROLES.ADMIN;

// User login
async function adminLogin(req, res) {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;
    const user = await login({ identifier, password, role: ROLE });
    res.cookie('x-access-token', user.token);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Register a new user
async function adminRegister(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await register({
      username,
      email,
      password,
      role: ROLE,
    });
    res.cookie('x-access-token', user.token);
    res.status(201).json(user);
  } catch (error) {
    let errors = {};
    try {
      errors = JSON.parse(error.message);
    } catch (e) {
      errors.message = error.message;
    }
    res.status(400).json(errors);
  }
}

async function adminLogout(req, res) {
  try {
    const response = await logout(res);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { adminLogin, adminRegister, adminLogout };

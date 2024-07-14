const { login, register, logout } = require('../../common/services/auth');
const { USER_ROLES } = require('../../../../config');

const ROLE = USER_ROLES.B_USER;

// User login
async function bUserLogin(req, res) {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;
    const { user, token } = await login({ identifier, password, role: ROLE });

    res.cookie('x-access-token', token, {
      httpOnly: true, // This ensures the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent only over HTTPS in production
      sameSite: 'strict', // Adjust this based on your requirements
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Register a new user
async function bUserRegister(req, res) {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await register({
      username,
      email,
      password,
      role: ROLE,
    });

    res.cookie('x-access-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

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

async function getBUser(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function bUserLogout(req, res) {
  try {
    const response = await logout(res);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  bUserLogin,
  bUserRegister,
  getBUser,
  bUserLogout,
};

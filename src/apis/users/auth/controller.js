const { register } = require('./services');
const { USER_ROLES } = require('../../../../config');

// User login
async function userLogin(req, res) {
  try {
    const { email, username, password } = req.body;
    res.status(200).json({ body: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Register a new user
async function userRegister(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await register({
      username,
      email,
      password,
      role: USER_ROLES.USER,
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

  }
}
module.exports = { userLogin, userRegister };

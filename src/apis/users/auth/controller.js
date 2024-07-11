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
    res.status(200).json({ body: req.body });
  } catch (error) {
      errors.message = error.message;

  }
}
module.exports = { userLogin, userRegister };

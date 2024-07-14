const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../config');
const { getUserById } = require('../common/services/user');

const authenticateUser = async (req, res, next) => {
  let token;
  console.log('req.cookies', req.cookies);
  if (req.cookies && req.cookies['x-access-token']) {
    token = req.cookies['x-access-token'];
  } else if (req.header('Authorization')) {
    token = req.header('Authorization').replace('Bearer ', '');
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await getUserById(id);

    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = authenticateUser;
